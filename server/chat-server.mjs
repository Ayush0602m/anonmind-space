import { randomUUID } from "node:crypto";
import { WebSocketServer } from "ws";

const port = Number(process.env.CHAT_WS_PORT || 3001);
const rooms = new Map();
const clients = new Map();

const getRoom = (roomId) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      messages: [],
      clients: new Set(),
    });
  }

  return rooms.get(roomId);
};

const safeText = (value, maxLength) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const sendJson = (socket, payload) => {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
};

const roomUsers = (roomId) => {
  const room = getRoom(roomId);
  const users = [];

  room.clients.forEach((socket) => {
    const client = clients.get(socket);
    if (client?.user) {
      users.push(client.user);
    }
  });

  return users;
};

const broadcast = (roomId, payload) => {
  const room = getRoom(roomId);

  room.clients.forEach((socket) => {
    sendJson(socket, payload);
  });
};

const broadcastPresence = (roomId) => {
  broadcast(roomId, {
    type: "presence",
    roomId,
    users: roomUsers(roomId),
  });
};

const leaveCurrentRoom = (socket) => {
  const client = clients.get(socket);
  if (!client?.roomId) return;

  const previousRoomId = client.roomId;
  const room = getRoom(previousRoomId);
  room.clients.delete(socket);
  client.roomId = null;
  broadcastPresence(previousRoomId);
};

const handleJoin = (socket, payload) => {
  const roomId = safeText(payload.roomId, 80);
  const username = safeText(payload.user?.username, 40) || "Anonymous";
  const userId = safeText(payload.user?.id, 120) || randomUUID();

  if (!roomId) {
    sendJson(socket, { type: "error", message: "Room id is required." });
    return;
  }

  leaveCurrentRoom(socket);

  const room = getRoom(roomId);
  const client = clients.get(socket);
  client.roomId = roomId;
  client.user = { id: userId, username };
  room.clients.add(socket);

  sendJson(socket, {
    type: "history",
    roomId,
    messages: room.messages,
    users: roomUsers(roomId),
  });
  broadcastPresence(roomId);
};

const handleMessage = (socket, payload) => {
  const client = clients.get(socket);
  const roomId = safeText(payload.roomId || client?.roomId, 80);
  const messageText = safeText(payload.message, 500);

  if (!client?.user || !roomId || client.roomId !== roomId) {
    sendJson(socket, { type: "error", message: "Join the room before sending messages." });
    return;
  }

  if (!messageText) return;

  const room = getRoom(roomId);
  const message = {
    id: randomUUID(),
    roomId,
    message: messageText,
    timestamp: Date.now(),
    userId: client.user.id,
    username: client.user.username,
  };

  room.messages.push(message);
  if (room.messages.length > 100) {
    room.messages = room.messages.slice(-100);
  }

  broadcast(roomId, {
    type: "message",
    roomId,
    message,
  });
};

const wss = new WebSocketServer({ port });

wss.on("connection", (socket) => {
  clients.set(socket, { roomId: null, user: null });

  socket.on("message", (rawMessage) => {
    try {
      const payload = JSON.parse(rawMessage.toString());

      if (payload.type === "join") {
        handleJoin(socket, payload);
        return;
      }

      if (payload.type === "message") {
        handleMessage(socket, payload);
        return;
      }

      if (payload.type === "leave") {
        leaveCurrentRoom(socket);
      }
    } catch {
      sendJson(socket, { type: "error", message: "Invalid chat payload." });
    }
  });

  socket.on("close", () => {
    leaveCurrentRoom(socket);
    clients.delete(socket);
  });
});

console.log(`Chat WebSocket server listening on ws://localhost:${port}`);

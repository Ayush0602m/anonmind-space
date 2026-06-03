import type { ChatMessage } from "./LocalChatService";

export interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
}

export interface ChatUser {
  id: string;
  username: string;
}

export interface WebSocketChatState {
  connected: boolean;
  messages: ChatMessage[];
  activeUsers: ChatUser[];
  error?: string;
}

type IncomingPayload =
  | { type: "history"; roomId: string; messages: ChatMessage[]; users: ChatUser[] }
  | { type: "message"; roomId: string; message: ChatMessage }
  | { type: "presence"; roomId: string; users: ChatUser[] }
  | { type: "error"; message: string };

export class WebSocketChatService {
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners = new Set<(state: WebSocketChatState) => void>();
  private currentUser: ChatUser | null = null;
  private currentRoomId: string | null = null;
  private connected = false;
  private shouldReconnect = true;
  private messages: ChatMessage[] = [];
  private activeUsers: ChatUser[] = [];
  private config: Required<WebSocketConfig>;

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 3000,
      ...config,
    };
  }

  public connect(user: ChatUser, roomId: string): void {
    this.currentUser = user;
    this.currentRoomId = roomId;
    this.shouldReconnect = true;

    if (this.ws) {
      this.ws.close();
    }

    this.ws = new WebSocket(this.config.url);

    this.ws.onopen = () => {
      this.connected = true;
      this.emitState();
      this.send({
        type: "join",
        roomId,
        user,
      });
    };

    this.ws.onmessage = (event) => {
      this.handleIncomingMessage(event.data);
    };

    this.ws.onclose = () => {
      this.connected = false;
      this.emitState();

      if (this.shouldReconnect) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = () => {
      this.emitState("Unable to connect to the chat server.");
    };
  }

  private handleIncomingMessage(rawData: string) {
    try {
      const payload = JSON.parse(rawData) as IncomingPayload;

      if ("roomId" in payload && payload.roomId !== this.currentRoomId) {
        return;
      }

      if (payload.type === "history") {
        this.messages = payload.messages;
        this.activeUsers = payload.users;
      }

      if (payload.type === "message") {
        this.messages = [
          ...this.messages.filter((message) => message.id !== payload.message.id),
          payload.message,
        ].slice(-100);
      }

      if (payload.type === "presence") {
        this.activeUsers = payload.users;
      }

      if (payload.type === "error") {
        this.emitState(payload.message);
        return;
      }

      this.emitState();
    } catch {
      this.emitState("Received an invalid chat update.");
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer || !this.currentUser || !this.currentRoomId) return;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.currentUser && this.currentRoomId) {
        this.connect(this.currentUser, this.currentRoomId);
      }
    }, this.config.reconnectInterval);
  }

  private send(payload: unknown): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return false;
    }

    this.ws.send(JSON.stringify(payload));
    return true;
  }

  private emitState(error?: string) {
    const state: WebSocketChatState = {
      connected: this.connected,
      messages: this.messages,
      activeUsers: this.activeUsers,
      error,
    };

    this.listeners.forEach((listener) => listener(state));
  }

  public sendMessage(roomId: string, message: string): boolean {
    return this.send({
      type: "message",
      roomId,
      message: message.trim(),
    });
  }

  public leaveRoom(roomId: string): void {
    this.send({
      type: "leave",
      roomId,
    });
  }

  public subscribe(listener: (state: WebSocketChatState) => void): () => void {
    this.listeners.add(listener);
    listener({
      connected: this.connected,
      messages: this.messages,
      activeUsers: this.activeUsers,
    });

    return () => {
      this.listeners.delete(listener);
    };
  }

  public disconnect(): void {
    this.shouldReconnect = false;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.currentRoomId) {
      this.leaveRoom(this.currentRoomId);
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.connected = false;
    this.currentRoomId = null;
    this.messages = [];
    this.activeUsers = [];
    this.listeners.clear();
  }
}

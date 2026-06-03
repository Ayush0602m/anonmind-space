import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Settings, Wifi } from "lucide-react";
import type { ChatMode } from "./ChatInterface";

interface ChatSelectorProps {
  onRoomSelect: (roomId: string, roomName: string, mode: ChatMode) => void;
}

const chatRooms = [
  {
    id: "depression-support",
    name: "Depression Support",
    description: "Support for those dealing with depression",
    
    category: "mood"
  },
  {
    id: "anxiety-panic",
    name: "Anxiety & Panic",
    description: "Help with anxiety and panic disorders",
   
    category: "anxiety"
  },
  {
    id: "ptsd-recovery",
    name: "PTSD Recovery",
    description: "Recovery-focused support for trauma survivors",
    
    category: "trauma"
  },
  {
    id: "general-support",
    name: "General Mental Health",
    description: "Open discussions about mental wellness",
    
    category: "general"
  }
];

export const ChatSelector = ({ onRoomSelect }: ChatSelectorProps) => {
  const [chatMode, setChatMode] = useState<ChatMode>("websocket");

  const handleRoomJoin = (roomId: string, roomName: string) => {
    onRoomSelect(roomId, roomName, chatMode);
  };

  return (
    <div className="space-y-6">
      {/* Chat Mode Selector */}
    

      {/* Room Selection */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-1 h-full">
        {chatRooms.map((room) => (
      <Card
  key={room.id}
  className="rounded-2xl border border-white/5 bg-[#050505] transition-all duration-300 hover:border-violet-400/10 hover:bg-[#080808]"
>
  <CardHeader className="space-y-5 p-6">

    <div className="space-y-1">
      <CardTitle className="font-heading text-xl font-medium tracking-tight text-zinc-100">
        {room.name}
      </CardTitle>

      <CardDescription className="text-sm font-normal text-zinc-500">
        {room.description}
      </CardDescription>
    </div>

    <Button
      onClick={() => handleRoomJoin(room.id, room.name)}
      className="h-10 w-fit rounded-2 bg-red-600 text-sm font-normal text-zinc-200 transition-all duration-300 hover:bg-black align-left"
    >
      <MessageCircle className="mr-2 h-4 " />
      Join Room
    </Button>

  </CardHeader>
</Card>
        ))}
      </div>

    
    </div>
  );
};

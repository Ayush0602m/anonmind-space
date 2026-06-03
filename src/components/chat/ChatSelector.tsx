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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chatRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{room.name}</CardTitle>
              
              </div>
              <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleRoomJoin(room.id, room.name)}
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Room
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

    
    </div>
  );
};

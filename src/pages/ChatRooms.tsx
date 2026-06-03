import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSelector } from "@/components/chat/ChatSelector";
import { ChatInterface, type ChatMode } from "@/components/chat/ChatInterface";

const ChatRooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string; mode: ChatMode } | null>(null);

  const handleRoomSelect = (roomId: string, roomName: string, mode: ChatMode) => {
    setSelectedRoom({ id: roomId, name: roomName, mode });
  };

  const handleBackToRooms = () => {
    setSelectedRoom(null);
  };

  if (selectedRoom) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBackToRooms}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Rooms
          </Button>
        </div>
        <ChatInterface roomId={selectedRoom.id} roomName={selectedRoom.name} mode={selectedRoom.mode} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-left mt-10 mb-10">
        <h1 className="font-hero text-white-400  md:text-5xl mb-5">Find your space</h1>
        
      </div>

      {/* Safety Notice */}
      <Card className="mb-8 border-support/20 bg-gradient-to-r from-support/5 to-primary/5">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Shield className="w-8 h-8 text-support flex-shrink-0" />
          <div>
            <h3 className="font-heading mb-1 text-lg">Safe Space Guidelines</h3>
            <p className="font-ui text-sm text-muted-foreground/90 leading-relaxed">
              All rooms support anonymous communication. Be respectful, supportive, and remember that everyone here is on their own journey.
              If you're in crisis, please use our emergency helplines.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chat Implementation Selector and Room List */}
      <ChatSelector onRoomSelect={handleRoomSelect} />

      {/* Bottom Notice */}
      <div className="text-center mt-12 p-6 rounded-lg bg-muted/50">
        <p className="font-ui text-sm text-muted-foreground/90 leading-relaxed">
          Remember: If you're experiencing thoughts of self-harm or suicide, please reach out to our 
          <Button variant="link" className="px-1 h-auto font-normal" asChild>
            <span className="text-emergency cursor-pointer"> emergency helplines </span>
          </Button>
          immediately or contact local emergency services.
        </p>
      </div>
    </div>
  );
};

export default ChatRooms;

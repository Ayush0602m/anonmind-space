import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSelector } from "@/components/chat/ChatSelector";
import { ChatInterface } from "@/components/chat/ChatInterface";

const ChatRooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string } | null>(null);

  const handleRoomSelect = (roomId: string, roomName: string) => {
    setSelectedRoom({ id: roomId, name: roomName });
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
        <ChatInterface roomId={selectedRoom.id} roomName={selectedRoom.name} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Anonymous Chat Rooms</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with others who understand your journey. Multiple backend options available - 
          from local demos to production-ready external services.
        </p>
      </div>

      {/* Safety Notice */}
      <Card className="mb-8 border-support/20 bg-gradient-to-r from-support/5 to-primary/5">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Shield className="w-8 h-8 text-support flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Safe Space Guidelines</h3>
            <p className="text-sm text-muted-foreground">
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
        <p className="text-sm text-muted-foreground">
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
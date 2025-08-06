import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Shield, Clock } from "lucide-react";

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  activeUsers: number;
  category: string;
  isModerated: boolean;
  lastActivity: string;
}

const ChatRooms = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const chatRooms: ChatRoom[] = [
    {
      id: "1",
      name: "Depression Support",
      description: "A safe space to share experiences and support each other through depression",
      activeUsers: 23,
      category: "mood",
      isModerated: true,
      lastActivity: "2 min ago"
    },
    {
      id: "2",
      name: "Anxiety & Panic",
      description: "Connect with others who understand anxiety and panic disorders",
      activeUsers: 31,
      category: "anxiety",
      isModerated: true,
      lastActivity: "1 min ago"
    },
    {
      id: "3",
      name: "PTSD Recovery",
      description: "Peer support for trauma survivors on their healing journey",
      activeUsers: 12,
      category: "trauma",
      isModerated: true,
      lastActivity: "5 min ago"
    },
    {
      id: "4",
      name: "Bipolar Community",
      description: "Understanding and managing bipolar disorder together",
      activeUsers: 18,
      category: "mood",
      isModerated: true,
      lastActivity: "3 min ago"
    },
    {
      id: "5",
      name: "Eating Disorder Support",
      description: "Recovery-focused discussions about eating disorders",
      activeUsers: 9,
      category: "disorders",
      isModerated: true,
      lastActivity: "4 min ago"
    },
    {
      id: "6",
      name: "General Mental Health",
      description: "Open discussions about mental health and wellness",
      activeUsers: 45,
      category: "general",
      isModerated: true,
      lastActivity: "1 min ago"
    }
  ];

  const categories = [
    { id: "all", label: "All Rooms" },
    { id: "mood", label: "Mood Disorders" },
    { id: "anxiety", label: "Anxiety" },
    { id: "trauma", label: "Trauma & PTSD" },
    { id: "disorders", label: "Other Disorders" },
    { id: "general", label: "General Support" }
  ];

  const filteredRooms = selectedCategory === "all" 
    ? chatRooms 
    : chatRooms.filter(room => room.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Anonymous Chat Rooms</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with others who understand your journey. All conversations are anonymous and moderated by trained volunteers.
        </p>
      </div>

      {/* Safety Notice */}
      <Card className="mb-8 border-support/20 bg-gradient-to-r from-support/5 to-primary/5">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Shield className="w-8 h-8 text-support flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Safe Space Guidelines</h3>
            <p className="text-sm text-muted-foreground">
              All rooms are moderated 24/7. Be respectful, supportive, and remember that everyone here is on their own journey.
              If you're in crisis, please use our emergency helplines.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Chat Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <Card key={room.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {room.name}
                </CardTitle>
                {room.isModerated && (
                  <Shield className="w-4 h-4 text-support" />
                )}
              </div>
              <CardDescription className="text-sm">
                {room.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{room.activeUsers} active</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{room.lastActivity}</span>
                </div>
              </div>
              <Button className="w-full" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Room
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

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
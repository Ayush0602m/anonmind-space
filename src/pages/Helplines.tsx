import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, MapPin, Heart, Users, Shield } from "lucide-react";

interface Helpline {
  id: string;
  name: string;
  number: string;
  description: string;
  hours: string;
  location: string;
  languages: string[];
  specialization: string[];
  type: "crisis" | "support" | "specialized";
}

const Helplines = () => {
  const helplines: Helpline[] = [
    {
      id: "1",
      name: "Vandrevala Foundation",
      number: "9999 666 555",
      description: "24/7 mental health crisis intervention and suicide prevention helpline",
      hours: "24/7",
      location: "Mumbai, All India",
      languages: ["Hindi", "English", "Tamil", "Telugu"],
      specialization: ["Crisis", "Suicide Prevention", "Depression"],
      type: "crisis"
    },
    {
      id: "2",
      name: "Sneha India",
      number: "044-2464 0050",
      description: "Emotional support and suicide prevention helpline serving Tamil Nadu",
      hours: "24/7",
      location: "Chennai, Tamil Nadu",
      languages: ["Tamil", "English"],
      specialization: ["Suicide Prevention", "Emotional Support"],
      type: "crisis"
    },
    {
      id: "3",
      name: "AASRA",
      number: "91-22-2754 6669",
      description: "Crisis intervention and suicide prevention services",
      hours: "24/7",
      location: "Mumbai, Maharashtra",
      languages: ["Hindi", "English", "Marathi"],
      specialization: ["Crisis Intervention", "Suicide Prevention"],
      type: "crisis"
    },
    {
      id: "4",
      name: "Sumaitri",
      number: "011-23389090",
      description: "Emotional support and befriending services for people in distress",
      hours: "24/7",
      location: "Delhi",
      languages: ["Hindi", "English"],
      specialization: ["Emotional Support", "Befriending"],
      type: "support"
    },
    {
      id: "5",
      name: "Cooj Mental Health Foundation",
      number: "0832-2252525",
      description: "Mental health support and counseling services",
      hours: "9:00 AM - 9:00 PM",
      location: "Goa",
      languages: ["English", "Hindi", "Konkani"],
      specialization: ["Counseling", "Mental Health"],
      type: "support"
    },
    {
      id: "6",
      name: "Sahaara",
      number: "080-25497777",
      description: "Emotional support for those dealing with trauma and crisis",
      hours: "24/7",
      location: "Bangalore, Karnataka",
      languages: ["English", "Hindi", "Kannada"],
      specialization: ["Trauma", "Crisis Support"],
      type: "crisis"
    },
    {
      id: "7",
      name: "Lifeline Foundation",
      number: "033-24637401",
      description: "Mental health support and suicide prevention",
      hours: "24/7",
      location: "Kolkata, West Bengal",
      languages: ["Bengali", "English", "Hindi"],
      specialization: ["Mental Health", "Suicide Prevention"],
      type: "crisis"
    },
    {
      id: "8",
      name: "Mann Talks",
      number: "8686139139",
      description: "Youth-focused mental health support and counseling",
      hours: "10:00 AM - 6:00 PM",
      location: "Shillong, All India",
      languages: ["English", "Hindi"],
      specialization: ["Youth Mental Health", "Counseling"],
      type: "specialized"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "crisis":
        return "emergency";
      case "support":
        return "primary";
      case "specialized":
        return "support";
      default:
        return "muted";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "crisis":
        return "Crisis Line";
      case "support":
        return "Support Line";
      case "specialized":
        return "Specialized";
      default:
        return "General";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Emergency Mental Health Helplines</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Immediate support when you need it most. All helplines are staffed by trained professionals and volunteers.
          If you're in immediate danger, call emergency services (100/108).
        </p>
      </div>

      {/* Emergency Alert */}
      <Card className="mb-8 border-emergency/30 bg-gradient-to-r from-emergency/10 to-emergency/5">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Phone className="w-8 h-8 text-emergency flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1 text-emergency">In Immediate Crisis?</h3>
            <p className="text-sm text-muted-foreground">
              If you're having thoughts of suicide or self-harm, don't wait. Call any of the crisis helplines below immediately.
              You don't have to face this alone.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Helplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {helplines.map(helpline => (
          <Card key={helpline.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{helpline.name}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`text-${getTypeColor(helpline.type)} border-${getTypeColor(helpline.type)}/30 bg-${getTypeColor(helpline.type)}/10`}
                  >
                    {getTypeLabel(helpline.type)}
                  </Badge>
                </div>
              </div>
              <CardDescription className="text-sm mt-2">
                {helpline.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Phone Number */}
              <Button 
                className="w-full justify-start text-left h-auto py-3"
                variant="outline"
                asChild
              >
                <a href={`tel:${helpline.number.replace(/\s+/g, '')}`}>
                  <Phone className="w-4 h-4 mr-3" />
                  <div>
                    <div className="font-medium">{helpline.number}</div>
                    <div className="text-xs text-muted-foreground">Tap to call</div>
                  </div>
                </a>
              </Button>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{helpline.hours}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{helpline.location}</span>
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {helpline.languages.map(lang => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Specializes in:</p>
                <div className="flex flex-wrap gap-1">
                  {helpline.specialization.map(spec => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-safe" />
              <span>What to Expect</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>• Trained volunteers and professionals will listen without judgment</p>
            <p>• All calls are confidential and anonymous</p>
            <p>• You can share as much or as little as you're comfortable with</p>
            <p>• They can help you develop coping strategies and safety plans</p>
            <p>• Resources and referrals for ongoing support</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-healing" />
              <span>Remember</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>• It's okay to ask for help - it shows strength, not weakness</p>
            <p>• Your feelings are valid and you deserve support</p>
            <p>• Crisis situations are temporary, even when they don't feel like it</p>
            <p>• You don't have to have a "reason" to call - if you need to talk, call</p>
            <p>• If one helpline is busy, try another - help is available</p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-8 p-6 rounded-lg bg-muted/50">
        <p className="text-sm text-muted-foreground">
          This list includes major helplines across India. If you know of other local resources, 
          please encourage others to keep these numbers handy. Together, we can create a stronger support network.
        </p>
      </div>
    </div>
  );
};

export default Helplines;
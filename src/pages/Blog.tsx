import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Understanding Depression: Breaking Through the Silence",
      excerpt: "Depression affects millions worldwide, yet stigma often prevents people from seeking help. Learn about the signs, symptoms, and pathways to recovery.",
      author: "Dr. Priya Sharma",
      date: "2024-01-15",
      readTime: "8 min",
      category: "Mental Health",
      tags: ["Depression", "Awareness", "Recovery"],
      featured: true
    },
    {
      id: "2",
      title: "Anxiety in the Digital Age: Coping with Information Overload",
      excerpt: "Social media and constant connectivity can amplify anxiety. Discover practical strategies for managing digital overwhelm and protecting your mental space.",
      author: "Rajesh Kumar",
      date: "2024-01-12",
      readTime: "6 min",
      category: "Anxiety",
      tags: ["Anxiety", "Digital Wellness", "Coping Strategies"],
      featured: false
    },
    {
      id: "3",
      title: "Building Resilience: Small Steps, Big Changes",
      excerpt: "Resilience isn't something you're born with - it's a skill you can develop. Learn practical techniques to bounce back from life's challenges.",
      author: "Meera Patel",
      date: "2024-01-10",
      readTime: "10 min",
      category: "Self-Help",
      tags: ["Resilience", "Personal Growth", "Mental Strength"],
      featured: true
    },
    {
      id: "4",
      title: "The Power of Peer Support in Mental Health Recovery",
      excerpt: "Sometimes the most powerful healing comes from connecting with others who truly understand your journey. Explore the science behind peer support.",
      author: "Dr. Amit Singh",
      date: "2024-01-08",
      readTime: "7 min",
      category: "Community",
      tags: ["Peer Support", "Recovery", "Community"],
      featured: false
    },
    {
      id: "5",
      title: "Mindfulness for Beginners: Simple Practices for Daily Life",
      excerpt: "You don't need to meditate for hours to benefit from mindfulness. Discover simple techniques you can practice anywhere, anytime.",
      author: "Anita Desai",
      date: "2024-01-05",
      readTime: "5 min",
      category: "Mindfulness",
      tags: ["Mindfulness", "Meditation", "Stress Relief"],
      featured: false
    },
    {
      id: "6",
      title: "Supporting a Loved One Through Mental Health Challenges",
      excerpt: "When someone you care about is struggling, it's natural to want to help. Learn how to offer meaningful support while caring for yourself too.",
      author: "Dr. Kavya Reddy",
      date: "2024-01-03",
      readTime: "9 min",
      category: "Support",
      tags: ["Family Support", "Caregiving", "Relationships"],
      featured: false
    }
  ];

  const categories = ["All", "Mental Health", "Anxiety", "Self-Help", "Community", "Mindfulness", "Support"];
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Mental Health Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Evidence-based insights, personal stories, and practical guidance for your mental health journey.
          Written by mental health professionals and community contributors.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Featured
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Articles</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map(post => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
                  {formatDate(post.date)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <Card className="mt-12 bg-gradient-to-r from-primary/5 to-support/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Get weekly mental health insights and community updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
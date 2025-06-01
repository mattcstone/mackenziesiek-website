import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Coffee, TreePine, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Guide } from "@shared/schema";

interface LocalGuidesSectionProps {
  agentId: number;
}

export default function LocalGuidesSection({ agentId }: LocalGuidesSectionProps) {
  const { data: featuredGuides } = useQuery<Guide[]>({
    queryKey: [`/api/agents/${agentId}/guides/featured`],
  });

  const { data: allGuides } = useQuery<Guide[]>({
    queryKey: [`/api/agents/${agentId}/guides`],
  });

  // Default guides if none exist in database
  const defaultGuides = [
    {
      id: 1,
      title: "A Perfect Day in Myers Park",
      slug: "perfect-day-myers-park",
      excerpt: "Start with coffee at Park Road Shopping Center, stroll through Freedom Park, lunch at The Asbury, and end with dinner at Superica. Plus my favorite hidden gems!",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      isFeatured: true,
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "Perfect Day in Dilworth",
      slug: "perfect-day-dilworth",
      excerpt: "Trendy cafes, local boutiques, and amazing restaurants",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      isFeatured: false,
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: 3,
      title: "Art Lover's Guide to NoDa",
      slug: "art-lovers-guide-noda",
      excerpt: "Galleries, live music, and creative spaces",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      isFeatured: false,
      updatedAt: new Date("2024-01-08"),
    },
    {
      id: 4,
      title: "Urban Living in South End",
      slug: "urban-living-south-end",
      excerpt: "High-rises, light rail, and city conveniences",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      isFeatured: false,
      updatedAt: new Date("2024-01-20"),
    },
  ];

  const displayFeaturedGuides = featuredGuides && featuredGuides.length > 0 ? featuredGuides : defaultGuides.filter(g => g.isFeatured);
  const displayAllGuides = allGuides && allGuides.length > 0 ? allGuides : defaultGuides;

  const formatUpdatedDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Updated 1 day ago";
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 14) return "Updated 1 week ago";
    if (diffDays < 21) return "Updated 2 weeks ago";
    if (diffDays < 28) return "Updated 3 weeks ago";
    return "Updated 1 month ago";
  };

  return (
    <section id="guides" className="py-16 lg:py-24 bg-stone-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Local Insider Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes each Charlotte neighborhood special with my detailed local guides
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Featured Guide */}
          {displayFeaturedGuides.length > 0 && (
            <Card className="overflow-hidden">
              <img 
                src={displayFeaturedGuides[0].image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"} 
                alt={displayFeaturedGuides[0].title}
                className="w-full h-64 object-cover"
              />
              
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Badge className="bg-stone-blue text-white">Featured Guide</Badge>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {displayFeaturedGuides[0].title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {displayFeaturedGuides[0].excerpt}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Coffee className="text-stone-blue w-5 h-5 mr-3" />
                    <span>Morning: Park Road Shopping Center</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TreePine className="text-stone-blue w-5 h-5 mr-3" />
                    <span>Afternoon: Freedom Park & Little Sugar Creek Greenway</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Utensils className="text-stone-blue w-5 h-5 mr-3" />
                    <span>Evening: Phillips Place dining</span>
                  </div>
                </div>
                
                <Link href={`/guide/${displayFeaturedGuides[0].slug}`}>
                  <Button variant="link" className="text-stone-blue hover:text-blue-800 p-0">
                    Read Full Guide <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
          
          {/* Guide List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">All Neighborhood Guides</h3>
            
            {displayAllGuides.slice(0, 4).map((guide) => (
              <Link key={guide.id} href={`/guide/${guide.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={guide.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"} 
                        alt={guide.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{guide.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{guide.excerpt}</p>
                        <div className="text-xs text-stone-blue">
                          {formatUpdatedDate(guide.updatedAt || new Date())}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <div className="pt-4">
              <Button className="w-full bg-stone-blue text-white hover:bg-blue-800">
                View All Neighborhood Guides
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      title: "A Perfect Day in SouthEnd",
      slug: "perfect-day-southend",
      excerpt: "Start with coffee at Not Just Coffee, explore the Rail Trail, grab lunch at City Kitch, and end with rooftop drinks at Fahrenheit. The ultimate urban day!",
      image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      isFeatured: true,
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "Young Professional's Guide to NoDa",
      slug: "young-professional-noda",
      excerpt: "Art galleries, craft breweries, and the best nightlife spots",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      isFeatured: false,
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: 3,
      title: "Foodie's Paradise: Dilworth",
      slug: "foodie-paradise-dilworth",
      excerpt: "The best restaurants and food experiences in Charlotte's trendiest neighborhood",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      isFeatured: false,
      updatedAt: new Date("2024-01-08"),
    },
    {
      id: 4,
      title: "First-Time Buyer's Guide to Plaza Midwood",
      slug: "first-time-buyer-plaza-midwood",
      excerpt: "Affordable, walkable, and full of character - perfect for young buyers",
      image: "https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
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
    <section id="guides" className="py-8 lg:py-12 bg-stone-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in">
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
                    <Coffee className="text-black w-5 h-5 mr-3" />
                    <span>Morning: Not Just Coffee & Rail Trail walk</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TreePine className="text-black w-5 h-5 mr-3" />
                    <span>Afternoon: City Kitch lunch & rooftop bars</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Utensils className="text-black w-5 h-5 mr-3" />
                    <span>Evening: Fahrenheit for drinks & dinner</span>
                  </div>
                </div>
                
                <Link href={`/guide/${displayFeaturedGuides[0].slug}`}>
                  <Button variant="link" className="text-black hover:text-gray-600 p-0">
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
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                View All Neighborhood Guides
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

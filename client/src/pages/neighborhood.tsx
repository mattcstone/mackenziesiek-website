import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, MapPin, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Neighborhood, Agent } from "@shared/schema";

export default function NeighborhoodPage() {
  const { slug } = useParams();
  
  const { data: neighborhood } = useQuery<Neighborhood>({
    queryKey: [`/api/neighborhoods/${slug}`],
    enabled: !!slug,
  });

  // Default agent for footer
  const defaultAgent: Agent = {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@mattstoneteam.com",
    phone: "(704) 555-0123",
    bio: "",
    headshot: null,
    welcomeVideo: null,
    church: null,
    favoriteNeighborhood: null,
    favoriteSpot: null,
    favoriteRestaurant: null,
    hobby: null,
    homesSold: 127,
    avgDaysOnMarket: 18,
    rating: "4.9",
    isActive: true,
    createdAt: new Date(),
  };

  if (!neighborhood && slug) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Neighborhood Not Found</h1>
            <p className="text-gray-600 mb-8">The neighborhood you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer agent={defaultAgent} />
      </div>
    );
  }

  // Default neighborhood data for demonstration
  const displayNeighborhood = neighborhood || {
    id: 1,
    name: "Myers Park",
    slug: "myers-park",
    description: "Historic charm with tree-lined streets and luxury homes. Myers Park is one of Charlotte's most prestigious neighborhoods, known for its beautiful architecture, excellent schools, and proximity to Uptown.",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600",
    avgPrice: "$850,000",
    walkScore: 65,
    agentId: 1,
    createdAt: new Date(),
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96">
        <img 
          src={displayNeighborhood.image || "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"}
          alt={displayNeighborhood.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{displayNeighborhood.name}</h1>
            <p className="text-xl max-w-2xl">{displayNeighborhood.description}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {displayNeighborhood.name}</h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  {displayNeighborhood.description} This neighborhood offers a perfect blend of 
                  historic charm and modern amenities, making it one of Charlotte's most sought-after areas.
                </p>
                <p>
                  Residents enjoy tree-lined streets, beautiful parks, excellent schools, and easy access 
                  to Uptown Charlotte. The area features a mix of architectural styles, from historic 
                  Tudor and Colonial homes to newer custom builds.
                </p>
                <h3>What Makes {displayNeighborhood.name} Special</h3>
                <ul>
                  <li>Historic architecture and tree-lined streets</li>
                  <li>Top-rated schools and family-friendly environment</li>
                  <li>Close proximity to parks and recreational areas</li>
                  <li>Easy access to Uptown Charlotte</li>
                  <li>Strong sense of community</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-stone-blue mr-2" />
                        <span className="text-sm text-gray-600">Average Price</span>
                      </div>
                      <span className="font-semibold">{displayNeighborhood.avgPrice}</span>
                    </div>
                    
                    {displayNeighborhood.walkScore && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-stone-blue mr-2" />
                          <span className="text-sm text-gray-600">Walk Score</span>
                        </div>
                        <span className="font-semibold">{displayNeighborhood.walkScore}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-stone-blue mr-2" />
                        <span className="text-sm text-gray-600">Market Trend</span>
                      </div>
                      <span className="font-semibold text-green-600">Rising</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Interested in {displayNeighborhood.name}?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Let me help you find the perfect home in this amazing neighborhood.
                  </p>
                  <Button asChild className="w-full bg-stone-blue hover:bg-blue-800">
                    <a href="#contact">Contact Me</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer agent={defaultAgent} />
    </div>
  );
}

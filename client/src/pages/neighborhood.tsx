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
                {displayNeighborhood.slug === 'midtown' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} Midtown Charlotte represents the perfect fusion of urban sophistication and Southern charm, offering residents an exciting lifestyle with world-class amenities at their doorstep.
                    </p>
                    
                    <h3>The Metropolitan - Premier Shopping Destination</h3>
                    <p>
                      The crown jewel of Midtown is <strong>The Metropolitan</strong>, Charlotte's premier luxury shopping and lifestyle destination. This beautifully designed mixed-use development spans multiple city blocks and features an impressive collection of high-end retailers, award-winning restaurants, and sophisticated entertainment venues.
                    </p>
                    <p>
                      The Metropolitan's outdoor shopping experience includes flagship stores from nationally recognized brands, unique local boutiques, and specialty shops. The carefully curated retail mix offers everything from fashion and home goods to specialty foods and services, creating a true destination for discerning shoppers.
                    </p>
                    
                    <h3>Dining & Entertainment</h3>
                    <p>
                      The Metropolitan's restaurant collection features renowned chefs and celebrated dining concepts. From casual bistros with outdoor seating to upscale steakhouses and international cuisine, the dining scene attracts food enthusiasts from across the Charlotte region. The development also hosts seasonal events, live music, and cultural activities throughout the year.
                    </p>
                    
                    <h3>Luxury Living in Midtown</h3>
                    <p>
                      Midtown offers some of Charlotte's most sought-after residential options, including luxury high-rise condominiums with panoramic city views, modern townhomes, and elegant single-family residences. The neighborhood appeals to young professionals, executives, and empty nesters who appreciate urban convenience without sacrificing quality of life.
                    </p>
                    
                    <h3>Midtown Highlights</h3>
                    <ul>
                      <li>The Metropolitan - luxury shopping, dining, and entertainment complex</li>
                      <li>High-rise condominiums with skyline and mountain views</li>
                      <li>Proximity to Little Sugar Creek Greenway</li>
                      <li>Easy access to Uptown Charlotte via major corridors</li>
                      <li>Growing collection of trendy restaurants and bars</li>
                      <li>Modern developments and new construction opportunities</li>
                      <li>Central location between Uptown and SouthEnd</li>
                    </ul>
                  </>
                ) : displayNeighborhood.slug === 'uptown' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} As Charlotte's central business district, Uptown offers the ultimate urban lifestyle with luxury high-rise living, world-class dining, and cultural attractions all within walking distance.
                    </p>
                    
                    <h3>Urban Living at Its Finest</h3>
                    <p>
                      Uptown Charlotte features some of the city's most prestigious residential towers, offering panoramic views of the city skyline and surrounding mountains. From luxury condominiums to modern apartments, residents enjoy concierge services, rooftop amenities, and direct access to the city's business and entertainment districts.
                    </p>
                    
                    <h3>Entertainment & Culture</h3>
                    <p>
                      Home to Bank of America Stadium (Carolina Panthers), Spectrum Center (Charlotte Hornets), and numerous concert venues, Uptown is Charlotte's entertainment hub. The area also features art galleries, museums, and the vibrant EpiCentre entertainment complex.
                    </p>
                    
                    <h3>Uptown Highlights</h3>
                    <ul>
                      <li>Luxury high-rise living with concierge services</li>
                      <li>Professional sports venues and entertainment complexes</li>
                      <li>World-class dining and rooftop bars</li>
                      <li>LYNX Blue Line light rail connectivity</li>
                      <li>Walking distance to major corporate headquarters</li>
                      <li>Cultural attractions and art galleries</li>
                    </ul>
                  </>
                ) : displayNeighborhood.slug === 'plaza-midwood' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} This vibrant arts district has become Charlotte's cultural heart, where historic charm meets contemporary creativity.
                    </p>
                    
                    <h3>Arts & Culture Scene</h3>
                    <p>
                      Plaza Midwood is renowned for its thriving arts community, featuring local galleries, vintage shops, and eclectic restaurants housed in charming historic buildings. The neighborhood's creative energy attracts artists, musicians, and culture enthusiasts from across the region.
                    </p>
                    
                    <h3>Local Dining & Nightlife</h3>
                    <p>
                      The dining scene in Plaza Midwood is authentically local, featuring everything from craft breweries and coffee roasters to internationally-inspired restaurants and late-night eateries. The neighborhood's walkable streets make it perfect for exploring multiple venues in one evening.
                    </p>
                    
                    <h3>Plaza Midwood Highlights</h3>
                    <ul>
                      <li>Vibrant local arts and music scene</li>
                      <li>Historic homes and tree-lined residential streets</li>
                      <li>Eclectic mix of vintage shops and boutiques</li>
                      <li>Award-winning local restaurants and breweries</li>
                      <li>Walkable neighborhood with community events</li>
                      <li>Close proximity to Freedom Park</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>
                      {displayNeighborhood.description} This neighborhood offers a perfect blend of 
                      authentic Charlotte character and modern amenities, making it one of the city's most sought-after areas.
                    </p>
                    <p>
                      Residents enjoy the unique character that defines this community, along with convenient access 
                      to Charlotte's best dining, shopping, and entertainment. Each neighborhood in Charlotte offers 
                      its own distinct personality and lifestyle.
                    </p>
                    <h3>What Makes {displayNeighborhood.name} Special</h3>
                    <ul>
                      <li>Authentic Charlotte neighborhood character</li>
                      <li>Walkable streets and local businesses</li>
                      <li>Close proximity to parks and green spaces</li>
                      <li>Easy access to Uptown Charlotte</li>
                      <li>Strong sense of community</li>
                    </ul>
                  </>
                )}
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

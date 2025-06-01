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
  
  // Neighborhood-specific listing URLs
  const getListingUrl = (neighborhoodSlug: string) => {
    const listingUrls: Record<string, string> = {
      'dilworth': 'https://mackenzie.mattstoneteam.com/t/3pAGyv',
      // Add other neighborhood URLs as needed
    };
    return listingUrls[neighborhoodSlug] || 'https://mackenzie.mattstoneteam.com/';
  };
  
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
                {displayNeighborhood.slug === 'lake-norman' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} Lake Norman represents the pinnacle of waterfront living in the Charlotte region, where luxury meets leisure in a stunning natural setting.
                    </p>
                    
                    <h3>Waterfront Luxury Living</h3>
                    <p>
                      Lake Norman offers an exclusive collection of custom waterfront homes, many featuring private docks, boat houses, and expansive lake views. The community attracts discerning buyers seeking a resort-style lifestyle with easy access to Charlotte's business centers. Properties range from elegant lakefront estates to modern architectural masterpieces.
                    </p>
                    
                    <h3>Boating & Recreation</h3>
                    <p>
                      As North Carolina's largest man-made lake, Lake Norman provides endless recreational opportunities including boating, fishing, swimming, and water sports. The area features multiple marinas, yacht clubs, and waterfront dining establishments. Golf courses, country clubs, and nature preserves offer additional lifestyle amenities for residents.
                    </p>
                    
                    <h3>Community & Lifestyle</h3>
                    <p>
                      Lake Norman communities are known for their privacy, security, and resort-style amenities. Many neighborhoods feature gated entries, community docks, and exclusive recreational facilities. The area maintains a peaceful, vacation-like atmosphere while providing convenient access to Charlotte's employment centers.
                    </p>
                    
                    <h3>Lake Norman Highlights</h3>
                    <ul>
                      <li>Custom waterfront homes with private docks</li>
                      <li>North Carolina's largest recreational lake</li>
                      <li>Multiple marinas and yacht clubs</li>
                      <li>Championship golf courses and country clubs</li>
                      <li>Gated communities with luxury amenities</li>
                      <li>30-minute drive to Uptown Charlotte</li>
                      <li>Year-round boating and water activities</li>
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
                ) : displayNeighborhood.slug === 'fourth-ward' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} Fourth Ward represents Charlotte's rich history with its collection of beautifully preserved Victorian homes and modern urban conveniences.
                    </p>
                    
                    <h3>Historic Architecture & Character</h3>
                    <p>
                      Fourth Ward is renowned for its stunning Victorian-era homes, many of which have been meticulously restored to their original grandeur. The neighborhood's tree-lined streets create a peaceful residential atmosphere while maintaining easy access to Uptown's business district.
                    </p>
                    
                    <h3>Urban Convenience</h3>
                    <p>
                      Residents enjoy the rare combination of historic charm and modern city living. The neighborhood's central location provides walking access to Uptown offices, restaurants, and cultural venues, making it ideal for professionals who value both character and convenience.
                    </p>
                    
                    <h3>Fourth Ward Highlights</h3>
                    <ul>
                      <li>Historic Victorian homes with original architectural details</li>
                      <li>Tree-lined residential streets with sidewalks</li>
                      <li>Walking distance to Uptown Charlotte</li>
                      <li>Proximity to First Ward Park and greenways</li>
                      <li>Strong neighborhood association and community events</li>
                      <li>Mix of restored historic homes and new construction</li>
                    </ul>
                  </>
                ) : displayNeighborhood.slug === 'dilworth' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} Dilworth embodies Charlotte's classic neighborhood charm with its historic streetcar suburb layout and strong sense of community.
                    </p>
                    
                    <h3>Classic Streetcar Suburb</h3>
                    <p>
                      Originally developed as one of Charlotte's first streetcar suburbs, Dilworth features charming bungalows and craftsman-style homes along tree-canopied streets. The neighborhood's original design promotes walkability and community interaction, with front porches and sidewalks throughout.
                    </p>
                    
                    <h3>Family-Friendly Community</h3>
                    <p>
                      Dilworth is particularly popular with families, offering excellent schools, parks, and a strong sense of community. The neighborhood's central location provides easy access to both Uptown Charlotte and SouthEnd, while maintaining its residential character.
                    </p>
                    
                    <h3>Dilworth Highlights</h3>
                    <ul>
                      <li>Historic craftsman bungalows and tree-lined streets</li>
                      <li>Walkable neighborhood with sidewalks and front porches</li>
                      <li>Close proximity to Freedom Park and greenways</li>
                      <li>Strong community association and neighborhood events</li>
                      <li>Mix of original homes and tasteful renovations</li>
                      <li>Easy access to trendy restaurants and shops</li>
                    </ul>
                  </>
                ) : displayNeighborhood.slug === 'myers-park' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} Myers Park stands as one of Charlotte's most prestigious addresses, known for its grand homes, tree-lined boulevards, and proximity to excellent schools.
                    </p>
                    
                    <h3>Prestigious Living</h3>
                    <p>
                      Myers Park features some of Charlotte's most impressive residential architecture, from historic mansions to elegant contemporary homes. The neighborhood's wide, tree-canopied streets and large lots create a serene, upscale environment that has attracted Charlotte's most prominent families for generations.
                    </p>
                    
                    <h3>Education & Recreation</h3>
                    <p>
                      The neighborhood is renowned for its proximity to excellent schools and Freedom Park, one of Charlotte's premier recreational destinations. Residents enjoy easy access to tennis courts, walking trails, and cultural venues while living in one of the city's most desirable locations.
                    </p>
                    
                    <h3>Myers Park Highlights</h3>
                    <ul>
                      <li>Grand historic mansions and elegant architecture</li>
                      <li>Tree-canopied boulevards and spacious lots</li>
                      <li>Proximity to Freedom Park and recreational facilities</li>
                      <li>Access to highly-rated schools and educational institutions</li>
                      <li>Established neighborhood with mature landscaping</li>
                      <li>Close to Uptown and major business districts</li>
                    </ul>
                  </>
                ) : displayNeighborhood.slug === 'noda' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} NoDa (North Davidson) pulses with creative energy as Charlotte's premier arts district, where industrial heritage meets contemporary culture.
                    </p>
                    
                    <h3>Arts & Music Hub</h3>
                    <p>
                      NoDa is Charlotte's creative heartbeat, featuring numerous live music venues, art galleries, and studios housed in converted industrial buildings. The neighborhood regularly hosts art crawls, music festivals, and cultural events that draw visitors from across the region.
                    </p>
                    
                    <h3>Local Flavor</h3>
                    <p>
                      The dining and nightlife scene in NoDa is authentically local, featuring craft breweries, independent restaurants, and eclectic bars. The neighborhood's walkable layout and late-night scene make it a favorite destination for young professionals and creative types.
                    </p>
                    
                    <h3>NoDa Highlights</h3>
                    <ul>
                      <li>Vibrant live music venues and concert halls</li>
                      <li>Local art galleries and artist studios</li>
                      <li>Craft breweries and independent restaurants</li>
                      <li>Regular art crawls and cultural events</li>
                      <li>Industrial-chic architecture and converted spaces</li>
                      <li>Strong creative community and local identity</li>
                    </ul>
                  </>
                ) : displayNeighborhood.slug === 'southend' ? (
                  <>
                    <p>
                      {displayNeighborhood.description} SouthEnd represents Charlotte's modern urban lifestyle with sleek high-rises, trendy restaurants, and seamless connectivity via the LYNX Blue Line.
                    </p>
                    
                    <h3>Modern Urban Living</h3>
                    <p>
                      SouthEnd features Charlotte's newest and most sophisticated residential developments, including luxury apartment towers and modern condominiums. The neighborhood attracts young professionals who appreciate contemporary amenities, rooftop terraces, and walkable access to dining and entertainment.
                    </p>
                    
                    <h3>Transportation & Convenience</h3>
                    <p>
                      The LYNX Blue Line light rail provides direct access to Uptown Charlotte, making SouthEnd ideal for commuters. The neighborhood's grid layout and pedestrian-friendly design encourage walking and cycling, with numerous restaurants, bars, and shops within easy reach.
                    </p>
                    
                    <h3>SouthEnd Highlights</h3>
                    <ul>
                      <li>Modern high-rise apartments and condominiums</li>
                      <li>LYNX Blue Line light rail connectivity</li>
                      <li>Trendy restaurants, breweries, and rooftop bars</li>
                      <li>Walkable streets and bike-friendly infrastructure</li>
                      <li>Regular festivals and outdoor events</li>
                      <li>Close proximity to major employment centers</li>
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
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-stone-blue hover:bg-blue-800">
                      <a href={getListingUrl(displayNeighborhood.slug)} target="_blank" rel="noopener noreferrer">
                        View {displayNeighborhood.name} Listings
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-stone-blue text-stone-blue hover:bg-stone-blue hover:text-white">
                      <a href="#contact">Contact Me</a>
                    </Button>
                  </div>
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

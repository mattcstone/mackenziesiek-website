import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import LocalSEO from "@/components/LocalSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, TrendingUp, Users, Phone, Mail } from "lucide-react";
import type { Neighborhood } from "@shared/schema";

export default function NeighborhoodPage() {
  const { slug } = useParams();

  const { data: neighborhood, isLoading } = useQuery<Neighborhood>({
    queryKey: slug ? [`/api/neighborhoods/${slug}`] : [],
    enabled: !!slug,
  });

  // Default neighborhood data for SEO while loading
  const getNeighborhoodDefaults = (slug: string | undefined) => {
    const neighborhoods: Record<string, any> = {
      'southend': {
        name: 'SouthEnd',
        description: 'Charlotte\'s most vibrant neighborhood featuring luxury high-rise condos, trendy restaurants, and the LYNX Blue Line.',
        marketData: { medianPrice: 450000, averageDays: 12, inventory: 45 },
        highlights: ['Luxury High-Rise Living', 'Light Rail Access', 'Trendy Dining Scene', 'Walkable Lifestyle']
      },
      'noda': {
        name: 'NoDa',
        description: 'Charlotte\'s arts district known for eclectic galleries, live music venues, and historic charm.',
        marketData: { medianPrice: 380000, averageDays: 18, inventory: 32 },
        highlights: ['Arts & Culture Hub', 'Historic Character Homes', 'Live Music Scene', 'Local Breweries']
      },
      'dilworth': {
        name: 'Dilworth',
        description: 'Historic Charlotte neighborhood featuring tree-lined streets, charming bungalows, and close proximity to Uptown.',
        marketData: { medianPrice: 520000, averageDays: 15, inventory: 28 },
        highlights: ['Historic Charm', 'Tree-Lined Streets', 'Walkable to Uptown', 'Character Homes']
      },
      'fourth-ward': {
        name: 'Fourth Ward',
        description: 'Charlotte\'s oldest neighborhood blending historic Victorian homes with modern luxury condos.',
        marketData: { medianPrice: 475000, averageDays: 14, inventory: 22 },
        highlights: ['Historic Victorian Homes', 'Modern Luxury Condos', 'Uptown Adjacent', 'Premium Location']
      },
      'uptown': {
        name: 'Uptown',
        description: 'Charlotte\'s central business district featuring luxury high-rises, fine dining, and urban amenities.',
        marketData: { medianPrice: 385000, averageDays: 10, inventory: 67 },
        highlights: ['Urban Living', 'Luxury High-Rises', 'Business District', 'Fine Dining']
      }
    };
    return neighborhoods[slug || ''] || neighborhoods['southend'];
  };

  const defaultNeighborhood = getNeighborhoodDefaults(slug);
  const displayNeighborhood = neighborhood || defaultNeighborhood;

  const neighborhoodSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${displayNeighborhood.name} Charlotte`,
    "description": displayNeighborhood.description,
    "containedInPlace": {
      "@type": "City",
      "name": "Charlotte",
      "containedInPlace": {
        "@type": "State",
        "name": "North Carolina"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Homes for Sale in ${displayNeighborhood.name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": `${displayNeighborhood.name} Real Estate`
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${displayNeighborhood.name} Charlotte Homes for Sale | Mackenzie Siek Realtor | ${displayNeighborhood.name} Real Estate Expert`}
        description={`Find homes for sale in ${displayNeighborhood.name} Charlotte with expert realtor Mackenzie Siek. ${displayNeighborhood.description} Current market insights and neighborhood expertise.`}
        keywords={`${displayNeighborhood.name} Charlotte homes, ${displayNeighborhood.name} real estate, Charlotte ${displayNeighborhood.name} condos, ${displayNeighborhood.name} houses for sale, Charlotte realtor ${displayNeighborhood.name}`}
        canonicalUrl={`https://mackenzie.mattstoneteam.com/neighborhood/${slug}`}
        schema={neighborhoodSchema}
        ogImage="/assets/shutterstock_284834021.jpg"
      />
      <LocalSEO 
        businessName={`Mackenzie Siek - ${displayNeighborhood.name} Charlotte Real Estate Specialist`}
        cityState="Charlotte, NC"
        phone="(704) 610-0959"
        website="https://mackenzie.mattstoneteam.com"
        serviceAreas={[`${displayNeighborhood.name} Charlotte`]}
      />
      <Header agentName="Mackenzie Siek" />
      <Breadcrumbs items={[
        { label: "Charlotte Neighborhoods", href: "#neighborhoods" },
        { label: `${displayNeighborhood.name}` }
      ]} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
             style={{ backgroundImage: "url('/assets/shutterstock_284834021.jpg')" }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-gray-800/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {displayNeighborhood.name} Charlotte Real Estate
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {displayNeighborhood.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call (704) 610-0959
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Mail className="mr-2 h-5 w-5" />
              Get Market Report
            </Button>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current {displayNeighborhood.name} Market Data
            </h2>
            <p className="text-lg text-gray-600">
              Real-time insights for {displayNeighborhood.name} Charlotte real estate
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Home className="h-12 w-12 text-black mx-auto mb-4" />
                <CardTitle>Median Home Price</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-black">
                  ${displayNeighborhood.marketData?.medianPrice?.toLocaleString() || '425,000'}
                </div>
                <p className="text-sm text-gray-600 mt-2">Current market average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-black mx-auto mb-4" />
                <CardTitle>Average Days on Market</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-black">
                  {displayNeighborhood.marketData?.averageDays || 14} days
                </div>
                <p className="text-sm text-gray-600 mt-2">Homes sell quickly</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-black mx-auto mb-4" />
                <CardTitle>Active Listings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-black">
                  {displayNeighborhood.marketData?.inventory || 35}
                </div>
                <p className="text-sm text-gray-600 mt-2">Available properties</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neighborhood Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose {displayNeighborhood.name}?
            </h2>
            <p className="text-lg text-gray-600">
              Discover what makes {displayNeighborhood.name} Charlotte special
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayNeighborhood.highlights?.map((highlight: string, index: number) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-black mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{highlight}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Explore {displayNeighborhood.name} Charlotte?
          </h2>
          <p className="text-xl mb-8">
            As your local {displayNeighborhood.name} expert, I'll help you find the perfect home in this amazing neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call (704) 610-0959
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Schedule a Tour
            </Button>
          </div>
        </div>
      </section>

      <Footer agent={{
        id: 1,
        firstName: "Mackenzie",
        lastName: "Siek",
        email: "mackenzie@mattstoneteam.com",
        phone: "(704) 610-0959",
        bio: "",
        headshot: null,
        welcomeVideo: null,
        church: null,
        favoriteNeighborhood: null,
        slug: "mackenzie-siek",
        instagramHandle: null,
        facebookProfile: null,
        linkedinProfile: null,
        personalWebsite: null,
        rating: null,
        favoriteSpot: null,
        favoriteRestaurant: null,
        hobby: null,
        homesSold: null,
        avgDaysOnMarket: null,
        isActive: true,
        createdAt: null,
        updatedAt: null,
      }} />
    </div>
  );
}
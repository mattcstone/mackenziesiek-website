import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, TrendingUp, TrendingDown, Search, Filter, Users, Car, DollarSign, Phone, ArrowRight } from "lucide-react";
import CharlotteMap from "@/components/CharlotteMap";
import type { Neighborhood, Agent } from "@shared/schema";

export default function NeighborhoodsPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterType, setFilterType] = useState("all");

  // Default agent data
  const defaultAgent: Agent = {
    id: 1,
    firstName: "Mackenzie",
    lastName: "Siek",
    email: "mackenzie@mattstoneteam.com",
    phone: "(704) 610-0959",
    bio: "",
    headshot: "/assets/mackenzie-headshot.jpg",
    welcomeVideo: null,
    church: null,
    favoriteNeighborhood: "In-town Charlotte",
    favoriteSpot: "Farmers markets & the Rail Trail",
    favoriteRestaurant: "300 East",
    hobby: null,
    homesSold: 0,
    avgDaysOnMarket: 0,
    rating: "5.0",
    isActive: true,
    createdAt: new Date()
  };

  const { data: neighborhoods = [], isLoading } = useQuery<Neighborhood[]>({
    queryKey: ['/api/neighborhoods/all'],
  });

  // Comprehensive Charlotte neighborhoods data
  const charlotteNeighborhoods = useMemo(() => {
    if (neighborhoods.length > 0) return neighborhoods;
    
    // Fallback to comprehensive neighborhood data if API doesn't have full list
    return [
      // In-Town Core Neighborhoods
      { id: 1, name: "Uptown", slug: "uptown", avgPrice: "$450,000", type: "Urban Core", walkScore: 95, zipCode: "28202" },
      { id: 2, name: "SouthEnd", slug: "southend", avgPrice: "$415,000", type: "Transit-Oriented", walkScore: 85, zipCode: "28203" },
      { id: 3, name: "NoDa", slug: "noda", avgPrice: "$365,000", type: "Arts District", walkScore: 78, zipCode: "28205" },
      { id: 4, name: "Dilworth", slug: "dilworth", avgPrice: "$525,000", type: "Historic", walkScore: 82, zipCode: "28203" },
      { id: 5, name: "Fourth Ward", slug: "fourth-ward", avgPrice: "$485,000", type: "Historic Urban", walkScore: 88, zipCode: "28202" },
      { id: 6, name: "Plaza Midwood", slug: "plaza-midwood", avgPrice: "$385,000", type: "Trendy", walkScore: 75, zipCode: "28205" },
      { id: 7, name: "South End", slug: "south-end", avgPrice: "$425,000", type: "Modern Living", walkScore: 80, zipCode: "28203" },
      { id: 8, name: "Wesley Heights", slug: "wesley-heights", avgPrice: "$395,000", type: "Family", walkScore: 65, zipCode: "28208" },
      
      // Historic & Established Neighborhoods
      { id: 9, name: "Myers Park", slug: "myers-park", avgPrice: "$825,000", type: "Luxury Historic", walkScore: 55, zipCode: "28207" },
      { id: 10, name: "Eastover", slug: "eastover", avgPrice: "$1,200,000", type: "Luxury Historic", walkScore: 45, zipCode: "28207" },
      { id: 11, name: "Cotswold", slug: "cotswold", avgPrice: "$485,000", type: "Established", walkScore: 58, zipCode: "28211" },
      { id: 12, name: "Providence", slug: "providence", avgPrice: "$425,000", type: "Suburban", walkScore: 52, zipCode: "28211" },
      { id: 13, name: "Sedgefield", slug: "sedgefield", avgPrice: "$365,000", type: "Historic", walkScore: 68, zipCode: "28209" },
      { id: 14, name: "Elizabeth", slug: "elizabeth", avgPrice: "$445,000", type: "Historic", walkScore: 72, zipCode: "28204" },
      { id: 15, name: "Chantilly", slug: "chantilly", avgPrice: "$385,000", type: "Historic", walkScore: 65, zipCode: "28204" },
      
      // South Charlotte Communities
      { id: 16, name: "Ballantyne", slug: "ballantyne", avgPrice: "$565,000", type: "Master Planned", walkScore: 35, zipCode: "28277" },
      { id: 17, name: "StoneCrest", slug: "stonecrest", avgPrice: "$485,000", type: "Family", walkScore: 28, zipCode: "28277" },
      { id: 18, name: "Blakeney", slug: "blakeney", avgPrice: "$525,000", type: "Upscale", walkScore: 32, zipCode: "28277" },
      { id: 19, name: "Rea Farms", slug: "rea-farms", avgPrice: "$645,000", type: "New Development", walkScore: 25, zipCode: "28277" },
      { id: 20, name: "Waverly", slug: "waverly", avgPrice: "$385,000", type: "Family", walkScore: 35, zipCode: "28277" },
      
      // University Area
      { id: 21, name: "University City", slug: "university-city", avgPrice: "$325,000", type: "Student/Young Professional", walkScore: 65, zipCode: "28262" },
      { id: 22, name: "University Area", slug: "university-area", avgPrice: "$295,000", type: "Student Housing", walkScore: 68, zipCode: "28262" },
      { id: 23, name: "University Research Park", slug: "university-research-park", avgPrice: "$385,000", type: "Professional", walkScore: 45, zipCode: "28262" },
      
      // North Charlotte
      { id: 24, name: "North Davidson", slug: "north-davidson", avgPrice: "$285,000", type: "Emerging", walkScore: 55, zipCode: "28206" },
      { id: 25, name: "Villa Heights", slug: "villa-heights", avgPrice: "$335,000", type: "Up-and-Coming", walkScore: 62, zipCode: "28206" },
      { id: 26, name: "Belmont", slug: "belmont", avgPrice: "$385,000", type: "Historic Small Town", walkScore: 45, zipCode: "28012" },
      
      // East Charlotte
      { id: 27, name: "Matthews", slug: "matthews", avgPrice: "$425,000", type: "Family Suburban", walkScore: 42, zipCode: "28104" },
      { id: 28, name: "Mint Hill", slug: "mint-hill", avgPrice: "$395,000", type: "Family", walkScore: 25, zipCode: "28227" },
      { id: 29, name: "Indian Trail", slug: "indian-trail", avgPrice: "$365,000", type: "Family", walkScore: 22, zipCode: "28079" },
      { id: 30, name: "Stallings", slug: "stallings", avgPrice: "$385,000", type: "Family", walkScore: 20, zipCode: "28104" },
      
      // West Charlotte
      { id: 31, name: "West End", slug: "west-end", avgPrice: "$285,000", type: "Historic", walkScore: 58, zipCode: "28208" },
      { id: 32, name: "Enderly Park", slug: "enderly-park", avgPrice: "$325,000", type: "Revitalizing", walkScore: 65, zipCode: "28208" },
      { id: 33, name: "Seversville", slug: "seversville", avgPrice: "$295,000", type: "Historic", walkScore: 68, zipCode: "28206" },
      { id: 34, name: "Biddleville", slug: "biddleville", avgPrice: "$265,000", type: "Historic", walkScore: 62, zipCode: "28216" },
      
      // South Park Area
      { id: 35, name: "South Park", slug: "south-park", avgPrice: "$625,000", type: "Upscale Shopping", walkScore: 48, zipCode: "28210" },
      { id: 36, name: "Park Road", slug: "park-road", avgPrice: "$485,000", type: "Shopping Corridor", walkScore: 55, zipCode: "28209" },
      { id: 37, name: "Montford", slug: "montford", avgPrice: "$565,000", type: "Established", walkScore: 45, zipCode: "28209" },
      
      // Steele Creek Area
      { id: 38, name: "Steele Creek", slug: "steele-creek", avgPrice: "$385,000", type: "Growing Suburban", walkScore: 25, zipCode: "28273" },
      { id: 39, name: "Berewick", slug: "berewick", avgPrice: "$425,000", type: "Master Planned", walkScore: 22, zipCode: "28273" },
      
      // Additional Neighborhoods
      { id: 40, name: "Optimist Park", slug: "optimist-park", avgPrice: "$385,000", type: "Revitalizing", walkScore: 72, zipCode: "28205" },
      { id: 41, name: "Camp North End", slug: "camp-north-end", avgPrice: "$425,000", type: "Industrial Conversion", walkScore: 68, zipCode: "28206" },
      { id: 42, name: "Belmont-Central", slug: "belmont-central", avgPrice: "$295,000", type: "Emerging", walkScore: 58, zipCode: "28206" },
      { id: 43, name: "Historic West End", slug: "historic-west-end", avgPrice: "$335,000", type: "Historic", walkScore: 65, zipCode: "28208" },
      { id: 44, name: "Grier Heights", slug: "grier-heights", avgPrice: "$285,000", type: "Affordable", walkScore: 55, zipCode: "28208" },
      { id: 45, name: "Cherry", slug: "cherry", avgPrice: "$365,000", type: "Family", walkScore: 48, zipCode: "28208" },
      { id: 46, name: "Brookshire", slug: "brookshire", avgPrice: "$275,000", type: "Rural", walkScore: 15, zipCode: "28036" },
      { id: 47, name: "Davidson", slug: "davidson", avgPrice: "$625,000", type: "College Town", walkScore: 55, zipCode: "28036" },
      { id: 48, name: "Cornelius", slug: "cornelius", avgPrice: "$545,000", type: "Lake Community", walkScore: 35, zipCode: "28031" },
      { id: 49, name: "Huntersville", slug: "huntersville", avgPrice: "$465,000", type: "Family Suburban", walkScore: 38, zipCode: "28078" },
      { id: 50, name: "Mooresville", slug: "mooresville", avgPrice: "$385,000", type: "Lake Community", walkScore: 42, zipCode: "28117" },
      
      // Additional South Neighborhoods
      { id: 51, name: "Pineville", slug: "pineville", avgPrice: "$365,000", type: "Family", walkScore: 45, zipCode: "28134" },
      { id: 52, name: "Fort Mill", slug: "fort-mill", avgPrice: "$425,000", type: "SC Suburb", walkScore: 35, zipCode: "29715" },
      { id: 53, name: "Rock Hill", slug: "rock-hill", avgPrice: "$285,000", type: "SC City", walkScore: 42, zipCode: "29730" },
      { id: 54, name: "Tega Cay", slug: "tega-cay", avgPrice: "$485,000", type: "SC Lake Community", walkScore: 25, zipCode: "29708" },
      { id: 55, name: "Weddington", slug: "weddington", avgPrice: "$625,000", type: "Upscale Family", walkScore: 20, zipCode: "28104" },
      { id: 56, name: "Wesley Chapel", slug: "wesley-chapel", avgPrice: "$485,000", type: "New Development", walkScore: 18, zipCode: "28104" },
      { id: 57, name: "Marvin", slug: "marvin", avgPrice: "$565,000", type: "Rural Luxury", walkScore: 15, zipCode: "28173" },
      
      // West/Northwest Areas
      { id: 58, name: "Mountain Island Lake", slug: "mountain-island-lake", avgPrice: "$525,000", type: "Lakefront", walkScore: 25, zipCode: "28278" },
      { id: 59, name: "Paw Creek", slug: "paw-creek", avgPrice: "$285,000", type: "Rural", walkScore: 22, zipCode: "28278" },
      { id: 60, name: "Gastonia", slug: "gastonia", avgPrice: "$245,000", type: "Industrial City", walkScore: 38, zipCode: "28052" },
      
      // Eastern Suburbs
      { id: 61, name: "Harrisburg", slug: "harrisburg", avgPrice: "$425,000", type: "Family Suburban", walkScore: 25, zipCode: "28075" },
      { id: 62, name: "Concord", slug: "concord", avgPrice: "$355,000", type: "Historic City", walkScore: 35, zipCode: "28025" },
      { id: 63, name: "Kannapolis", slug: "kannapolis", avgPrice: "$295,000", type: "Industrial Heritage", walkScore: 42, zipCode: "28081" },
      { id: 64, name: "Midland", slug: "midland", avgPrice: "$465,000", type: "Rural", walkScore: 15, zipCode: "28107" },
      
      // Additional Inner-City Areas
      { id: 65, name: "Lockwood", slug: "lockwood", avgPrice: "$325,000", type: "Revitalizing", walkScore: 55, zipCode: "28208" },
      { id: 66, name: "Shannon Park", slug: "shannon-park", avgPrice: "$295,000", type: "Affordable", walkScore: 48, zipCode: "28208" },
      { id: 67, name: "Brightwalk", slug: "brightwalk", avgPrice: "$285,000", type: "Emerging", walkScore: 52, zipCode: "28206" },
      { id: 68, name: "Druid Hills", slug: "druid-hills", avgPrice: "$365,000", type: "Established", walkScore: 58, zipCode: "28207" },
      { id: 69, name: "Shamrock Gardens", slug: "shamrock-gardens", avgPrice: "$325,000", type: "Family", walkScore: 42, zipCode: "28210" },
      { id: 70, name: "Sardis Woods", slug: "sardis-woods", avgPrice: "$485,000", type: "Suburban", walkScore: 35, zipCode: "28270" },
      
      // More South Charlotte
      { id: 71, name: "Carmel", slug: "carmel", avgPrice: "$625,000", type: "Upscale", walkScore: 28, zipCode: "28226" },
      { id: 72, name: "Foxcroft", slug: "foxcroft", avgPrice: "$545,000", type: "Golf Community", walkScore: 25, zipCode: "28211" },
      { id: 73, name: "Beverly Woods", slug: "beverly-woods", avgPrice: "$485,000", type: "Established", walkScore: 38, zipCode: "28210" },
      { id: 74, name: "Olde Providence", slug: "olde-providence", avgPrice: "$565,000", type: "Golf Community", walkScore: 32, zipCode: "28226" },
      { id: 75, name: "Piper Glen", slug: "piper-glen", avgPrice: "$525,000", type: "Master Planned", walkScore: 28, zipCode: "28277" },
      
      // Additional Areas
      { id: 76, name: "Commonwealth", slug: "commonwealth", avgPrice: "$385,000", type: "Family", walkScore: 45, zipCode: "28205" },
      { id: 77, name: "Hickory Grove", slug: "hickory-grove", avgPrice: "$365,000", type: "Suburban", walkScore: 38, zipCode: "28215" },
      { id: 78, name: "Hidden Valley", slug: "hidden-valley", avgPrice: "$425,000", type: "Family", walkScore: 32, zipCode: "28213" },
      { id: 79, name: "Northlake", slug: "northlake", avgPrice: "$385,000", type: "Shopping Area", walkScore: 45, zipCode: "28269" },
      { id: 80, name: "Highland Creek", slug: "highland-creek", avgPrice: "$465,000", type: "Golf Community", walkScore: 28, zipCode: "28269" },
      
      // Final Set
      { id: 81, name: "Mallard Creek", slug: "mallard-creek", avgPrice: "$425,000", type: "Family", walkScore: 35, zipCode: "28262" },
      { id: 82, name: "Newell", slug: "newell", avgPrice: "$365,000", type: "Suburban", walkScore: 42, zipCode: "28262" },
      { id: 83, name: "Reedy Creek", slug: "reedy-creek", avgPrice: "$385,000", type: "Nature Community", walkScore: 25, zipCode: "28269" },
      { id: 84, name: "Prosperity Church", slug: "prosperity-church", avgPrice: "$445,000", type: "Family", walkScore: 32, zipCode: "28269" },
      { id: 85, name: "Derita", slug: "derita", avgPrice: "$295,000", type: "Affordable", walkScore: 38, zipCode: "28269" },
      { id: 86, name: "Toringdon", slug: "toringdon", avgPrice: "$525,000", type: "Upscale", walkScore: 35, zipCode: "28277" },
      { id: 87, name: "Quail Hollow", slug: "quail-hollow", avgPrice: "$485,000", type: "Golf Community", walkScore: 28, zipCode: "28277" },
      { id: 88, name: "Whitehall", slug: "whitehall", avgPrice: "$365,000", type: "Family", walkScore: 35, zipCode: "28105" },
      { id: 89, name: "Stallings Ridge", slug: "stallings-ridge", avgPrice: "$425,000", type: "New Development", walkScore: 22, zipCode: "28104" },
      { id: 90, name: "Fairview", slug: "fairview", avgPrice: "$565,000", type: "Rural Luxury", walkScore: 15, zipCode: "28730" },
      { id: 91, name: "Lake Norman", slug: "lake-norman", avgPrice: "$485,000", type: "Lake Community", walkScore: 25, zipCode: "28031" },
      { id: 92, name: "Lake Wylie", slug: "lake-wylie", avgPrice: "$425,000", type: "Lake Community", walkScore: 22, zipCode: "29710" },
      { id: 93, name: "Rivergate", slug: "rivergate", avgPrice: "$385,000", type: "Family", walkScore: 38, zipCode: "28273" },
      { id: 94, name: "Southpark Commons", slug: "southpark-commons", avgPrice: "$525,000", type: "Shopping District", walkScore: 52, zipCode: "28210" },
      { id: 95, name: "Stonehaven", slug: "stonehaven", avgPrice: "$465,000", type: "Family", walkScore: 32, zipCode: "28277" },
      { id: 96, name: "Arboretum", slug: "arboretum", avgPrice: "$545,000", type: "Upscale Shopping", walkScore: 45, zipCode: "28226" },
      { id: 97, name: "Raintree", slug: "raintree", avgPrice: "$425,000", type: "Family", walkScore: 35, zipCode: "28277" },
      { id: 98, name: "Baxter Village", slug: "baxter-village", avgPrice: "$385,000", type: "New Urbanism", walkScore: 48, zipCode: "29715" },
      { id: 99, name: "Governor Hunt", slug: "governor-hunt", avgPrice: "$485,000", type: "Golf Community", walkScore: 25, zipCode: "28078" },
      { id: 100, name: "Birkdale Village", slug: "birkdale-village", avgPrice: "$465,000", type: "Mixed Use", walkScore: 58, zipCode: "28078" }
    ] as any[];
  }, [neighborhoods]);

  // Filter and sort neighborhoods
  const filteredNeighborhoods = useMemo(() => {
    let filtered = charlotteNeighborhoods.filter(n => {
      const matchesSearch = n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           n.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           n.zipCode?.includes(searchTerm);
      
      const matchesType = filterType === "all" || n.type === filterType;
      
      return matchesSearch && matchesType;
    });

    // Sort neighborhoods
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "walkScore":
          return (b.walkScore || 0) - (a.walkScore || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [charlotteNeighborhoods, searchTerm, sortBy, filterType]);

  const uniqueTypes = Array.from(new Set(charlotteNeighborhoods.map(n => n.type).filter(Boolean)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header agentName="Mackenzie Siek" />
        <div className="flex justify-center items-center h-96">
          <div className="text-xl">Loading neighborhoods...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Charlotte Neighborhoods Guide - Top 100+ Areas | Mackenzie Siek"
        description="Comprehensive guide to Charlotte's top neighborhoods with market data, pricing, and local insights. Expert neighborhood knowledge from Charlotte Realtor Mackenzie Siek."
        keywords="Charlotte neighborhoods, Charlotte real estate areas, Charlotte market data, neighborhood guide Charlotte, Charlotte home prices, Charlotte area guide"
      />
      
      <Header agentName="Mackenzie Siek" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Charlotte Neighborhoods Guide
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Explore Charlotte's top 100+ neighborhoods with detailed market data, pricing trends, and local insights from your trusted Charlotte real estate expert.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-200">
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>{charlotteNeighborhoods.length} Neighborhoods</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Charlotte Metro Area</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Real-Time Market Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search neighborhoods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="walkScore">Walk Score</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredNeighborhoods.length} of {charlotteNeighborhoods.length} neighborhoods
            </p>
            <InteractiveButton
              variant="outline"
              animation="bounce"
              onClick={() => {
                setSearchTerm("");
                setSortBy("price");
                setFilterType("all");
                setPriceRange("all");
              }}
              className="flex items-center space-x-2 group"
            >
              <Filter className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <span>Clear Filters</span>
            </InteractiveButton>
          </div>
        </div>
      </section>

      {/* Map and Neighborhoods Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interactive Map */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Charlotte Neighborhoods Map</h2>
            <CharlotteMap 
              neighborhoods={charlotteNeighborhoods}
              onNeighborhoodSelect={(neighborhood) => {
                // Auto-search for selected neighborhood
                setSearchTerm(neighborhood.name);
              }}
            />
          </div>

          {/* Compact Neighborhoods Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredNeighborhoods.map((neighborhood) => (
              <Card key={neighborhood.id} className="hover:shadow-md transition-all duration-200 group">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div>
                      <h3 className="font-semibold text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                        {neighborhood.name}
                      </h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {neighborhood.type}
                      </Badge>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-bold text-green-600">{neighborhood.walkScore || 'N/A'}</div>
                        <div className="text-gray-600">Walk Score</div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <Link href={`/neighborhood/${neighborhood.slug}`}>
                      <InteractiveButton 
                        variant="primary" 
                        animation="scale" 
                        size="sm" 
                        className="w-full text-xs bg-blue-600 hover:bg-blue-700 group"
                      >
                        View Details
                        <MapPin className="w-3 h-3 ml-1 transition-transform group-hover:scale-110" />
                      </InteractiveButton>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredNeighborhoods.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                No neighborhoods match your search criteria
              </div>
              <InteractiveButton
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setPriceRange("all");
                }}
                variant="outline"
                animation="bounce"
              >
                Clear all filters
              </InteractiveButton>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Explore Charlotte Neighborhoods?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get personalized neighborhood recommendations and market insights from Charlotte's trusted real estate expert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:(704) 610-0959">
              <InteractiveButton 
                variant="secondary" 
                animation="glow" 
                size="lg"
                className="w-full sm:w-auto group"
              >
                <Phone className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Call (704) 610-0959
              </InteractiveButton>
            </a>
            <a href="#contact">
              <InteractiveButton 
                variant="outline" 
                animation="slide" 
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black group"
              >
                <Users className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                Schedule Consultation
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </InteractiveButton>
            </a>
          </div>
        </div>
      </section>
      
      <Footer agent={defaultAgent} />
    </div>
  );
}
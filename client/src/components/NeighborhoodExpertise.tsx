import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Neighborhood } from "@shared/schema";

interface NeighborhoodExpertiseProps {
  agentId: number;
}

export default function NeighborhoodExpertise({ agentId }: NeighborhoodExpertiseProps) {
  const { data: neighborhoods, isLoading } = useQuery<Neighborhood[]>({
    queryKey: [`/api/agents/${agentId}/neighborhoods`],
  });

  if (isLoading) {
    return (
      <section id="neighborhoods" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get to Know In-Town Charlotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading neighborhood information...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const defaultNeighborhoods = [
    {
      id: 1,
      name: "Uptown",
      slug: "uptown",
      description: "Charlotte's bustling business district with luxury high-rises",
      image: "/api/placeholder/400/300?text=Charlotte+Uptown+Skyline",
      avgPrice: "Avg: $650K",
      walkScore: 95,
    },
    {
      id: 2,
      name: "SouthEnd",
      slug: "southend",
      description: "Modern high-rise living with light rail access",
      image: "/api/placeholder/400/300?text=SouthEnd+Light+Rail",
      avgPrice: "Avg: $485K",
      walkScore: 85,
    },
    {
      id: 3,
      name: "Dilworth",
      slug: "dilworth",
      description: "Prestigious historic neighborhood with tree-lined streets",
      image: "/api/placeholder/400/300?text=Dilworth+Historic+Homes",
      avgPrice: "Avg: $750K",
      walkScore: 78,
    },
    {
      id: 4,
      name: "NoDa",
      slug: "noda",
      description: "Vibrant arts district with craft breweries and galleries",
      image: "/api/placeholder/400/300?text=NoDa+Arts+District",
      avgPrice: "Avg: $525K",
      walkScore: 72,
    },
    {
      id: 5,
      name: "Fourth Ward",
      slug: "fourth-ward",
      description: "Historic district in the heart of Uptown",
      image: "/api/placeholder/400/300?text=Fourth+Ward+Historic",
      avgPrice: "Avg: $595K",
      walkScore: 88,
    },
    {
      id: 6,
      name: "Plaza Midwood",
      slug: "plaza-midwood",
      description: "Eclectic neighborhood with local boutiques and eateries",
      image: "@assets/wes-hicks-rZ0sTRs9uco-unsplash.jpg",
      avgPrice: "Avg: $425K",
      walkScore: 68,
    },
    {
      id: 7,
      name: "Midtown",
      slug: "midtown",
      description: "Growing urban corridor with mixed-use developments",
      image: "/api/placeholder/400/300?text=Charlotte+Midtown",
      avgPrice: "Avg: $475K",
      walkScore: 75,
    },
    {
      id: 8,
      name: "Myers Park",
      slug: "myers-park",
      description: "Charlotte's most prestigious residential neighborhood",
      image: "/api/placeholder/400/300?text=Myers+Park+Estates",
      avgPrice: "Avg: $850K",
      walkScore: 65,
    },
  ];

  const displayNeighborhoods = neighborhoods && neighborhoods.length > 0 ? neighborhoods : defaultNeighborhoods;

  return (
    <section id="neighborhoods" className="py-12 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 hover:text-black transition-colors duration-300">
            Get to Know In-Town Charlotte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I specialize in Charlotte's most prestigious in-town communities where discerning residents enjoy exceptional urban living.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayNeighborhoods.map((neighborhood, index) => (
            <Link key={neighborhood.id} href={`/neighborhood/${neighborhood.slug}`}>
              <div className="group cursor-pointer" style={{animationDelay: `${index * 100}ms`}}>
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="w-full h-48 relative">
                    {neighborhood.image && neighborhood.image.startsWith('@assets/') ? (
                      <img 
                        src={neighborhood.image.replace('@assets/', '/attached_assets/')} 
                        alt={`${neighborhood.name} neighborhood`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600"></div>
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-yellow-200 transition-colors duration-300">{neighborhood.name}</h3>
                      <p className="text-sm text-gray-200 mb-2 line-clamp-2">{neighborhood.description}</p>
                      <div className="flex items-center text-xs">
                        <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded">{neighborhood.avgPrice || "Price varies"}</span>
                        {neighborhood.walkScore && (
                          <span className="ml-2 bg-green-500/20 backdrop-blur-sm px-2 py-1 rounded">Walk: {neighborhood.walkScore}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

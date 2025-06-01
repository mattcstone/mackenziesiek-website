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
      image: "/api/placeholder/400/300?text=Plaza+Midwood+Central+Ave",
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
    <section id="neighborhoods" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get to Know In-Town Charlotte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I specialize in Charlotte's most prestigious in-town communities where discerning residents enjoy exceptional urban living.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayNeighborhoods.map((neighborhood) => (
            <Link key={neighborhood.id} href={`/neighborhood/${neighborhood.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-transform group-hover:scale-105">
                  <div className="w-full h-64 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{neighborhood.name}</h3>
                      <p className="text-sm text-gray-200 mb-2">{neighborhood.description}</p>
                      <div className="flex items-center text-sm">
                        <span>{neighborhood.avgPrice || "Price varies"}</span>
                        {neighborhood.walkScore && (
                          <>
                            <span className="mx-2">•</span>
                            <span>Walk Score: {neighborhood.walkScore}</span>
                          </>
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

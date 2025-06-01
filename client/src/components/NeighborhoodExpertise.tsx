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
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $650K",
      walkScore: 95,
    },
    {
      id: 2,
      name: "SouthEnd",
      slug: "southend",
      description: "Modern high-rise living with light rail access",
      image: "https://images.unsplash.com/photo-1486718448742-163d73305c09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $485K",
      walkScore: 85,
    },
    {
      id: 3,
      name: "Dilworth",
      slug: "dilworth",
      description: "Prestigious historic neighborhood with tree-lined streets",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $750K",
      walkScore: 78,
    },
    {
      id: 4,
      name: "NoDa",
      slug: "noda",
      description: "Vibrant arts district with craft breweries and galleries",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $525K",
      walkScore: 72,
    },
    {
      id: 5,
      name: "Fourth Ward",
      slug: "fourth-ward",
      description: "Historic district in the heart of Uptown",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $595K",
      walkScore: 88,
    },
    {
      id: 6,
      name: "Plaza Midwood",
      slug: "plaza-midwood",
      description: "Eclectic neighborhood with local boutiques and eateries",
      image: "https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $425K",
      walkScore: 68,
    },
    {
      id: 7,
      name: "Midtown",
      slug: "midtown",
      description: "Growing urban corridor with mixed-use developments",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $475K",
      walkScore: 75,
    },
    {
      id: 8,
      name: "Myers Park",
      slug: "myers-park",
      description: "Charlotte's most prestigious residential neighborhood",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayNeighborhoods.map((neighborhood) => (
            <Link key={neighborhood.id} href={`/neighborhood/${neighborhood.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-transform group-hover:scale-105">
                  <img 
                    src={neighborhood.image || "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"} 
                    alt={`${neighborhood.name} neighborhood`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{neighborhood.name}</h3>
                    <p className="text-sm text-gray-200">{neighborhood.description}</p>
                    <div className="flex items-center mt-2 text-sm">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

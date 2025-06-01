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
              My Charlotte Neighborhoods
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
      name: "SouthEnd",
      slug: "southend",
      description: "High-rise living & light rail access",
      image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $385K",
      walkScore: 85,
    },
    {
      id: 2,
      name: "NoDa",
      slug: "noda",
      description: "Arts district with vibrant nightlife",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $425K",
      walkScore: 72,
    },
    {
      id: 3,
      name: "Dilworth",
      slug: "dilworth",
      description: "Trendy area with amazing restaurants",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $620K",
      walkScore: 78,
    },
    {
      id: 4,
      name: "Plaza Midwood",
      slug: "plaza-midwood",
      description: "Eclectic & up-and-coming hotspot",
      image: "https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $325K",
      walkScore: 68,
    },
    {
      id: 5,
      name: "Wesley Heights",
      slug: "wesley-heights",
      description: "Historic charm near Uptown",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $450K",
      walkScore: 65,
    },
    {
      id: 6,
      name: "Fourth Ward",
      slug: "fourth-ward",
      description: "Historic district in the heart of Uptown",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      avgPrice: "Avg: $495K",
      walkScore: 88,
    },
  ];

  const displayNeighborhoods = neighborhoods && neighborhoods.length > 0 ? neighborhoods : defaultNeighborhoods;

  return (
    <section id="neighborhoods" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            My In-Town Charlotte Neighborhoods
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I specialize in Charlotte's most vibrant in-town communities where young professionals love to live, work, and play.
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

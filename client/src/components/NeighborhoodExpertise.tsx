import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Neighborhood } from "@shared/schema";

interface NeighborhoodExpertiseProps {
  agentId: number;
}

export default function NeighborhoodExpertise({ agentId }: NeighborhoodExpertiseProps) {
  const { data: neighborhoods, isLoading } = useQuery<Neighborhood[]>({
    queryKey: [`/api/agents/${agentId}/neighborhoods/featured`],
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



  if (!neighborhoods?.length) {
    return (
      <section id="neighborhoods" className="py-8 lg:py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 hover:text-black transition-colors duration-300">
              Discover Charlotte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading neighborhood information...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="neighborhoods" className="py-8 lg:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 hover:text-black transition-colors duration-300">
            Discover Charlotte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get to know my favorite areas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoods.map((neighborhood, index) => (
            <Link key={neighborhood.id} href={`/neighborhood/${neighborhood.slug}`}>
              <div className="group cursor-pointer" style={{animationDelay: `${index * 100}ms`}}>
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="w-full h-48 relative">
                    <img 
                      src={neighborhood.image || ""} 
                      alt={`${neighborhood.name} neighborhood in Charlotte`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        console.log(`Failed to load image: ${neighborhood.image}`);
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.style.background = 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded image: ${neighborhood.image}`);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-lg text-shadow-xl">{neighborhood.name}</h3>
                      <p className="text-sm text-gray-100 mb-2 line-clamp-2 drop-shadow-md">{neighborhood.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        {neighborhood.walkScore && (
                          <span className="bg-green-600/80 backdrop-blur-sm px-3 py-1.5 rounded font-semibold text-white border border-white/20">Walk Score: {neighborhood.walkScore}</span>
                        )}
                        {(() => {
                          const getNeighborhoodTag = (name: string) => {
                            switch(name) {
                              case 'Myers Park': return 'Historic Luxury';
                              case 'Lake Norman': return 'Waterfront';
                              case 'Uptown': return 'Urban Core';
                              case 'SouthEnd': return 'Modern Living';
                              case 'Fourth Ward': return 'Historic Charm';
                              case 'Dilworth': return 'Historic Charm';
                              case 'NoDa': return 'Arts District';
                              case 'Plaza Midwood': return 'Creative Hub';
                              default: return 'Explore';
                            }
                          };
                          return (
                            <span className="bg-blue-600/80 backdrop-blur-sm px-3 py-1.5 rounded font-semibold text-white border border-white/20">
                              {getNeighborhoodTag(neighborhood.name)}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Section separator */}
        <div className="max-w-4xl mx-auto mt-12">
          <hr className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
}

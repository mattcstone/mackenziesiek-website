import { useState } from "react";
import { MapPin, Star, Coffee, ShoppingBag, GraduationCap, Trees, Car, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Amenity {
  id: number;
  name: string;
  category: "restaurant" | "shopping" | "school" | "park" | "coffee" | "gym" | "transit";
  rating: number;
  address: string;
  distance: string;
  description: string;
  priceLevel?: "$" | "$$" | "$$$" | "$$$$";
  hours?: string;
  phone?: string;
}

interface NeighborhoodAmenitiesMapProps {
  neighborhoodSlug: string;
}

export default function NeighborhoodAmenitiesMap({ neighborhoodSlug }: NeighborhoodAmenitiesMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  // Curated authentic Charlotte neighborhood amenities
  const getAmenitiesForNeighborhood = (slug: string): Amenity[] => {
    // Amenities will be populated from authentic business data sources like Google Places API
    return [];
  };

  const amenities = getAmenitiesForNeighborhood(neighborhoodSlug);

  const categories = [
    { id: "all", label: "All", icon: MapPin, count: amenities.length },
    { id: "restaurant", label: "Dining", icon: Utensils, count: amenities.filter(a => a.category === "restaurant").length },
    { id: "coffee", label: "Coffee", icon: Coffee, count: amenities.filter(a => a.category === "coffee").length },
    { id: "shopping", label: "Shopping", icon: ShoppingBag, count: amenities.filter(a => a.category === "shopping").length },
    { id: "park", label: "Parks", icon: Trees, count: amenities.filter(a => a.category === "park").length },
    { id: "school", label: "Schools", icon: GraduationCap, count: amenities.filter(a => a.category === "school").length },
    { id: "transit", label: "Transit", icon: Car, count: amenities.filter(a => a.category === "transit").length },
  ];

  const filteredAmenities = selectedCategory === "all" 
    ? amenities 
    : amenities.filter(amenity => amenity.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "restaurant": return Utensils;
      case "coffee": return Coffee;
      case "shopping": return ShoppingBag;
      case "park": return Trees;
      case "school": return GraduationCap;
      case "transit": return Car;
      default: return MapPin;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Local Amenities & Attractions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes this neighborhood special - from top-rated restaurants to parks, schools, and local favorites
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
                className="flex items-center gap-2"
              >
                <IconComponent className="h-4 w-4" />
                {category.label}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Amenities List */}
          <div className="lg:col-span-2">
            <div className="grid gap-4">
              {filteredAmenities.map((amenity) => {
                const IconComponent = getCategoryIcon(amenity.category);
                return (
                  <Card 
                    key={amenity.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedAmenity?.id === amenity.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedAmenity(amenity)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
                            <div className="flex items-center gap-2">
                              {amenity.priceLevel && (
                                <Badge variant="outline">{amenity.priceLevel}</Badge>
                              )}
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{amenity.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{amenity.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {amenity.distance}
                            </span>
                            <span>{amenity.address}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>
                  {selectedAmenity ? selectedAmenity.name : "Select a Location"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedAmenity ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const IconComponent = getCategoryIcon(selectedAmenity.category);
                        return <IconComponent className="h-5 w-5 text-blue-600" />;
                      })()}
                      <Badge variant="secondary">
                        {selectedAmenity.category.charAt(0).toUpperCase() + selectedAmenity.category.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedAmenity.rating} stars</span>
                        {selectedAmenity.priceLevel && (
                          <Badge variant="outline">{selectedAmenity.priceLevel}</Badge>
                        )}
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">Description</div>
                        <p className="text-sm text-gray-600">{selectedAmenity.description}</p>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">Address</div>
                        <p className="text-sm text-gray-600">{selectedAmenity.address}</p>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">Distance</div>
                        <p className="text-sm text-gray-600">{selectedAmenity.distance} away</p>
                      </div>

                      {selectedAmenity.hours && (
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Hours</div>
                          <p className="text-sm text-gray-600">{selectedAmenity.hours}</p>
                        </div>
                      )}

                      {selectedAmenity.phone && (
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Phone</div>
                          <p className="text-sm text-gray-600">{selectedAmenity.phone}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full" size="sm">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click on any location above to see detailed information, ratings, and contact details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
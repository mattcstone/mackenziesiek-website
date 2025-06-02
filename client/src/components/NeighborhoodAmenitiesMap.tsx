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
    const amenityData: Record<string, Amenity[]> = {
      "uptown": [
        { id: 1, name: "The Manchester", category: "restaurant", rating: 4.6, address: "201 S College St", distance: "0.2 mi", description: "Upscale American dining with city views", priceLevel: "$$$", hours: "5PM-10PM", phone: "(704) 372-4468" },
        { id: 2, name: "First Ward Park", category: "park", rating: 4.4, address: "301 E 7th St", distance: "0.3 mi", description: "Urban park with walking trails and skyline views" },
        { id: 3, name: "EpiCentre", category: "shopping", rating: 4.1, address: "210 E Trade St", distance: "0.1 mi", description: "Entertainment complex with shops, restaurants, and nightlife" },
        { id: 4, name: "CTC Transit Center", category: "transit", rating: 4.0, address: "310 E Trade St", distance: "0.2 mi", description: "Major transit hub with light rail and bus connections" },
        { id: 5, name: "Not Just Coffee", category: "coffee", rating: 4.5, address: "123 S Tryon St", distance: "0.1 mi", description: "Local coffee roaster with artisan pastries", priceLevel: "$$" }
      ],
      "southend": [
        { id: 6, name: "Fahrenheit", category: "restaurant", rating: 4.7, address: "620 S Tryon St", distance: "0.1 mi", description: "Rooftop dining with panoramic city views", priceLevel: "$$$$", hours: "5PM-11PM" },
        { id: 7, name: "The Rail Trail", category: "park", rating: 4.5, address: "Along light rail line", distance: "0.0 mi", description: "Greenway trail perfect for walking and biking" },
        { id: 8, name: "South End Brewery District", category: "shopping", rating: 4.3, address: "Multiple locations", distance: "0.2 mi", description: "Cluster of craft breweries and trendy shops" },
        { id: 9, name: "New Bern Station", category: "transit", rating: 4.2, address: "1520 South Blvd", distance: "0.1 mi", description: "Light rail station with direct access to Uptown" },
        { id: 10, name: "Undercurrent Coffee", category: "coffee", rating: 4.6, address: "1500 South Blvd", distance: "0.2 mi", description: "Specialty coffee with local art gallery", priceLevel: "$$" }
      ],
      "dilworth": [
        { id: 11, name: "Good Food on Montford", category: "restaurant", rating: 4.5, address: "1701 Montford Dr", distance: "0.3 mi", description: "Farm-to-table dining in historic setting", priceLevel: "$$$" },
        { id: 12, name: "Freedom Park", category: "park", rating: 4.7, address: "1908 East Blvd", distance: "0.2 mi", description: "98-acre park with lake, trails, and sports facilities" },
        { id: 13, name: "East Boulevard Shopping", category: "shopping", rating: 4.2, address: "East Boulevard", distance: "0.1 mi", description: "Local boutiques and specialty shops" },
        { id: 14, name: "Alexander Graham Middle", category: "school", rating: 4.3, address: "1501 Sardis Rd N", distance: "0.8 mi", description: "Highly-rated public middle school" },
        { id: 15, name: "Summit Coffee", category: "coffee", rating: 4.4, address: "128 Summit Ave", distance: "0.4 mi", description: "Neighborhood coffee shop with outdoor seating", priceLevel: "$" }
      ],
      "plaza-midwood": [
        { id: 16, name: "Hawkers Asian Street Food", category: "restaurant", rating: 4.4, address: "1200 Central Ave", distance: "0.2 mi", description: "Vibrant Asian street food in eclectic setting", priceLevel: "$$" },
        { id: 17, name: "The Evening Muse", category: "restaurant", rating: 4.3, address: "3227 N Davidson St", distance: "0.3 mi", description: "Live music venue with craft cocktails", priceLevel: "$$" },
        { id: 18, name: "Central Avenue Corridor", category: "shopping", rating: 4.1, address: "Central Avenue", distance: "0.1 mi", description: "Vintage shops, galleries, and local businesses" },
        { id: 19, name: "The Plaza", category: "park", rating: 4.0, address: "1525 Central Ave", distance: "0.2 mi", description: "Community green space with farmers market" },
        { id: 20, name: "Amélie's French Bakery", category: "coffee", rating: 4.6, address: "2424 N Davidson St", distance: "0.4 mi", description: "24-hour French bakery and café", priceLevel: "$$" }
      ],
      "myers-park": [
        { id: 21, name: "The Capital Grille", category: "restaurant", rating: 4.5, address: "201 N Tryon St", distance: "1.2 mi", description: "Upscale steakhouse with extensive wine list", priceLevel: "$$$$" },
        { id: 22, name: "Freedom Park", category: "park", rating: 4.7, address: "1908 East Blvd", distance: "0.5 mi", description: "Premier Charlotte park with lake and trails" },
        { id: 23, name: "Phillips Place", category: "shopping", rating: 4.2, address: "6805 Phillips Pl Ct", distance: "1.8 mi", description: "Upscale shopping with boutiques and dining" },
        { id: 24, name: "Myers Park High School", category: "school", rating: 4.6, address: "2400 Colony Rd", distance: "0.8 mi", description: "Top-rated public high school" },
        { id: 25, name: "Not Just Coffee", category: "coffee", rating: 4.5, address: "1403 East Blvd", distance: "0.6 mi", description: "Local roaster with community atmosphere", priceLevel: "$$" }
      ],
      "noda": [
        { id: 26, name: "Haberdash", category: "restaurant", rating: 4.5, address: "3106 N Davidson St", distance: "0.1 mi", description: "Modern Southern cuisine in trendy setting", priceLevel: "$$$" },
        { id: 27, name: "NoDa Brewing Company", category: "restaurant", rating: 4.4, address: "2921 N Tryon St", distance: "0.2 mi", description: "Local brewery with food trucks and events", priceLevel: "$$" },
        { id: 28, name: "North Davidson Arts District", category: "shopping", rating: 4.3, address: "N Davidson St", distance: "0.1 mi", description: "Art galleries, studios, and unique shops" },
        { id: 29, name: "Villa Heights Park", category: "park", rating: 4.1, address: "1300 Berryhill Rd", distance: "0.7 mi", description: "Community park with playground and sports courts" },
        { id: 30, name: "Smelly Cat Coffee", category: "coffee", rating: 4.4, address: "3107 N Davidson St", distance: "0.1 mi", description: "Local favorite with live music and art", priceLevel: "$" }
      ],
      "fourth-ward": [
        { id: 31, name: "5Church Charlotte", category: "restaurant", rating: 4.4, address: "127 N Tryon St", distance: "0.4 mi", description: "Contemporary American in historic church", priceLevel: "$$$" },
        { id: 32, name: "Fourth Ward Park", category: "park", rating: 4.3, address: "301 N Poplar St", distance: "0.1 mi", description: "Historic neighborhood park with walking paths" },
        { id: 33, name: "7th Street Public Market", category: "shopping", rating: 4.0, address: "224 E 7th St", distance: "0.3 mi", description: "Local market with food vendors and shops" },
        { id: 34, name: "Alexander Graham Middle", category: "school", rating: 4.3, address: "1501 Sardis Rd N", distance: "2.1 mi", description: "Highly-rated CMS middle school" },
        { id: 35, name: "Caribou Coffee", category: "coffee", rating: 4.1, address: "100 N Tryon St", distance: "0.5 mi", description: "National chain with consistent quality", priceLevel: "$$" }
      ],
      "lake-norman": [
        { id: 36, name: "Dressler's Restaurant", category: "restaurant", rating: 4.6, address: "120 Lighthouse Way", distance: "2.1 mi", description: "Upscale lakefront dining with seasonal menu", priceLevel: "$$$$" },
        { id: 37, name: "Lake Norman State Park", category: "park", rating: 4.8, address: "159 Inland Sea Ln", distance: "8.2 mi", description: "Large state park with swimming, hiking, and camping" },
        { id: 38, name: "Birkdale Village", category: "shopping", rating: 4.4, address: "8712 Lindholm Dr", distance: "5.3 mi", description: "Outdoor lifestyle shopping with dining and entertainment" },
        { id: 39, name: "North Mecklenburg High", category: "school", rating: 4.4, address: "11201 Verhoeff Dr", distance: "3.8 mi", description: "Top-rated public high school" },
        { id: 40, name: "Starbucks", category: "coffee", rating: 4.2, address: "Multiple locations", distance: "1.5 mi", description: "National coffee chain with lake area locations", priceLevel: "$$" }
      ]
    };

    return amenityData[slug] || [];
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
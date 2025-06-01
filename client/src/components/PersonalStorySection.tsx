import { Home, Users, Mountain, Handshake, MapPin, Coffee, Utensils, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent } from "@shared/schema";

interface PersonalStorySectionProps {
  agent: Agent;
}

export default function PersonalStorySection({ agent }: PersonalStorySectionProps) {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your In-Town Charlotte Expert
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Charlotte native turned luxury real estate specialist with a unique story. I grew up touring model homes with 
                my builder dad and was a competitive equestrian for 10 years. With my UNC Charlotte finance degree and 
                refined eye for design, I bring sophistication to every transaction. When I'm off the clock, you'll find me 
                browsing farmers markets, hiking trails, or at 300 East — my favorite refined dining spot in Charlotte.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Home className="h-8 w-8 text-black mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">In-Town Specialist</h3>
                  <p className="text-gray-600 text-sm">Expert in SouthEnd, NoDa, Dilworth & Plaza Midwood</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-black mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Professional Focus</h3>
                  <p className="text-gray-600 text-sm">I understand what discerning buyers want in lifestyle and location</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Mountain className="h-8 w-8 text-black mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">City Lifestyle</h3>
                  <p className="text-gray-600 text-sm">Know the best restaurants, bars, and entertainment venues</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Handshake className="h-8 w-8 text-black mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Luxury Home Specialist</h3>
                  <p className="text-gray-600 text-sm">Curating exceptional properties for discerning clientele</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Personal Details Section */}
            <div className="mt-12 bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get to Know Mackenzie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Favorite Charlotte Restaurant</h4>
                  <p className="text-gray-600 text-sm">300 East - It's such a cozy, charming spot with incredible food.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Weekend Vibes</h4>
                  <p className="text-gray-600 text-sm">I'm all about farmers markets, a stroll on the rail trail, and catching a football game whenever I can.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Favorite Thing About Charlotte</h4>
                  <p className="text-gray-600 text-sm">There's always something new; whether it's a cool local coffee shop or a new restaurant opening, Charlotte keeps it fresh and exciting.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hobbies Outside of Real Estate</h4>
                  <p className="text-gray-600 text-sm">I love interior design, traveling the world and visiting the NC mountains.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fun Fact</h4>
                  <p className="text-gray-600 text-sm">I was a competitive equestrian for 10 years! Horses were a huge part of my life growing up.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Why Real Estate?</h4>
                  <p className="text-gray-600 text-sm">Growing up touring model homes with my builder dad sparked my passion for helping people find their perfect home.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <img 
                src="/assets/mackenzie-headshot.jpg" 
                alt="Mackenzie Siek headshot" 
                className="w-full h-auto"
              />
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">My Charlotte Favorites</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <MapPin className="text-black w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Specialty Areas: {agent.favoriteNeighborhood || "SouthEnd & NoDa"}</span>
                  </li>
                  <li className="flex items-center">
                    <Coffee className="text-black w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Coffee Fix: {agent.favoriteSpot || "Not Just Coffee"}</span>
                  </li>
                  <li className="flex items-center">
                    <Utensils className="text-black w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Dinner Spot: {agent.favoriteRestaurant || "Superica"}</span>
                  </li>
                  <li className="flex items-center">
                    <Activity className="text-black w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Passion: {agent.hobby || "Exploring Charlotte's food scene"}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

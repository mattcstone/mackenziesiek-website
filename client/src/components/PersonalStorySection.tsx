import { Home, Users, Mountain, Handshake, MapPin, Coffee, Utensils, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent } from "@shared/schema";

interface PersonalStorySectionProps {
  agent: Agent;
}

export default function PersonalStorySection({ agent }: PersonalStorySectionProps) {
  return (
    <section id="about" className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight hover:text-black transition-colors duration-300">
                Charlotte Market Insights & Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Navigate Charlotte's competitive real estate market with confidence. I provide comprehensive market analysis, 
                exclusive property access, and personalized strategies tailored to your investment goals. From first-time buyers 
                to luxury investors, I deliver results through deep local knowledge and strategic negotiation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Home className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">Market Analysis</h3>
                    <p className="text-gray-600 text-sm">Comprehensive neighborhood pricing & trend reports</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">Buyer Representation</h3>
                    <p className="text-gray-600 text-sm">Strategic negotiation & exclusive property access</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Mountain className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">Seller Services</h3>
                    <p className="text-gray-600 text-sm">Professional staging, pricing & marketing strategy</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Handshake className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">Investment Consulting</h3>
                    <p className="text-gray-600 text-sm">Portfolio growth & rental property guidance</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Personal Details Section - Compact with animations */}
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Get to Know Mackenzie</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Utensils className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Favorite Restaurant</h4>
                  <p className="text-gray-300 text-sm">300 East</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Coffee className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Weekend Vibes</h4>
                  <p className="text-gray-300 text-sm">Farmers markets & rail trail</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Mountain className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Hobbies</h4>
                  <p className="text-gray-300 text-sm">Interior design & travel</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Fun Fact</h4>
                  <p className="text-gray-300 text-sm">Competitive equestrian</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Home className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Why Real Estate?</h4>
                  <p className="text-gray-300 text-sm">Builder dad inspiration</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Handshake className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Education</h4>
                  <p className="text-gray-300 text-sm">UNC Charlotte Finance</p>
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

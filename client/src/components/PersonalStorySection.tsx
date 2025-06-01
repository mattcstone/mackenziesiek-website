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
                I'm a Charlotte native who knows the pulse of this city. When I'm not helping young professionals 
                find their perfect in-town home, you'll find me exploring Charlotte's incredible restaurant scene, 
                catching Panthers games, or discovering the latest brewery in NoDa.
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
                  <h3 className="font-semibold text-gray-900 mb-2">Young Professional Focus</h3>
                  <p className="text-gray-600 text-sm">I understand what young buyers want in lifestyle and location</p>
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
                  <h3 className="font-semibold text-gray-900 mb-2">First-Time Buyer Expert</h3>
                  <p className="text-gray-600 text-sm">Guiding you through every step of your first home purchase</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Family photo at local Charlotte park" 
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

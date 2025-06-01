import { Home, Users, Mountain, Handshake, MapPin, Coffee, Utensils, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent } from "@shared/schema";

interface PersonalStorySectionProps {
  agent: Agent;
}

export default function PersonalStorySection({ agent }: PersonalStorySectionProps) {
  return (
    <section id="about" className="py-16 lg:py-24 bg-stone-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                More Than Just Your Agent
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm a Charlotte native, mother of two amazing kids, and an active member of{" "}
                <span className="font-semibold">{agent.church || "Myers Park Methodist Church"}</span>. 
                When I'm not helping clients, you'll find me hiking the U.S. National Whitewater Center trails 
                or cheering on the Panthers!
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Home className="h-8 w-8 text-stone-blue mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Local Expert</h3>
                  <p className="text-gray-600 text-sm">Born and raised in Charlotte with deep neighborhood knowledge</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-stone-blue mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Family Focused</h3>
                  <p className="text-gray-600 text-sm">I understand what families need in a home and community</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Mountain className="h-8 w-8 text-stone-blue mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Active Lifestyle</h3>
                  <p className="text-gray-600 text-sm">Love outdoor activities and know the best local spots</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Handshake className="h-8 w-8 text-stone-blue mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Community Member</h3>
                  <p className="text-gray-600 text-sm">Active in local organizations and school events</p>
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
                <h3 className="font-semibold text-gray-900 mb-3">Quick Facts About Me</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <MapPin className="text-stone-blue w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Favorite Area: {agent.favoriteNeighborhood || "Myers Park & Dilworth"}</span>
                  </li>
                  <li className="flex items-center">
                    <Coffee className="text-stone-blue w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Go-to Coffee: {agent.favoriteSpot || "Undercurrent Coffee"}</span>
                  </li>
                  <li className="flex items-center">
                    <Utensils className="text-stone-blue w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Best Local Eats: {agent.favoriteRestaurant || "The Optimist"}</span>
                  </li>
                  <li className="flex items-center">
                    <Activity className="text-stone-blue w-5 h-5 mr-3 flex-shrink-0" />
                    <span>Weekend Activity: {agent.hobby || "Trail Running"}</span>
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

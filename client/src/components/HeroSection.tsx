import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Agent } from "@shared/schema";

interface HeroSectionProps {
  agent: Agent;
}

export default function HeroSection({ agent }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <a 
              href="#testimonials" 
              className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 text-sm hover:bg-white/20 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Star className="text-yellow-400 mr-2 h-4 w-4" />
              <span>5-Star Agent in Charlotte</span>
            </a>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your Guide to
              <span className="text-gray-300"> In-Town Charlotte</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              {agent.bio}
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg">
                <a href="#search">Access Listings</a>
              </Button>
              <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700 font-semibold px-6 py-3 rounded-lg shadow-lg">
                <a href="#contact">Your Home's Value</a>
              </Button>
              <Button asChild size="sm" className="bg-green-600 text-white hover:bg-green-700 font-semibold px-6 py-3 rounded-lg shadow-lg">
                <a href="#contact">Schedule Consultation</a>
              </Button>
              <Button asChild size="sm" className="bg-pink-600 text-white hover:bg-pink-700 font-semibold px-6 py-3 rounded-lg shadow-lg">
                <a href="#about">4+ Years Experience</a>
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.homesSold}+</div>
                <div className="text-sm text-gray-300">Homes Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.avgDaysOnMarket}</div>
                <div className="text-sm text-gray-300">Avg Days on Market</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.rating}★</div>
                <div className="text-sm text-gray-300">Client Rating</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              {agent.headshot ? (
                <img 
                  src={agent.headshot} 
                  alt={`${agent.firstName} ${agent.lastName} professional headshot`}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">Professional Photo Coming Soon</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                <div className="transform rotate-12 bg-white bg-opacity-95 px-8 py-4 rounded-lg shadow-2xl border">
                  <span className="text-gray-800 font-bold text-lg">Video Coming Soon</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-2xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <img src="/assets/stone-logo-black.png" alt="Stone Realty Group" className="w-10 h-10" />
                <div>
                  <div className="text-sm font-bold text-gray-900">Stone Realty Group</div>
                  <div className="text-xs text-gray-600 font-medium">Licensed in NC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

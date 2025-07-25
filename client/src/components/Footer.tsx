import { Facebook, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import type { Agent } from "@shared/schema";

interface FooterProps {
  agent: Agent;
}

export default function Footer({ agent }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <div className="text-2xl font-bold mb-6">{agent.firstName} {agent.lastName}</div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Your trusted Charlotte real estate expert, powered by Stone Realty Group.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                <Facebook className="h-8 w-8" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                <Instagram className="h-8 w-8" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                <Linkedin className="h-8 w-8" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <a href="tel:7046100959" className="hover:text-white transition-colors text-lg">(704) 610-0959</a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-lg">
                  <div>2459 Wilkinson Blvd STE 310</div>
                  <div>Charlotte, NC 28208</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 lg:space-x-16 w-full">
              <img 
                src="/attached_assets/rectlogo.png" 
                alt="Stone Realty Group"
                className="h-12 sm:h-14 lg:h-16 w-auto filter brightness-200 invert max-w-[200px] sm:max-w-none"
              />
              <img 
                src="/attached_assets/Logo_Black@4x.png" 
                alt="The Stone Selling System"
                className="h-12 sm:h-14 lg:h-16 w-auto filter brightness-200 invert max-w-[200px] sm:max-w-none"
              />
            </div>
            <div className="text-gray-400 text-center max-w-4xl">
              <p className="text-base leading-relaxed">
                Equal Housing Opportunity. The "Stone Selling System," "Stone Realty Group," and the stylized hexagon "O" logo are Registered Trademarks of Stone Realty Group. All Rights Reserved. © Copyright 2024 | <a href="#" className="text-white hover:underline font-medium">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

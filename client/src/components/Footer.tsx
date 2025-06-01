import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { Agent } from "@shared/schema";

interface FooterProps {
  agent: Agent;
}

export default function Footer({ agent }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
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
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#about" className="hover:text-white transition-colors text-lg">About Me</a></li>
              <li><a href="#neighborhoods" className="hover:text-white transition-colors text-lg">My Areas</a></li>
              <li><a href="#search" className="hover:text-white transition-colors text-lg">Search Homes</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors text-lg">Local Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors text-lg">Buyer Representation</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-lg">Seller Representation</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-lg">Home Valuation</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-lg">Investment Properties</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-16">
              <img 
                src="/attached_assets/rectlogo.png" 
                alt="Stone Realty Group"
                className="h-20 w-auto filter brightness-90"
              />
              <img 
                src="/attached_assets/Logo_Black@4x.png" 
                alt="The Stone Selling System"
                className="h-20 w-auto filter brightness-90"
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

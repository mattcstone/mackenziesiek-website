import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  agentName?: string;
}

export default function Header({ agentName = "Sarah Johnson" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-stone-blue font-bold text-xl hover:text-blue-800 transition-colors">
              {agentName}
            </Link>
            <div className="hidden sm:block text-stone-slate text-sm">
              Powered by Stone Realty Group
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-stone-blue transition-colors">
              About Me
            </a>
            <a href="#neighborhoods" className="text-gray-700 hover:text-stone-blue transition-colors">
              My Areas
            </a>
            <a href="#search" className="text-gray-700 hover:text-stone-blue transition-colors">
              Search Homes
            </a>
            <a href="#guides" className="text-gray-700 hover:text-stone-blue transition-colors">
              Local Guides
            </a>
            <a href="#contact" className="bg-stone-blue text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Contact
            </a>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-stone-blue transition-colors">
                About Me
              </a>
              <a href="#neighborhoods" className="block px-3 py-2 text-gray-700 hover:text-stone-blue transition-colors">
                My Areas
              </a>
              <a href="#search" className="block px-3 py-2 text-gray-700 hover:text-stone-blue transition-colors">
                Search Homes
              </a>
              <a href="#guides" className="block px-3 py-2 text-gray-700 hover:text-stone-blue transition-colors">
                Local Guides
              </a>
              <a href="#contact" className="block px-3 py-2 bg-stone-blue text-white rounded-lg text-center mx-3 hover:bg-blue-800 transition-colors">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

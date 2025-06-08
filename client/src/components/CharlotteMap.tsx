import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Zap, ExternalLink, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Neighborhood {
  id: number;
  name: string;
  slug: string;
  avgPrice?: string;
  walkScore?: number;
  type?: string;
}

interface CharlotteMapProps {
  neighborhoods: Neighborhood[];
  onNeighborhoodSelect?: (neighborhood: Neighborhood) => void;
}

const zoneColors = {
  urban: "#3b82f6",
  historic: "#8b5cf6", 
  south: "#10b981",
  university: "#f59e0b",
  north: "#06b6d4",
  east: "#ef4444",
  west: "#eab308",
  default: "#6b7280"
};

export default function CharlotteMap({ neighborhoods, onNeighborhoodSelect }: CharlotteMapProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleNeighborhoodClick = (neighborhood: Neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    onNeighborhoodSelect?.(neighborhood);
  };

  return (
    <div className="relative">
      {/* Google Maps Embed with Custom Styling */}
      <div className={`relative rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
        <div className="relative w-full h-96">
          {/* Professional Google Maps Iframe */}
          <iframe
            ref={mapRef}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208512.84838736534!2d-81.06411647656249!3d35.22709840161869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0x884650e6bf43d164!2sCharlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1704891234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
          
          {/* Overlay with neighborhood controls */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Enhanced Legend */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border pointer-events-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-gray-800">Charlotte Areas</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 h-6 w-6"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full border border-white shadow-sm" style={{backgroundColor: zoneColors.urban}}></div>
                  <span className="text-gray-700">Urban Core</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full border border-white shadow-sm" style={{backgroundColor: zoneColors.historic}}></div>
                  <span className="text-gray-700">Historic Districts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full border border-white shadow-sm" style={{backgroundColor: zoneColors.south}}></div>
                  <span className="text-gray-700">South Charlotte</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full border border-white shadow-sm" style={{backgroundColor: zoneColors.university}}></div>
                  <span className="text-gray-700">University Area</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full border border-white shadow-sm" style={{backgroundColor: zoneColors.north}}></div>
                  <span className="text-gray-700">Lake Norman</span>
                </div>
              </div>
            </div>

            {/* Neighborhood Quick Access Panel */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border pointer-events-auto max-w-xs">
              <div className="p-4">
                <h4 className="font-bold text-sm text-gray-800 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Popular Areas
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {neighborhoods.slice(0, 6).map((neighborhood) => (
                    <button
                      key={neighborhood.id}
                      onClick={() => handleNeighborhoodClick(neighborhood)}
                      className="text-left p-2 rounded bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <div className="font-medium">{neighborhood.name}</div>
                      <div className="text-gray-500">{neighborhood.avgPrice}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsFullscreen(false)} />
      )}
      
      {/* Selected Neighborhood Info Panel */}
      {selectedNeighborhood && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-xl text-gray-800">{selectedNeighborhood.name}</h3>
                <Badge variant="outline" className="bg-white/80">{selectedNeighborhood.type}</Badge>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Avg Price:</span>
                  <span className="font-semibold text-blue-700">{selectedNeighborhood.avgPrice || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Walk Score:</span>
                  <span className="font-semibold text-green-700">{selectedNeighborhood.walkScore || 'N/A'}</span>
                </div>
              </div>
            </div>
            <Link href={`/neighborhood/${selectedNeighborhood.slug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
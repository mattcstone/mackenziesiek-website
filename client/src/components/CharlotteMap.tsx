import { useState } from "react";
import { MapPin, Navigation, Zap, ExternalLink } from "lucide-react";
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

// Charlotte neighborhood coordinates for positioning on our styled map
const neighborhoodCoordinates: Record<string, { x: number; y: number; zone: string }> = {
  // Urban Core - Center of Charlotte
  "uptown": { x: 50, y: 50, zone: "urban" },
  "fourth-ward": { x: 48, y: 47, zone: "urban" },
  "southend": { x: 52, y: 58, zone: "urban" },
  "noda": { x: 58, y: 38, zone: "urban" },
  "plaza-midwood": { x: 62, y: 45, zone: "urban" },
  "dilworth": { x: 45, y: 55, zone: "historic" },
  "optimist-park": { x: 56, y: 40, zone: "urban" },
  
  // Historic Areas
  "myers-park": { x: 42, y: 58, zone: "historic" },
  "eastover": { x: 40, y: 62, zone: "historic" },
  "elizabeth": { x: 54, y: 47, zone: "historic" },
  "chantilly": { x: 50, y: 52, zone: "historic" },
  "sedgefield": { x: 46, y: 56, zone: "historic" },
  
  // South Charlotte
  "ballantyne": { x: 48, y: 78, zone: "south" },
  "south-park": { x: 45, y: 68, zone: "south" },
  "pineville": { x: 42, y: 75, zone: "south" },
  "steele-creek": { x: 35, y: 70, zone: "south" },
  "weddington": { x: 68, y: 75, zone: "south" },
  
  // University Area
  "university-city": { x: 75, y: 32, zone: "university" },
  "university-area": { x: 77, y: 35, zone: "university" },
  
  // North/Lake Norman
  "davidson": { x: 40, y: 18, zone: "north" },
  "cornelius": { x: 42, y: 22, zone: "north" },
  "huntersville": { x: 45, y: 25, zone: "north" },
  "lake-norman": { x: 38, y: 15, zone: "north" },
  
  // East
  "matthews": { x: 75, y: 58, zone: "east" },
  "mint-hill": { x: 78, y: 52, zone: "east" },
  "indian-trail": { x: 82, y: 62, zone: "east" },
  "concord": { x: 85, y: 30, zone: "east" },
  
  // West
  "west-end": { x: 25, y: 48, zone: "west" },
  "belmont": { x: 20, y: 58, zone: "west" },
  "gastonia": { x: 15, y: 55, zone: "west" },
  "mountain-island-lake": { x: 22, y: 42, zone: "west" }
};

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
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null);

  const handleNeighborhoodClick = (neighborhood: Neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    onNeighborhoodSelect?.(neighborhood);
  };

  return (
    <div className="relative">
      {/* Professional Styled Map */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl border">
        {/* Map Background with Satellite-Style Gradient */}
        <div 
          className="w-full h-96 relative"
          style={{
            background: `
              linear-gradient(135deg, 
                #1a4b5c 0%, 
                #2d5a3d 25%, 
                #4a6741 50%, 
                #6b7d4f 75%, 
                #8b9364 100%
              )
            `
          }}
        >
          {/* Topographic-style overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 75px 75px, 100px 100px'
            }}
          />
          
          {/* Highway lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* I-77 (North-South) */}
            <line x1="48" y1="0" x2="52" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            {/* I-85 (Northeast-Southwest) */}
            <line x1="0" y1="20" x2="100" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            {/* I-485 (Outer loop) */}
            <ellipse cx="50" cy="50" rx="35" ry="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
          </svg>
          
          {/* Uptown center marker */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: '50%', top: '50%' }}
          >
            <div className="bg-white rounded-full p-2 shadow-lg border-2 border-blue-500">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/90 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
              Uptown Charlotte
            </div>
          </div>
          
          {/* Neighborhood markers */}
          {neighborhoods.map((neighborhood) => {
            const coords = neighborhoodCoordinates[neighborhood.slug];
            if (!coords) return null;
            
            const zone = coords.zone;
            const color = zoneColors[zone as keyof typeof zoneColors] || zoneColors.default;
            const isHovered = hoveredNeighborhood === neighborhood.slug;
            const isSelected = selectedNeighborhood?.id === neighborhood.id;
            
            return (
              <div
                key={neighborhood.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 z-10"
                style={{ 
                  left: `${coords.x}%`, 
                  top: `${coords.y}%`,
                  zIndex: isHovered || isSelected ? 30 : 10
                }}
                onClick={() => handleNeighborhoodClick(neighborhood)}
                onMouseEnter={() => setHoveredNeighborhood(neighborhood.slug)}
                onMouseLeave={() => setHoveredNeighborhood(null)}
              >
                <div 
                  className="w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all duration-200"
                  style={{ 
                    backgroundColor: color,
                    transform: isHovered || isSelected ? 'scale(1.5)' : 'scale(1)'
                  }}
                />
                {(isHovered || isSelected) && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap z-40">
                    {neighborhood.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Enhanced Legend */}
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border">
          <h4 className="font-bold text-sm mb-3 text-gray-800">Charlotte Areas</h4>
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

        {/* Map Controls */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border">
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Click neighborhoods to explore</span>
          </div>
        </div>
      </div>
      
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
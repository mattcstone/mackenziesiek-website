import { useState } from "react";
import { MapPin, Navigation, Zap } from "lucide-react";
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

// Charlotte neighborhood coordinates (approximate)
const neighborhoodCoordinates: Record<string, { x: number; y: number; zone: string }> = {
  // Urban Core
  "uptown": { x: 50, y: 45, zone: "urban" },
  "fourth-ward": { x: 48, y: 42, zone: "urban" },
  "southend": { x: 52, y: 55, zone: "urban" },
  "noda": { x: 55, y: 35, zone: "urban" },
  "plaza-midwood": { x: 58, y: 40, zone: "urban" },
  "dilworth": { x: 45, y: 48, zone: "historic" },
  "optimist-park": { x: 56, y: 38, zone: "urban" },
  
  // Historic Areas
  "myers-park": { x: 42, y: 55, zone: "historic" },
  "eastover": { x: 40, y: 58, zone: "historic" },
  "elizabeth": { x: 52, y: 42, zone: "historic" },
  "chantilly": { x: 50, y: 48, zone: "historic" },
  "sedgefield": { x: 46, y: 52, zone: "historic" },
  
  // South Charlotte
  "ballantyne": { x: 48, y: 75, zone: "south" },
  "south-park": { x: 45, y: 62, zone: "south" },
  "pineville": { x: 42, y: 70, zone: "south" },
  "steele-creek": { x: 35, y: 65, zone: "south" },
  "weddington": { x: 65, y: 72, zone: "south" },
  
  // University Area
  "university-city": { x: 70, y: 30, zone: "university" },
  "university-area": { x: 72, y: 32, zone: "university" },
  
  // North/Lake Norman
  "davidson": { x: 40, y: 15, zone: "north" },
  "cornelius": { x: 42, y: 18, zone: "north" },
  "huntersville": { x: 45, y: 20, zone: "north" },
  "lake-norman": { x: 38, y: 12, zone: "north" },
  
  // East
  "matthews": { x: 72, y: 55, zone: "east" },
  "mint-hill": { x: 75, y: 50, zone: "east" },
  "indian-trail": { x: 78, y: 58, zone: "east" },
  "concord": { x: 82, y: 35, zone: "east" },
  
  // West
  "west-end": { x: 25, y: 45, zone: "west" },
  "belmont": { x: 20, y: 55, zone: "west" },
  "gastonia": { x: 15, y: 50, zone: "west" },
  "mountain-island-lake": { x: 22, y: 40, zone: "west" }
};

const zoneColors = {
  urban: "bg-blue-500 border-blue-600",
  historic: "bg-purple-500 border-purple-600", 
  south: "bg-green-500 border-green-600",
  university: "bg-orange-500 border-orange-600",
  north: "bg-cyan-500 border-cyan-600",
  east: "bg-red-500 border-red-600",
  west: "bg-yellow-500 border-yellow-600",
  default: "bg-gray-500 border-gray-600"
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
      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-gray-200 overflow-hidden">
        {/* Map Background with Charlotte outline */}
        <svg viewBox="0 0 100 100" className="w-full h-96">
          {/* Charlotte metro area outline */}
          <path
            d="M20,20 L80,20 L85,25 L85,75 L80,80 L20,80 L15,75 L15,25 Z"
            fill="rgba(255,255,255,0.7)"
            stroke="#cbd5e1"
            strokeWidth="0.5"
          />
          
          {/* Major highways/roads */}
          <line x1="10" y1="50" x2="90" y2="50" stroke="#9ca3af" strokeWidth="0.3" opacity="0.6" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#9ca3af" strokeWidth="0.3" opacity="0.6" />
          <line x1="25" y1="25" x2="75" y2="75" stroke="#9ca3af" strokeWidth="0.2" opacity="0.4" />
          <line x1="75" y1="25" x2="25" y2="75" stroke="#9ca3af" strokeWidth="0.2" opacity="0.4" />
          
          {/* Uptown center marker */}
          <circle cx="50" cy="45" r="1.5" fill="#1f2937" opacity="0.8" />
          <text x="50" y="40" textAnchor="middle" fontSize="2.5" fill="#1f2937" fontWeight="bold">
            Uptown
          </text>
          
          {/* Neighborhood markers */}
          {neighborhoods.map((neighborhood) => {
            const coords = neighborhoodCoordinates[neighborhood.slug];
            if (!coords) return null;
            
            const zone = coords.zone;
            const colorClass = zoneColors[zone as keyof typeof zoneColors] || zoneColors.default;
            const isHovered = hoveredNeighborhood === neighborhood.slug;
            const isSelected = selectedNeighborhood?.id === neighborhood.id;
            
            return (
              <g key={neighborhood.id}>
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isHovered || isSelected ? "1.5" : "1"}
                  className={`${colorClass.split(' ')[0]} cursor-pointer transition-all duration-200`}
                  opacity={isHovered || isSelected ? "1" : "0.8"}
                  stroke="white"
                  strokeWidth="0.3"
                  onClick={() => handleNeighborhoodClick(neighborhood)}
                  onMouseEnter={() => setHoveredNeighborhood(neighborhood.slug)}
                  onMouseLeave={() => setHoveredNeighborhood(null)}
                />
                {(isHovered || isSelected) && (
                  <text
                    x={coords.x}
                    y={coords.y - 2.5}
                    textAnchor="middle"
                    fontSize="1.8"
                    fill="#1f2937"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {neighborhood.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
          <h4 className="font-semibold text-sm mb-2">Areas</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Urban Core</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Historic</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>South Charlotte</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>University</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span>North/Lake</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected Neighborhood Info */}
      {selectedNeighborhood && (
        <div className="mt-4 p-4 bg-white rounded-lg border shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg">{selectedNeighborhood.name}</h3>
                <Badge variant="outline">{selectedNeighborhood.type}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>Avg Price: {selectedNeighborhood.avgPrice || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Navigation className="h-4 w-4" />
                  <span>Walk Score: {selectedNeighborhood.walkScore || 'N/A'}</span>
                </div>
              </div>
            </div>
            <Link href={`/neighborhood/${selectedNeighborhood.slug}`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
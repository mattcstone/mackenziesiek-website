import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Home, DollarSign, Calendar, Ruler, MapPin, Eye, BarChart3 } from "lucide-react";
import type { Property } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface PropertyComparisonDashboardProps {
  agentId: number;
}

interface ComparisonSession {
  sessionId: string;
  properties: Property[];
}

export default function PropertyComparisonDashboard({ agentId }: PropertyComparisonDashboardProps) {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const queryClient = useQueryClient();

  // Fetch available properties
  const { data: properties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ['/api/agents', agentId, 'properties'],
    queryFn: async () => {
      const response = await fetch(`/api/agents/${agentId}/properties`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  // Fetch current comparison session
  const { data: comparisons = [] } = useQuery({
    queryKey: ['/api/property-comparisons', sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/property-comparisons/${sessionId}`);
      if (!response.ok) return [];
      return response.json();
    },
  });

  // Create comparison mutation
  const createComparisonMutation = useMutation({
    mutationFn: async (propertyIds: number[]) => {
      return apiRequest('/api/property-comparisons', 'POST', {
        sessionId,
        propertyIds,
        agentId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/property-comparisons', sessionId] });
    },
  });

  // Delete comparison mutation
  const deleteComparisonMutation = useMutation({
    mutationFn: async (comparisonId: number) => {
      return apiRequest(`/api/property-comparisons/${comparisonId}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/property-comparisons', sessionId] });
    },
  });

  const handlePropertySelect = (propertyId: number, checked: boolean) => {
    if (checked) {
      setSelectedProperties(prev => [...prev, propertyId]);
    } else {
      setSelectedProperties(prev => prev.filter(id => id !== propertyId));
    }
  };

  const handleStartComparison = () => {
    if (selectedProperties.length >= 2) {
      createComparisonMutation.mutate(selectedProperties);
      setComparisonMode(true);
    }
  };

  const handleClearComparison = () => {
    setSelectedProperties([]);
    setComparisonMode(false);
  };

  const getComparedProperties = () => {
    if (comparisons.length === 0) return [];
    const latestComparison = comparisons[0];
    return properties.filter(property => 
      latestComparison.propertyIds.includes(property.id)
    );
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const formatSquareFootage = (sqft: number) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const comparedProperties = getComparedProperties();

  if (propertiesLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Property Comparison Dashboard</h2>
          <p className="text-gray-600 mt-2">Select properties to compare side-by-side</p>
        </div>
        <div className="flex gap-2">
          {selectedProperties.length >= 2 && !comparisonMode && (
            <Button onClick={handleStartComparison} className="bg-black text-white hover:bg-gray-800">
              <BarChart3 className="mr-2 h-4 w-4" />
              Compare ({selectedProperties.length})
            </Button>
          )}
          {(selectedProperties.length > 0 || comparisonMode) && (
            <Button variant="outline" onClick={handleClearComparison}>
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {comparisonMode && comparedProperties.length > 0 ? (
        // Comparison View
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <span className="text-lg font-semibold">Comparing {comparedProperties.length} Properties</span>
          </div>
          
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-max">
              {comparedProperties.map((property) => (
                <Card key={property.id} className="w-80 flex-shrink-0">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{property.address}</CardTitle>
                      <Badge variant="secondary">{property.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {property.images && property.images.length > 0 && (
                      <img 
                        src={property.images[0]} 
                        alt={property.address}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-xl text-green-600">
                          {formatPrice(property.price)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4 text-gray-500" />
                          <span>{property.bedrooms} bed / {property.bathrooms} bath</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Ruler className="h-4 w-4 text-gray-500" />
                          <span>{formatSquareFootage(property.squareFootage || 0)} sqft</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Built {property.yearBuilt}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{property.propertyType}</span>
                        </div>
                      </div>

                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price per sqft:</span>
                          <span className="font-medium">
                            ${Math.round(parseFloat(property.price) / (property.squareFootage || 1))}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Days on market:</span>
                          <span className="font-medium">{property.daysOnMarket || 0} days</span>
                        </div>
                        {property.lotSize && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Lot size:</span>
                            <span className="font-medium">{property.lotSize} acres</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Property Selection View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedProperties.includes(property.id)}
                      onCheckedChange={(checked) => 
                        handlePropertySelect(property.id, checked as boolean)
                      }
                    />
                    <CardTitle className="text-lg">{property.address}</CardTitle>
                  </div>
                  <Badge variant="secondary">{property.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {property.images && property.images.length > 0 && (
                  <img 
                    src={property.images[0]} 
                    alt={property.address}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-xl text-green-600">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>{property.bedrooms} bed / {property.bathrooms} bath</span>
                    <span>{formatSquareFootage(property.squareFootage || 0)} sqft</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {properties.length === 0 && (
        <Card className="p-8 text-center">
          <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Available</h3>
          <p className="text-gray-600 mb-4">Properties will appear here once they are added to your listings.</p>
        </Card>
      )}
    </div>
  );
}
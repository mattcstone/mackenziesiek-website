import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Users, 
  MapPin, 
  Building,
  Calendar,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart,
  Activity,
  Zap,
  Star,
  Award,
  Filter,
  Search,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface MarketInsightsInfographicProps {
  className?: string;
}

export default function MarketInsightsInfographic({ className }: MarketInsightsInfographicProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'trends' | 'neighborhoods'>('overview');

  const quickStats = [
    { label: 'Avg Home Price', value: '$425,000', change: '+8.5%', trend: 'up', icon: DollarSign },
    { label: 'Days on Market', value: '28 days', change: '-12%', trend: 'down', icon: Clock },
    { label: 'Active Listings', value: '1,247', change: '+5.2%', trend: 'up', icon: Home },
    { label: 'Price per Sq Ft', value: '$185', change: '+6.8%', trend: 'up', icon: Building }
  ];

  const neighborhoods = [
    { name: 'South End', medianPrice: '$485K', growth: '+12.3%', trend: 'up' },
    { name: 'NoDa', medianPrice: '$425K', growth: '+8.7%', trend: 'up' },
    { name: 'Dilworth', medianPrice: '$675K', growth: '+15.2%', trend: 'up' },
    { name: 'Plaza Midwood', medianPrice: '$395K', growth: '+6.4%', trend: 'up' }
  ];

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Charlotte Market Insights</h2>
        <p className="text-gray-600">Real-time data and trends for informed decisions</p>
      </div>

      {/* View Selector */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['overview', 'trends', 'neighborhoods'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === view
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Neighborhoods Overview */}
      {selectedView === 'neighborhoods' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {neighborhoods.map((neighborhood, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{neighborhood.name}</CardTitle>
                  <Badge variant="secondary">Hot Market</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Median Price</span>
                    <span className="font-semibold">{neighborhood.medianPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">YoY Growth</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-semibold">{neighborhood.growth}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Market Trends */}
      {selectedView === 'trends' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Price Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive price trend chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Market Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <PieChartIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Market activity breakdown</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overview Summary */}
      {selectedView === 'overview' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Market Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The Charlotte real estate market continues to show strong performance with steady price growth 
                and healthy inventory levels. Key neighborhoods like South End and Dilworth are experiencing 
                particularly strong demand, while overall market conditions remain favorable for both buyers and sellers.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
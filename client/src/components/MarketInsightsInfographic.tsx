import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
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
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  description: string;
}

const marketMetrics: MarketMetric[] = [
  {
    title: 'Median Home Price',
    value: '$425,000',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
    description: 'Charlotte metro area'
  },
  {
    title: 'Days on Market',
    value: '18 days',
    change: '-12%',
    trend: 'down',
    icon: Clock,
    description: 'Average time to sell'
  },
  {
    title: 'Active Listings',
    value: '2,850',
    change: '+5.1%',
    trend: 'up',
    icon: Home,
    description: 'Available properties'
  },
  {
    title: 'Homes Sold',
    value: '1,290',
    change: '+15.3%',
    trend: 'up',
    icon: Target,
    description: 'Last 30 days'
  }
];

const neighborhoodData = [
  { name: 'South Charlotte', price: 485000, sales: 285, growth: 12.5 },
  { name: 'Lake Norman', price: 520000, sales: 165, growth: 15.2 },
  { name: 'Uptown', price: 395000, sales: 95, growth: 8.7 },
  { name: 'NoDa', price: 285000, sales: 145, growth: 18.9 },
  { name: 'Ballantyne', price: 465000, sales: 125, growth: 10.3 }
];

const buyerDemographics = [
  { name: 'Corporate Relocations', value: 35, color: '#2563eb' },
  { name: 'Local Buyers', value: 28, color: '#3b82f6' },
  { name: 'First-Time Buyers', value: 22, color: '#60a5fa' },
  { name: 'Investors', value: 15, color: '#93c5fd' }
];

const monthlyTrends = [
  { month: 'Jan', price: 392000, volume: 1240 },
  { month: 'Feb', price: 398000, volume: 1180 },
  { month: 'Mar', price: 405000, volume: 1350 },
  { month: 'Apr', price: 415000, volume: 1420 },
  { month: 'May', price: 420000, volume: 1380 },
  { month: 'Jun', price: 425000, volume: 1290 }
];

export default function MarketInsightsInfographic() {
  const [selectedView, setSelectedView] = useState<'overview' | 'neighborhoods' | 'trends'>('overview');

  const StatCard = ({ metric, index }: { metric: MarketMetric; index: number }) => {
    const IconComponent = metric.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${
                  metric.trend === 'up' ? 'bg-green-100' : 
                  metric.trend === 'down' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <IconComponent className={`h-4 w-4 ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : 'secondary'}
                  className="flex items-center gap-1"
                >
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {metric.change}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-sm font-medium text-gray-700">{metric.title}</p>
              <p className="text-xs text-gray-500">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Charlotte Market Insights</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real-time data and trends shaping Charlotte's dynamic real estate landscape
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center gap-2">
          {['overview', 'neighborhoods', 'trends'].map((view) => (
            <Button
              key={view}
              variant={selectedView === view ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView(view as any)}
              className="capitalize"
            >
              {view}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview View */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketMetrics.map((metric, index) => (
              <StatCard key={metric.title} metric={metric} index={index} />
            ))}
          </div>

          {/* Market Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Buyer Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={buyerDemographics}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {buyerDemographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {buyerDemographics.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Market Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Seller's Market</p>
                      <p className="text-sm text-green-700">High demand, limited inventory</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Corporate Growth</p>
                      <p className="text-sm text-blue-700">Major companies expanding to Charlotte</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Infrastructure Investment</p>
                      <p className="text-sm text-purple-700">Light rail expansion driving growth</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Neighborhoods View */}
      {selectedView === 'neighborhoods' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Top Performing Neighborhoods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={neighborhoodData}>
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Bar dataKey="price" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {neighborhoodData.map((neighborhood, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-gray-900">{neighborhood.name}</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      ${(neighborhood.price / 1000).toFixed(0)}K
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{neighborhood.sales} sales</span>
                      <Badge variant="outline" className="text-green-700">
                        +{neighborhood.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trends View */}
      {selectedView === 'trends' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                6-Month Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends}>
                    <XAxis dataKey="month" />
                    <YAxis 
                      yAxisId="price"
                      orientation="left"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      yAxisId="volume"
                      orientation="right"
                      tickFormatter={(value) => value.toString()}
                    />
                    <Area
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#colorGradient)"
                    />
                    <Line
                      yAxisId="volume"
                      type="monotone"
                      dataKey="volume"
                      stroke="#dc2626"
                      strokeWidth={2}
                      dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Median Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span>Sales Volume</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to Navigate Charlotte's Market?</h3>
            <p className="text-blue-100">
              Let our expert team guide you through Charlotte's dynamic real estate landscape with data-driven insights and local expertise.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
                Download Market Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
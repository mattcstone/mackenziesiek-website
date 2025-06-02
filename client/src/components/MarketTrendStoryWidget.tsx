import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, MapPin, DollarSign, Clock, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketStory {
  id: string;
  title: string;
  period: string;
  location: string;
  narrative: string;
  keyMetric: {
    value: string;
    change: string;
    trend: 'up' | 'down' | 'stable';
  };
  data: Array<{
    month: string;
    value: number;
    homes: number;
    days: number;
  }>;
  insights: string[];
  nextStory?: string;
}

const marketStories: MarketStory[] = [
  {
    id: 'charlotte-growth',
    title: 'Charlotte\'s Remarkable Growth Story',
    period: 'Last 6 Months',
    location: 'Greater Charlotte Metro',
    narrative: 'Charlotte continues to attract families and professionals from across the nation, driving consistent demand in our real estate market. The combination of strong job growth, excellent schools, and quality of life has created a compelling story for homebuyers.',
    keyMetric: {
      value: '$425,000',
      change: '+8.2%',
      trend: 'up'
    },
    data: [
      { month: 'Jan', value: 392000, homes: 1240, days: 32 },
      { month: 'Feb', value: 398000, homes: 1180, days: 28 },
      { month: 'Mar', value: 405000, homes: 1350, days: 25 },
      { month: 'Apr', value: 415000, homes: 1420, days: 22 },
      { month: 'May', value: 420000, homes: 1380, days: 18 },
      { month: 'Jun', value: 425000, homes: 1290, days: 15 }
    ],
    insights: [
      'Corporate relocations driving 35% of luxury home sales',
      'South Charlotte remains the most sought-after area',
      'New construction can\'t keep pace with demand'
    ],
    nextStory: 'luxury-market'
  },
  {
    id: 'luxury-market',
    title: 'Luxury Market Resilience',
    period: 'Current Quarter',
    location: 'South Charlotte & Lake Norman',
    narrative: 'The luxury segment ($750K+) shows remarkable strength, with executive relocations and local business growth fueling demand. Properties with unique features and prime locations are commanding premium prices.',
    keyMetric: {
      value: '$895,000',
      change: '+12.5%',
      trend: 'up'
    },
    data: [
      { month: 'Jan', value: 795000, homes: 85, days: 45 },
      { month: 'Feb', value: 820000, homes: 92, days: 42 },
      { month: 'Mar', value: 845000, homes: 78, days: 38 },
      { month: 'Apr', value: 865000, homes: 96, days: 35 },
      { month: 'May', value: 880000, homes: 88, days: 28 },
      { month: 'Jun', value: 895000, homes: 82, days: 22 }
    ],
    insights: [
      'Waterfront properties seeing 18% price appreciation',
      'Smart home features now expected standard',
      'Private schools proximity driving location premiums'
    ],
    nextStory: 'first-time-buyers'
  },
  {
    id: 'first-time-buyers',
    title: 'First-Time Buyer Opportunities',
    period: 'Emerging Trends',
    location: 'NoDa, Plaza Midwood & University Area',
    narrative: 'Despite market challenges, strategic opportunities exist for first-time buyers willing to consider emerging neighborhoods with strong growth potential and urban amenities.',
    keyMetric: {
      value: '$285,000',
      change: '+5.8%',
      trend: 'up'
    },
    data: [
      { month: 'Jan', value: 268000, homes: 320, days: 18 },
      { month: 'Feb', value: 272000, homes: 298, days: 16 },
      { month: 'Mar', value: 275000, homes: 285, days: 14 },
      { month: 'Apr', value: 278000, homes: 310, days: 12 },
      { month: 'May', value: 282000, homes: 295, days: 10 },
      { month: 'Jun', value: 285000, homes: 275, days: 8 }
    ],
    insights: [
      'Urban neighborhoods offering best value proposition',
      'Transit-oriented development creating opportunities',
      'Millennial buyers prioritizing walkability'
    ],
    nextStory: 'charlotte-growth'
  }
];

export default function MarketTrendStoryWidget() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'value' | 'homes' | 'days'>('value');

  const currentStory = marketStories[currentStoryIndex];

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % marketStories.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying]);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % marketStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + marketStories.length) % marketStories.length);
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'value': return 'Median Price';
      case 'homes': return 'Homes Sold';
      case 'days': return 'Days on Market';
      default: return 'Price';
    }
  };

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case 'value': return `$${(value / 1000).toFixed(0)}K`;
      case 'homes': return value.toString();
      case 'days': return `${value}d`;
      default: return value.toString();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Charlotte Market Stories</CardTitle>
              <CardDescription className="text-blue-100">
                Real-time insights into Charlotte's evolving real estate landscape
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isAutoPlaying ? "secondary" : "outline"}
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm"
              >
                {isAutoPlaying ? 'Pause' : 'Auto Play'}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Story Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {currentStory.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {currentStory.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {currentStory.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {currentStory.keyMetric.value}
                    </div>
                    <Badge 
                      variant={currentStory.keyMetric.trend === 'up' ? 'default' : 'secondary'}
                      className="flex items-center gap-1"
                    >
                      {currentStory.keyMetric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {currentStory.keyMetric.change}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {currentStory.narrative}
                </p>
              </div>

              {/* Metric Selection */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600">View:</span>
                {(['value', 'homes', 'days'] as const).map((metric) => (
                  <Button
                    key={metric}
                    variant={selectedMetric === metric ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMetric(metric)}
                    className="flex items-center gap-1"
                  >
                    {metric === 'value' && <DollarSign className="w-3 h-3" />}
                    {metric === 'homes' && <Home className="w-3 h-3" />}
                    {metric === 'days' && <Clock className="w-3 h-3" />}
                    {getMetricLabel(metric)}
                  </Button>
                ))}
              </div>

              {/* Chart */}
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentStory.data}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      className="text-sm"
                    />
                    <YAxis 
                      tickFormatter={(value) => formatValue(value, selectedMetric)}
                      axisLine={false}
                      tickLine={false}
                      className="text-sm"
                    />
                    <Tooltip 
                      formatter={(value) => [formatValue(Number(value), selectedMetric), getMetricLabel(selectedMetric)]}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#colorGradient)"
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

              {/* Key Insights */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Market Insights</h4>
                <div className="grid gap-2">
                  {currentStory.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      {insight}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {marketStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStoryIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStoryIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={prevStory}>
                    Previous
                  </Button>
                  <Button variant="default" size="sm" onClick={nextStory}>
                    Next Story
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
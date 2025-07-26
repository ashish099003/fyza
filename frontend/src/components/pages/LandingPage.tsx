'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Newspaper, 
  Wallet, 
  PieChart, 
  Shield, 
  BarChart3,
  Plus,
  ExternalLink,
  Edit,
  BookOpen,
  GraduationCap,
  Award,
  Calculator
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string, section?: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [editMode, setEditMode] = useState(false);

  const quickStats = [
    { 
      label: 'Net Worth', 
      value: '₹24.8L', 
      change: '+12.5%', 
      positive: true, 
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      onClick: () => onNavigate('portfolio')
    },
    { 
      label: 'Monthly Savings', 
      value: '₹35,000', 
      change: '+5.2%', 
      positive: true, 
      icon: Wallet,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      onClick: () => onNavigate('budget')
    },
    { 
      label: 'Expense Ratio', 
      value: '68%', 
      change: '-3.1%', 
      positive: true, 
      icon: BarChart3,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      onClick: () => onNavigate('budget')
    },
    { 
      label: 'Goal Progress', 
      value: '42%', 
      change: '+8.7%', 
      positive: true, 
      icon: Target,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      onClick: () => onNavigate('portfolio')
    }
  ];

  const goals = [
    {
      name: 'Emergency Fund',
      target: 500000,
      current: 325000,
      completionTime: 'Dec 2024',
      priority: 'high',
      daysLeft: 45
    },
    {
      name: 'Home Down Payment',
      target: 2000000,
      current: 1200000,
      completionTime: 'Jun 2026',
      priority: 'medium',
      daysLeft: 520
    }
  ];

  const newsItems = [
    {
      title: 'RBI Keeps Repo Rate Unchanged at 6.5%',
      category: 'Market News',
      time: '2 hours ago',
      impact: 'positive' as const,
      url: 'https://news.google.com/search?q=RBI+repo+rate+unchanged'
    },
    {
      title: 'New Tax Regime Benefits for FY 2024-25',
      category: 'Tax Updates',
      time: '1 day ago',
      impact: 'positive' as const,
      url: 'https://news.google.com/search?q=new+tax+regime+benefits+2024'
    },
    {
      title: 'Best Performing Mutual Funds This Quarter',
      category: 'Investment',
      time: '2 days ago',
      impact: 'neutral' as const,
      url: 'https://news.google.com/search?q=best+performing+mutual+funds+quarter'
    }
  ];

  const healthScore = {
    overall: 78,
    categories: [
      { name: 'Savings Rate', score: 85, color: 'text-green-600' },
      { name: 'Debt Management', score: 72, color: 'text-yellow-600' },
      { name: 'Investment Diversification', score: 76, color: 'text-blue-600' }
    ]
  };

  const netWorthProjection = [
    { period: 'Current', value: 24.8, displayValue: '₹24.8L' },
    { period: '5Y', value: 68.5, displayValue: '₹68.5L' },
    { period: '10Y', value: 142, displayValue: '₹1.42Cr' },
    { period: '25Y', value: 520, displayValue: '₹5.2Cr' }
  ];

  const courses = [
    {
      title: 'Tax Planning Strategies',
      level: 'Intermediate',
      duration: '3 hours',
      progress: 30,
      reward: '200 points'
    },
    {
      title: 'Retirement Planning',
      level: 'Beginner',
      duration: '4 hours',
      progress: 0,
      reward: '250 points'
    },
    {
      title: 'Mutual Fund Basics',
      level: 'Beginner',
      duration: '2 hours',
      progress: 75,
      reward: '100 points'
    }
  ];

  return (
    <div className="h-full flex flex-col space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, Sundar! 🌅
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's your financial overview for today
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      {/* Top Stats - Portfolio/Budget Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" onClick={stat.onClick}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span className="text-xs">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2x2 Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-y-auto">
        
        {/* Section 1: Financial Health Score */}
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Financial Health Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-green-600 mb-2">{healthScore.overall}</div>
              <div className="text-sm text-muted-foreground mb-4">Good Financial Health</div>
              <div className="w-24 h-24 mx-auto relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-600 stroke-current"
                    strokeWidth="3"
                    strokeDasharray={`${healthScore.overall}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {healthScore.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-current ${category.color}`}
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${category.color} w-8`}>{category.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Net Worth Projection - Line Chart */}
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Net Worth Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 relative mb-4">
              <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="60" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Y-axis labels */}
                <text x="10" y="25" fontSize="8" fill="#6b7280" textAnchor="start">₹5.2Cr</text>
                <text x="10" y="55" fontSize="8" fill="#6b7280" textAnchor="start">₹3.5Cr</text>
                <text x="10" y="85" fontSize="8" fill="#6b7280" textAnchor="start">₹1.7Cr</text>
                <text x="10" y="115" fontSize="8" fill="#6b7280" textAnchor="start">₹50L</text>
                <text x="10" y="145" fontSize="8" fill="#6b7280" textAnchor="start">₹0</text>
                
                {/* Asset projection lines */}
                {/* Total Net Worth (main line) */}
                <polyline
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="50,135 110,95 170,60 230,25 290,15"
                />
                
                {/* Equity investments */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="3,3"
                  points="50,140 110,105 170,75 230,45 290,35"
                />
                
                {/* Debt instruments */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="5,2"
                  points="50,140 110,125 170,110 230,95 290,85"
                />
                
                {/* Real Estate */}
                <polyline
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2,4"
                  points="50,145 110,130 170,110 230,85 290,65"
                />
                
                {/* Data points */}
                {[
                  { x: 50, y: 135, value: '₹24.8L' },
                  { x: 110, y: 95, value: '₹68.5L' },
                  { x: 170, y: 60, value: '₹1.42Cr' },
                  { x: 230, y: 25, value: '₹3.8Cr' },
                  { x: 290, y: 15, value: '₹5.2Cr' }
                ].map((point, index) => (
                  <g key={index}>
                    <circle cx={point.x} cy={point.y} r="3" fill="#16a34a" stroke="#ffffff" strokeWidth="1"/>
                    <text x={point.x} y={point.y - 8} fontSize="6" fill="#16a34a" textAnchor="middle" fontWeight="bold">
                      {point.value}
                    </text>
                  </g>
                ))}
                
                {/* X-axis labels */}
                <text x="50" y="165" fontSize="8" fill="#6b7280" textAnchor="middle">Current</text>
                <text x="110" y="165" fontSize="8" fill="#6b7280" textAnchor="middle">5Y</text>
                <text x="170" y="165" fontSize="8" fill="#6b7280" textAnchor="middle">10Y</text>
                <text x="230" y="165" fontSize="8" fill="#6b7280" textAnchor="middle">15Y</text>
                <text x="290" y="165" fontSize="8" fill="#6b7280" textAnchor="middle">20Y</text>
              </svg>
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-green-600"></div>
                <span>Total</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-blue-600 border-dashed"></div>
                <span>Equity</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-yellow-600"></div>
                <span>Debt</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-purple-600"></div>
                <span>Real Estate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: News */}
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-primary" />
              Financial News
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-3">
            <div className="space-y-2 overflow-y-auto h-full">
              {newsItems.slice(0, 3).map((news, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 p-2 border rounded-xl hover:bg-accent/50 cursor-pointer"
                  onClick={() => window.open(news.url, '_blank')}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    news.impact === 'positive' ? 'bg-green-500' : 
                    news.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2">{news.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">{news.time}</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto flex-shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Financial Goals */}
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Financial Goals
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline"
                className="rounded-full"
                onClick={() => onNavigate('profile', 'goals')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-3">
            <div className="space-y-2 overflow-y-auto h-full">
              {goals.map((goal, index) => (
                <div 
                  key={index}
                  className="p-2 border rounded-xl hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => onNavigate('profile', 'goals')}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{goal.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'secondary' : 'outline'} className="text-xs">
                          {goal.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{goal.completionTime}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{goal.daysLeft} days left</div>
                    </div>
                  </div>
                  
                  <div className="mb-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>₹{(goal.current / 100000).toFixed(1)}L</span>
                      <span>₹{(goal.target / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all ${
                          goal.priority === 'high' ? 'bg-red-500' :
                          goal.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Calculator className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round((goal.current / goal.target) * 100)}% complete
                      </span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
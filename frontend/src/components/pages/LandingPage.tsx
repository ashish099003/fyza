'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { LanguageSelector } from '../LanguageSelector';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Newspaper,
  BookOpen,
  PlusCircle,
  ArrowRight,
  Calendar,
  Wallet,
  PieChart,
  Shield
} from 'lucide-react';

export function LandingPage() {
  const goals = [
    {
      name: 'Emergency Fund',
      target: 500000,
      current: 325000,
      deadline: '2024-12-31',
      color: 'bg-green-500'
    },
    {
      name: 'Home Down Payment',
      target: 2000000,
      current: 1200000,
      deadline: '2026-06-30',
      color: 'bg-blue-500'
    },
    {
      name: 'Retirement Corpus',
      target: 50000000,
      current: 8500000,
      deadline: '2045-12-31',
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    { type: 'investment', text: 'SIP of ₹5,000 processed for HDFC Top 100 Fund', time: '2 hours ago' },
    { type: 'expense', text: 'Groceries expense of ₹2,450 categorized', time: '1 day ago' },
    { type: 'goal', text: 'Emergency Fund goal 65% completed', time: '2 days ago' },
    { type: 'recommendation', text: 'Tax saving opportunity of ₹18,000 identified', time: '3 days ago' }
  ];

  const newsItems = [
    {
      title: 'RBI Keeps Repo Rate Unchanged at 6.5%',
      category: 'Market News',
      time: '2 hours ago',
      impact: 'positive'
    },
    {
      title: 'New Tax Regime Benefits for FY 2024-25',
      category: 'Tax Updates',
      time: '1 day ago',
      impact: 'positive'
    },
    {
      title: 'Best Performing Mutual Funds This Quarter',
      category: 'Investment',
      time: '2 days ago',
      impact: 'neutral'
    }
  ];

  const quickStats = [
    { label: 'Net Worth', value: '₹24.8L', change: '+12.5%', positive: true },
    { label: 'Monthly Savings', value: '₹35,000', change: '+5.2%', positive: true },
    { label: 'Expense Ratio', value: '68%', change: '-3.1%', positive: true },
    { label: 'Goal Progress', value: '42%', change: '+8.7%', positive: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good morning, Priya! 🌅
          </h1>
          <p className="text-muted-foreground">
            Here's your financial overview for today
          </p>
        </div>
        <LanguageSelector />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`flex items-center gap-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Tracker */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Financial Goals
            </CardTitle>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ₹{(goal.current / 100000).toFixed(1)}L / ₹{(goal.target / 100000).toFixed(1)}L
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round((goal.current / goal.target) * 100)}% completed</span>
                  <span>Due: {new Date(goal.deadline).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4">
              View All Activities
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial News */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-primary" />
              Personalized Financial News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {newsItems.map((news, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  news.impact === 'positive' ? 'bg-green-500' : 
                  news.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium">{news.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{news.category}</Badge>
                    <span className="text-xs text-muted-foreground">{news.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-3" variant="outline">
              <Wallet className="h-4 w-4" />
              Add Expense
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <PieChart className="h-4 w-4" />
              View Portfolio
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <Shield className="h-4 w-4" />
              Insurance Checkup
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <BookOpen className="h-4 w-4" />
              Learning Resources
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            AI Recommendations for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-2">Optimize Tax Savings</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You can save ₹18,000 more in taxes by investing in ELSS funds before March 31st.
              </p>
              <Button size="sm">
                View Options
              </Button>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-2">Rebalance Portfolio</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your equity allocation is 75%. Consider rebalancing to your target 70%.
              </p>
              <Button size="sm">
                Rebalance Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
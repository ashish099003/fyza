'use client';

import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { AIAssistant } from './components/AIAssistant';
import { LandingPage } from './components/pages/LandingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Wallet, 
  TrendingUp, 
  BookOpen, 
  BarChart3, 
  Plus,
  Download,
  Filter,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

function BudgetPage() {
  const categories = [
    { name: 'Housing', budgeted: 25000, spent: 24500, color: 'bg-blue-500' },
    { name: 'Food & Dining', budgeted: 8000, spent: 9200, color: 'bg-green-500' },
    { name: 'Transportation', budgeted: 5000, spent: 4200, color: 'bg-yellow-500' },
    { name: 'Entertainment', budgeted: 3000, spent: 3800, color: 'bg-purple-500' },
    { name: 'Shopping', budgeted: 7000, spent: 8500, color: 'bg-pink-500' },
    { name: 'Healthcare', budgeted: 2000, spent: 1500, color: 'bg-red-500' },
    { name: 'Utilities', budgeted: 4000, spent: 3900, color: 'bg-indigo-500' }
  ];

  const recentExpenses = [
    { date: '2025-01-21', description: 'Grocery Shopping - Big Bazaar', amount: 2450, category: 'Food & Dining' },
    { date: '2025-01-20', description: 'Uber Ride', amount: 280, category: 'Transportation' },
    { date: '2025-01-20', description: 'Movie Tickets - PVR', amount: 800, category: 'Entertainment' },
    { date: '2025-01-19', description: 'Electricity Bill', amount: 1200, category: 'Utilities' },
    { date: '2025-01-19', description: 'Amazon Purchase', amount: 1500, category: 'Shopping' }
  ];

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Budget & Expenses</h1>
          <p className="text-muted-foreground">
            Track your monthly budget and expenses
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Budget</p>
                <p className="text-2xl font-bold">₹{(totalBudgeted / 1000).toFixed(0)}K</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">₹{(totalSpent / 1000).toFixed(0)}K</p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-muted-foreground">
                {((totalSpent / totalBudgeted) * 100).toFixed(0)}% of budget used
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold">₹{((totalBudgeted - totalSpent) / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      ₹{category.spent.toLocaleString()} / ₹{category.budgeted.toLocaleString()}
                    </span>
                    {category.spent > category.budgeted ? (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
                <Progress 
                  value={(category.spent / category.budgeted) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round((category.spent / category.budgeted) * 100)}% used</span>
                  <span>
                    {category.spent > category.budgeted 
                      ? `₹${(category.spent - category.budgeted).toLocaleString()} over`
                      : `₹${(category.budgeted - category.spent).toLocaleString()} left`
                    }
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Expenses</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{expense.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {expense.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{expense.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4">
              View All Expenses
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Expense Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border">
              <h4 className="font-medium mb-1">Budget Alert</h4>
              <p className="text-sm text-muted-foreground">
                You've exceeded your Food & Dining budget by ₹1,200 this month.
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <h4 className="font-medium mb-1">Savings Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                You can save ₹3,000 monthly by optimizing your subscription services.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KnowledgePage() {
  const courses = [
    {
      title: 'Basics of Mutual Funds',
      level: 'Beginner',
      duration: '2 hours',
      progress: 75,
      description: 'Learn the fundamentals of mutual fund investing'
    },
    {
      title: 'Tax Planning Strategies',
      level: 'Intermediate',
      duration: '3 hours',
      progress: 30,
      description: 'Master tax-saving techniques and investment planning'
    },
    {
      title: 'Retirement Planning',
      level: 'Intermediate',
      duration: '4 hours',
      progress: 0,
      description: 'Create a comprehensive retirement strategy'
    },
    {
      title: 'Advanced Portfolio Management',
      level: 'Advanced',
      duration: '5 hours',
      progress: 0,
      description: 'Professional techniques for portfolio optimization'
    }
  ];

  const articles = [
    {
      title: 'Understanding SIP vs Lump Sum Investments',
      category: 'Investing',
      readTime: '5 min read',
      level: 'Beginner'
    },
    {
      title: 'How to Build an Emergency Fund in India',
      category: 'Financial Planning',
      readTime: '7 min read',
      level: 'Beginner'
    },
    {
      title: 'ELSS vs PPF: Which is Better for Tax Saving?',
      category: 'Tax Planning',
      readTime: '6 min read',
      level: 'Intermediate'
    },
    {
      title: 'Real Estate vs Stocks: Where to Invest?',
      category: 'Investing',
      readTime: '10 min read',
      level: 'Advanced'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Portal</h1>
        <p className="text-muted-foreground">
          Enhance your financial literacy with personalized learning
        </p>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Courses for You</CardTitle>
              <p className="text-sm text-muted-foreground">
                Based on your financial literacy level: Intermediate
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{course.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <span className="text-xs text-muted-foreground">{course.duration}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      {course.progress > 0 ? 'Continue' : 'Start Course'}
                    </Button>
                  </div>
                  {course.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest Articles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {articles.map((article, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                  <h4 className="font-medium mb-2">{article.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <Badge variant="outline">{article.level}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  SIP Calculator
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  EMI Calculator
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Tax Calculator
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Retirement Calculator
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Planning Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  Goal Planner
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Risk Profiler
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Asset Allocator
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Insurance Calculator
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HealthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Financial Health Monitor</h1>
        <p className="text-muted-foreground">
          Track your financial health with comprehensive charts and projections
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Health Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">78</div>
              <div className="text-lg text-muted-foreground">Good Financial Health</div>
              <Progress value={78} className="w-64 mx-auto mt-4 h-3" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">85</div>
              <div className="text-sm text-muted-foreground">Savings Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">72</div>
              <div className="text-sm text-muted-foreground">Debt Management</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">76</div>
              <div className="text-sm text-muted-foreground">Investment Diversification</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Net Worth Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Current Net Worth</span>
                <span className="font-medium">₹24.8L</span>
              </div>
              <div className="flex justify-between">
                <span>Projected (5 years)</span>
                <span className="font-medium">₹68.5L</span>
              </div>
              <div className="flex justify-between">
                <span>Projected (10 years)</span>
                <span className="font-medium">₹1.42Cr</span>
              </div>
              <div className="flex justify-between">
                <span>Retirement Goal (25 years)</span>
                <span className="font-medium">₹5.2Cr</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Completion Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Emergency Fund</span>
                  <span className="text-sm">Dec 2024</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Home Down Payment</span>
                  <span className="text-sm">Jun 2026</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Retirement Corpus</span>
                  <span className="text-sm">Dec 2045</span>
                </div>
                <Progress value={17} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">Monthly P&L</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Quarterly Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Annual Summary</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Target className="h-5 w-5" />
              <span className="text-sm">Goal Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'profile':
        return <ProfilePage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'budget':
        return <BudgetPage />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'health':
        return <HealthPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <div className="flex-1 md:ml-64">
          <main className="p-6">
            {renderPage()}
          </main>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}
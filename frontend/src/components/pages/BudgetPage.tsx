'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Wallet, 
  TrendingUp, 
  Target, 
  Plus,
  Download,
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle,
  Eye,
  Maximize2,
  X
} from 'lucide-react';

export function BudgetPage() {
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { name: 'Housing', budgeted: 25000, spent: 24500, color: 'bg-blue-500', icon: '🏠' },
    { name: 'Food & Dining', budgeted: 8000, spent: 9200, color: 'bg-green-500', icon: '🍽️' },
    { name: 'Transportation', budgeted: 5000, spent: 4200, color: 'bg-yellow-500', icon: '🚗' },
    { name: 'Entertainment', budgeted: 3000, spent: 3800, color: 'bg-purple-500', icon: '🎬' },
    { name: 'Shopping', budgeted: 7000, spent: 8500, color: 'bg-pink-500', icon: '🛍️' },
    { name: 'Healthcare', budgeted: 2000, spent: 1500, color: 'bg-red-500', icon: '🏥' },
    { name: 'Utilities', budgeted: 4000, spent: 3900, color: 'bg-indigo-500', icon: '⚡' }
  ];

  const recentExpenses = [
    { id: '1', date: '2025-01-21', description: 'Grocery Shopping - Big Bazaar', amount: 2450, category: 'Food & Dining' },
    { id: '2', date: '2025-01-20', description: 'Uber Ride', amount: 280, category: 'Transportation' },
    { id: '3', date: '2025-01-20', description: 'Movie Tickets - PVR', amount: 800, category: 'Entertainment' },
    { id: '4', date: '2025-01-19', description: 'Electricity Bill', amount: 1200, category: 'Utilities' },
    { id: '5', date: '2025-01-19', description: 'Amazon Purchase', amount: 1500, category: 'Shopping' },
    { id: '6', date: '2025-01-18', description: 'Petrol - Indian Oil', amount: 2000, category: 'Transportation' },
    { id: '7', date: '2025-01-17', description: 'Restaurant - Barbeque Nation', amount: 1800, category: 'Food & Dining' },
    { id: '8', date: '2025-01-16', description: 'Medical Checkup', amount: 800, category: 'Healthcare' },
    { id: '9', date: '2025-01-15', description: 'Rent Payment', amount: 25000, category: 'Housing' },
    { id: '10', date: '2025-01-14', description: 'Internet Bill', amount: 1500, category: 'Utilities' },
    { id: '11', date: '2025-01-13', description: 'Clothing Shopping', amount: 3200, category: 'Shopping' },
    { id: '12', date: '2025-01-12', description: 'Concert Tickets', amount: 2000, category: 'Entertainment' }
  ];

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  const filteredExpenses = selectedCategory 
    ? recentExpenses.filter(expense => expense.category === selectedCategory)
    : recentExpenses;

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveView('expenses');
  };

  const AllExpensesDialog = () => (
    <Dialog open={showAllExpenses} onOpenChange={setShowAllExpenses}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            All Expenses
            <Button variant="ghost" size="icon" onClick={() => setShowAllExpenses(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>View and filter all your expenses by category</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="flex gap-2 mb-4">
            <Button 
              variant={selectedCategory ? "outline" : "default"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{expense.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {expense.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(expense.date).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">₹{expense.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="h-full flex flex-col space-y-4 overflow-hidden">
      {/* Header with Add Expense */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Budget & Expenses</h1>
          <p className="text-sm text-muted-foreground">
            Track your monthly budget and expenses effectively
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAllExpenses(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View All Expenses
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Add a new expense to track your spending</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.name} value={cat.name}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <Button className="w-full">Add Expense</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" onClick={() => setActiveView('budget')}>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Monthly Budget</p>
                <p className="text-lg font-bold text-foreground">₹{(totalBudgeted / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" onClick={() => setActiveView('expenses')}>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
                <p className="text-lg font-bold text-foreground">₹{(totalSpent / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground">{((totalSpent / totalBudgeted) * 100).toFixed(0)}% of budget</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                <p className="text-lg font-bold text-foreground">₹{((totalBudgeted - totalSpent) / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground">{((totalBudgeted - totalSpent) / totalBudgeted * 100).toFixed(0)}% available</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeView} onValueChange={setActiveView} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="budget">Budget Categories</TabsTrigger>
            <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              {/* Budget Categories Tile */}
              <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Budget Categories</CardTitle>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setActiveView('budget')}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-2">
                  {categories.slice(0, 4).map((category, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-xl hover:bg-accent/50 cursor-pointer"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{category.icon}</span>
                        <div>
                          <h4 className="font-medium text-sm">{category.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            ₹{category.spent.toLocaleString()} / ₹{category.budgeted.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {category.spent > category.budgeted ? (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Expenses Tile */}
              <Card className="flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Expenses</CardTitle>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setActiveView('expenses')}>
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-2">
                  {recentExpenses.slice(0, 5).map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-2 border rounded-xl hover:bg-accent/50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{expense.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs h-4">
                            {expense.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{expense.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category.icon}</span>
                        <h4 className="font-medium text-foreground">{category.name}</h4>
                      </div>
                      {category.spent > category.budgeted ? (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Spent</span>
                        <span className="font-medium">₹{category.spent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-medium">₹{category.budgeted.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Remaining</span>
                        <span className={`font-medium ${category.spent > category.budgeted ? 'text-orange-500' : 'text-green-500'}`}>
                          {category.spent > category.budgeted 
                            ? `-₹${(category.spent - category.budgeted).toLocaleString()}`
                            : `₹${(category.budgeted - category.spent).toLocaleString()}`
                          }
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{Math.round((category.spent / category.budgeted) * 100)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              category.spent > category.budgeted 
                                ? 'bg-orange-500' 
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((category.spent / category.budgeted) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="flex-1 overflow-hidden">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {selectedCategory ? `${selectedCategory} Expenses` : 'All Expenses'}
                  </CardTitle>
                  <div className="flex gap-2">
                    {selectedCategory && (
                      <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)}>
                        Show All
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-2">
                {filteredExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{expense.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {expense.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(expense.date).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">₹{expense.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AllExpensesDialog />
    </div>
  );
}
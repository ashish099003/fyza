'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  User,
  Target,
  Link as LinkIcon,
  Upload,
  Smartphone,
  Building2,
  CreditCard,
  TrendingUp,
  Shield,
  Calculator,
  PlusCircle,
  Trash2
} from 'lucide-react';

export function ProfilePage() {
  const [goals, setGoals] = useState([
    { id: '1', name: 'Emergency Fund', target: 500000, deadline: '2024-12-31', priority: 'high' },
    { id: '2', name: 'Home Purchase', target: 2000000, deadline: '2026-06-30', priority: 'medium' }
  ]);

  const [integrations, setIntegrations] = useState([
    { name: 'HDFC Bank', type: 'Banking', status: 'connected', icon: Building2 },
    { name: 'SBI Credit Card', type: 'Credit Card', status: 'connected', icon: CreditCard },
    { name: 'Zerodha', type: 'Investment', status: 'pending', icon: TrendingUp },
    { name: 'LIC Portal', type: 'Insurance', status: 'not_connected', icon: Shield }
  ]);

  const addGoal = () => {
    const newGoal = {
      id: Date.now().toString(),
      name: '',
      target: 0,
      deadline: '',
      priority: 'medium'
    };
    setGoals([...goals, newGoal]);
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const updateGoal = (id: string, field: string, value: any) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile Setup</h1>
        <p className="text-muted-foreground">
          Complete your financial profile for personalized recommendations
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="goals">Financial Goals</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" defaultValue="Priya" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" defaultValue="Sharma" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="Enter age" defaultValue="28" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" placeholder="Enter occupation" defaultValue="Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input id="income" type="number" placeholder="Enter annual income" defaultValue="1200000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select defaultValue="bangalore">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskProfile">Risk Profile</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Financial Goals
              </CardTitle>
              <Button onClick={addGoal} size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <Input
                      placeholder="Goal name"
                      value={goal.name}
                      onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                      className="flex-1 mr-4"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeGoal(goal.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Target Amount (₹)</Label>
                      <Input
                        type="number"
                        value={goal.target}
                        onChange={(e) => updateGoal(goal.id, 'target', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Date</Label>
                      <Input
                        type="date"
                        value={goal.deadline}
                        onChange={(e) => updateGoal(goal.id, 'deadline', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select
                        value={goal.priority}
                        onValueChange={(value) => updateGoal(goal.id, 'priority', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Banking & Investment Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <integration.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">{integration.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        integration.status === 'connected' ? 'default' :
                        integration.status === 'pending' ? 'secondary' : 'outline'
                      }
                    >
                      {integration.status === 'connected' ? 'Connected' :
                       integration.status === 'pending' ? 'Pending' : 'Not Connected'}
                    </Badge>
                    <Button
                      size="sm"
                      variant={integration.status === 'connected' ? 'outline' : 'default'}
                    >
                      {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                UPI Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Link UPI IDs for Expense Tracking</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your UPI IDs to automatically track and categorize your expenses
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="priya@paytm" />
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add UPI ID
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Financial Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium mb-2">Upload Excel File</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your financial data in Excel format for quick setup
                </p>
                <Button>
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Goal Progress Updates</p>
                  <p className="text-sm text-muted-foreground">Get notified about your goal milestones</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Investment Recommendations</p>
                  <p className="text-sm text-muted-foreground">Receive AI-powered investment suggestions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tax Saving Alerts</p>
                  <p className="text-sm text-muted-foreground">Alerts for tax saving opportunities</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Expense Warnings</p>
                  <p className="text-sm text-muted-foreground">Warnings when you exceed budget limits</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Literacy Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="intermediate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - New to investing</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some investment experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Experienced investor</SelectItem>
                  <SelectItem value="expert">Expert - Financial professional</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                This helps us customize content and recommendations to your level
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save Draft</Button>
        <Button>Save & Continue</Button>
      </div>
    </div>
  );
}
'use client';

import {
  Building2,
  CreditCard,
  Link as LinkIcon,
  PlusCircle,
  Shield,
  Smartphone,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

function tempId() {
  return 'temp_' + Math.random().toString(36).slice(2) + Date.now();
}

type UserProfile = {
  id?: number;
  first_name: string;
  last_name: string;
  age: number | string;
  occupation: string;
  income: number | string;
  city: string;
  dependents: number | string;
  risk_profile: string;
};

type FinancialGoal = {
  goal_id?: string;
  temp_id?: string;
  user_id: number;
  goal_name: string;
  target_amount: number | string;
  target_date: string;
  priority: 'High' | 'Medium' | 'Low';
};

export function ProfilePage() {
  // Personal Info state/logic
  const [profile, setProfile] = useState<UserProfile>({
    first_name: '',
    last_name: '',
    age: '',
    occupation: '',
    income: '',
    city: 'bangalore',
    dependents: '',
    risk_profile: 'moderate',
  });
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Financial Goals state/logic
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [goalsError, setGoalsError] = useState<string | null>(null);

  // Demo: hardcoded user id
  const userId = 1;

  // Fetch profile
  useEffect(() => {
    setProfileLoading(true);
    fetch(`http://localhost:8000/api/profile/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(() => setProfile(prev => ({ ...prev, id: undefined })))
      .finally(() => setProfileLoading(false));
  }, [userId]);

  // Fetch financial goals
  useEffect(() => {
    setGoalsLoading(true);
    fetch(`http://localhost:8000/api/financial-goals/${userId}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setGoals(data.map((goal: FinancialGoal) => ({ ...goal, temp_id: undefined }))))
      .catch(() => setGoals([]))
      .finally(() => setGoalsLoading(false));
  }, [userId]);

  // Handlers for personal info
  const handleProfileChange = (key: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };
  const handleProfileSave = () => {
    setProfileLoading(true);
    setProfileError(null);
    const method = profile.id ? "PUT" : "POST";
    const url = profile.id
      ? `http://localhost:8000/api/profile/${profile.id}`
      : "http://localhost:8000/api/profile";
    const payload = { ...profile };
    if (!profile.id) delete payload.id;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        setProfile(data);
        alert("Profile saved!");
      })
      .catch(err => setProfileError("Failed to save: " + err.message))
      .finally(() => setProfileLoading(false));
  };

  // Handlers for financial goals
  const handleGoalChange = (id: string, field: keyof FinancialGoal, value: any) => {
    setGoals(goals =>
      goals.map(goal =>
        (goal.temp_id === id || goal.goal_id === id)
          ? { ...goal, [field]: value }
          : goal
      )
    );
  };

  // Add new goal (local only until Save)
  const handleAddGoal = () => {
    setGoals(goals => [
      ...goals,
      {
        temp_id: tempId(),
        user_id: userId,
        goal_name: "",
        target_amount: "",
        target_date: "",
        priority: "Medium"
      }
    ]);
  };

  // Remove (delete if on server, else just remove)
  const handleRemoveGoal = (goal: FinancialGoal) => {
    if (!goal.goal_id) {
      setGoals(goals => goals.filter(g => g.temp_id !== goal.temp_id));
      return;
    }
    fetch(`http://localhost:8000/api/financial-goals/${goal.goal_id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setGoals(goals => goals.filter(g => g.goal_id !== goal.goal_id));
      })
      .catch(() => setGoalsError("Failed to delete goal"));
  };

  // Save all goals at once (batch update/replace pattern)
  const handleSaveAllGoals = () => {
    setGoalsLoading(true);
    setGoalsError(null);
    // Separate new and existing goals
    const newGoals = goals.filter(g => !g.goal_id);
    const updateGoals = goals.filter(g => g.goal_id);
    const requests = [
      // Create new goals
      ...newGoals.map(goal =>
        fetch("http://localhost:8000/api/financial-goals/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            goal_name: goal.goal_name,
            target_amount: goal.target_amount,
            target_date: goal.target_date,
            priority: goal.priority,
          }),
        })
          .then(async res => {
            if (!res.ok) throw new Error(await res.text());
            return res.json();
          })
      ),
      // Update existing goals
      ...updateGoals.map(goal =>
        fetch(`http://localhost:8000/api/financial-goals/${goal.goal_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            goal_name: goal.goal_name,
            target_amount: goal.target_amount,
            target_date: goal.target_date,
            priority: goal.priority,
          }),
        })
          .then(async res => {
            if (!res.ok) throw new Error(await res.text());
            return res.json();
          })
      ),
    ];

    Promise.all(requests)
      .then(() =>
        // Refresh goals list
        fetch(`http://localhost:8000/api/financial-goals/${userId}`)
          .then(res => res.ok ? res.json() : [])
          .then(data => setGoals(data.map((goal: FinancialGoal) => ({ ...goal, temp_id: undefined }))))
      )
      .catch(err => setGoalsError("Failed to save one or more goals: " + err.message))
      .finally(() => setGoalsLoading(false));
  };

  // Integrations (keep as in reference)
  const [integrations] = useState([
    { name: 'HDFC Bank', type: 'Banking', status: 'connected', icon: Building2 },
    { name: 'SBI Credit Card', type: 'Credit Card', status: 'connected', icon: CreditCard },
    { name: 'Zerodha', type: 'Investment', status: 'pending', icon: TrendingUp },
    { name: 'LIC Portal', type: 'Insurance', status: 'not_connected', icon: Shield }
  ]);

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

        {/* Personal Info */}
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
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={profile.first_name}
                    onChange={e => handleProfileChange("first_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={profile.last_name}
                    onChange={e => handleProfileChange("last_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={profile.age}
                    onChange={e => handleProfileChange("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Enter occupation"
                    value={profile.occupation}
                    onChange={e => handleProfileChange("occupation", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter annual income"
                    value={profile.income}
                    onChange={e => handleProfileChange("income", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={profile.city}
                    onValueChange={v => handleProfileChange("city", v)}
                  >
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
                  <Input
                    id="dependents"
                    type="number"
                    placeholder="Number of Dependents"
                    value={profile.dependents}
                    onChange={e => handleProfileChange("dependents", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskProfile">Risk Profile</Label>
                  <Select
                    value={profile.risk_profile}
                    onValueChange={v => handleProfileChange("risk_profile", v)}
                  >
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
          {profileError && <div className="text-red-500">{profileError}</div>}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={handleProfileSave} disabled={profileLoading}>
              {profileLoading ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </TabsContent>

        {/* Financial Goals */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Financial Goals
              </CardTitle>
              <Button onClick={handleAddGoal} size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {goalsLoading && <div>Loading...</div>}
              {goalsError && <div className="text-red-500">{goalsError}</div>}
              {goals.map((goal, idx) => {
                const uniqueId = goal.goal_id || goal.temp_id!;
                return (
                  <div key={uniqueId} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Goal name"
                        value={goal.goal_name}
                        onChange={e => handleGoalChange(uniqueId, "goal_name", e.target.value)}
                        className="flex-1 mr-4"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveGoal(goal)}
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
                          value={goal.target_amount}
                          onChange={e =>
                            handleGoalChange(uniqueId, "target_amount", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Target Date</Label>
                        <Input
                          type="date"
                          value={goal.target_date}
                          onChange={e =>
                            handleGoalChange(uniqueId, "target_date", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select
                          value={goal.priority}
                          onValueChange={value =>
                            handleGoalChange(uniqueId, "priority", value as 'High' | 'Medium' | 'Low')
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end gap-4">
                <Button variant="outline">Save Draft</Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSaveAllGoals}
                  disabled={goalsLoading}
                >
                  {goalsLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
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

        {/* Preferences */}
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
    </div>
  );
}

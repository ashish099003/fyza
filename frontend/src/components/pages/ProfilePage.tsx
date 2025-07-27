'use client';

import {
  Building2,
  CreditCard,
  Link as LinkIcon,
  PlusCircle,
  Shield,
  Target,
  Trash2,
  TrendingUp,
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

// Helper to generate a local unique ID for unsaved goals
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
  // Use temp_id for local new goals, goal_id from backend for saved
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
      .then(data => {
        // Remove any temp (unsaved) goals from local state if fetching fresh from backend
        setGoals(data.map((goal: FinancialGoal) => ({ ...goal, temp_id: undefined })));
      })
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
  // Accept temp_id if present, otherwise goal_id
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

  // Save or update a goal
  const handleSaveGoal = (goal: FinancialGoal) => {
    setGoalsLoading(true);
    setGoalsError(null);
    const isNew = !goal.goal_id;
    const method = isNew ? "POST" : "PUT";
    const url = isNew
      ? "http://localhost:8000/api/financial-goals/"
      : `http://localhost:8000/api/financial-goals/${goal.goal_id}`;
    const payload = {
      ...goal,
      priority: goal.priority,
      user_id: userId, // always set user_id!
    };
    // Remove id fields not accepted by backend
    if (!isNew) delete payload.goal_id;
    if (payload.temp_id) delete payload.temp_id;

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
        setGoals(goals =>
          isNew
            // Replace the temp goal with the backend version
            ? [...goals.filter(g => g.temp_id !== goal.temp_id), data]
            : goals.map(g => (g.goal_id === data.goal_id ? data : g))
        );
      })
      .catch(err => setGoalsError("Failed to save goal: " + err.message))
      .finally(() => setGoalsLoading(false));
  };

  // Integrations and Preferences dummy state
  const [integrations] = useState([
    { name: 'HDFC Bank', type: 'Banking', status: 'connected', icon: Building2 },
    { name: 'SBI Credit Card', type: 'Credit Card', status: 'connected', icon: CreditCard },
    { name: 'Zerodha', type: 'Investment', status: 'pending', icon: TrendingUp },
    { name: 'LIC Portal', type: 'Insurance', status: 'not_connected', icon: Shield }
  ]);

  // UI
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
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveGoal(goal)}
                        disabled={goalsLoading}
                      >
                        {goal.goal_id ? "Save Changes" : "Create Goal"}
                      </Button>
                    </div>
                  </div>
                );
              })}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

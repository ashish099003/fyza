'use client';

import { Plus, Target, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

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

type PriorityEnum = "High" | "Medium" | "Low";
type FinancialGoal = {
  goal_id: string;
  user_id: number;
  goal_name: string;
  target_amount: number;
  target_date: string; // yyyy-mm-dd
  priority: PriorityEnum;
  created_at: string;
  updated_at: string;
};

export function ProfilePage() {
  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    age: "",
    occupation: "",
    income: "",
    city: "bangalore",
    dependents: "",
    risk_profile: "moderate",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Goals state
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [goalsError, setGoalsError] = useState<string | null>(null);
  const [editGoalId, setEditGoalId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    goal_name: "",
    target_amount: 0,
    target_date: "",
    priority: "Medium" as PriorityEnum,
  });

  // Hardcoded for demo; replace with actual auth in production
  const userId = 1;

  // --- Fetch profile ---
  useEffect(() => {
    fetch(`http://localhost:8000/api/profile/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("No profile found");
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setProfile(prev => ({ ...prev, id: undefined }));
      });
  }, [userId]);

  // --- Fetch goals ---
  useEffect(() => {
    setGoalsLoading(true);
    fetch(`http://localhost:8000/api/financial-goals/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch goals');
        return res.json();
      })
      .then(setGoals)
      .catch(err => setGoalsError(err.message))
      .finally(() => setGoalsLoading(false));
  }, [userId]);

  // Profile field change
  const handleChange = (key: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  // Save profile
  const handleSave = () => {
    setLoading(true);
    setError(null);

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
      .catch(err => {
        setError("Failed to save: " + err.message);
      })
      .finally(() => setLoading(false));
  };

  // --- Financial Goals CRUD ---
  // Add
  function handleCreateGoal(e: React.FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:8000/api/financial-goals/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newGoal, user_id: userId }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add goal');
        return res.json();
      })
      .then(goal => {
        setGoals(g => [...g, goal]);
        setNewGoal({ goal_name: "", target_amount: 0, target_date: "", priority: "Medium" });
      })
      .catch(err => setGoalsError(err.message));
  }

  // Edit/Save
  function handleUpdateGoal(goal_id: string, updates: Partial<FinancialGoal>) {
    fetch(`http://localhost:8000/api/financial-goals/${goal_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update goal');
        return res.json();
      })
      .then(updatedGoal => {
        setGoals(goals => goals.map(g => (g.goal_id === updatedGoal.goal_id ? updatedGoal : g)));
        setEditGoalId(null);
      })
      .catch(err => setGoalsError(err.message));
  }

  // Delete
  function handleDeleteGoal(goal_id: string) {
    fetch(`http://localhost:8000/api/financial-goals/${goal_id}`, {
      method: "DELETE"
    })
      .then(() => setGoals(goals => goals.filter(g => g.goal_id !== goal_id)))
      .catch(err => setGoalsError(err.message));
  }

  if (loading) return <div>Loading...</div>;

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
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={profile.first_name}
                    onChange={e => handleChange("first_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={profile.last_name}
                    onChange={e => handleChange("last_name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={profile.age}
                    onChange={e => handleChange("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Enter occupation"
                    value={profile.occupation}
                    onChange={e => handleChange("occupation", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter annual income"
                    value={profile.income}
                    onChange={e => handleChange("income", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={profile.city}
                    onValueChange={v => handleChange("city", v)}
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
                    onChange={e => handleChange("dependents", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskProfile">Risk Profile</Label>
                  <Select
                    value={profile.risk_profile}
                    onValueChange={v => handleChange("risk_profile", v)}
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
          {error && <div className="text-red-500">{error}</div>}
        </TabsContent>

        {/* --- Financial Goals Tab --- */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Financial Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              {/* New Goal Form */}
              <form className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4"
                onSubmit={handleCreateGoal}>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={newGoal.goal_name} onChange={e => setNewGoal({ ...newGoal, goal_name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Target Amount (₹)</Label>
                  <Input type="number" value={newGoal.target_amount} onChange={e => setNewGoal({ ...newGoal, target_amount: parseFloat(e.target.value) || 0 })} required />
                </div>
                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Input type="date" value={newGoal.target_date} onChange={e => setNewGoal({ ...newGoal, target_date: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newGoal.priority}
                    onValueChange={v => setNewGoal({ ...newGoal, priority: v as PriorityEnum })}>
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
                <div>
                  <Button type="submit" className="mt-6">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </form>

              {/* Goals List */}
              {goalsLoading ? <div>Loading...</div> : (
                <div className="space-y-4">
                  {goals.length === 0 && <div>No goals yet.</div>}
                  {goals.map(goal =>
                    <div key={goal.goal_id} className="p-4 border rounded-lg space-y-2 flex flex-col md:flex-row md:items-center md:justify-between">
                      {editGoalId === goal.goal_id ? (
                        <EditGoalForm
                          goal={goal}
                          onSave={updates => handleUpdateGoal(goal.goal_id, updates)}
                          onCancel={() => setEditGoalId(null)}
                        />
                      ) : (
                        <>
                          <div>
                            <div className="font-medium">{goal.goal_name}</div>
                            <div className="text-xs text-muted-foreground">
                              Target: ₹{goal.target_amount} | Deadline: {goal.target_date} | Priority: {goal.priority}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditGoalId(goal.goal_id)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteGoal(goal.goal_id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
              {goalsError && <div className="text-red-500">{goalsError}</div>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs (integrations, preferences) unchanged */}
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save Draft</Button>
        <Button onClick={handleSave}>Save & Continue</Button>
      </div>
    </div>
  );
}

// -- Inline edit form for goals --
function EditGoalForm({
  goal,
  onSave,
  onCancel
}: {
  goal: FinancialGoal,
  onSave: (updates: Partial<FinancialGoal>) => void,
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    goal_name: goal.goal_name,
    target_amount: goal.target_amount,
    target_date: goal.target_date,
    priority: goal.priority
  });

  return (
    <form className="flex flex-col md:flex-row md:items-center md:gap-3 gap-2 w-full"
      onSubmit={e => {
        e.preventDefault();
        onSave(form);
      }}>
      <Input value={form.goal_name} onChange={e => setForm({ ...form, goal_name: e.target.value })} className="w-24" />
      <Input type="number" value={form.target_amount} onChange={e => setForm({ ...form, target_amount: parseFloat(e.target.value) || 0 })} className="w-24" />
      <Input type="date" value={form.target_date} onChange={e => setForm({ ...form, target_date: e.target.value })} className="w-32" />
      <Select value={form.priority} onValueChange={v => setForm({ ...form, priority: v as PriorityEnum })}>
        <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" type="submit" className="w-20">Save</Button>
      <Button size="sm" variant="outline" onClick={onCancel}>Cancel</Button>
    </form>
  );
}

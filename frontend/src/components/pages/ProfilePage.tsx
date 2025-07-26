'use client';

import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type UserProfile = {
  id?: number; // Only present if profile already exists
  first_name: string;
  last_name: string;
  age: number | string;
  occupation: string;
  income: number | string;
  city: string;
  dependents: number | string;
  risk_profile: string;
};

export function ProfilePage() {
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

  // For demo: hardcoded user id
  const userId = 1;

  // Fetch profile on mount
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
        setProfile(prev => ({ ...prev, id: undefined })); // no profile exists, blank form
      });
  }, [userId]);

  // Update local state on field change
  const handleChange = (key: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  // Save handler: update if profile exists, else create
  const handleSave = () => {
    setLoading(true);
    setError(null);

    const method = profile.id ? "PUT" : "POST";
    const url = profile.id
      ? `http://localhost:8000/api/profile/${profile.id}`
      : "http://localhost:8000/api/profile";

    // Prepare payload (strip id for POST)
    const payload = { ...profile };
    if (!profile.id) delete payload.id;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text());
        }
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

        {/* The rest of your tabs are unchanged, unless you want to wire them to the backend */}
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save Draft</Button>
        <Button onClick={handleSave}>Save & Continue</Button>
      </div>
    </div>
  );
}

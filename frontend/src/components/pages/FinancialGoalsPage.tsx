'use client';

import { Plus, Target, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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

const userId = 1; // TODO: Replace with actual user_id from auth/session if needed

export default function FinancialGoalsPage() {
    const [goals, setGoals] = useState<FinancialGoal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editGoalId, setEditGoalId] = useState<string | null>(null);
    const [newGoal, setNewGoal] = useState({
        goal_name: '',
        target_amount: 0,
        target_date: '',
        priority: 'Medium' as PriorityEnum,
    });

    // Fetch goals on mount
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/financial-goals/${userId}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch goals');
                return res.json();
            })
            .then(setGoals)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Create
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
                setNewGoal({ goal_name: '', target_amount: 0, target_date: '', priority: 'Medium' });
            })
            .catch(err => setError(err.message));
    }

    // Update
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
            .catch(err => setError(err.message));
    }

    // Delete
    function handleDeleteGoal(goal_id: string) {
        fetch(`http://localhost:8000/api/financial-goals/${goal_id}`, {
            method: "DELETE"
        })
            .then(() => setGoals(goals => goals.filter(g => g.goal_id !== goal_id)))
            .catch(err => setError(err.message));
    }

    return (
        <div className="space-y-6">
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
                    {loading ? <div>Loading...</div> : (
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
                    {error && <div className="text-red-500">{error}</div>}
                </CardContent>
            </Card>
        </div>
    );
}

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

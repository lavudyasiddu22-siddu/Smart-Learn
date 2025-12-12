import { useState } from 'react';
import { Award, Calendar, Flame, Trophy, Download, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';

const weeklyData = [
    { name: 'Mon', solved: 4 },
    { name: 'Tue', solved: 3 },
    { name: 'Wed', solved: 7 },
    { name: 'Thu', solved: 5 },
    { name: 'Fri', solved: 8 },
    { name: 'Sat', solved: 12 },
    { name: 'Sun', solved: 9 },
];

const badges = [
    { id: 1, name: "Problem Solver", icon: Trophy, color: "text-yellow-500", date: "Nov 12, 2023" },
    { id: 2, name: "Fast Learner", icon: Flame, color: "text-orange-500", date: "Nov 15, 2023" },
    { id: 3, name: "Code Ninja", icon: Award, color: "text-purple-500", date: "Nov 20, 2023" },
    { id: 4, name: "Consistent", icon: Calendar, color: "text-blue-500", date: "Nov 22, 2023" },
];

const certificates = [
    { id: 1, title: "Advanced React Patterns", date: "Oct 2023", id_code: "SL-883920" },
    { id: 2, title: "Python for Data Science", date: "Sep 2023", id_code: "SL-112930" },
    { id: 3, title: "Web Security Fundamentals", date: "Aug 2023", id_code: "SL-445120" },
];

export function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');

    const handleSave = () => {
        updateProfile(name);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setName(user?.name || '');
        setIsEditing(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 space-y-2">
                    {isEditing ? (
                        <div className="flex items-center gap-2 max-w-sm">
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-lg font-bold"
                            />
                        </div>
                    ) : (
                        <h1 className="text-3xl font-bold">{user?.name || 'Student'}</h1>
                    )}
                    <p className="text-muted-foreground">{user?.email || 'student@example.com'} • BTech Student</p>
                    <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span>Rank #42</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span>12 Day Streak</span>
                        </div>
                    </div>
                </div>
                {isEditing ? (
                    <div className="flex gap-2">
                        <Button onClick={handleSave} size="sm" className="gap-2">
                            <Check className="h-4 w-4" /> Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm" className="gap-2">
                            <X className="h-4 w-4" /> Cancel
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => {
                        setName(user?.name || '');
                        setIsEditing(true);
                    }} variant="outline">Edit Profile</Button>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Activity</CardTitle>
                        <CardDescription>Problems solved in the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="name" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Bar dataKey="solved" radius={[4, 4, 0, 0]}>
                                        {weeklyData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Badges Collection</CardTitle>
                            <CardDescription>Earned achievements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {badges.map((badge) => (
                                    <div key={badge.id} className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-accent/50 transition-colors">
                                        <div className={`h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-2 ${badge.color}`}>
                                            <badge.icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-sm font-medium">{badge.name}</span>
                                        <span className="text-xs text-muted-foreground">{badge.date}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Certificates</CardTitle>
                            <CardDescription>Verified credentials</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {certificates.map((cert) => (
                                    <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Award className="h-8 w-8 text-primary" />
                                            <div>
                                                <div className="font-medium">{cert.title}</div>
                                                <div className="text-xs text-muted-foreground">Issued {cert.date} • ID: {cert.id_code}</div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

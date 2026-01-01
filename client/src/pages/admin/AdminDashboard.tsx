import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  DollarSign,
  TrendingUp,
  FileText,
  Calendar,
  ArrowRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 72000 },
    { month: 'Jun', revenue: 68000 },
  ];

  const examData = [
    { name: 'Full Length', value: 35, color: 'hsl(var(--primary))' },
    { name: 'Math', value: 25, color: 'hsl(var(--secondary))' },
    { name: 'English', value: 20, color: 'hsl(var(--accent))' },
    { name: 'GK', value: 15, color: 'hsl(var(--info))' },
    { name: 'Other', value: 5, color: 'hsl(var(--muted))' },
  ];

  const recentUsers = [
    { id: '1', name: 'Ahmed Rahman', email: 'ahmed@example.com', joined: '2025-01-15', status: 'Active' },
    { id: '2', name: 'Fatima Khan', email: 'fatima@example.com', joined: '2025-01-14', status: 'Active' },
    { id: '3', name: 'Imran Hossain', email: 'imran@example.com', joined: '2025-01-13', status: 'Active' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform performance and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="10,234"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="Active Exams"
          value="524"
          icon={BookOpen}
          trend={{ value: 8.2, isPositive: true }}
          variant="secondary"
        />
        <StatCard
          title="Revenue (This Month)"
          value="৳68,000"
          icon={DollarSign}
          trend={{ value: 15.3, isPositive: true }}
          variant="accent"
        />
        <StatCard
          title="Completion Rate"
          value="87%"
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
          variant="default"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Exam Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={examData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {examData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Users</CardTitle>
          <Link to="/admin/users">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(user.joined).toLocaleDateString()}</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/admin/questions">
          <Card className="cursor-pointer transition-smooth hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Manage Questions</h3>
                <p className="text-sm text-muted-foreground">Upload and organize question banks</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/exams">
          <Card className="cursor-pointer transition-smooth hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Manage Exams</h3>
                <p className="text-sm text-muted-foreground">Create and schedule exams</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/circulars">
          <Card className="cursor-pointer transition-smooth hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Job Circulars</h3>
                <p className="text-sm text-muted-foreground">Post and manage job listings</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

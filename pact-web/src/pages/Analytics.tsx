import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, DollarSign, FileText, Star, Users } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const Analytics = () => {
  const revenueData = [
    { month: "Jan", revenue: 0.042 },
    { month: "Feb", revenue: 0.056 },
    { month: "Mar", revenue: 0.071 },
    { month: "Apr", revenue: 0.089 },
    { month: "May", revenue: 0.105 },
    { month: "Jun", revenue: 0.128 },
  ];

  const templatePerformance = [
    { name: "Professional NDA", downloads: 1247 },
    { name: "Employment Contract", downloads: 892 },
    { name: "Service Agreement", downloads: 756 },
    { name: "Real Estate", downloads: 567 },
  ];

  const documentTypes = [
    { name: "NDA", value: 35 },
    { name: "Contracts", value: 30 },
    { name: "Employment", value: 20 },
    { name: "Real Estate", value: 15 },
  ];

  const COLORS = ["hsl(var(--icp-blue))", "hsl(var(--story-purple))", "hsl(var(--constellation-green))", "hsl(var(--bitcoin-orange))"];

  const recentActivity = [
    { action: "User purchased NDA template", time: "2 minutes ago", revenue: 0.00015 },
    { action: "Document generated", time: "15 minutes ago", revenue: 0 },
    { action: "New 5-star review", time: "1 hour ago", revenue: 0 },
    { action: "Template downloaded", time: "2 hours ago", revenue: 0.0002 },
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Analytics & Insights</h1>
            <p className="text-muted-foreground">Track performance and revenue metrics</p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-bitcoin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bitcoin">0.66 BTC</div>
              <p className="text-xs text-muted-foreground mt-1">+24% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Documents Generated</CardTitle>
              <FileText className="h-4 w-4 text-icp" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4,243</div>
              <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Template Downloads</CardTitle>
              <TrendingUp className="h-4 w-4 text-story" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground mt-1">+31% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-bitcoin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground mt-1">From 247 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--bitcoin-orange))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Top Performing Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={templatePerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={150} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="downloads" fill="hsl(var(--icp-blue))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Document Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={documentTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {documentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.revenue > 0 && (
                      <span className="text-sm font-bold text-bitcoin">+{activity.revenue} BTC</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;

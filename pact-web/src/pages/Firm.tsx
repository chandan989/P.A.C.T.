import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, TrendingUp, DollarSign, UserPlus, FileBarChart, CreditCard } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Firm = () => {
  const chartData = [
    { month: "Jan", documents: 45 },
    { month: "Feb", documents: 52 },
    { month: "Mar", documents: 61 },
    { month: "Apr", documents: 70 },
    { month: "May", documents: 85 },
    { month: "Jun", documents: 98 },
  ];

  const teamMembers = [
    { id: 1, name: "Sarah Johnson", role: "Admin", documents: 247, status: "Active" },
    { id: 2, name: "Michael Chen", role: "Lawyer", documents: 189, status: "Active" },
    { id: 3, name: "Emily Rodriguez", role: "Paralegal", documents: 156, status: "Active" },
    { id: 4, name: "David Kim", role: "Intern", documents: 42, status: "Active" },
  ];

  const clientProjects = [
    { id: 1, client: "TechCorp Inc.", documents: 45, status: "In Progress", lastActivity: "2 hours ago" },
    { id: 2, client: "Acme Industries", documents: 32, status: "Active", lastActivity: "1 day ago" },
    { id: 3, client: "Global Solutions", documents: 28, status: "In Progress", lastActivity: "3 hours ago" },
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Firm Dashboard</h1>
            <p className="text-muted-foreground">Manage your law firm operations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
            <Button variant="bitcoin">
              <FileBarChart className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-icp" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-1">+3 new this month</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Team Members</CardTitle>
              <Users className="h-4 w-4 text-story" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">Across all roles</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-bitcoin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bitcoin">$24,580</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="uppercase tracking-wide">Document Generation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
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
                <Line type="monotone" dataKey="documents" stroke="hsl(var(--bitcoin-orange))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Team Management */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          <span>•</span>
                          <span>{member.documents} docs</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-constellation/10 text-constellation">{member.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Client Projects */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Client Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientProjects.map((project) => (
                  <div key={project.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{project.client}</h3>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.documents} documents</span>
                      <span>{project.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Section */}
        <Card className="border-border mt-6">
          <CardHeader>
            <CardTitle className="uppercase tracking-wide flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing & Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-bitcoin rounded-lg bg-bitcoin/5">
                <h3 className="text-lg font-bold mb-2">Enterprise Plan</h3>
                <p className="text-3xl font-bold text-bitcoin mb-1">$499</p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">API Calls Used</span>
                  <span className="font-medium">8,420 / 50,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="font-medium">145 GB / 500 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Licenses</span>
                  <span className="font-medium">24 / Unlimited</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button variant="outline" size="lg">Manage Billing</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Firm;

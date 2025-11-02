import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Import Progress component
import { Users, FileText, DollarSign, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { FallingPattern } from "@/components/ui/falling-pattern";

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
    { id: 4, name: "David Kim", role: "Intern", documents: 42, status: "Inactive" },
  ];

  const clientProjects = [
    { id: 1, client: "TechCorp Inc.", documents: 45, status: "In Progress", lastActivity: "2 hours ago" },
    { id: 2, client: "Acme Industries", documents: 32, status: "Active", lastActivity: "1 day ago" },
    { id: 3, client: "Global Solutions", documents: 28, status: "Completed", lastActivity: "3 hours ago" },
  ];

  const apiCallsUsed = 8420;
  const apiCallsLimit = 50000;
  const storageUsed = 145;
  const storageLimit = 500;
  const activeLicenses = 24;
  const licensesLimit = "Unlimited";

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Firm Dashboard</h1>
            <p className="text-muted-foreground">Manage your law firm operations efficiently.</p>
          </div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
              </CardContent>
            </Card>

            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">Active Clients</CardTitle>
                <Users className="h-4 w-4 text-icp" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <p className="text-xs text-muted-foreground mt-1">+3 new this month</p>
              </CardContent>
            </Card>

            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">Team Members</CardTitle>
                <Users className="h-4 w-4 text-constellation" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">Across all roles</p>
              </CardContent>
            </Card>

            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-bitcoin" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-bitcoin">$24,580</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide">Document Generation Trends</CardTitle>
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
                        borderRadius: "0px",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Line type="monotone" dataKey="documents" stroke="#177BFE" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Team Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-none hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-none bg-muted flex items-center justify-center">
                            <Users className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-base">{member.name}</p>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Badge variant="secondary" className="rounded-none text-xs">{member.role}</Badge>
                              <span>•</span>
                              <span>{member.documents} documents</span>
                            </div>
                          </div>
                        </div>
                        {member.status === "Active" && (
                          <Badge className="rounded-none bg-constellation/10 text-constellation">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {member.status}
                          </Badge>
                        )}
                        {member.status === "Inactive" && (
                          <Badge className="rounded-none bg-muted text-muted-foreground">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {member.status}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Client Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Client Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clientProjects.map((project) => (
                      <div key={project.id} className="p-4 border border-border rounded-none hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-base">{project.client}</h3>
                          {project.status === "Active" && (
                            <Badge className="rounded-none bg-constellation/10 text-constellation">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {project.status}
                            </Badge>
                          )}
                          {project.status === "In Progress" && (
                            <Badge className="rounded-none bg-icp/10 text-icp">
                              <Clock className="h-3 w-3 mr-1" />
                              {project.status}
                            </Badge>
                          )}
                          {project.status === "Completed" && (
                            <Badge className="rounded-none bg-story/10 text-story">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {project.status}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{project.documents} documents</span>
                          <span>Last activity: {project.lastActivity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Billing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  Billing & Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">Enterprise Plan</p>
                      <p className="text-sm text-muted-foreground">€499 / month</p>
                    </div>
                    <Button variant="outline" size="lg" className="rounded-none">Manage Billing</Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">API Calls Used</span>
                        <span className="font-semibold text-base">{apiCallsUsed} / {apiCallsLimit}</span>
                      </div>
                      <Progress value={(apiCallsUsed / apiCallsLimit) * 100} className="h-2 [&>div]:bg-[#177BFE]" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Storage Used</span>
                        <span className="font-semibold text-base">{storageUsed} GB / {storageLimit} GB</span>
                      </div>
                      <Progress value={(storageUsed / storageLimit) * 100} className="h-2 [&>div]:bg-[#177BFE]" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Active Licenses</span>
                        <span className="font-semibold text-base">{activeLicenses} / {licensesLimit}</span>
                      </div>
                      {/* No progress bar for licenses as it's unlimited */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Firm;

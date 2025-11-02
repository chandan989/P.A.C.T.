import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Shield, Bitcoin, FileCheck, ArrowRight, Clock, CheckCircle, AlertCircle, UserPlus, FileBarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { FallingPattern } from "@/components/ui/falling-pattern";

const Dashboard = () => {
  const recentDocuments = [
    { id: 1, name: "NDA - TechCorp Partnership", type: "NDA", date: "2024-01-15", status: "Registered" },
    { id: 2, name: "Employment Contract - Jane Doe", type: "Employment", date: "2024-01-14", status: "Generated" },
    { id: 3, name: "Service Agreement - Acme Inc", type: "Contract", date: "2024-01-13", status: "Draft" },
  ];

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your legal command center</p>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">247</div>
                <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
              </CardContent>
            </Card>

            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">Active Licenses</CardTitle>
                <FileCheck className="h-4 w-4 text-story" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18</div>
                <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
              </CardContent>
            </Card>

            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">Evidence Files</CardTitle>
                <Shield className="h-4 w-4 text-constellation" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <p className="text-xs text-muted-foreground mt-1">Verified</p>
              </CardContent>
            </Card>

            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm uppercase tracking-wide">BTC Balance</CardTitle>
                <Bitcoin className="h-4 w-4 text-bitcoin" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-bitcoin">0.0042</div>
                <p className="text-xs text-muted-foreground mt-1">≈ $180.50 USD</p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Recent Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border border-border rounded-none hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-none bg-muted flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-semibold text-base">{doc.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <Badge variant="secondary" className="rounded-none text-xs">{doc.type}</Badge>
                              <span>•</span>
                              <span>{doc.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {doc.status === "Registered" && (
                            <Badge className="rounded-none bg-constellation/10 text-constellation">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {doc.status}
                            </Badge>
                          )}
                          {doc.status === "Generated" && (
                            <Badge className="rounded-none bg-icp/10 text-icp">
                              <Clock className="h-3 w-3 mr-1" />
                              {doc.status}
                            </Badge>
                          )}
                          {doc.status === "Draft" && (
                            <Badge className="rounded-none bg-muted text-muted-foreground">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {doc.status}
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" className="rounded-none">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Generate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Quick Generate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide mb-2 block">Document Type</label>
                    <Select>
                      <SelectTrigger className="rounded-none">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                        <SelectItem value="contract">Service Contract</SelectItem>
                        <SelectItem value="employment">Employment Agreement</SelectItem>
                        <SelectItem value="realestate">Real Estate Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full bg-[#177BFE] hover:bg-[#177BFE]/90 font-mono rounded-none"
                  >
                    Generate Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-xs font-semibold uppercase tracking-wide mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start rounded-none">
                        <Shield className="h-4 w-4 mr-2" />
                        Upload Evidence
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start rounded-none">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Browse Marketplace
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Dashboard;

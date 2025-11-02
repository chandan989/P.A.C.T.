import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Shield, Bitcoin, FileCheck, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const recentDocuments = [
    { id: 1, name: "NDA - TechCorp Partnership", type: "NDA", date: "2024-01-15", status: "Registered" },
    { id: 2, name: "Employment Contract - Jane Doe", type: "Employment", date: "2024-01-14", status: "Generated" },
    { id: 3, name: "Service Agreement - Acme Inc", type: "Contract", date: "2024-01-13", status: "Draft" },
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back to your legal command center</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">247</div>
              <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Active Licenses</CardTitle>
              <FileCheck className="h-4 w-4 text-story" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">18</div>
              <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Evidence Files</CardTitle>
              <Shield className="h-4 w-4 text-constellation" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">42</div>
              <p className="text-xs text-muted-foreground mt-1">Verified</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">BTC Balance</CardTitle>
              <Bitcoin className="h-4 w-4 text-bitcoin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bitcoin">0.0042</div>
              <p className="text-xs text-muted-foreground mt-1">≈ $180.50 USD</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Documents */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {doc.status === "Registered" && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-constellation/10 text-constellation">
                          <CheckCircle className="h-3 w-3" />
                          {doc.status}
                        </span>
                      )}
                      {doc.status === "Generated" && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-icp/10 text-icp">
                          <Clock className="h-3 w-3" />
                          {doc.status}
                        </span>
                      )}
                      {doc.status === "Draft" && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          <AlertCircle className="h-3 w-3" />
                          {doc.status}
                        </span>
                      )}
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Generate */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Quick Generate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Document Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                    <SelectItem value="contract">Service Contract</SelectItem>
                    <SelectItem value="employment">Employment Agreement</SelectItem>
                    <SelectItem value="realestate">Real Estate Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="bitcoin" className="w-full group">
                Generate Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-3 uppercase tracking-wide">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Upload Evidence
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Browse Marketplace
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

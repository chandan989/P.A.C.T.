import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Wallet, Shield, Network, Bell, CreditCard, Code } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout>
      <div className="p-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="networks">Networks</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-border max-w-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-bitcoin/10 flex items-center justify-center text-2xl font-bold text-bitcoin">
                    U
                  </div>
                  <Button variant="outline">Upload Avatar</Button>
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Tech Corp Inc." />
                  </div>
                </div>
                <Button variant="bitcoin">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet">
            <Card className="border-border max-w-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet & Payments
                </CardTitle>
                <CardDescription>Manage your Bitcoin wallet connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-border rounded-lg bg-bitcoin/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium uppercase tracking-wide">Wallet Status</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-constellation text-white font-medium">
                      Connected
                    </span>
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">bc1q...xyz123</p>
                </div>
                <div>
                  <Label>Current Balance</Label>
                  <div className="text-3xl font-bold text-bitcoin mt-2">0.0042 BTC</div>
                  <p className="text-sm text-muted-foreground">≈ $180.50 USD</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="bitcoin">Withdraw Earnings</Button>
                  <Button variant="outline">Disconnect Wallet</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="border-border max-w-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage authentication and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <div>
                  <Label>API Key</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value="pact_sk_1234567890abcdef" readOnly className="font-mono" />
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                <div>
                  <Label className="text-base mb-4 block">Active Sessions</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Chrome on MacOS</p>
                        <p className="text-sm text-muted-foreground">San Francisco, US • Current session</p>
                      </div>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Networks Tab */}
          <TabsContent value="networks">
            <Card className="border-border max-w-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Blockchain Networks
                </CardTitle>
                <CardDescription>Monitor network connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "ICP", status: "Connected", color: "text-icp" },
                  { name: "Story Protocol", status: "Connected", color: "text-story" },
                  { name: "Constellation", status: "Connected", color: "text-constellation" },
                  { name: "Bitcoin", status: "Connected", color: "text-bitcoin" }
                ].map((network) => (
                  <div key={network.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className={`font-bold ${network.color}`}>{network.name}</p>
                      <p className="text-sm text-muted-foreground">{network.status}</p>
                    </div>
                    <Button variant="outline" size="sm">Test Connection</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-border max-w-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Document Generation", description: "Notify when documents are generated" },
                  { label: "IP Registration", description: "Notify when IP is registered" },
                  { label: "Evidence Validation", description: "Notify when evidence is validated" },
                  { label: "Payments", description: "Notify about payment activity" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card className="border-border max-w-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing & Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 border-2 border-bitcoin rounded-lg bg-bitcoin/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Professional Plan</h3>
                      <p className="text-sm text-muted-foreground">Unlimited documents & features</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$49</p>
                      <p className="text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Upgrade Plan</Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <p className="text-2xl font-bold">247</p>
                    <p className="text-sm text-muted-foreground">Documents</p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <p className="text-2xl font-bold">18 GB</p>
                    <p className="text-sm text-muted-foreground">Storage</p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <p className="text-2xl font-bold">42</p>
                    <p className="text-sm text-muted-foreground">API Calls</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api">
            <Card className="border-border max-w-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  API & Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base mb-2 block">API Key</Label>
                  <div className="flex gap-2">
                    <Input value="pact_sk_1234567890abcdef" readOnly className="font-mono" />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                <div>
                  <Label className="text-base mb-4 block">Rate Limits</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requests per minute:</span>
                      <span className="font-medium">100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily limit:</span>
                      <span className="font-medium">10,000</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">View Documentation</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;

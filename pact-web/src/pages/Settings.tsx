import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Wallet, Shield, Network, Bell, CreditCard, Code, Save } from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { motion } from "framer-motion"; // Import motion for animations

const Settings = () => {
  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Settings</h1>
              <p className="text-muted-foreground">Manage your profile, wallet, security, and preferences</p>
            </div>
            <Button variant="outline" className="rounded-none">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </motion.div>

          {/* Settings Sections Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="border-border rounded-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
                    <User className="h-5 w-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-none bg-bitcoin/10 flex items-center justify-center text-2xl font-bold text-bitcoin">
                      U
                    </div>
                    <Button variant="outline" className="rounded-none">Upload Avatar</Button>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" className="rounded-none" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" className="rounded-none" />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Tech Corp Inc." className="rounded-none" />
                    </div>
                  </div>
                  <Button variant="bitcoin" className="rounded-none">Save Changes</Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Wallet Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="border-border rounded-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
                    <Wallet className="h-5 w-5" />
                    Wallet & Payments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border border-border rounded-none bg-bitcoin/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium uppercase tracking-wide">Wallet Status</span>
                      <span className="text-xs px-2 py-1 rounded-none bg-constellation text-white font-medium">
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
                    <Button variant="bitcoin" className="rounded-none">Withdraw Earnings</Button>
                    <Button variant="outline" className="rounded-none">Disconnect Wallet</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="border-border rounded-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch className="rounded-none" />
                  </div>
                  <div>
                    <Label>API Key</Label>
                    <div className="flex gap-2 mt-2">
                      <Input value="pact_sk_1234567890abcdef" readOnly className="font-mono rounded-none" />
                      <Button variant="outline" className="rounded-none">Copy</Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-base mb-4 block">Active Sessions</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-border rounded-none">
                        <div>
                          <p className="font-medium">Chrome on MacOS</p>
                          <p className="text-sm text-muted-foreground">San Francisco, US • Current session</p>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-none">Revoke</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Blockchain Networks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="border-border rounded-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
                    <Network className="h-5 w-5" />
                    Blockchain Networks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "ICP", status: "Connected", color: "text-icp" },
                    { name: "Story Protocol", status: "Connected", color: "text-story" },
                    { name: "Constellation", status: "Connected", color: "text-constellation" },
                    { name: "Bitcoin", status: "Connected", color: "text-bitcoin" }
                  ].map((network) => (
                    <div key={network.name} className="flex items-center justify-between p-4 border border-border rounded-none">
                      <div>
                        <p className={`font-bold ${network.color}`}>{network.name}</p>
                        <p className="text-sm text-muted-foreground">{network.status}</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-none">Test Connection</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="border-border rounded-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
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
                      <Switch className="rounded-none" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Billing & Usage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="border-border rounded-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
                    <CreditCard className="h-5 w-5" />
                    Billing & Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 border-2 border-bitcoin rounded-none bg-bitcoin/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">Professional Plan</h3>
                        <p className="text-sm text-muted-foreground">Unlimited documents & features</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">49</p>
                        <p className="text-sm text-muted-foreground">/month</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-none">Upgrade Plan</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-border rounded-none">
                      <p className="text-2xl font-bold">247</p>
                      <p className="text-sm text-muted-foreground">Documents</p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-none">
                      <p className="text-2xl font-bold">18 GB</p>
                      <p className="text-sm text-muted-foreground">Storage</p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-none">
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-sm text-muted-foreground">API Calls</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* API & Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="border-border rounded-none h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
                    <Code className="h-5 w-5" />
                    API & Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base mb-2 block">API Key</Label>
                    <div className="flex gap-2 mt-2">
                      <Input value="pact_sk_1234567890abcdef" readOnly className="font-mono rounded-none" />
                      <Button variant="outline" className="rounded-none">Regenerate</Button>
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
                  <Button variant="outline" className="rounded-none">View Documentation</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Settings;

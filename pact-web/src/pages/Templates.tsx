import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Edit, Trash, TrendingUp, DollarSign } from "lucide-react";

const Templates = () => {
  const [showCreator, setShowCreator] = useState(false);

  const myTemplates = [
    { id: 1, name: "Professional NDA", downloads: 1247, revenue: 0.18705, rating: 4.8, status: "Published" },
    { id: 2, name: "Tech Employment Contract", downloads: 892, revenue: 0.223, rating: 4.9, status: "Published" },
    { id: 3, name: "Freelancer Agreement", downloads: 2104, revenue: 0.25248, rating: 4.6, status: "Published" },
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {!showCreator ? (
          <>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">My Templates</h1>
                <p className="text-muted-foreground">Create and manage your legal document templates</p>
              </div>
              <Button variant="bitcoin" onClick={() => setShowCreator(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Templates</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Downloads</CardTitle>
                  <TrendingUp className="h-4 w-4 text-icp" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4,243</div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-bitcoin" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-bitcoin">0.66 BTC</div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Avg Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.8</div>
                </CardContent>
              </Card>
            </div>

            {/* Templates List */}
            <div className="space-y-4">
              {myTemplates.map((template) => (
                <Card key={template.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{template.downloads} downloads</span>
                            <span>•</span>
                            <span className="text-bitcoin font-medium">{template.revenue} BTC revenue</span>
                            <span>•</span>
                            <span>⭐ {template.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-constellation/10 text-constellation">{template.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Template Creator */}
            <div className="mb-8">
              <Button variant="outline" onClick={() => setShowCreator(false)} className="mb-4">
                ← Back to Templates
              </Button>
              <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Create Template</h1>
              <p className="text-muted-foreground">Design a new legal document template</p>
            </div>

            <Tabs defaultValue="info" className="space-y-6">
              <TabsList className="grid w-full max-w-2xl grid-cols-3">
                <TabsTrigger value="info">Template Info</TabsTrigger>
                <TabsTrigger value="builder">Document Builder</TabsTrigger>
                <TabsTrigger value="licensing">Licensing</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card className="border-border max-w-3xl">
                  <CardHeader>
                    <CardTitle className="uppercase tracking-wide">Template Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input id="templateName" placeholder="e.g., Professional NDA Template" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                          <SelectItem value="realestate">Real Estate</SelectItem>
                          <SelectItem value="contract">Service Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="jurisdiction">Jurisdiction</Label>
                      <Select>
                        <SelectTrigger id="jurisdiction">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delaware">Delaware, USA</SelectItem>
                          <SelectItem value="california">California, USA</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what this template is for and its key features..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input id="tags" placeholder="nda, confidentiality, business" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="builder">
                <Card className="border-border max-w-4xl">
                  <CardHeader>
                    <CardTitle className="uppercase tracking-wide">Document Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Document Content</Label>
                      <Textarea
                        placeholder="Write your template here... Use {{variable_name}} for dynamic fields"
                        rows={15}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="text-sm font-semibold mb-2 uppercase tracking-wide">Variable Placeholders</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Use these placeholders in your template:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["{{party1.name}}", "{{party2.name}}", "{{effective_date}}", "{{term.duration}}"].map((tag) => (
                          <Badge key={tag} variant="outline" className="font-mono text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="licensing">
                <Card className="border-border max-w-3xl">
                  <CardHeader>
                    <CardTitle className="uppercase tracking-wide">Licensing Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>License Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select license type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free (Attribution)</SelectItem>
                          <SelectItem value="personal">Personal Use</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="custom">Custom Terms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (BTC)</Label>
                      <Input id="price" type="number" step="0.00001" placeholder="0.00015" />
                    </div>
                    <div>
                      <Label htmlFor="royalty">Royalty Percentage</Label>
                      <Input id="royalty" type="number" min="0" max="50" placeholder="10" />
                    </div>
                    <Button variant="bitcoin" className="w-full">
                      Publish to Marketplace
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Templates;

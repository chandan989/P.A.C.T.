import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Edit, Trash, TrendingUp, DollarSign, ArrowRight, Star, Download } from "lucide-react";
import { motion } from "framer-motion";
import { FallingPattern } from "@/components/ui/falling-pattern";

const Templates = () => {
  const [showCreator, setShowCreator] = useState(false);

  const myTemplates = [
    { id: 1, name: "Professional NDA", downloads: 1247, revenue: 0.18705, rating: 4.8, status: "Published" },
    { id: 2, name: "Tech Employment Contract", downloads: 892, revenue: 0.223, rating: 4.9, status: "Published" },
    { id: 3, name: "Freelancer Agreement", downloads: 2104, revenue: 0.25248, rating: 4.6, status: "Published" },
  ];

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {!showCreator ? (
            <>
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">My Templates</h1>
                  <p className="text-muted-foreground">Create and manage your legal document templates</p>
                </div>
                <Button onClick={() => setShowCreator(true)} className="rounded-none bg-[#177BFE] hover:bg-[#177BFE]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Templates</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">3</div>
                  </CardContent>
                </Card>

                <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Downloads</CardTitle>
                    <TrendingUp className="h-4 w-4 text-icp" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">4,243</div>
                  </CardContent>
                </Card>

                <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-bitcoin" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">0.66 BTC</div>
                  </CardContent>
                </Card>

                <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Avg Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">4.8</div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Templates List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" // Changed to grid for better alignment with Marketplace
              >
                {myTemplates.map((template) => (
                  <Card key={template.id} className="rounded-none hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className="uppercase text-xs rounded-none">
                          {template.status}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-bitcoin text-bitcoin" />
                          <span className="font-medium text-sm">{template.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg uppercase tracking-wide">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Your Template</p> {/* Placeholder for creator */}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-bitcoin" />
                          <span className="text-xl font-bold text-bitcoin">{template.revenue}</span>
                          <span className="text-sm text-muted-foreground">BTC</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Download className="h-4 w-4" />
                          <span>{template.downloads}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 rounded-none">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="flex-1 rounded-none"> {/* Changed to destructive for trash */}
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            </>
          ) : (
            <>
              {/* Template Creator */}
              <div className="mb-8">
                <Button variant="outline" onClick={() => setShowCreator(false)} className="mb-4 rounded-none">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Back to Templates
                </Button>
                <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Create Template</h1>
                <p className="text-muted-foreground">Design a new legal document template</p>
              </div>

              <Tabs defaultValue="info" className="space-y-6">
                <TabsList className="grid w-full max-w-2xl grid-cols-3 rounded-none">
                  <TabsTrigger value="info" className="rounded-none">Template Info</TabsTrigger>
                  <TabsTrigger value="builder" className="rounded-none">Document Builder</TabsTrigger>
                  <TabsTrigger value="licensing" className="rounded-none">Licensing</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                  <Card className="rounded-none hover:shadow-lg transition-shadow duration-300 max-w-3xl">
                    <CardHeader>
                      <CardTitle className="uppercase tracking-wide">Template Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="templateName" className="uppercase tracking-wide text-xs">Template Name</Label>
                        <Input id="templateName" placeholder="e.g., Professional NDA Template" className="rounded-none" />
                      </div>
                      <div>
                        <Label htmlFor="category" className="uppercase tracking-wide text-xs">Category</Label>
                        <Select>
                          <SelectTrigger id="category" className="rounded-none">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                            <SelectItem value="employment">Employment</SelectItem>
                            <SelectItem value="realestate">Real Estate</SelectItem>
                            <SelectItem value="contract">Service Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="jurisdiction" className="uppercase tracking-wide text-xs">Jurisdiction</Label>
                        <Select>
                          <SelectTrigger id="jurisdiction" className="rounded-none">
                            <SelectValue placeholder="Select jurisdiction" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="delaware">Delaware, USA</SelectItem>
                            <SelectItem value="california">California, USA</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description" className="uppercase tracking-wide text-xs">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe what this template is for and its key features..."
                          rows={4}
                          className="font-mono text-sm rounded-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tags" className="uppercase tracking-wide text-xs">Tags (comma-separated)</Label>
                        <Input id="tags" placeholder="nda, confidentiality, business" className="rounded-none" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="builder">
                  <Card className="rounded-none hover:shadow-lg transition-shadow duration-300 max-w-4xl">
                    <CardHeader>
                      <CardTitle className="uppercase tracking-wide">Document Builder</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="uppercase tracking-wide text-xs">Document Content</Label>
                        <Textarea
                          placeholder="Write your template here... Use {{variable_name}} for dynamic fields"
                          rows={15}
                          className="font-mono text-sm rounded-none"
                        />
                      </div>
                      <div className="p-4 bg-muted/50 rounded-none">
                        <h4 className="text-sm font-semibold mb-2 uppercase tracking-wide">Variable Placeholders</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          Use these placeholders in your template:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["{{party1.name}}", "{{party2.name}}", "{{effective_date}}", "{{term.duration}}"].map((tag) => (
                            <Badge key={tag} variant="outline" className="font-mono text-xs rounded-none">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="licensing">
                  <Card className="rounded-none hover:shadow-lg transition-shadow duration-300 max-w-3xl">
                    <CardHeader>
                      <CardTitle className="uppercase tracking-wide">Licensing Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="uppercase tracking-wide text-xs">License Type</Label>
                        <Select>
                          <SelectTrigger className="rounded-none">
                            <SelectValue placeholder="Select license type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectItem value="free">Free (Attribution)</SelectItem>
                            <SelectItem value="personal">Personal Use</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="custom">Custom Terms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price" className="uppercase tracking-wide text-xs">Price (BTC)</Label>
                        <Input id="price" type="number" step="0.00001" placeholder="0.00015" className="rounded-none" />
                      </div>
                      <div>
                        <Label htmlFor="royalty" className="uppercase tracking-wide text-xs">Royalty Percentage</Label>
                        <Input id="royalty" type="number" min="0" max="50" placeholder="10" className="rounded-none" />
                      </div>
                      <Button
                        className="w-full bg-[#177BFE] hover:bg-[#177BFE]/90 font-mono rounded-none"
                      >
                        Publish to Marketplace
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Templates;

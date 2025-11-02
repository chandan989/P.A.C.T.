import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Download, Shield, FileCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FallingPattern } from "@/components/ui/falling-pattern";

const Generator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast.success("Document generated successfully!");
    }, 3000);
  };

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Document Generator</h1>
            <p className="text-muted-foreground">Create and manage your legal documents with ease.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left Panel - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Document Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="docType" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                      Document Type
                    </Label>
                    <Select>
                      <SelectTrigger id="docType" className="rounded-none">
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

                  <div>
                    <Label htmlFor="jurisdiction" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                      Jurisdiction
                    </Label>
                    <Select>
                      <SelectTrigger id="jurisdiction" className="rounded-none">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        <SelectItem value="delaware">Delaware, USA</SelectItem>
                        <SelectItem value="california">California, USA</SelectItem>
                        <SelectItem value="newyork">New York, USA</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="party1" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                      Party 1 (Name)
                    </Label>
                    <Input id="party1" placeholder="Enter party name" className="rounded-none" />
                  </div>

                  <div>
                    <Label htmlFor="party2" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                      Party 2 (Name)
                    </Label>
                    <Input id="party2" placeholder="Enter party name" className="rounded-none" />
                  </div>

                  <div>
                    <Label htmlFor="terms" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                      Key Terms & Clauses
                    </Label>
                    <Textarea
                      id="terms"
                      placeholder="Describe the key terms, obligations, and any specific clauses..."
                      rows={6}
                      className="rounded-none"
                    />
                  </div>

                  <Button
                    className="w-full bg-[#177BFE] hover:bg-[#177BFE]/90 font-mono rounded-none group"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Document
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Panel - Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Card className="rounded-none hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide flex items-center justify-between">
                    <span>Document Preview</span>
                    {isGenerated && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-none group">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isGenerated && !isGenerating && (
                    <div className="flex flex-col items-center justify-center h-96 text-center">
                      <FileText className="h-20 w-20 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-bold mb-2">No Document Yet</h3>
                      <p className="text-muted-foreground max-w-md">
                        Fill out the form and click Generate to create your legal document
                      </p>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="flex flex-col items-center justify-center h-96 text-center">
                      <Loader2 className="h-16 w-16 text-bitcoin animate-spin mb-6" />
                      <div className="space-y-2">
                        <p className="text-base font-medium">Analyzing requirements...</p>
                        <p className="text-muted-foreground">Drafting clauses...</p>
                        <p className="text-muted-foreground">Finalizing document...</p>
                      </div>
                    </div>
                  )}

                  {isGenerated && (
                    <div className="space-y-6">
                      <div className="bg-muted/30 p-8 rounded-none border border-border min-h-96">
                        <div className="space-y-4 font-mono text-sm">
                          <h2 className="text-2xl font-display font-bold mb-6 uppercase">
                            NON-DISCLOSURE AGREEMENT
                          </h2>
                          <p className="text-muted-foreground">
                            This Non-Disclosure Agreement (the "Agreement") is entered into as of January 15, 2024...
                          </p>
                          <p className="text-muted-foreground">
                            WHEREAS, the parties wish to explore a business opportunity...
                          </p>
                          <p className="text-muted-foreground">
                            NOW, THEREFORE, in consideration of the mutual covenants...
                          </p>
                        </div>
                      </div>

                      <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="text-sm uppercase tracking-wide flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Document Metadata
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Document ID:</span>
                            <span className="font-mono font-medium">DOC-2024-001247</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Generation Time:</span>
                            <span className="font-medium">2.8 seconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost:</span>
                            <span className="font-medium text-bitcoin">$0.001</span>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 group rounded-none">
                          <FileCheck className="h-4 w-4 mr-2 text-story" />
                          Register IP on Story
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button variant="outline" className="flex-1 group rounded-none">
                          <Shield className="h-4 w-4 mr-2 text-constellation" />
                          Store Evidence
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Generator;

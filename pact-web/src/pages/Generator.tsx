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

const Generator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [step, setStep] = useState(1);

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
      <div className="p-8">
        {/* Step Indicator */}
        <div className="mb-12 flex items-center justify-center gap-2">
          {["Create", "Configure", "Generate", "Register"].map((label, idx) => (
            <div key={label} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  step >= idx + 1
                    ? "bg-bitcoin text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <span className="font-medium uppercase text-xs tracking-wide">{label}</span>
              </div>
              {idx < 3 && (
                <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide">Document Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="docType" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                    Document Type
                  </Label>
                  <Select>
                    <SelectTrigger id="docType">
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

                <div>
                  <Label htmlFor="jurisdiction" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                    Jurisdiction
                  </Label>
                  <Select>
                    <SelectTrigger id="jurisdiction">
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Input id="party1" placeholder="Enter party name" />
                </div>

                <div>
                  <Label htmlFor="party2" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                    Party 2 (Name)
                  </Label>
                  <Input id="party2" placeholder="Enter party name" />
                </div>

                <div>
                  <Label htmlFor="terms" className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                    Key Terms & Clauses
                  </Label>
                  <Textarea
                    id="terms"
                    placeholder="Describe the key terms, obligations, and any specific clauses..."
                    rows={6}
                  />
                </div>

                <Button 
                  variant="bitcoin" 
                  className="w-full group" 
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
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-3">
            <Card className="border-border h-full">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide flex items-center justify-between">
                  <span>Document Preview</span>
                  {isGenerated && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isGenerated && !isGenerating && (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <FileText className="h-20 w-20 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Document Yet</h3>
                    <p className="text-muted-foreground max-w-md">
                      Fill out the form and click Generate to create your legal document
                    </p>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <Loader2 className="h-16 w-16 text-bitcoin animate-spin mb-6" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Analyzing requirements...</p>
                      <p className="text-muted-foreground">Drafting clauses...</p>
                      <p className="text-muted-foreground">Finalizing document...</p>
                    </div>
                  </div>
                )}

                {isGenerated && (
                  <div className="space-y-6">
                    <div className="bg-muted/30 p-8 rounded-lg border border-border min-h-96">
                      <div className="space-y-4 font-mono text-sm">
                        <h2 className="text-2xl font-bold mb-6 font-display uppercase">
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

                    <Card className="border-icp/30 bg-icp/5">
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
                      <Button variant="outline" className="flex-1 group">
                        <FileCheck className="h-4 w-4 mr-2 text-story" />
                        Register IP on Story
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button variant="outline" className="flex-1 group">
                        <Shield className="h-4 w-4 mr-2 text-constellation" />
                        Store Evidence
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Generator;

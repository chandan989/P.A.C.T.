import { useState, useRef } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Image, Video, CheckCircle, Users, Clock, Download, Folder, Loader2, LinkIcon, Eye, Shield } from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { useEvidence } from "@/hooks/use-evidence";
import { ConstellationEvidence } from "@/lib/constellation";

const Evidence = () => {
  const { evidence, loading, uploadEvidence, validateAsWitness, generateCertificate } = useEvidence();
  const [selectedEvidence, setSelectedEvidence] = useState<ConstellationEvidence | null>(null);
  const [witnessNames, setWitnessNames] = useState<string[]>(["Lawyer A", "Notary B", "Client C"]);
  const [witnessInput, setWitnessInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caseId, setCaseId] = useState("");
  const [description, setDescription] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadDialogOpen(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      await uploadEvidence(selectedFile, witnessNames, {
        caseId,
        description,
      });
      setUploadDialogOpen(false);
      setSelectedFile(null);
      setCaseId("");
      setDescription("");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleViewDetails = (ev: ConstellationEvidence) => {
    setSelectedEvidence(ev);
  };

  const handleValidate = async (evidenceId: string) => {
    const witnessName = prompt("Enter your witness ID:");
    if (witnessName) {
      await validateAsWitness(evidenceId, witnessName);
    }
  };

  const getFileIcon = (fileName: string, id?: string) => {
    // Use ID to derive type for demo data
    if (id?.includes('001')) {
      return <FileText className="h-8 w-8 text-constellation" />;
    } else if (id?.includes('002')) {
      return <Video className="h-8 w-8 text-constellation" />;
    }
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) {
      return <Image className="h-8 w-8 text-constellation" />;
    } else if (['mp4', 'avi', 'mov'].includes(ext || '')) {
      return <Video className="h-8 w-8 text-constellation" />;
    }
    return <FileText className="h-8 w-8 text-constellation" />;
  };

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Evidence Vault</h1>
            <p className="text-muted-foreground">Secure storage with multi-witness validation powered by Constellation DAG</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Folders */}
            <div className="lg:col-span-1">
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Cases & Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start rounded-none">
                    <Folder className="h-4 w-4 mr-2 text-bitcoin" />
                    All Files
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-none">
                    <Folder className="h-4 w-4 mr-2 text-bitcoin" />
                    TechCorp Case
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-none">
                    <Folder className="h-4 w-4 mr-2 text-bitcoin" />
                    Acme Partnership
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Panel - Files */}
            <div className="lg:col-span-2">
              {/* Upload Area */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Card className="rounded-none border-dashed mb-6 hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="p-12 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-bitcoin" />
                  <h3 className="font-semibold mb-2">Drop files to upload to Constellation DAG</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Immutable, multi-witness validated evidence storage
                  </p>
                  <Button 
                    variant="bitcoin" 
                    className="rounded-none"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Select Files
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Files List */}
              <div className="space-y-4">
                {evidence.length === 0 ? (
                  <Card className="rounded-none">
                    <CardContent className="p-12 text-center">
                      <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-bold mb-2">No Evidence Files</h3>
                      <p className="text-muted-foreground">
                        Upload files to create immutable evidence records on Constellation DAG
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  evidence.map((file) => (
                    <Card key={file.id} className="rounded-none hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                            {getFileIcon(file.id, file.id)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold mb-1 truncate uppercase tracking-wide">
                              {file.id}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                              <span>{new Date(file.timestamp).toLocaleDateString()}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3 mr-1 text-bitcoin" />
                                <span>{file.witnesses.length} witnesses</span>
                              </div>
                              {file.transactionId && (
                                <>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <LinkIcon className="h-3 w-3 text-constellation" />
                                    <span className="font-mono text-constellation">
                                      {file.transactionId.slice(0, 8)}...
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                            <Badge
                              className={`rounded-none uppercase text-xs ${
                                file.validatorStatus === "validated"
                                  ? "bg-constellation/10 text-constellation"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {file.validatorStatus === "validated" ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Validated
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </>
                              )}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-none"
                              onClick={() => handleViewDetails(file)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Right Panel - Details */}
            <div className="lg:col-span-1">
              <Card className="rounded-none sticky top-8">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Evidence Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedEvidence ? (
                    <>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                          Validation Status
                        </h4>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-5 w-5 text-constellation" />
                          <span className="font-medium uppercase">{selectedEvidence.validatorStatus}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                          Constellation DAG Hash
                        </h4>
                        <div className="text-xs font-mono break-all bg-muted p-2 rounded">
                          {selectedEvidence.hash}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                          Witnesses
                        </h4>
                        <div className="space-y-2">
                          {selectedEvidence.witnesses.map((witness, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-bitcoin" />
                              <span>{witness}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                          Chain of Custody
                        </h4>
                        <div className="space-y-3 text-xs">
                          {selectedEvidence.chainOfCustody.map((entry, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-constellation mt-1" />
                              <div>
                                <p className="font-medium">{entry.action}</p>
                                <p className="text-muted-foreground">
                                  {new Date(entry.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="outline" 
                          className="w-full rounded-none"
                          onClick={() => handleValidate(selectedEvidence.id)}
                        >
                          <Shield className="h-4 w-4 mr-2 text-bitcoin" />
                          Validate as Witness
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full rounded-none"
                          onClick={() => generateCertificate(selectedEvidence.id)}
                        >
                          <Download className="h-4 w-4 mr-2 text-constellation" />
                          Download Certificate
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Select an evidence file to view details
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Upload Dialog */}
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogContent className="rounded-none">
              <DialogHeader>
                <DialogTitle className="uppercase tracking-wide">Upload Evidence to Constellation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {selectedFile && (
                  <div className="p-4 bg-muted rounded border">
                    <div className="flex items-center gap-2">
                      {getFileIcon(selectedFile.name)}
                      <span className="font-medium">{selectedFile.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
                
                <div>
                  <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                    Case ID
                  </Label>
                  <Input
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                    placeholder="e.g., TECH-2025-001"
                    className="rounded-none"
                  />
                </div>

                <div>
                  <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe this evidence..."
                    rows={4}
                    className="rounded-none"
                  />
                </div>

                <div>
                  <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">
                    Witnesses (comma-separated)
                  </Label>
                  <Input
                    value={witnessNames.join(", ")}
                    onChange={(e) => setWitnessNames(e.target.value.split(",").map(s => s.trim()))}
                    placeholder="Lawyer A, Notary B, Client C"
                    className="rounded-none"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setUploadDialogOpen(false)}
                  className="rounded-none"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={loading || !selectedFile}
                  className="rounded-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload to DAG
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Evidence;

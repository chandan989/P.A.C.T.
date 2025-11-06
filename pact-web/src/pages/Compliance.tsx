import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, FileText, Calendar, Download, Search, Loader2, Link as LinkIcon, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { complianceManager, ComplianceDocument, ComplianceReport } from "@/lib/compliance";
import { JURISDICTIONS } from "@/lib/jurisdictions";
import { toast } from "sonner";

const Compliance = () => {
  const [documents, setDocuments] = useState<ComplianceDocument[]>([]);
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [complianceStatus, setComplianceStatus] = useState<any>(null);
  const [expiringDocs, setExpiringDocs] = useState<ComplianceDocument[]>([]);
  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    loadData();
    checkExpiring();
    
    // Check for expiring documents every minute
    const interval = setInterval(checkExpiring, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedJurisdiction) {
      loadComplianceStatus();
    }
  }, [selectedJurisdiction, documents]);

  const loadData = async () => {
    const docs = await complianceManager.getAllDocuments();
    const reps = await complianceManager.getAllReports();
    setDocuments(docs);
    setReports(reps);
  };

  const loadComplianceStatus = async () => {
    if (!selectedJurisdiction) return;
    const status = await complianceManager.getComplianceStatus(selectedJurisdiction);
    setComplianceStatus(status);
  };

  const checkExpiring = async () => {
    const expiring = await complianceManager.checkExpiringDocuments();
    setExpiringDocs(expiring);
    
    if (expiring.length > 0) {
      expiring.forEach(doc => {
        if (doc.status === 'expired') {
          toast.error(`Document ${doc.id} has expired!`);
        } else if (doc.status === 'expiring') {
          toast.warning(`Document ${doc.id} is expiring soon!`);
        }
      });
    }
  };

  const handleValidateDocument = async () => {
    if (!selectedJurisdiction || !selectedDocType || !documentId) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const doc = await complianceManager.validateDocument(
        documentId,
        selectedJurisdiction,
        selectedDocType
      );
      setDocuments([...documents, doc]);
      toast.success(`Document validated! Constellation hash: ${doc.validationHash?.slice(0, 16)}...`);
      setDocumentId("");
    } catch (error: any) {
      toast.error(error.message || "Failed to validate document");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!selectedJurisdiction || documents.length === 0) {
      toast.error("Please select jurisdiction and ensure documents exist");
      return;
    }

    setLoading(true);
    try {
      const docIds = documents.filter(d => d.jurisdiction === selectedJurisdiction).map(d => d.id);
      const report = await complianceManager.generateReport(selectedJurisdiction, docIds);
      setReports([...reports, report]);
      toast.success(`Report generated! Constellation hash: ${report.constellationHash?.slice(0, 16)}...`);
    } catch (error: any) {
      toast.error(error.message || "Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const handleExportAuditTrail = async (reportId: string) => {
    setLoading(true);
    try {
      const auditTrail = await complianceManager.exportAuditTrail(reportId);
      const blob = new Blob([auditTrail], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-trail-${reportId}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Audit trail exported from Constellation!");
    } catch (error: any) {
      toast.error(error.message || "Failed to export audit trail");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: ComplianceDocument['status']) => {
    const configs = {
      compliant: { icon: CheckCircle, color: 'text-constellation', bg: 'bg-constellation/10', text: 'Compliant' },
      'non-compliant': { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', text: 'Non-Compliant' },
      expiring: { icon: AlertCircle, color: 'text-bitcoin', bg: 'bg-bitcoin/10', text: 'Expiring' },
      expired: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', text: 'Expired' },
    };
    const config = configs[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.bg} ${config.color} rounded-none uppercase text-xs`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Compliance Center</h1>
            <p className="text-muted-foreground">Real-time compliance status with Constellation-validated documents</p>
          </div>

          {/* Risk Alerts */}
          {expiringDocs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bitcoin/10 border border-bitcoin/30 rounded-none p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-bitcoin" />
                <h3 className="font-bold uppercase tracking-wide">Risk Alerts</h3>
              </div>
              <div className="space-y-2">
                {expiringDocs.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between text-sm">
                    <span>{doc.name} - {doc.jurisdiction}</span>
                    <Badge variant="destructive" className="rounded-none uppercase text-xs">
                      {doc.status === 'expired' ? 'Expired' : 'Expiring Soon'}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Real-time Compliance Status */}
          {complianceStatus && (
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide">Real-Time Compliance Status - {selectedJurisdiction}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-constellation/10 rounded-none">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Compliant</p>
                    <p className="text-3xl font-bold text-constellation">{complianceStatus.compliant}</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-none">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Non-Compliant</p>
                    <p className="text-3xl font-bold text-destructive">{complianceStatus.nonCompliant}</p>
                  </div>
                  <div className="p-4 bg-bitcoin/10 rounded-none">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Expiring</p>
                    <p className="text-3xl font-bold text-bitcoin">{complianceStatus.expiring}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-none">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Average Score</p>
                    <p className="text-3xl font-bold">{Math.round(complianceStatus.averageScore)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Validation */}
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Validate Document with Constellation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Jurisdiction</Label>
                  <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {JURISDICTIONS.map((jurisdiction) => (
                        <SelectItem key={jurisdiction} value={jurisdiction}>
                          {jurisdiction}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Document Type</Label>
                  <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employment Contract">Employment Contract</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="NDA">NDA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Document ID</Label>
                  <Input
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    placeholder="Enter document ID"
                    className="rounded-none"
                  />
                </div>
              </div>
              <Button
                onClick={handleValidateDocument}
                disabled={loading}
                className="rounded-none"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                Validate on Constellation
              </Button>
            </CardContent>
          </Card>

          {/* Constellation-Validated Documents */}
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Constellation-Validated Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No validated documents yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 border border-border rounded-none hover:bg-muted/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold uppercase tracking-wide">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">{doc.jurisdiction} • {doc.documentType}</p>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span>Score: {doc.complianceScore}%</span>
                        <span>Risk: {doc.riskLevel.toUpperCase()}</span>
                        {doc.validationHash && (
                          <div className="flex items-center gap-1">
                            <LinkIcon className="h-3 w-3 text-constellation" />
                            <span className="font-mono text-constellation">{doc.validationHash.slice(0, 16)}...</span>
                          </div>
                        )}
                      </div>
                      {doc.validatedAt && (
                        <p className="text-xs text-muted-foreground">Validated: {new Date(doc.validatedAt).toLocaleString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate Report */}
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Generate Compliance Report (ICP + Constellation)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="uppercase text-xs tracking-wide font-semibold mb-2 block">Select Jurisdiction</Label>
                <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Select jurisdiction" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {JURISDICTIONS.map((jurisdiction) => (
                      <SelectItem key={jurisdiction} value={jurisdiction}>
                        {jurisdiction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleGenerateReport}
                disabled={loading || !selectedJurisdiction}
                className="rounded-none"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                Generate Report (ICP Smart Contract)
              </Button>
              <p className="text-xs text-muted-foreground">
                Report will be stored on ICP canister with audit trail on Constellation DAG
              </p>
            </CardContent>
          </Card>

          {/* Compliance Reports */}
          <Card className="rounded-none">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Compliance Reports (Constellation Audit Trail)</CardTitle>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No reports generated yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 border border-border rounded-none">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold uppercase tracking-wide">{report.name}</h3>
                          <p className="text-xs text-muted-foreground">{new Date(report.generatedAt).toLocaleString()}</p>
                        </div>
                        <Badge
                          className={`rounded-none uppercase text-xs ${
                            report.riskLevel === 'low'
                              ? 'bg-constellation/10 text-constellation'
                              : report.riskLevel === 'medium'
                              ? 'bg-bitcoin/10 text-bitcoin'
                              : 'bg-destructive/10 text-destructive'
                          }`}
                        >
                          {report.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Adherence</p>
                          <p className="text-2xl font-bold text-constellation">{report.adherence}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Documents</p>
                          <p className="text-2xl font-bold">{report.documents.length}</p>
                        </div>
                      </div>
                      {report.constellationHash && (
                        <div className="flex items-center gap-2 mb-3 text-xs">
                          <LinkIcon className="h-3 w-3 text-constellation" />
                          <span className="font-mono text-constellation">Constellation Hash: {report.constellationHash.slice(0, 16)}...</span>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-none"
                        onClick={() => handleExportAuditTrail(report.id)}
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                        Export Audit Trail from Constellation
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Compliance;

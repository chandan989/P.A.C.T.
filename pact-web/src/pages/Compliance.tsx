import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, FileText, Calendar, Download } from "lucide-react";

const Compliance = () => {
  const regulatoryUpdates = [
    {
      id: 1,
      date: "2024-01-10",
      jurisdiction: "California",
      title: "New Employment Law Requirements",
      impact: "High",
      summary: "Updated mandatory clauses for employment contracts effective Q2 2024"
    },
    {
      id: 2,
      date: "2024-01-08",
      jurisdiction: "Delaware",
      title: "Corporate Governance Updates",
      impact: "Medium",
      summary: "Changes to board resolution requirements for Delaware corporations"
    },
    {
      id: 3,
      date: "2024-01-05",
      jurisdiction: "Federal",
      title: "Data Privacy Regulations",
      impact: "High",
      summary: "New federal data protection standards for NDAs and contracts"
    },
  ];

  const complianceReports = [
    { name: "Q4 2023 Compliance Audit", date: "2024-01-01", adherence: 98, risk: "Low" },
    { name: "Q3 2023 Compliance Audit", date: "2023-10-01", adherence: 96, risk: "Low" },
    { name: "Q2 2023 Compliance Audit", date: "2023-07-01", adherence: 94, risk: "Medium" },
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Compliance Center</h1>
          <p className="text-muted-foreground">Monitor regulatory compliance and jurisdictional requirements</p>
        </div>

        {/* Jurisdiction Checker */}
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="uppercase tracking-wide">Jurisdiction Compliance Checker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block uppercase tracking-wide">Jurisdiction</label>
                <Select>
                  <SelectTrigger>
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
                <label className="text-sm font-medium mb-2 block uppercase tracking-wide">Document Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                    <SelectItem value="employment">Employment Contract</SelectItem>
                    <SelectItem value="contract">Service Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="bitcoin" className="w-full md:w-auto">
              Check Compliance
            </Button>

            {/* Results */}
            <div className="mt-6 p-6 bg-muted/30 rounded-lg border border-border space-y-4">
              <h3 className="font-bold uppercase tracking-wide mb-4">Compliance Results</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-constellation/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-constellation flex-shrink-0" />
                  <span className="text-sm">Confidentiality clause meets California requirements</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-constellation/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-constellation flex-shrink-0" />
                  <span className="text-sm">Non-compete terms comply with state limitations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  <span className="text-sm">Missing mandatory arbitration disclosure</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-bitcoin/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-bitcoin flex-shrink-0" />
                  <span className="text-sm">Consider adding indemnification clause for enhanced protection</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Updates Feed */}
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle className="uppercase tracking-wide flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Regulatory Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regulatoryUpdates.map((update) => (
                <div key={update.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="uppercase text-xs">
                        {update.jurisdiction}
                      </Badge>
                      <Badge
                        className={
                          update.impact === "High"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-bitcoin/10 text-bitcoin"
                        }
                      >
                        {update.impact} Impact
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{update.date}</span>
                  </div>
                  <h3 className="font-bold mb-2">{update.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{update.summary}</p>
                  <Button variant="outline" size="sm">
                    Apply to Templates
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Trail & Reports */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Document Generated</p>
                      <p className="text-xs text-muted-foreground">2024-01-15 10:30 AM</p>
                    </div>
                  </div>
                  <Badge className="bg-constellation/10 text-constellation">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Template Updated</p>
                      <p className="text-xs text-muted-foreground">2024-01-14 03:20 PM</p>
                    </div>
                  </div>
                  <Badge className="bg-constellation/10 text-constellation">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Compliance Check</p>
                      <p className="text-xs text-muted-foreground">2024-01-13 11:15 AM</p>
                    </div>
                  </div>
                  <Badge className="bg-bitcoin/10 text-bitcoin">Warning</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Export Audit Log
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Compliance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceReports.map((report, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{report.name}</h3>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Adherence</p>
                        <p className="text-2xl font-bold text-constellation">{report.adherence}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Risk Level</p>
                        <Badge
                          className={
                            report.risk === "Low"
                              ? "bg-constellation/10 text-constellation"
                              : "bg-bitcoin/10 text-bitcoin"
                          }
                        >
                          {report.risk}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Compliance;

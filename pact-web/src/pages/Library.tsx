import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, FileText, Download, Share, Archive, CheckCircle, Clock, AlertCircle, Grid, List } from "lucide-react";

const Library = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const documents = [
    { id: 1, name: "NDA - TechCorp Partnership", type: "NDA", status: "Registered", date: "2024-01-15", jurisdiction: "Delaware", parties: "TechCorp, Acme Inc" },
    { id: 2, name: "Employment Contract - Jane Doe", type: "Employment", status: "Generated", date: "2024-01-14", jurisdiction: "California", parties: "Company, Jane Doe" },
    { id: 3, name: "Service Agreement - Acme Inc", type: "Contract", status: "Draft", date: "2024-01-13", jurisdiction: "New York", parties: "Company, Acme Inc" },
    { id: 4, name: "Real Estate Purchase - 123 Main St", type: "Real Estate", status: "Registered", date: "2024-01-12", jurisdiction: "California", parties: "Buyer, Seller" },
    { id: 5, name: "Freelancer Agreement - Bob Smith", type: "Contract", status: "Generated", date: "2024-01-11", jurisdiction: "Delaware", parties: "Company, Bob Smith" },
    { id: 6, name: "Mutual NDA - Strategic Partnership", type: "NDA", status: "Registered", date: "2024-01-10", jurisdiction: "Delaware", parties: "Company A, Company B" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Registered":
        return <CheckCircle className="h-4 w-4 text-constellation" />;
      case "Generated":
        return <Clock className="h-4 w-4 text-icp" />;
      case "Draft":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registered":
        return "bg-constellation/10 text-constellation";
      case "Generated":
        return "bg-icp/10 text-icp";
      case "Draft":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Document Library</h1>
          <p className="text-muted-foreground">Manage and organize all your legal documents</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search documents..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="nda">NDA</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="employment">Employment</SelectItem>
              <SelectItem value="realestate">Real Estate</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="registered">Registered</SelectItem>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Created</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mb-6 flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <Checkbox />
          <span className="text-sm font-medium">Select All</span>
          <div className="flex-1" />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Bulk Download
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected
          </Button>
        </div>

        {/* Documents Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 truncate">{doc.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                    </div>
                    <Checkbox />
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={getStatusColor(doc.status)}>
                        {getStatusIcon(doc.status)}
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{doc.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jurisdiction:</span>
                      <span>{doc.jurisdiction}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <Card key={doc.id} className="border-border hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox />
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{doc.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span>{doc.jurisdiction}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      {doc.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Library;

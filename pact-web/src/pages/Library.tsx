import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, FileText, Download, Share, Archive, CheckCircle, Clock, AlertCircle, Grid, List, PlusCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { FallingPattern } from "@/components/ui/falling-pattern";

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
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case "Generated":
        return <Clock className="h-3 w-3 mr-1" />;
      case "Draft":
        return <AlertCircle className="h-3 w-3 mr-1" />;
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
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Document Library</h1>
            <p className="text-muted-foreground">Manage and organize all your legal documents efficiently.</p>
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-4 items-center"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10 rounded-none" />
            </div>
            <Select>
              <SelectTrigger className="w-full lg:w-48 rounded-none">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="nda">NDA</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="realestate">Real Estate</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full lg:w-48 rounded-none">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="generated">Generated</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full lg:w-48 rounded-none">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="date">Date Created</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                className={viewMode === "grid" ? "bg-[#177BFE] hover:bg-[#177BFE]/90 text-primary-foreground rounded-none" : "bg-muted hover:bg-muted-foreground/10 text-muted-foreground rounded-none"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                className={viewMode === "list" ? "bg-[#177BFE] hover:bg-[#177BFE]/90 text-primary-foreground rounded-none" : "bg-muted hover:bg-muted-foreground/10 text-muted-foreground rounded-none"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Bulk Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="rounded-none hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide">Bulk Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Checkbox className="rounded-none" />
                <span className="text-xs font-semibold uppercase tracking-wide">Select All</span>
                <div className="flex-1" />
                <Button variant="outline" size="sm" className="rounded-none">
                  <Download className="h-4 w-4 mr-2" />
                  Bulk Download
                </Button>
                <Button variant="outline" size="sm" className="rounded-none">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Selected
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documents Grid/List */}
          {viewMode === "grid" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {documents.map((doc) => (
                <Card key={doc.id} className="rounded-none hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-none bg-muted flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base mb-1 truncate">{doc.name}</h3>
                        <Badge variant="secondary" className="text-xs rounded-none">
                          {doc.type}
                        </Badge>
                      </div>
                      <Checkbox className="rounded-none" />
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-none ${getStatusColor(doc.status)}`}>
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
                      <Button variant="outline" size="sm" className="flex-1 rounded-none">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-none">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-none">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3"
            >
              {documents.map((doc) => (
                <Card key={doc.id} className="rounded-none hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Checkbox className="rounded-none" />
                      <div className="w-10 h-10 rounded-none bg-muted flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base">{doc.name}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs rounded-none">{doc.type}</Badge>
                          <span>•</span>
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.jurisdiction}</span>
                        </div>
                      </div>
                      <Badge className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-none ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        {doc.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-none">View</Button>
                        <Button variant="ghost" size="sm" className="rounded-none">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-none">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Library;

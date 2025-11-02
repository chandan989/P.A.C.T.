import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image, Video, CheckCircle, Users, Clock, Download, Folder } from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";

const Evidence = () => {
  const evidenceFiles = [
    {
      id: 1,
      name: "Contract_Signed.pdf",
      uploadDate: "2024-01-15",
      validationStatus: "Validated",
      witnesses: 3,
      type: "document"
    },
    {
      id: 2,
      name: "Meeting_Recording.mp4",
      uploadDate: "2024-01-14",
      validationStatus: "Pending",
      witnesses: 2,
      type: "video"
    },
    {
      id: 3,
      name: "Evidence_Photo_001.jpg",
      uploadDate: "2024-01-13",
      validationStatus: "Validated",
      witnesses: 3,
      type: "image"
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-8 w-8 text-black" />;
      case "video":
        return <Video className="h-8 w-8 text-black" />;
      case "image":
        return <Image className="h-8 w-8 text-black" />;
      default:
        return <FileText className="h-8 w-8 text-black" />;
    }
  };

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 space-y-8 font-mono"> {/* Added font-mono and space-y-8 */}
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Evidence Vault</h1>
            <p className="text-muted-foreground">Secure storage with multi-witness validation</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Folders */}
            <div className="lg:col-span-1">
              <Card className="rounded-none"> {/* Applied rounded-none */}
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">Cases & Projects</CardTitle> {/* Applied uppercase tracking-wide */}
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start rounded-none"> {/* Applied rounded-none */}
                    <Folder className="h-4 w-4 mr-2 text-bitcoin" /> {/* Changed icon to Folder and added text-bitcoin */}
                    All Files
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-none"> {/* Applied rounded-none */}
                    <Folder className="h-4 w-4 mr-2 text-bitcoin" /> {/* Changed icon to Folder and added text-bitcoin */}
                    TechCorp Case
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-none"> {/* Applied rounded-none */}
                    <Folder className="h-4 w-4 mr-2 text-bitcoin" /> {/* Changed icon to Folder and added text-bitcoin */}
                    Acme Partnership
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-none"> {/* Applied rounded-none */}
                    <Folder className="h-4 w-4 mr-2 text-bitcoin" /> {/* Changed icon to Folder and added text-bitcoin */}
                    Legal Archives
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Panel - Files */}
            <div className="lg:col-span-2">
              {/* Upload Area */}
              <Card className="rounded-none border-dashed mb-6 hover:bg-muted/50 transition-colors cursor-pointer"> {/* Applied rounded-none */}
                <CardContent className="p-12 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-bitcoin" /> {/* Added text-bitcoin */}
                  <h3 className="font-semibold mb-2">Drop files to upload</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <Button variant="bitcoin" className="rounded-none">Select Files</Button> {/* Applied rounded-none */}
                </CardContent>
              </Card>

              {/* Files List */}
              <div className="space-y-4">
                {evidenceFiles.map((file) => (
                  <Card key={file.id} className="rounded-none hover:shadow-lg transition-shadow"> {/* Applied rounded-none and hover:shadow-lg */}
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center"> {/* Removed bg-muted */}
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1 truncate uppercase tracking-wide">{file.name}</h3> {/* Applied uppercase tracking-wide */}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <span>{file.uploadDate}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 mr-1 text-bitcoin" /> {/* Added text-bitcoin */}
                              <span>{file.witnesses} witnesses</span>
                            </div>
                          </div>
                          <Badge
                            className={`rounded-none uppercase text-xs ${ // Applied rounded-none, uppercase, text-xs
                              file.validationStatus === "Validated"
                                ? "bg-constellation/10 text-constellation"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {file.validationStatus === "Validated" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {file.validationStatus}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-none">View Details</Button> {/* Applied rounded-none */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Panel - Details */}
            <div className="lg:col-span-1">
              <Card className="rounded-none sticky top-8"> {/* Applied rounded-none */}
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wide">File Details</CardTitle> {/* Applied uppercase tracking-wide */}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      Validation Status
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-5 w-5 text-bitcoin" /> {/* Changed to text-bitcoin */}
                      <span className="font-medium">Validated</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      Witnesses
                    </h4>
                    <div className="space-y-2">
                      {["Alice Johnson", "Bob Smith", "Carol Williams"].map((witness, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-bitcoin" /> {/* Changed to text-bitcoin */}
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
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-bitcoin mt-1" /> {/* Changed to bg-bitcoin */}
                        <div>
                          <p className="font-medium">Uploaded</p>
                          <p className="text-muted-foreground">2024-01-15 10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-bitcoin mt-1" /> {/* Changed to bg-bitcoin */}
                        <div>
                          <p className="font-medium">Witness 1 Verified</p>
                          <p className="text-muted-foreground">2024-01-15 11:15 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-bitcoin mt-1" /> {/* Changed to bg-bitcoin */}
                        <div>
                          <p className="font-medium">Validated</p>
                          <p className="text-muted-foreground">2024-01-15 02:45 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full rounded-none"> {/* Applied rounded-none */}
                    <Download className="h-4 w-4 mr-2 text-bitcoin" /> {/* Added text-bitcoin */}
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Evidence;

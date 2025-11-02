import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, Code, MessageCircle, Github, Send } from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { motion } from "framer-motion"; // Import motion for animations

const Help = () => {
  const popularSearches = ["Getting Started", "API Documentation", "Bitcoin Payments", "IP Registration"];

  const categories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      articles: [
        "Quick Start Guide",
        "First Document Tutorial",
        "Setting Up Your Wallet",
        "Understanding P.A.C.T."
      ]
    },
    {
      title: "Features",
      icon: Code,
      articles: [
        "Document Generation Guide",
        "IP Licensing Explained",
        "Evidence Validation Tutorial",
        "Bitcoin Payments Setup"
      ]
    },
    {
      title: "Advanced",
      icon: Code,
      articles: [
        "API Documentation",
        "Multi-Chain Architecture",
        "Smart Contract Integration",
        "Troubleshooting Guide"
      ]
    }
  ];

  const videoTutorials = [
    { title: "Getting Started with P.A.C.T.", duration: "5:30", thumbnail: "video1" },
    { title: "Creating Your First Document", duration: "8:15", thumbnail: "video2" },
    { title: "Setting Up Bitcoin Wallet", duration: "6:45", thumbnail: "video3" },
  ];

  return (
    <AppLayout>
      <FallingPattern>
        <div className="p-8 font-mono">
          {/* Hero Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-display font-bold mb-6 uppercase tracking-wide">How Can We Help?</h1>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                className="pl-12 h-14 text-lg rounded-none"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popularSearches.map((search) => (
                <Badge key={search} variant="outline" className="cursor-pointer hover:bg-muted rounded-none">
                  {search}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-6 uppercase tracking-wide">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.title} className="border-border hover:shadow-lg transition-shadow rounded-none h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 uppercase tracking-wide">
                      <div className="w-10 h-10 rounded-none bg-bitcoin/10 flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-bitcoin" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article) => (
                        <li key={article}>
                          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left">
                            {article}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Video Tutorials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-6 uppercase tracking-wide">Video Tutorials</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoTutorials.map((video, idx) => (
                <Card key={idx} className="border-border hover:shadow-lg transition-shadow group cursor-pointer rounded-none h-full">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-t-none flex items-center justify-center relative overflow-hidden">
                      <Video className="h-12 w-12 text-muted-foreground group-hover:text-bitcoin transition-colors" />
                      <div className="absolute bottom-2 right-2 bg-near-black/80 text-white px-2 py-1 rounded-none text-xs font-medium">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-bitcoin transition-colors">{video.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Community & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <Card className="border-border rounded-none h-full">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide">Community Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start h-auto py-4 rounded-none">
                  <MessageCircle className="h-5 w-5 mr-3 text-story" />
                  <div className="text-left">
                    <div className="font-semibold">Join Discord Community</div>
                    <div className="text-xs text-muted-foreground">Connect with other users and get help</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-4 rounded-none">
                  <Github className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">GitHub Repository</div>
                    <div className="text-xs text-muted-foreground">View open source code and examples</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-4 rounded-none">
                  <BookOpen className="h-5 w-5 mr-3 text-icp" />
                  <div className="text-left">
                    <div className="font-semibold">Feature Requests</div>
                    <div className="text-xs text-muted-foreground">Suggest new features and improvements</div>
                  </div>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border rounded-none h-full">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide">Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Email</label>
                    <Input placeholder="you@example.com" className="rounded-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="How can we help?" className="rounded-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <textarea
                      className="w-full min-h-32 px-3 py-2 rounded-none border border-input bg-background text-sm resize-none"
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                  <Button variant="bitcoin" className="w-full rounded-none">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="border-border mt-6 rounded-none">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { q: "How do I generate my first document?", a: "Navigate to the Generate Document page, fill in the required information, and click Generate. Your document will be ready in seconds." },
                  { q: "What blockchains does P.A.C.T. use?", a: "P.A.C.T. integrates with ICP for document generation, Story Protocol for IP registration, Constellation for evidence validation, and Bitcoin for payments." },
                  { q: "How do Bitcoin payments work?", a: "Connect your Bitcoin wallet in Settings. All marketplace transactions are processed in BTC with near-instant settlement." },
                  { q: "Can I create custom templates?", a: "Yes! Navigate to My Templates and click Create Template to design your own legal document templates and monetize them on the marketplace." }
                ].map((faq, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-none">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </FallingPattern>
    </AppLayout>
  );
};

export default Help;

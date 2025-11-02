import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Bitcoin, Download, Eye } from "lucide-react";

const Marketplace = () => {
  const templates = [
    {
      id: 1,
      name: "Professional NDA Template",
      creator: "Legal Pro Inc.",
      price: 0.00015,
      type: "NDA",
      rating: 4.8,
      downloads: 1247,
      license: "Commercial"
    },
    {
      id: 2,
      name: "Employment Agreement - Tech",
      creator: "TechLaw Solutions",
      price: 0.00025,
      type: "Employment",
      rating: 4.9,
      downloads: 892,
      license: "Commercial"
    },
    {
      id: 3,
      name: "Service Contract Template",
      creator: "Contract Experts",
      price: 0.0002,
      type: "Contract",
      rating: 4.7,
      downloads: 1563,
      license: "Commercial"
    },
    {
      id: 4,
      name: "Real Estate Purchase Agreement",
      creator: "Property Law Firm",
      price: 0.0003,
      type: "Real Estate",
      rating: 4.9,
      downloads: 567,
      license: "Commercial"
    },
    {
      id: 5,
      name: "Freelancer Service Agreement",
      creator: "Gig Economy Legal",
      price: 0.00012,
      type: "Contract",
      rating: 4.6,
      downloads: 2104,
      license: "Personal"
    },
    {
      id: 6,
      name: "Mutual NDA - Two Party",
      creator: "Corporate Counsel",
      price: 0.00018,
      type: "NDA",
      rating: 4.8,
      downloads: 934,
      license: "Commercial"
    }
  ];

  return (
    <AppLayout>
      <div className="p-8">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-48">
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
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="License Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Licenses</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="uppercase text-xs">
                    {template.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-bitcoin text-bitcoin" />
                    <span className="font-medium text-sm">{template.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{template.creator}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5 text-bitcoin" />
                    <span className="text-2xl font-bold text-bitcoin">{template.price}</span>
                    <span className="text-sm text-muted-foreground">BTC</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="h-4 w-4" />
                    <span>{template.downloads}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="secondary" className="uppercase">
                    {template.license}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="bitcoin" size="sm" className="flex-1">
                  Purchase
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Templates
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;

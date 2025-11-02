import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Download, TrendingUp, TrendingDown, DollarSign, Bitcoin } from "lucide-react";

const Transactions = () => {
  const transactions = [
    { id: 1, date: "2024-01-15", type: "Sale", description: "Professional NDA Template", amount: 0.00015, status: "Completed", txHash: "bc1q...xyz123" },
    { id: 2, date: "2024-01-14", type: "Purchase", description: "Employment Template", amount: -0.00025, status: "Completed", txHash: "bc1q...abc456" },
    { id: 3, date: "2024-01-14", type: "Royalty", description: "Template Usage Fee", amount: 0.00008, status: "Completed", txHash: "bc1q...def789" },
    { id: 4, date: "2024-01-13", type: "Withdrawal", description: "To External Wallet", amount: -0.05, status: "Pending", txHash: "bc1q...ghi012" },
    { id: 5, date: "2024-01-12", type: "Sale", description: "Service Contract Template", amount: 0.0002, status: "Completed", txHash: "bc1q...jkl345" },
    { id: 6, date: "2024-01-11", type: "Royalty", description: "Template Usage Fee", amount: 0.00012, status: "Completed", txHash: "bc1q...mno678" },
    { id: 7, date: "2024-01-10", type: "Sale", description: "Real Estate Template", amount: 0.0003, status: "Completed", txHash: "bc1q...pqr901" },
    { id: 8, date: "2024-01-09", type: "Purchase", description: "Legal Clause Library", amount: -0.0001, status: "Failed", txHash: "bc1q...stu234" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-constellation/10 text-constellation";
      case "Pending":
        return "bg-bitcoin/10 text-bitcoin";
      case "Failed":
        return "bg-destructive/10 text-destructive";
      default:
        return "";
    }
  };

  const getTypeIcon = (type: string) => {
    const isIncome = type === "Sale" || type === "Royalty";
    return isIncome ? <TrendingUp className="h-4 w-4 text-constellation" /> : <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2 uppercase tracking-wide">Transaction History</h1>
          <p className="text-muted-foreground">View all your Bitcoin transactions and earnings</p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Spent</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0.0506 BTC</div>
              <p className="text-xs text-muted-foreground mt-1">≈ $2,180 USD</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-constellation" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-constellation">0.66 BTC</div>
              <p className="text-xs text-muted-foreground mt-1">≈ $28,380 USD</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Pending</CardTitle>
              <DollarSign className="h-4 w-4 text-bitcoin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-bitcoin">0.05 BTC</div>
              <p className="text-xs text-muted-foreground mt-1">1 transaction</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Total Royalties</CardTitle>
              <Bitcoin className="h-4 w-4 text-bitcoin" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0.024 BTC</div>
              <p className="text-xs text-muted-foreground mt-1">From template usage</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sale">Sales</SelectItem>
              <SelectItem value="purchase">Purchases</SelectItem>
              <SelectItem value="royalty">Royalties</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Transactions Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="uppercase tracking-wide">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      {getTypeIcon(tx.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="uppercase text-xs">
                          {tx.type}
                        </Badge>
                        <h3 className="font-medium truncate">{tx.description}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{tx.date}</span>
                        <span>•</span>
                        <button className="font-mono hover:text-bitcoin transition-colors">
                          {tx.txHash}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${tx.amount > 0 ? 'text-constellation' : 'text-foreground'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount} BTC
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ≈ ${(Math.abs(tx.amount) * 43000).toFixed(2)} USD
                      </div>
                    </div>
                    <Badge className={getStatusColor(tx.status)}>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Report Section */}
        <Card className="border-border mt-6">
          <CardHeader>
            <CardTitle className="uppercase tracking-wide">Tax Reporting</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-2">Download a comprehensive tax report for your accountant</p>
              <p className="text-sm text-muted-foreground">Includes all transactions, gains, and losses</p>
            </div>
            <Button variant="bitcoin">
              <Download className="h-4 w-4 mr-2" />
              Download Tax Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Transactions;

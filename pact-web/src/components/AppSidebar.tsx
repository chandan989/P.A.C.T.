import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Library,
  Building2,
  ShoppingCart,
  Sparkles,
  Shield,
  BarChart3,
  Scale,
  DollarSign,
  Settings,
  HelpCircle,
  Bitcoin
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Generate Document", href: "/generate", icon: FileText },
  { name: "Document Library", href: "/library", icon: Library },
  { name: "Firm Dashboard", href: "/firm", icon: Building2 },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingCart },
  { name: "My Templates", href: "/templates", icon: Sparkles },
  { name: "Evidence Vault", href: "/evidence", icon: Shield },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Compliance Center", href: "/compliance", icon: Scale },
  { name: "Transactions", href: "/transactions", icon: DollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card flex-shrink-0">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={"logo.svg"} className="h-8 w-auto"/>
            <span className="text-2xl font-display font-bold uppercase tracking-wider">P.A.C.T.</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-bitcoin text-white"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bitcoin/10 flex items-center justify-center font-bold text-bitcoin">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

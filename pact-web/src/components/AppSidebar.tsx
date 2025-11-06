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
  Bitcoin,
  ChevronLeft,
  ChevronRight,
  Power,
  FileSignature
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useState } from "react";

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
  { name: "Smart Contracts", href: "/smart-contracts", icon: FileSignature },
  { name: "Transactions", href: "/transactions", icon: DollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export const AppSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed

  return (
    <aside
      className={cn(
        "flex-shrink-0 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full relative">
        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 z-10 p-1 rounded-md bg-background text-foreground"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Logo */}
        <div className={cn("py-5", isCollapsed ? "px-2" : "px-6")}>
          <Link to="/dashboard" className="flex items-center gap-2 justify-center">
            <img src={"logo.svg"} className="h-8 w-auto"/>
            {!isCollapsed && <span className="text-2xl font-display font-bold uppercase tracking-wider">P.A.C.T.</span>}
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
                  "flex items-center gap-2 rounded-md text-sm font-medium transition-colors",
                  isCollapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5",
                  isActive
                    ? "bg-bitcoin text-white"
                    : "text-foreground hover:bg-muted-foreground/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className={cn("py-4", isCollapsed ? "px-2" : "px-4")}>
          {/*<div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>*/}
          {/*  <div className="w-10 h-10 rounded-md bg-bitcoin/10 flex items-center justify-center font-bold text-bitcoin">*/}
          {/*    U*/}
          {/*  </div>*/}
          {/*  {!isCollapsed && (*/}
          {/*    <div className="flex-1 min-w-0">*/}
          {/*      <p className="text-sm font-medium truncate">John Doe</p>*/}
          {/*      <p className="text-xs text-muted-foreground truncate">john@example.com</p>*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</div>*/}
          {/* Power Off Button */}
          <Link
            to="/"
            className={cn(
              "mt-4 flex items-center gap-2 rounded-md text-sm font-medium transition-colors",
              isCollapsed ? "justify-center px-2 py-2.5" : "px-4 py-2.5",
              "text-foreground hover:bg-muted-foreground/10"
            )}
          >
            <Power className="h-5 w-5" />
            {!isCollapsed && "Power Off"}
          </Link>
        </div>
      </div>
    </aside>
  );
};

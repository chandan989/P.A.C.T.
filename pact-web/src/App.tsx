import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Generator from "./pages/Generator";
import Library from "./pages/Library";
import Firm from "./pages/Firm";
import Marketplace from "./pages/Marketplace";
import Templates from "./pages/Templates";
import Evidence from "./pages/Evidence";
import Analytics from "./pages/Analytics";
import Compliance from "./pages/Compliance";
import Transactions from "./pages/Transactions";
import SmartContracts from "./pages/SmartContracts";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate" element={<Generator />} />
          <Route path="/library" element={<Library />} />
          <Route path="/firm" element={<Firm />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/smart-contracts" element={<SmartContracts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

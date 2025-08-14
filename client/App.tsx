import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeProvider from "./components/DarkModeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Files from "./pages/Files";
import Reminders from "./pages/Reminders";
import EForum from "./pages/EForum";
import AI2AIMStore from "./pages/AI2AIMStore";
import Activities from "./pages/Activities";
import Meetings from "./pages/Meetings";
import Events from "./pages/Events";
import Records from "./pages/Records";
import Performance from "./pages/Performance";
import MediaResources from "./pages/MediaResources";
import Payroll from "./pages/Payroll";
import Offboarding from "./pages/Offboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/files" element={<Files />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/e-forum" element={<EForum />} />
          <Route path="/ai2aim-store" element={<AI2AIMStore />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/events" element={<Events />} />
          <Route path="/records" element={<Records />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/media-resources" element={<MediaResources />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/offboarding" element={<Offboarding />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

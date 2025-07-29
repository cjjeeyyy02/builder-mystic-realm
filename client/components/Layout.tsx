import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Header */}
      <div className="lg:ml-[260px] h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500 hover:bg-red-500" />
          </Button>
          
          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-card-foreground">John Doe</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[260px] p-4 lg:p-8 bg-muted/30 min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
}

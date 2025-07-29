import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Bell, Search, Settings } from "lucide-react";

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
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="p-2 hover:bg-accent rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm lg:text-base">JD</span>
            </div>
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

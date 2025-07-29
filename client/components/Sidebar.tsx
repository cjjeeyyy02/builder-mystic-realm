import { Link, useLocation } from "react-router-dom";
import { X, Home, Users, FileText, BarChart3, Folder, CreditCard, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: Home },
  { label: "Onboarding", path: "/", icon: Users },
  { label: "Records", path: "/records", icon: FileText },
  { label: "Performance", path: "/performance", icon: BarChart3 },
  { label: "Media Resources", path: "/media-resources", icon: Folder },
  { label: "Payroll", path: "/payroll", icon: CreditCard },
  { label: "Offboarding", path: "/offboarding", icon: LogOut },
];

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();

  return (
    <TooltipProvider>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${isCollapsed ? 'w-[80px]' : 'w-[280px] lg:w-[260px]'} bg-sidebar-background h-screen fixed left-0 top-0 z-30 transform transition-all duration-300 ease-in-out shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-sidebar-border">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-sidebar-foreground">AI2AIM WORKSPACE</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-auto p-0 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground/80 justify-start gap-1"
                    >
                      Employee Management System
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem>
                      <Users className="w-4 h-4 mr-2" />
                      Employee Management System
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="w-4 h-4 mr-2" />
                      Document Management
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics Dashboard
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          )}
        </div>



        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-sidebar-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            if (isCollapsed) {
              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-center h-12 px-3 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                      asChild
                    >
                      <Link to={item.path} onClick={onClose}>
                        <Icon className="w-5 h-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-auto py-3 px-4 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                asChild
              >
                <Link to={item.path} onClick={onClose}>
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Separator className="mb-4" />
          <div className="text-xs text-sidebar-foreground/60 text-center">
            {isCollapsed ? "©" : "© AI2AIM WORKSPACE"}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

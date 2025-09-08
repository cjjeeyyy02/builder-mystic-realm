import { Link, useLocation } from "react-router-dom";
import {
  X,
  Home,
  Users,
  FileText,
  BarChart3,
  Folder,
  CreditCard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
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
      <div
        className={`${isCollapsed ? "w-[80px]" : "w-[280px] lg:w-[260px]"} bg-white h-screen fixed left-0 top-0 z-30 transform transition-all duration-300 ease-in-out shadow-md border-r border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-100 bg-white">
          {!isCollapsed ? (
            <div className="space-y-4">
              {/* Company Logo and Name */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md border border-emerald-100">
                  <div className="w-5 h-5 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-base font-semibold text-white tracking-tight leading-tight">
                    AI2AIM
                  </h1>
                  <p className="text-xs font-normal text-emerald-300 tracking-wide">
                    Workspace
                  </p>
                </div>
              </div>

              {/* System Selector */}
              <div className="bg-emerald-800/50 rounded-lg p-3 shadow-sm border border-emerald-700/50 backdrop-blur-sm">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full h-auto p-0 justify-between hover:bg-emerald-700/50 rounded-md px-2 py-2"
                    >
                      <div className="flex items-center gap-2 text-left">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Employee Management
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-emerald-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 mt-2 bg-emerald-900 border-emerald-700">
                    <div className="p-2">
                      <DropdownMenuItem className="rounded-md p-3 hover:bg-emerald-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-emerald-300" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-white">
                              Task Management System
                            </p>
                            <p className="text-xs text-emerald-200">
                              Task & Project Management
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md border border-emerald-100">
                    <div className="w-5 h-5 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-emerald-800 text-white border-emerald-700">
                  <p className="font-semibold">AI2AIM WORKSPACE</p>
                  <p className="text-xs text-emerald-200">
                    Task Management System
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-emerald-800/50"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              if (isCollapsed) {
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-center h-12 px-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400/30"
                            : "text-emerald-100 hover:bg-emerald-800/50 hover:text-white"
                        }`}
                        asChild
                      >
                        <Link to={item.path} onClick={onClose}>
                          <Icon className="w-5 h-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="font-medium">{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-11 px-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400/30 font-semibold"
                      : "text-emerald-100 hover:bg-emerald-800/50 hover:text-white"
                  }`}
                  asChild
                >
                  <Link to={item.path} onClick={onClose}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

      </div>
    </TooltipProvider>
  );
}

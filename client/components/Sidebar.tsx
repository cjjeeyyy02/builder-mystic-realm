import React, { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
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
  const [expandedOnboarding, setExpandedOnboarding] = useState(false);

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
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-base font-semibold text-black tracking-tight leading-tight">
                    AI2AIM
                  </h1>
                  <p className="text-xs font-normal text-gray-500 tracking-wide">
                    Workspace
                  </p>
                </div>
              </div>

              {/* System Selector */}
              <div className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full h-auto p-0 justify-between hover:bg-gray-100 rounded-md px-2 py-2"
                    >
                      <div className="flex items-center gap-2 text-left">
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                        <div>
                          <p className="text-sm font-semibold text-black">
                            Employee Management
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 mt-2 bg-white border border-gray-200">
                    <div className="p-2">
                      <DropdownMenuItem className="rounded-md p-3 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-black">
                              Task Management System
                            </p>
                            <p className="text-xs text-gray-500">
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
                  <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                    <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white text-black border border-gray-200">
                  <p className="font-semibold">AI2AIM WORKSPACE</p>
                  <p className="text-xs text-gray-500">
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
            className="text-gray-700 hover:bg-gray-100"
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
                            ? "bg-gray-900 text-white shadow font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        asChild
                      >
                        <Link to={item.path} onClick={onClose}>
                          <Icon className="w-5 h-5 text-current" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white border border-gray-200">
                      <p className="font-medium text-black">{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              // Special rendering for Onboarding to support submenu
              if (item.label === "Onboarding") {
                return (
                  <div key={item.path}>
                    <div className={`w-full flex items-center justify-between h-11 px-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-gray-900 text-white shadow font-semibold' : 'text-gray-800 hover:bg-gray-50'}`}>
                      <Link to={item.path} onClick={() => { setExpandedOnboarding(prev => !prev); onClose(); }} className="flex items-center gap-3 w-full">
                        <Icon className="w-5 h-5 text-current" />
                        <span className="font-medium">{item.label}</span>
                      </Link>

                      <button onClick={(e) => { e.preventDefault(); setExpandedOnboarding(prev => !prev); }} className="p-1">
                        <ChevronDown className={`w-4 h-4 text-gray-500 transform transition-transform ${expandedOnboarding ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${expandedOnboarding ? 'max-h-24 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-10">
                        <Link to="/job-posting" onClick={onClose} className="block text-sm text-gray-700 hover:text-black py-2">Job Posting</Link>
                        <Link to="/review-room" onClick={onClose} className="block text-sm text-gray-700 hover:text-black py-2">Review Room</Link>
                        <Link to="/checklist-builder" onClick={onClose} className="block text-sm text-gray-700 hover:text-black py-2">Checklist Builder</Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-11 px-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gray-900 text-white shadow font-semibold"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                  asChild
                >
                  <Link to={item.path} onClick={onClose}>
                    <Icon className="w-5 h-5 text-current" />
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

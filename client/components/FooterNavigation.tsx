import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Folder,
  Clock,
  Calendar,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Files", path: "/files", icon: Folder },
  { label: "Activities", path: "/activities", icon: Calendar },
  { label: "Reminders", path: "/reminders", icon: Clock },
  { label: "Forum", path: "/e-forum", icon: MessageCircle },
  { label: "Store", path: "/ai2aim-store", icon: ShoppingBag },
];

export default function FooterNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/99 backdrop-blur-xl border-t border-gray-50 z-50 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
      <div className="safe-area-inset-bottom">
        <div className="px-1 py-1 max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-0.5">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-md transition-all duration-200 touch-target group ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-400 hover:text-blue-600 hover:bg-blue-50/60 active:bg-blue-100/50 active:scale-95"
                  }`}
                >
                  <div className={`mb-1 transition-all duration-200 ${
                    isActive ? "scale-100" : "group-hover:scale-105 group-active:scale-95"
                  }`}>
                    <Icon className={`${isActive ? 'w-4 h-4' : 'w-[18px] h-[18px]'} transition-all duration-200`} />
                  </div>
                  <span className={`text-[9px] font-medium leading-none truncate max-w-full transition-all duration-200 ${
                    isActive ? "text-white opacity-100" : "text-gray-400 group-hover:text-blue-600 opacity-80"
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

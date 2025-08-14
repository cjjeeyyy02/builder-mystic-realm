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
    <div className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-gray-100 z-50 shadow-sm">
      <div className="safe-area-inset-bottom">
        <div className="px-2 py-1.5 max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1.5 px-1 rounded-lg transition-all duration-150 group ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/70 active:bg-blue-100/50"
                  }`}
                >
                  <div className={`mb-0.5 transition-transform duration-150 ${
                    isActive ? "scale-105" : "group-hover:scale-105"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-medium leading-tight truncate max-w-full ${
                    isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"
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

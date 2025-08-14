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
    <footer 
      className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/98 backdrop-blur-xl border-t border-gray-100/80 z-40 transition-all duration-300"
      style={{ 
        boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.02), 0 -1px 2px rgba(0, 0, 0, 0.03)' 
      }}
    >
      <div className="safe-area-inset-bottom">
        <nav 
          className="px-4 lg:px-8 py-2 max-w-none mx-auto" 
          role="navigation" 
          aria-label="Footer Navigation"
        >
          <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex flex-col items-center justify-center min-w-0 flex-1
                    py-2.5 px-3 rounded-xl transition-all duration-200 
                    touch-target group relative overflow-hidden
                    ${isActive
                      ? "bg-blue-600 text-white shadow-md scale-105" 
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-105 active:bg-blue-100/60 active:scale-95"
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white/80 rounded-full" />
                  )}
                  
                  <div className={`mb-1 transition-all duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-110 group-active:scale-90"
                  }`}>
                    <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  
                  <span className={`
                    text-[10px] font-medium leading-tight truncate max-w-full 
                    transition-all duration-200
                    ${isActive 
                      ? "text-white opacity-100" 
                      : "text-gray-500 group-hover:text-blue-600 opacity-90"
                    }
                  `}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from "react";
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
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer 
      className={`
        fixed bottom-0 right-0 bg-white/99 backdrop-blur-xl border-t border-gray-100/80 z-40 
        transition-all duration-300 shadow-sm
        ${isLargeScreen ? 'left-[260px]' : 'left-0'}
      `}
      style={{ 
        boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.03), 0 -1px 2px rgba(0, 0, 0, 0.04)',
        borderTopColor: 'rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="safe-area-inset-bottom">
        <nav 
          className="px-4 lg:px-6 py-3" 
          role="navigation" 
          aria-label="Footer Navigation"
        >
          <div className="flex items-center justify-center gap-1.5 max-w-4xl mx-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex flex-col items-center justify-center min-w-0 flex-1
                    py-3 px-2.5 rounded-xl transition-all duration-200 
                    touch-target group relative overflow-hidden min-h-[60px]
                    ${isActive
                      ? "bg-blue-600 text-white shadow-md transform scale-105" 
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/80 hover:scale-[1.02] active:bg-blue-100/60 active:scale-95"
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white/90 rounded-full" />
                  )}
                  
                  <div className={`mb-1.5 transition-all duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-110 group-active:scale-90"
                  }`}>
                    <Icon className="w-4.5 h-4.5" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  
                  <span className={`
                    text-[10px] font-medium leading-tight truncate max-w-full 
                    transition-all duration-200
                    ${isActive 
                      ? "text-white opacity-100" 
                      : "text-gray-500 group-hover:text-blue-600 opacity-85 group-hover:opacity-100"
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

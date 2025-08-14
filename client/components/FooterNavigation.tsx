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

interface FooterNavigationProps {
  collapsed?: boolean;
}

const navigationItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Files", path: "/files", icon: Folder },
  { label: "Meetings", path: "/activities", icon: Calendar },
  { label: "Reminders", path: "/reminders", icon: Clock },
  { label: "E-Forum", path: "/e-forum", icon: MessageCircle },
  { label: "Store", path: "/ai2aim-store", icon: ShoppingBag },
];

export default function FooterNavigation({ collapsed = false }: FooterNavigationProps) {
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
        ${collapsed ? 'transform translate-y-full opacity-0 pointer-events-none' : 'transform translate-y-0 opacity-100'}
      `}
      style={{
        boxShadow: collapsed ? 'none' : '0 -1px 2px rgba(0, 0, 0, 0.02), 0 -1px 1px rgba(0, 0, 0, 0.03)',
        borderTopColor: 'rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="safe-area-inset-bottom">
        <nav 
          className="px-3 lg:px-4 py-1.5" 
          role="navigation" 
          aria-label="Footer Navigation"
        >
          <div className="flex items-center justify-center gap-1 max-w-3xl mx-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    flex flex-col items-center justify-center min-w-0 flex-1
                    py-2 px-1.5 rounded-lg transition-all duration-200 
                    touch-target group relative overflow-hidden min-h-[42px]
                    ${isActive
                      ? "bg-blue-600 text-white shadow-sm transform scale-105" 
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/70 hover:scale-[1.02] active:bg-blue-100/50 active:scale-95"
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white/90 rounded-full" />
                  )}
                  
                  <div className={`mb-0.5 transition-all duration-200 ${
                    isActive ? "scale-105" : "group-hover:scale-105 group-active:scale-90"
                  }`}>
                    <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  
                  <span className={`
                    text-[9px] font-medium leading-tight truncate max-w-full 
                    transition-all duration-200
                    ${isActive 
                      ? "text-white opacity-100" 
                      : "text-gray-500 group-hover:text-blue-600 opacity-80 group-hover:opacity-100"
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

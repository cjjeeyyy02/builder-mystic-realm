import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";
import { useDarkMode } from "@/components/DarkModeProvider";
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
  shortLabel: string;
}

interface FooterNavigationProps {
  collapsed?: boolean;
}

const navigationItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, shortLabel: "Home" },
  { label: "Chat", path: "/chat", icon: MessageSquare, shortLabel: "Chat" },
  { label: "Files", path: "/files", icon: Folder, shortLabel: "Files" },
  { label: "Meetings", path: "/meetings", icon: Calendar, shortLabel: "Meet" },
  { label: "Reminders", path: "/reminders", icon: Clock, shortLabel: "Tasks" },
  { label: "E-Forum", path: "/e-forum", icon: MessageCircle, shortLabel: "Forum" },
  { label: "AI2AIM Store", path: "/ai2aim-store", icon: ShoppingBag, shortLabel: "Store" },
];

export default function FooterNavigation({ collapsed = false }: FooterNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed } = useSidebar();
  const { isDarkMode } = useDarkMode();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Determine if footer should be hidden based on sidebar state and screen size
  const shouldHide = isLargeScreen && sidebarCollapsed;

  // Calculate footer position based on sidebar state
  const getFooterPosition = () => {
    if (!isLargeScreen) return 'left-0';
    return sidebarCollapsed ? 'left-[80px]' : 'left-[260px]';
  };

  return (
    <footer
      className={`
        fixed bottom-0 right-0 z-40 transition-all duration-300 ease-in-out
        ${getFooterPosition()}
        ${shouldHide || collapsed ? 'transform translate-y-full opacity-0 pointer-events-none' : 'transform translate-y-0 opacity-100'}
        ${isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-xl border-gray-700' 
          : 'bg-white/95 backdrop-blur-xl border-gray-200'
        }
        border-t shadow-lg
      `}
    >
      {/* Main Navigation Container */}
      <div className="safe-area-inset-bottom px-2 sm:px-4 py-2">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between w-full max-w-4xl">
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    relative flex flex-col items-center justify-center px-2 sm:px-3 py-2 sm:py-3 
                    rounded-xl transition-all duration-200 ease-in-out group
                    min-w-0 flex-1 max-w-[80px] sm:max-w-[100px]
                    ${isActive
                      ? `${isDarkMode 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                          : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        } transform scale-105`
                      : `${isDarkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        } hover:scale-105 active:scale-95`
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-90" />
                  )}
                  
                  {/* Icon Container */}
                  <div className={`
                    relative transition-all duration-200 mb-1
                    ${isActive ? "scale-110" : "group-hover:scale-110 group-active:scale-90"}
                  `}>
                    <Icon 
                      className={`
                        w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200
                        ${isActive ? 'drop-shadow-sm' : ''}
                      `} 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                    
                    {/* Badge for notifications (example for chat) */}
                    {item.path === "/chat" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">3</span>
                      </div>
                    )}
                    
                    {/* Badge for reminders */}
                    {item.path === "/reminders" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    text-[10px] sm:text-xs font-medium leading-tight truncate max-w-full
                    transition-all duration-200
                    ${isActive 
                      ? "text-white opacity-100 font-semibold" 
                      : `opacity-80 group-hover:opacity-100 ${
                          isDarkMode ? 'group-hover:text-white' : 'group-hover:text-gray-900'
                        }`
                    }
                  `}>
                    {/* Show short label on very small screens */}
                    <span className="hidden xs:inline">{item.label}</span>
                    <span className="xs:hidden">{item.shortLabel}</span>
                  </span>

                  {/* Ripple Effect */}
                  <div className={`
                    absolute inset-0 rounded-xl opacity-0 group-active:opacity-20 
                    transition-opacity duration-150 pointer-events-none
                    ${isDarkMode ? 'bg-white' : 'bg-gray-900'}
                  `} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional: Quick Actions Bar for active page - removed to fix Icon error */}

      {/* Home Indicator for iOS-style design */}
      <div className="flex justify-center pb-1">
        <div className={`
          w-20 h-1 rounded-full transition-colors duration-300
          ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}
        `} />
      </div>
    </footer>
  );
}

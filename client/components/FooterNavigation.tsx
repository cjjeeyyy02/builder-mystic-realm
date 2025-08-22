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
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    shortLabel: "Home",
  },
  { label: "Chat", path: "/chat", icon: MessageSquare, shortLabel: "Chat" },
  { label: "Files", path: "/files", icon: Folder, shortLabel: "Files" },
  { label: "Meetings", path: "/meetings", icon: Calendar, shortLabel: "Meet" },
  {
    label: "Reminders",
    path: "/reminders",
    icon: Clock,
    shortLabel: "Reminders",
  },
  {
    label: "E-Forum",
    path: "/e-forum",
    icon: MessageCircle,
    shortLabel: "Forum",
  },
];

export default function FooterNavigation({
  collapsed = false,
}: FooterNavigationProps) {
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
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Helper function to check if item should be minimized (Chat to E-Forum)
  const shouldMinimizeItem = (index: number) => {
    return index >= 1 && index <= 5; // Chat (1) to E-Forum (5)
  };

  // Determine if footer should be hidden based on sidebar state and screen size
  const shouldHide = isLargeScreen && sidebarCollapsed;

  // Calculate footer position based on sidebar state
  const getFooterPosition = () => {
    if (!isLargeScreen) return "left-0";
    return sidebarCollapsed ? "left-[80px]" : "left-[260px]";
  };

  // Determine if footer should be minimized when sidebar is open
  const shouldMinimize = isLargeScreen && !sidebarCollapsed;

  return (
    <footer
      className={`
        fixed bottom-0 right-0 z-40 transition-all duration-300 ease-in-out
        ${getFooterPosition()}
        ${shouldHide || collapsed ? "transform translate-y-full opacity-0 pointer-events-none" : "transform translate-y-0 opacity-100"}
        ${
          isDarkMode
            ? "bg-gray-900/95 backdrop-blur-xl border-gray-700"
            : "bg-gray-50/95 backdrop-blur-xl border-gray-200"
        }
        border-t shadow-lg
      `}
    >
      {/* Main Navigation Container */}
      <div className={`safe-area-inset-bottom transition-all duration-300 ${
        shouldMinimize ? "px-2 py-2" : "px-3 sm:px-4 py-2 sm:py-3"
      }`}>
        <div className="flex items-center justify-center">
          <div className={`flex items-center justify-between w-full transition-all duration-300 ${
            shouldMinimize ? "max-w-lg" : "max-w-2xl"
          }`}>
            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              const isMinimizedItem = shouldMinimizeItem(index);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    relative flex flex-col items-center justify-center rounded-xl transition-all duration-200 ease-in-out group
                    min-w-0 flex-1
                    ${shouldMinimize
                      ? "px-2 py-2 max-w-[65px]"
                      : isMinimizedItem
                        ? "px-2 py-2 max-w-[70px] sm:max-w-[75px]"
                        : "px-3 py-2.5 max-w-[80px] sm:max-w-[90px]"
                    }
                    ${
                      isActive
                        ? `${
                            isDarkMode
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                              : "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                          } transform ${shouldMinimize ? "scale-100" : "scale-105"}`
                        : `${
                            isDarkMode
                              ? "text-gray-300 hover:text-white hover:bg-gray-800"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          } hover:scale-105 active:scale-95`
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Active Indicator */}
                  {isActive && !shouldMinimize && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-90" />
                  )}

                  {/* Icon Container */}
                  <div
                    className={`
                    relative transition-all duration-200
                    ${shouldMinimize ? "mb-0" : isMinimizedItem ? "mb-1" : "mb-1.5"}
                    ${isActive ? "scale-110" : "group-hover:scale-110 group-active:scale-90"}
                  `}
                  >
                    <Icon
                      className={`
                        transition-all duration-200
                        ${shouldMinimize
                          ? "w-4 h-4"
                          : isMinimizedItem
                            ? "w-4 h-4 sm:w-5 sm:h-5"
                            : "w-5 h-5 sm:w-6 sm:h-6"
                        }
                        ${isActive ? "drop-shadow-sm" : ""}
                      `}
                      strokeWidth={isActive ? 2.5 : 2}
                    />

                    {/* Badge for notifications (example for chat) */}
                    {item.path === "/chat" && (
                      <div className={`absolute -top-1 -right-1 bg-red-500 rounded-full border-2 border-white flex items-center justify-center ${
                        shouldMinimize || isMinimizedItem ? "w-2 h-2" : "w-3 h-3"
                      }`}>
                        {!shouldMinimize && !isMinimizedItem && (
                          <span className="text-[7px] text-white font-bold">3</span>
                        )}
                      </div>
                    )}

                    {/* Badge for reminders */}
                    {item.path === "/reminders" && (
                      <div className={`absolute -top-1 -right-1 bg-yellow-500 rounded-full border-2 border-white ${
                        shouldMinimize || isMinimizedItem ? "w-2 h-2" : "w-3 h-3"
                      }`}></div>
                    )}
                  </div>

                  {/* Label - Hidden when minimized */}
                  {!shouldMinimize && (
                    <span
                      className={`
                      ${isMinimizedItem
                        ? "text-[7px] sm:text-[8px] font-normal"
                        : "text-[9px] sm:text-[10px] font-medium"
                      } leading-tight truncate max-w-full
                      transition-all duration-200
                      ${
                        isActive
                          ? "text-white opacity-100 font-semibold"
                          : `opacity-85 group-hover:opacity-100 ${
                              isDarkMode
                                ? "group-hover:text-white"
                                : "group-hover:text-gray-900"
                            }`
                      }
                    `}
                    >
                      {/* Show short label on very small screens */}
                      <span className="hidden xs:inline">
                        {isMinimizedItem ? item.shortLabel : item.label}
                      </span>
                      <span className="xs:hidden">{item.shortLabel}</span>
                    </span>
                  )}

                  {/* Ripple Effect */}
                  <div
                    className={`
                    absolute inset-0 rounded-xl opacity-0 group-active:opacity-20
                    transition-opacity duration-150 pointer-events-none
                    ${isDarkMode ? "bg-white" : "bg-gray-900"}
                  `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Home Indicator for iOS-style design - Hidden when minimized */}
      {!shouldMinimize && (
        <div className="flex justify-center py-1 pb-2">
          <div
            className={`
            w-12 h-1 rounded-full transition-colors duration-300
            ${isDarkMode ? "bg-gray-600" : "bg-gray-400"}
          `}
          />
        </div>
      )}
    </footer>
  );
}

import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Onboarding", path: "/" },
  { label: "Records", path: "/records" },
  { label: "Performance", path: "/performance" },
  { label: "Media Resources", path: "/media-resources" },
  { label: "Payroll", path: "/payroll" },
  { label: "Offboarding", path: "/offboarding" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`w-[280px] lg:w-[221px] bg-muted h-screen fixed left-0 top-0 z-30 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Mobile close button */}
        <div className="lg:hidden p-4 flex justify-end">
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-md">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={onClose}>
                <div
                  className={`px-4 lg:px-5 py-2 lg:py-2 rounded-lg text-base lg:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

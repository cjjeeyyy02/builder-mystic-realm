import { Link, useLocation } from "react-router-dom";
import { X, Home, Users, FileText, BarChart3, Folder, CreditCard, LogOut } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
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
      <div className={`w-[280px] lg:w-[260px] bg-sidebar-background h-screen fixed left-0 top-0 z-30 transform transition-transform duration-300 ease-in-out shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">HR Portal</h2>
              <p className="text-xs text-sidebar-foreground/60">Management System</p>
            </div>
          </div>
        </div>

        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={onClose} className="p-2 hover:bg-sidebar-accent rounded-md text-sidebar-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} onClick={onClose}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 text-center">
            © 2024 HR Portal
          </div>
        </div>
      </div>
    </>
  );
}

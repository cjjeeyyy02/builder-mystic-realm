import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
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

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-[221px] bg-muted h-screen fixed left-0 top-0 z-10">
      <div className="p-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`px-5 py-2 rounded-lg text-lg font-medium transition-colors ${
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
  );
}

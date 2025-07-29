import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <div className="lg:ml-[221px] h-[68px] bg-muted flex items-center justify-between lg:justify-end px-4 lg:px-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-200 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 rounded-full"></div>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm lg:text-base font-semibold">John Doe</div>
            <div className="text-xs lg:text-sm font-light text-muted-foreground">Admin</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[221px] p-4 lg:p-8">
        {children}
      </div>
    </div>
  );
}

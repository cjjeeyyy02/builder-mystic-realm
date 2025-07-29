import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      {/* Header */}
      <div className="ml-[221px] h-[68px] bg-muted flex items-center justify-end px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
          <div>
            <div className="text-base font-semibold">John Doe</div>
            <div className="text-sm font-light text-muted-foreground">Admin</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[221px] p-8">
        {children}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { DesktopSidebar } from "@/components/navigation/DesktopSidebar";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { DemoController } from "@/components/demo/DemoController";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Header */}
      <Navbar />

      {/* Main Container */}
      <div className="flex flex-1 relative max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Content Area */}
        <main className="flex-1 flex flex-col relative w-full overflow-hidden pb-16 md:pb-0">
          {children}
        </main>
      </div>

      {/* Discreet Simulation Controller */}
      <DemoController />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

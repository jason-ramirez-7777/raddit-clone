"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center relative w-full h-screen overflow-auto">
      <Sidebar />
      {children}
    </main>
  );
}
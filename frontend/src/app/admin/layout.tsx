"use client";
import Header from "@/Components/Admin/Header/Header";
import Sidebar from "@/Components/Admin/Sidebar/Sidebar";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="">
      {/* Sidebar (Mobile Toggle) */}
      <div
        className={`md:w-64 w-64 fixed bg-gray-800 h-full transform md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 dark:bg-black">
          <div className="overflow-x-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

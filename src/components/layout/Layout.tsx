
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from "@/components/ui/sonner";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 md:pl-64">
        <main className="container flex-1 py-6 px-4 md:px-8">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" />
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/50 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

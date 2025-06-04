import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <Topbar onMenuClick={toggleSidebar} />
      
      <main
        className={twMerge(
          'pt-16 transition-all duration-300 ease-in-out',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        )}
      >
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
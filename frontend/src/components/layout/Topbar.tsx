import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Input from '../ui/Input';
import { currentUser } from '../../data/mockData';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-30 flex h-16 items-center hidden">
      <div className="flex items-center px-4 lg:px-6 w-full">
        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 mr-2 text-gray-500 hover:text-gray-700"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
        
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search candidates, categories..."
            icon={<Search size={18} />}
            className="w-full max-w-lg"
          />
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className="relative p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <p className="text-sm font-medium text-gray-900">New candidate application</p>
                      <p className="text-xs text-gray-500">Alex Johnson applied for Frontend Developer</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-sm text-blue-500 hover:text-blue-700">View all notifications</button>
                </div>
              </div>
            )}
          </div>
          
          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <img
                src={currentUser.avatar}
                alt="User avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-sm font-medium">{currentUser.name}</span>
              <ChevronDown size={16} className={twMerge(
                'transition-transform duration-200',
                showUserMenu && 'rotate-180'
              )} />
            </button>
            
            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <User size={16} className="mr-2" />
                  <span>Profile</span>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <Settings size={16} className="mr-2" />
                  <span>Settings</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
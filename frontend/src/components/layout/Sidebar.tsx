import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import {
  LayoutDashboard,
  Upload,
  FolderClosed,
  Users,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  LogOut,
  HelpCircle,
  HelpingHand
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenuToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Anasayfa' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Ayarlar' },
    { path: '/sentez-ai', icon: <HelpingHand size={20} />, label: 'Sentez AI ' },
  ];

  const candidateSubItems = [
    { path: '/upload', icon: <Upload size={18} />, label: 'CV Yükle' },
    { path: '/candidates', icon: <Users size={18} />, label: 'Adaylar' },
    { path: '/categories', icon: <FolderClosed size={18} />, label: 'Kategoriler' },
  ];

  return (
    <aside
      className={twMerge(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div
          className={twMerge(
            'flex items-center transition-opacity duration-200',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="bg-blue-500 text-white p-1 rounded">
            <Users size={24} />
          </div>
          <h1
            className={twMerge(
              'ml-2 font-semibold text-gray-900 transition-opacity duration-200',
              isOpen ? 'opacity-100' : 'opacity-0'
            )}
          >
            HR Admin
          </h1>
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <ChevronLeft
            size={20}
            className={twMerge('transition-transform duration-300', !isOpen && 'rotate-180')}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              twMerge(
                'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200',
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100',
                !isOpen && 'justify-center'
              )
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span
              className={twMerge(
                'ml-3 transition-opacity duration-200',
                isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              )}
            >
              {item.label}
            </span>
          </NavLink>
        ))}

        {/* Adaylar Ana Menü */}
        <button
          onClick={handleSubmenuToggle}
          className={twMerge(
            'flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 text-gray-700 hover:bg-gray-100',
            !isOpen && 'justify-center'
          )}
        >
          <Users size={20} />
          <span
            className={twMerge(
              'ml-3 flex-1 text-left transition-opacity duration-200',
              isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            )}
          >
            Adaylar
          </span>
          {isOpen &&
            (submenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>

        {/* Alt Menüler */}
        {submenuOpen &&
          isOpen &&
          candidateSubItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                twMerge(
                  'ml-8 flex items-center px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100',
                  isActive ? 'bg-blue-50 text-blue-700' : ''
                )
              }
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </NavLink>
          ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          className={twMerge(
            'flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 w-full',
            !isOpen && 'justify-center'
          )}
        >
          <LogOut size={20} />
          <span
            className={twMerge(
              'ml-3 transition-opacity duration-200',
              isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            )}
          >
            Çıkış Yap
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

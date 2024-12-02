import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BarChart3, Settings, History, Target } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: PlusCircle, label: 'Create Campaign', path: '/create' },
  // { icon: Target, label: 'Active Campaigns', path: '/campaigns' },
  // { icon: History, label: 'Campaign History', path: '/history' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  // { icon: LayoutDashboard, label: 'Test', path: '/test' },
];

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out z-30`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-indigo-600">Web3 Ads</Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center w-full px-4 py-2 text-gray-600 rounded-md hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200 ${
                location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

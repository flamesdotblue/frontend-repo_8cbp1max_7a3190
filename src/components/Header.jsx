import React from 'react';
import { Scissors, Sun, Moon, Settings } from 'lucide-react';

const Header = ({ brandOn, onToggleBrand, activeTab, onTabChange }) => {
  const tabs = [
    { key: 'book', label: 'Book' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'customers', label: 'Customers' },
    { key: 'admin', label: 'Admin' },
  ];

  return (
    <header className={`w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${brandOn ? 'bg-gradient-to-r from-pink-100 via-rose-100 to-fuchsia-100' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${brandOn ? 'bg-rose-600 text-white' : 'bg-gray-900 text-white'}`}>
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Salon Studio</h1>
            <p className="text-xs text-gray-500">Book. Manage. Grow.</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? brandOn
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBrand}
            className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
              brandOn ? 'border-rose-200 text-rose-700 bg-rose-50' : 'border-gray-200 text-gray-700 bg-white'
            }`}
            aria-label="Toggle branding theme"
            title="Toggle branding theme"
          >
            {brandOn ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            Brand
          </button>
          <button
            className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium border border-gray-200 hover:bg-gray-50"
            onClick={() => onTabChange('admin')}
          >
            <Settings className="w-4 h-4" /> Admin
          </button>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                activeTab === t.key
                  ? brandOn
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

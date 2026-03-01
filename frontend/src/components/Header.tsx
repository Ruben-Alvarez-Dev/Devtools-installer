import React from 'react';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../stores/appStore';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, platformInfo } = useAppStore();

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Platform badge */}
          {platformInfo && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="px-2 py-1 bg-slate-700 rounded capitalize">
                {platformInfo.os}
              </span>
              <span className="px-2 py-1 bg-slate-700 rounded uppercase">
                {platformInfo.arch}
              </span>
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

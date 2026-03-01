import React from 'react';
import {
  CubeIcon,
  CodeBracketIcon,
  CloudIcon,
  CommandLineIcon,
  Cog6ToothIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '../stores/appStore';

const categoryIcons: Record<string, React.ReactNode> = {
  runtime: <CubeIcon className="w-5 h-5" />,
  ide: <CodeBracketIcon className="w-5 h-5" />,
  devops: <CloudIcon className="w-5 h-5" />,
  cli: <CommandLineIcon className="w-5 h-5" />,
};

const categoryLabels: Record<string, string> = {
  runtime: 'Runtimes',
  ide: 'IDEs',
  devops: 'DevOps / Cloud',
  cli: 'CLI Tools',
};

export const Sidebar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory, setSelectedToolId } = useAppStore();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedToolId(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ArrowPathIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">DevTools</h1>
            <p className="text-xs text-slate-400">Installer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
          Categories
        </p>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {categoryIcons[category]}
                <span>{categoryLabels[category] || category}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          <Cog6ToothIcon className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

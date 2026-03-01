import React, { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import { ToolCard } from '../components/ToolCard';
import { Header } from '../components/Header';

export const Dashboard: React.FC = () => {
  const {
    tools,
    toolStates,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
    onInstall
  } = useAppStore();

  // Filter tools based on category and search
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error loading catalog</p>
          <p className="text-slate-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Tools" value={tools.length} />
          <StatCard label="Installed" value={Object.values(toolStates).filter(s => s.status === 'installed').length} />
          <StatCard label="Updates Available" value={Object.values(toolStates).filter(s => s.updateAvailable).length} />
          <StatCard label="Categories" value={new Set(tools.map(t => t.category)).size} />
        </div>

        {/* Tools grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No tools found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                state={toolStates[tool.id]}
                onInstall={onInstall}
                onSelect={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400">{label}</p>
  </div>
);

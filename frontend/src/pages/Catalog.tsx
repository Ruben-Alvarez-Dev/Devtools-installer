import React from 'react';
import { useAppStore } from '../stores/appStore';
import { ToolCard } from '../components/ToolCard';
import { Header } from '../components/Header';

export const Catalog: React.FC = () => {
  const {
    tools,
    toolStates,
    selectedCategory,
    searchQuery,
    onInstall,
    setSelectedToolId
  } = useAppStore();

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tools` : 'All Tools'}
        </h2>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No tools in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                state={toolStates[tool.id]}
                onInstall={onInstall}
                onSelect={setSelectedToolId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

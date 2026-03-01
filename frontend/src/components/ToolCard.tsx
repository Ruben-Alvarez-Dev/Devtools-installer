import React from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Tool, ToolState } from '../types';

interface ToolCardProps {
  tool: Tool;
  state?: ToolState;
  onInstall: (toolId: string) => void;
  onSelect: (toolId: string) => void;
}

const categoryColors: Record<string, string> = {
  runtime: 'from-blue-500 to-cyan-500',
  ide: 'from-purple-500 to-pink-500',
  devops: 'from-orange-500 to-red-500',
  cli: 'from-green-500 to-emerald-500',
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, state, onInstall, onSelect }) => {
  const isInstalled = state?.status === 'installed';
  const isInstalling = state?.status === 'installing' || state?.status === 'updating';
  const hasUpdate = state?.updateAvailable;

  const getStatusIcon = () => {
    if (isInstalling) {
      return <ArrowPathIcon className="w-5 h-5 text-blue-400 animate-spin" />;
    }
    if (isInstalled) {
      if (hasUpdate) {
        return <ExclamationCircleIcon className="w-5 h-5 text-yellow-400" />;
      }
      return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
    }
    return null;
  };

  const getButtonText = () => {
    if (isInstalling) return 'Installing...';
    if (hasUpdate) return 'Update';
    if (isInstalled) return 'Installed';
    return 'Install';
  };

  return (
    <div
      className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all cursor-pointer group"
      onClick={() => onSelect(tool.id)}
    >
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${categoryColors[tool.category] || 'from-slate-500 to-slate-600'}`} />

      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[tool.category] || 'from-slate-500 to-slate-600'} flex items-center justify-center text-white font-bold text-sm`}>
              {tool.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-400 capitalize">{tool.category}</p>
            </div>
          </div>
          {getStatusIcon()}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-slate-700 text-slate-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isInstalled || hasUpdate) {
              onInstall(tool.id);
            }
          }}
          disabled={isInstalled && !hasUpdate || isInstalling}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            isInstalled && !hasUpdate
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : isInstalling
              ? 'bg-blue-600/50 text-white cursor-wait'
              : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          {getButtonText()}
        </button>

        {/* Installed version */}
        {isInstalled && state?.installedVersion && (
          <p className="text-xs text-slate-500 mt-2 text-center">
            v{state.installedVersion.version}
          </p>
        )}
      </div>
    </div>
  );
};

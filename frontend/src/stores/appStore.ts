import { create } from 'zustand';
import { Tool, ToolState, Config, PlatformInfo, InstallProgress } from '../types';

export type PageType = 'dashboard' | 'catalog' | 'sprints' | 'gantt' | 'backlog' | 'metrics';

interface AppState {
  // Navigation
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;

  // Catalog
  tools: Tool[];
  categories: string[];
  isLoading: boolean;
  error: string | null;

  // Tool states
  toolStates: Record<string, ToolState>;

  // Config
  config: Config | null;
  platformInfo: PlatformInfo | null;

  // Installation progress
  installProgress: Record<string, InstallProgress>;

  // UI state
  selectedCategory: string | null;
  searchQuery: string;
  selectedToolId: string | null;

  // Actions
  setTools: (tools: Tool[]) => void;
  setCategories: (categories: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setToolStates: (states: Record<string, ToolState>) => void;
  setToolState: (toolId: string, state: ToolState) => void;
  setConfig: (config: Config) => void;
  setPlatformInfo: (info: PlatformInfo) => void;
  setInstallProgress: (toolId: string, progress: InstallProgress) => void;
  clearInstallProgress: (toolId: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedToolId: (toolId: string | null) => void;
  onInstall: (toolId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentPage: 'dashboard',
  tools: [],
  categories: [],
  isLoading: false,
  error: null,
  toolStates: {},
  config: null,
  platformInfo: null,
  installProgress: {},
  selectedCategory: null,
  searchQuery: '',
  selectedToolId: null,

  // Actions
  setCurrentPage: (currentPage) => set({ currentPage, selectedCategory: null }),
  setTools: (tools) => set({ tools }),
  setCategories: (categories) => set({ categories }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setToolStates: (toolStates) => set({ toolStates }),
  setToolState: (toolId, state) => set((prev) => ({
    toolStates: { ...prev.toolStates, [toolId]: state }
  })),
  setConfig: (config) => set({ config }),
  setPlatformInfo: (platformInfo) => set({ platformInfo }),
  setInstallProgress: (toolId, progress) => set((prev) => ({
    installProgress: { ...prev.installProgress, [toolId]: progress }
  })),
  clearInstallProgress: (toolId) => set((prev) => {
    const { [toolId]: _, ...rest } = prev.installProgress;
    return { installProgress: rest };
  }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedToolId: (selectedToolId) => set({ selectedToolId }),
  onInstall: (toolId: string) => {
    console.log('Install tool:', toolId);
    // TODO: Implement actual installation
  },
}));

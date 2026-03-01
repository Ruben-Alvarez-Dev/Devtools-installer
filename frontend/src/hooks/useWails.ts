import { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import { Tool, Config, PlatformInfo, ToolState } from '../types';

// Import Wails bindings
import {
  GetCatalog,
  GetCategories,
  GetPlatformInfo,
  GetConfig,
  GetInstalledTools
} from '../../wailsjs/go/main/App';

export const useWails = () => {
  const {
    setTools,
    setCategories,
    setPlatformInfo,
    setConfig,
    setToolStates,
    setLoading,
    setError
  } = useAppStore();

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Load all data in parallel
        const [tools, categories, platformInfoRaw, config, installedTools] = await Promise.all([
          GetCatalog() as Promise<Tool[]>,
          GetCategories() as Promise<string[]>,
          GetPlatformInfo(),
          GetConfig() as Promise<Config>,
          GetInstalledTools() as Promise<Record<string, ToolState>>
        ]);

        // Convert platform info
        const platformInfo: PlatformInfo = {
          os: platformInfoRaw.os as PlatformInfo['os'],
          arch: platformInfoRaw.arch as PlatformInfo['arch']
        };

        setTools(tools || []);
        setCategories(categories || []);
        setPlatformInfo(platformInfo);
        setConfig(config);
        setToolStates(installedTools || {});
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const installTool = async (toolId: string, version?: string) => {
    // TODO: Implement installation with progress tracking
    console.log('Installing tool:', toolId, version);
  };

  const uninstallTool = async (toolId: string, version?: string) => {
    // TODO: Implement uninstallation
    console.log('Uninstalling tool:', toolId, version);
  };

  return {
    installTool,
    uninstallTool
  };
};

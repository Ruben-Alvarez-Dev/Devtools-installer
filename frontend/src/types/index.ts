// Domain types matching Go backend

export type Category =
  | 'runtime'
  | 'ide'
  | 'ai_ide'
  | 'ai_cli'
  | 'ai_extension'
  | 'local_model'
  | 'self_hosted'
  | 'devops'
  | 'cli'
  | 'database'
  | 'framework';

export type InstallMethodType =
  | 'homebrew'
  | 'homebrew-cask'
  | 'apt'
  | 'dnf'
  | 'winget'
  | 'choco'
  | 'snap'
  | 'direct'
  | 'script'
  | 'npm'
  | 'pip'
  | 'cargo'
  | 'go';

export type Platform = 'darwin' | 'linux' | 'windows';

export type Arch = 'amd64' | 'arm64' | 'x86';

export interface InstallMethod {
  type: InstallMethodType;
  package?: string;
  url?: string;
  checksum?: string;
  script?: string;
  platform: Platform;
  arch?: Arch;
  env?: Record<string, string>;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon?: string;
  website?: string;
  documentation?: string;
  whySpecial?: string;
  idealUse?: string;
  configPath?: string;
  installMethods: InstallMethod[];
  tags?: string[];
}

export interface Version {
  id: string;
  toolId: string;
  version: string;
  changelog?: string;
  url?: string;
  checksum?: string;
  date?: string;
  latest?: boolean;
  lts?: boolean;
}

export interface InstalledVersion {
  toolId: string;
  version: string;
  installPath: string;
  installDate: string;
  source: string;
  active: boolean;
}

export type InstallStatus = 'not_installed' | 'installed' | 'installing' | 'updating' | 'uninstalling' | 'error';

export interface ToolState {
  toolId: string;
  status: InstallStatus;
  installedVersion?: InstalledVersion;
  updateAvailable: boolean;
  latestVersion?: string;
  lastError?: string;
}

export type InstallStage = 'preparing' | 'downloading' | 'extracting' | 'configuring' | 'installing' | 'complete' | 'failed';

export interface InstallProgress {
  toolId: string;
  stage: InstallStage;
  progress: number;
  message?: string;
  bytesTotal?: number;
  bytesCurrent?: number;
  error?: string;
}

export interface Config {
  version: string;
  installDir: string;
  shimsDir: string;
  autoUpdate: boolean;
  checkUpdates: boolean;
  updateInterval: number;
  customPath: string[];
  preferredMethod: Record<string, string>;
  theme: string;
}

export interface PlatformInfo {
  os: Platform;
  arch: Arch;
}

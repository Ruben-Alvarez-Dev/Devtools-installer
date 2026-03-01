package domain

// Category represents a tool category
type Category string

const (
	CategoryRuntime     Category = "runtime"
	CategoryIDE         Category = "ide"
	CategoryAIIDE       Category = "ai_ide"
	CategoryAICLI       Category = "ai_cli"
	CategoryAIExtension Category = "ai_extension"
	CategoryLocalModel  Category = "local_model"
	CategorySelfHosted  Category = "self_hosted"
	CategoryDevOps      Category = "devops"
	CategoryCLI         Category = "cli"
	CategoryDatabase    Category = "database"
	CategoryFramework   Category = "framework"
)

// InstallMethodType represents how a tool can be installed
type InstallMethodType string

const (
	InstallMethodHomebrew     InstallMethodType = "homebrew"
	InstallMethodHomebrewCask InstallMethodType = "homebrew-cask"
	InstallMethodApt          InstallMethodType = "apt"
	InstallMethodDnf          InstallMethodType = "dnf"
	InstallMethodWinget       InstallMethodType = "winget"
	InstallMethodChoco        InstallMethodType = "choco"
	InstallMethodSnap         InstallMethodType = "snap"
	InstallMethodDirect       InstallMethodType = "direct"
	InstallMethodScript       InstallMethodType = "script"
	InstallMethodNPM          InstallMethodType = "npm"
	InstallMethodPip          InstallMethodType = "pip"
	InstallMethodCargo        InstallMethodType = "cargo"
	InstallMethodGo           InstallMethodType = "go"
)

// Platform represents an operating system
type Platform string

const (
	PlatformMacOS   Platform = "darwin"
	PlatformLinux   Platform = "linux"
	PlatformWindows Platform = "windows"
)

// Arch represents a CPU architecture
type Arch string

const (
	ArchAMD64 Arch = "amd64"
	ArchARM64 Arch = "arm64"
	ArchX86   Arch = "x86"
)

// InstallMethod defines how a tool can be installed on a specific platform
type InstallMethod struct {
	Type     InstallMethodType `json:"type" yaml:"type"`
	Package  string            `json:"package,omitempty" yaml:"package,omitempty"`
	URL      string            `json:"url,omitempty" yaml:"url,omitempty"`
	Checksum string            `json:"checksum,omitempty" yaml:"checksum,omitempty"`
	Script   string            `json:"script,omitempty" yaml:"script,omitempty"`
	Platform Platform          `json:"platform" yaml:"platform"`
	Arch     Arch              `json:"arch,omitempty" yaml:"arch,omitempty"`
	Env      map[string]string `json:"env,omitempty" yaml:"env,omitempty"`
}

// Tool represents a development tool in the catalog
type Tool struct {
	ID             string          `json:"id" yaml:"id"`
	Name           string          `json:"name" yaml:"name"`
	Description    string          `json:"description" yaml:"description"`
	Category       Category        `json:"category" yaml:"category"`
	Icon           string          `json:"icon,omitempty" yaml:"icon,omitempty"`
	Website        string          `json:"website,omitempty" yaml:"website,omitempty"`
	Documentation  string          `json:"documentation,omitempty" yaml:"documentation,omitempty"`
	WhySpecial     string          `json:"whySpecial,omitempty" yaml:"whySpecial,omitempty"`
	IdealUse       string          `json:"idealUse,omitempty" yaml:"idealUse,omitempty"`
	ConfigPath     string          `json:"configPath,omitempty" yaml:"configPath,omitempty"`
	InstallMethods []InstallMethod `json:"installMethods" yaml:"installMethods"`
	Tags           []string        `json:"tags,omitempty" yaml:"tags,omitempty"`
}

// Version represents a specific version of a tool
type Version struct {
	ID        string `json:"id" yaml:"id"`
	ToolID    string `json:"toolId" yaml:"toolId"`
	Version   string `json:"version" yaml:"version"`
	Changelog string `json:"changelog,omitempty" yaml:"changelog,omitempty"`
	URL       string `json:"url,omitempty" yaml:"url,omitempty"`
	Checksum  string `json:"checksum,omitempty" yaml:"checksum,omitempty"`
	Date      string `json:"date,omitempty" yaml:"date,omitempty"`
	Latest    bool   `json:"latest,omitempty" yaml:"latest,omitempty"`
	LTS       bool   `json:"lts,omitempty" yaml:"lts,omitempty"`
}

// InstalledVersion represents an installed version of a tool
type InstalledVersion struct {
	ToolID      string `json:"toolId"`
	Version     string `json:"version"`
	InstallPath string `json:"installPath"`
	InstallDate string `json:"installDate"`
	Source      string `json:"source"`
	Active      bool   `json:"active"`
}

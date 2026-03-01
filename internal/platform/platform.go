package platform

import (
	"devtools-installer/internal/domain"
)

// Info contains platform information
type Info struct {
	OS   domain.Platform
	Arch domain.Arch
}

// Detector defines the interface for detecting installed tools
type Detector interface {
	// Detect checks if a tool is installed and returns its version
	Detect(toolID string) (*domain.InstalledVersion, error)

	// DetectAll scans for all known tools
	DetectAll() (map[string]*domain.InstalledVersion, error)
}

// Installer defines the interface for installing tools
type Installer interface {
	// Install installs a tool using the specified method
	Install(tool *domain.Tool, method *domain.InstallMethod, version string) error

	// Uninstall removes a tool
	Uninstall(toolID string, version string) error

	// IsAvailable returns true if this installer is available on the current platform
	IsAvailable() bool

	// Name returns the installer name
	Name() string
}

// PackageManager defines platform-specific package manager operations
type PackageManager interface {
	// Install installs a package
	Install(packageName string) error

	// Uninstall removes a package
	Uninstall(packageName string) error

	// IsInstalled checks if a package is installed
	IsInstalled(packageName string) (bool, error)

	// GetVersion returns the installed version of a package
	GetVersion(packageName string) (string, error)

	// Update updates a package to the latest version
	Update(packageName string) error

	// Search searches for packages
	Search(query string) ([]string, error)
}

// PathManager defines PATH environment management
type PathManager interface {
	// Add adds a path to the system PATH
	Add(path string) error

	// Remove removes a path from the system PATH
	Remove(path string) error

	// Get returns the current PATH
	Get() string

	// GetShellConfigPath returns the path to the shell config file
	GetShellConfigPath() string
}

//go:build darwin

package platform

import (
	"devtools-installer/internal/domain"
)

// GetCurrentPlatform returns the current platform info
func GetCurrentPlatform() Info {
	return Info{
		OS:   domain.PlatformMacOS,
		Arch: getArch(),
	}
}

// getArch returns the current architecture
func getArch() domain.Arch {
	// This will be determined at runtime
	return domain.ArchARM64
}

// GetDefaultInstallDir returns the default installation directory
func GetDefaultInstallDir() string {
	return "/usr/local/opt/devtools"
}

// GetDefaultShimsDir returns the default shims directory
func GetDefaultShimsDir() string {
	return "/usr/local/opt/devtools/shims"
}

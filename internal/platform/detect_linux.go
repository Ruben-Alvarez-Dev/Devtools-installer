//go:build linux

package platform

import (
	"devtools-installer/internal/domain"
)

// GetCurrentPlatform returns the current platform info
func GetCurrentPlatform() Info {
	return Info{
		OS:   domain.PlatformLinux,
		Arch: getArch(),
	}
}

// getArch returns the current architecture
func getArch() domain.Arch {
	return domain.ArchAMD64
}

// GetDefaultInstallDir returns the default installation directory
func GetDefaultInstallDir() string {
	return "/opt/devtools"
}

// GetDefaultShimsDir returns the default shims directory
func GetDefaultShimsDir() string {
	return "/opt/devtools/shims"
}

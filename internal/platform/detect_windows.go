//go:build windows

package platform

import (
	"devtools-installer/internal/domain"
)

// GetCurrentPlatform returns the current platform info
func GetCurrentPlatform() Info {
	return Info{
		OS:   domain.PlatformWindows,
		Arch: getArch(),
	}
}

// getArch returns the current architecture
func getArch() domain.Arch {
	return domain.ArchAMD64
}

// GetDefaultInstallDir returns the default installation directory
func GetDefaultInstallDir() string {
	return "C:\\Program Files\\DevTools"
}

// GetDefaultShimsDir returns the default shims directory
func GetDefaultShimsDir() string {
	return "C:\\Program Files\\DevTools\\shims"
}

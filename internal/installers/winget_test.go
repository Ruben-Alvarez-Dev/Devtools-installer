package installers

import (
	"testing"

	"devtools-installer/internal/domain"
)

func TestWingetInstallerName(t *testing.T) {
	installer := NewWingetInstaller()
	if installer.Name() != domain.InstallMethodWinget {
		t.Errorf("Name() = %v, want %v", installer.Name(), domain.InstallMethodWinget)
	}
}

func TestWingetInstallerIsAvailable(t *testing.T) {
	installer := NewWingetInstaller()
	// On non-Windows systems, winget won't be available
	// On Windows, it should return true if winget is installed
	_ = installer.IsAvailable()
}

func TestWingetInstallerIsInstalled(t *testing.T) {
	installer := NewWingetInstaller()
	// Should not panic even if winget not available
	_ = installer.IsInstalled("some-package")
}

func TestWingetInstallerGetInstalledVersion(t *testing.T) {
	installer := NewWingetInstaller()
	// Should return error if package not installed or winget not available
	_, _ = installer.GetInstalledVersion("nonexistent-package")
}

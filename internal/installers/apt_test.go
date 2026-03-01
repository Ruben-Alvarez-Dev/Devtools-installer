package installers

import (
	"testing"

	"devtools-installer/internal/domain"
)

func TestAptInstallerName(t *testing.T) {
	installer := NewAptInstaller()
	if installer.Name() != domain.InstallMethodApt {
		t.Errorf("Name() = %v, want %v", installer.Name(), domain.InstallMethodApt)
	}
}

func TestAptInstallerIsAvailable(t *testing.T) {
	installer := NewAptInstaller()
	// On non-Debian systems, apt won't be available
	_ = installer.IsAvailable()
}

func TestAptInstallerIsInstalled(t *testing.T) {
	installer := NewAptInstaller()
	// Should not panic even if apt not available
	_ = installer.IsInstalled("some-package")
}

func TestAptInstallerGetInstalledVersion(t *testing.T) {
	installer := NewAptInstaller()
	// Should return error if package not installed or apt not available
	_, _ = installer.GetInstalledVersion("nonexistent-package")
}

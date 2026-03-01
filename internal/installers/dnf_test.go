package installers

import (
	"testing"

	"devtools-installer/internal/domain"
)

func TestDnfInstallerName(t *testing.T) {
	installer := NewDnfInstaller()
	if installer.Name() != domain.InstallMethodDnf {
		t.Errorf("Name() = %v, want %v", installer.Name(), domain.InstallMethodDnf)
	}
}

func TestDnfInstallerIsAvailable(t *testing.T) {
	installer := NewDnfInstaller()
	// On non-Fedora systems, dnf won't be available
	_ = installer.IsAvailable()
}

func TestDnfInstallerIsInstalled(t *testing.T) {
	installer := NewDnfInstaller()
	// Should not panic even if dnf not available
	_ = installer.IsInstalled("some-package")
}

func TestDnfInstallerGetInstalledVersion(t *testing.T) {
	installer := NewDnfInstaller()
	// Should return error if package not installed or dnf not available
	_, _ = installer.GetInstalledVersion("nonexistent-package")
}

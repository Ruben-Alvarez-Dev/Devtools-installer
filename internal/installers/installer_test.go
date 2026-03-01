package installers

import (
	"testing"

	"devtools-installer/internal/domain"
)

func TestHomebrewInstallerName(t *testing.T) {
	installer := NewHomebrewInstaller()
	if installer.Name() != domain.InstallMethodHomebrew {
		t.Errorf("Name() = %v, want %v", installer.Name(), domain.InstallMethodHomebrew)
	}
}

func TestHomebrewCaskInstallerName(t *testing.T) {
	installer := &HomebrewCaskInstaller{}
	if installer.Name() != domain.InstallMethodHomebrewCask {
		t.Errorf("Name() = %v, want %v", installer.Name(), domain.InstallMethodHomebrewCask)
	}
}

func TestManagerGetInstaller(t *testing.T) {
	m := NewManager()

	// If homebrew is available, should be able to get it
	if installer, ok := m.GetInstaller(domain.InstallMethodHomebrew); ok {
		if installer.Name() != domain.InstallMethodHomebrew {
			t.Errorf("Got wrong installer type")
		}
	}
}

func TestManagerGetAvailableInstallers(t *testing.T) {
	m := NewManager()
	available := m.GetAvailableInstallers()

	// Should return a list (might be empty if brew not installed)
	if available == nil {
		t.Error("GetAvailableInstallers() returned nil")
	}
}

package installers

import (
	"context"
	"fmt"
	"os/exec"
	"runtime"
	"strings"

	"devtools-installer/internal/domain"
)

// Installer defines the interface for package manager installers
type Installer interface {
	// IsAvailable checks if this installer is available on the system
	IsAvailable() bool

	// Install installs a package
	Install(ctx context.Context, pkg string, progress func(stage string, pct int)) error

	// Uninstall uninstalls a package
	Uninstall(ctx context.Context, pkg string) error

	// IsInstalled checks if a package is installed
	IsInstalled(pkg string) bool

	// GetInstalledVersion returns the installed version of a package
	GetInstalledVersion(pkg string) (string, error)

	// Name returns the installer name
	Name() domain.InstallMethodType
}

// HomebrewInstaller implements Installer for Homebrew
type HomebrewInstaller struct {
	brewPath string
}

func NewHomebrewInstaller() *HomebrewInstaller {
	path, _ := exec.LookPath("brew")
	return &HomebrewInstaller{brewPath: path}
}

func (h *HomebrewInstaller) IsAvailable() bool {
	return h.brewPath != ""
}

func (h *HomebrewInstaller) Install(ctx context.Context, pkg string, progress func(string, int)) error {
	if progress != nil {
		progress("updating", 10)
	}

	// Run brew install
	cmd := exec.CommandContext(ctx, h.brewPath, "install", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("brew install failed: %w\n%s", err, output)
	}

	if progress != nil {
		progress("complete", 100)
	}

	return nil
}

func (h *HomebrewInstaller) Uninstall(ctx context.Context, pkg string) error {
	cmd := exec.CommandContext(ctx, h.brewPath, "uninstall", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("brew uninstall failed: %w\n%s", err, output)
	}
	return nil
}

func (h *HomebrewInstaller) IsInstalled(pkg string) bool {
	cmd := exec.Command(h.brewPath, "list", "--formula")
	output, err := cmd.Output()
	if err != nil {
		return false
	}
	return strings.Contains(string(output), pkg)
}

func (h *HomebrewInstaller) GetInstalledVersion(pkg string) (string, error) {
	cmd := exec.Command(h.brewPath, "list", "--versions", pkg)
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}
	// Output format: "pkgname 1.2.3"
	parts := strings.Fields(string(output))
	if len(parts) >= 2 {
		return parts[1], nil
	}
	return "", fmt.Errorf("version not found")
}

func (h *HomebrewInstaller) Name() domain.InstallMethodType {
	return domain.InstallMethodHomebrew
}

// HomebrewCaskInstaller implements Installer for Homebrew Cask
type HomebrewCaskInstaller struct {
	HomebrewInstaller
}

func (h *HomebrewCaskInstaller) Install(ctx context.Context, pkg string, progress func(string, int)) error {
	if progress != nil {
		progress("downloading", 20)
	}

	cmd := exec.CommandContext(ctx, h.brewPath, "install", "--cask", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("brew cask install failed: %w\n%s", err, output)
	}

	if progress != nil {
		progress("complete", 100)
	}

	return nil
}

func (h *HomebrewCaskInstaller) IsInstalled(pkg string) bool {
	cmd := exec.Command(h.brewPath, "list", "--cask")
	output, err := cmd.Output()
	if err != nil {
		return false
	}
	return strings.Contains(string(output), pkg)
}

func (h *HomebrewCaskInstaller) Name() domain.InstallMethodType {
	return domain.InstallMethodHomebrewCask
}

// Manager manages all available installers
type Manager struct {
	installers map[domain.InstallMethodType]Installer
	platform   domain.Platform
}

func NewManager() *Manager {
	m := &Manager{
		installers: make(map[domain.InstallMethodType]Installer),
		platform:   domain.Platform(runtime.GOOS),
	}

	// Register available installers
	if installer := NewHomebrewInstaller(); installer.IsAvailable() {
		m.installers[domain.InstallMethodHomebrew] = installer
		m.installers[domain.InstallMethodHomebrewCask] = &HomebrewCaskInstaller{*installer}
	}

	// TODO: Add more installers (apt, dnf, winget, etc.)

	return m
}

func (m *Manager) GetInstaller(method domain.InstallMethodType) (Installer, bool) {
	installer, ok := m.installers[method]
	return installer, ok
}

func (m *Manager) GetAvailableInstallers() []domain.InstallMethodType {
	var available []domain.InstallMethodType
	for method := range m.installers {
		available = append(available, method)
	}
	return available
}

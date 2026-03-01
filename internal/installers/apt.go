package installers

import (
	"context"
	"fmt"
	"os/exec"
	"strings"

	"devtools-installer/internal/domain"
)

// AptInstaller implements Installer for apt-get (Debian/Ubuntu)
type AptInstaller struct {
	aptPath string
}

// NewAptInstaller creates a new Apt installer
func NewAptInstaller() *AptInstaller {
	path, _ := exec.LookPath("apt-get")
	return &AptInstaller{aptPath: path}
}

// IsAvailable checks if apt-get is available on the system
func (a *AptInstaller) IsAvailable() bool {
	return a.aptPath != ""
}

// Install installs a package using apt-get
func (a *AptInstaller) Install(ctx context.Context, pkg string, progress func(string, int)) error {
	if progress != nil {
		progress("updating", 10)
	}

	// Update package list first
	updateCmd := exec.CommandContext(ctx, a.aptPath, "update")
	if output, err := updateCmd.CombinedOutput(); err != nil {
		return fmt.Errorf("apt update failed: %w\n%s", err, output)
	}

	if progress != nil {
		progress("installing", 30)
	}

	cmd := exec.CommandContext(ctx, a.aptPath, "install", "-y", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("apt install failed: %w\n%s", err, output)
	}

	if progress != nil {
		progress("complete", 100)
	}

	return nil
}

// Uninstall uninstalls a package using apt-get
func (a *AptInstaller) Uninstall(ctx context.Context, pkg string) error {
	cmd := exec.CommandContext(ctx, a.aptPath, "remove", "-y", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("apt remove failed: %w\n%s", err, output)
	}
	return nil
}

// IsInstalled checks if a package is installed using dpkg
func (a *AptInstaller) IsInstalled(pkg string) bool {
	cmd := exec.Command("dpkg", "-l", pkg)
	output, err := cmd.Output()
	if err != nil {
		return false
	}
	return strings.Contains(string(output), pkg)
}

// GetInstalledVersion returns the installed version of a package
func (a *AptInstaller) GetInstalledVersion(pkg string) (string, error) {
	cmd := exec.Command("dpkg-query", "-W", "-f=${Version}", pkg)
	output, err := cmd.Output()
	if err != nil {
		return "", fmt.Errorf("package %s not found: %w", pkg, err)
	}
	return strings.TrimSpace(string(output)), nil
}

// Name returns the installer name
func (a *AptInstaller) Name() domain.InstallMethodType {
	return domain.InstallMethodApt
}

package installers

import (
	"context"
	"fmt"
	"os/exec"
	"strings"

	"devtools-installer/internal/domain"
)

// DnfInstaller implements Installer for dnf (Fedora/RHEL)
type DnfInstaller struct {
	dnfPath string
}

// NewDnfInstaller creates a new Dnf installer
func NewDnfInstaller() *DnfInstaller {
	path, _ := exec.LookPath("dnf")
	return &DnfInstaller{dnfPath: path}
}

// IsAvailable checks if dnf is available on the system
func (d *DnfInstaller) IsAvailable() bool {
	return d.dnfPath != ""
}

// Install installs a package using dnf
func (d *DnfInstaller) Install(ctx context.Context, pkg string, progress func(string, int)) error {
	if progress != nil {
		progress("installing", 20)
	}

	cmd := exec.CommandContext(ctx, d.dnfPath, "install", "-y", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("dnf install failed: %w\n%s", err, output)
	}

	if progress != nil {
		progress("complete", 100)
	}

	return nil
}

// Uninstall uninstalls a package using dnf
func (d *DnfInstaller) Uninstall(ctx context.Context, pkg string) error {
	cmd := exec.CommandContext(ctx, d.dnfPath, "remove", "-y", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("dnf remove failed: %w\n%s", err, output)
	}
	return nil
}

// IsInstalled checks if a package is installed using rpm
func (d *DnfInstaller) IsInstalled(pkg string) bool {
	cmd := exec.Command("rpm", "-q", pkg)
	return cmd.Run() == nil
}

// GetInstalledVersion returns the installed version of a package
func (d *DnfInstaller) GetInstalledVersion(pkg string) (string, error) {
	cmd := exec.Command("rpm", "-q", "--queryformat", "%{VERSION}-%{RELEASE}", pkg)
	output, err := cmd.Output()
	if err != nil {
		return "", fmt.Errorf("package %s not found: %w", pkg, err)
	}
	return strings.TrimSpace(string(output)), nil
}

// Name returns the installer name
func (d *DnfInstaller) Name() domain.InstallMethodType {
	return domain.InstallMethodDnf
}

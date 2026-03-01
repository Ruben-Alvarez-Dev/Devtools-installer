package installers

import (
	"context"
	"fmt"
	"os/exec"
	"strings"

	"devtools-installer/internal/domain"
)

// WingetInstaller implements Installer for Windows winget
type WingetInstaller struct {
	wingetPath string
}

// NewWingetInstaller creates a new Winget installer
func NewWingetInstaller() *WingetInstaller {
	path, _ := exec.LookPath("winget")
	return &WingetInstaller{wingetPath: path}
}

// IsAvailable checks if winget is available on the system
func (w *WingetInstaller) IsAvailable() bool {
	return w.wingetPath != ""
}

// Install installs a package using winget
func (w *WingetInstaller) Install(ctx context.Context, pkg string, progress func(string, int)) error {
	if progress != nil {
		progress("searching", 10)
	}

	cmd := exec.CommandContext(ctx, w.wingetPath, "install", "--id", pkg, "--accept-source-agreements", "--accept-package-agreements")
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("winget install failed: %w\n%s", err, output)
	}

	if progress != nil {
		progress("complete", 100)
	}

	return nil
}

// Uninstall uninstalls a package using winget
func (w *WingetInstaller) Uninstall(ctx context.Context, pkg string) error {
	cmd := exec.CommandContext(ctx, w.wingetPath, "uninstall", "--id", pkg)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("winget uninstall failed: %w\n%s", err, output)
	}
	return nil
}

// IsInstalled checks if a package is installed
func (w *WingetInstaller) IsInstalled(pkg string) bool {
	if w.wingetPath == "" {
		return false
	}
	cmd := exec.Command(w.wingetPath, "list", "--Id", pkg)
	output, err := cmd.Output()
	if err != nil {
		return false
	}
	return strings.Contains(string(output), pkg)
}

// GetInstalledVersion returns the installed version of a package
func (w *WingetInstaller) GetInstalledVersion(pkg string) (string, error) {
	if w.wingetPath == "" {
		return "", fmt.Errorf("winget not available")
	}
	cmd := exec.Command(w.wingetPath, "list", "--Id", pkg)
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}

	// Parse winget list output
	// Format: "Package Name               Id                   Version"
	lines := strings.Split(string(output), "\n")
	for _, line := range lines {
		if strings.Contains(line, pkg) {
			fields := strings.Fields(line)
			if len(fields) >= 3 {
				return fields[len(fields)-1], nil
			}
		}
	}
	return "", fmt.Errorf("version not found for %s", pkg)
}

// Name returns the installer name
func (w *WingetInstaller) Name() domain.InstallMethodType {
	return domain.InstallMethodWinget
}

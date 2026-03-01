package detectors

import (
	"os/exec"
	"runtime"
	"strings"

	"devtools-installer/internal/domain"
)

// ToolDetector detects installed tools on the system
type ToolDetector struct {
	platform domain.Platform
}

// NewToolDetector creates a new tool detector
func NewToolDetector() *ToolDetector {
	return &ToolDetector{
		platform: domain.Platform(runtime.GOOS),
	}
}

// Detect detects if a tool is installed
func (d *ToolDetector) Detect(tool domain.Tool) domain.ToolState {
	state := domain.ToolState{
		ToolID:          tool.ID,
		Status:          domain.StatusNotInstalled,
		UpdateAvailable: false,
	}

	// Try to detect by checking if the command is available
	// Many tools have their command name as their ID or a common variant
	commandNames := d.getCommandNames(tool)

	for _, cmd := range commandNames {
		if d.IsCommandAvailable(cmd) {
			version, _ := d.DetectByCommand(cmd, "--version")
			if version != "" {
				state.Status = domain.StatusInstalled
				state.InstalledVersion = &domain.InstalledVersion{
					ToolID:      tool.ID,
					Version:     version,
					InstallPath: d.getCommandPath(cmd),
					Source:      "detected",
					Active:      true,
				}
				return state
			}
		}
	}

	return state
}

// getCommandNames returns possible command names for a tool
func (d *ToolDetector) getCommandNames(tool domain.Tool) []string {
	var names []string

	// Add the tool ID as a potential command
	names = append(names, tool.ID)

	// Add common variations
	switch tool.ID {
	case "nodejs":
		names = append(names, "node")
	case "python":
		names = append(names, "python3")
	case "golang":
		names = append(names, "go")
	case "claude-code":
		names = append(names, "claude")
	case "ripgrep":
		names = append(names, "rg")
	case "fd-find":
		names = append(names, "fd")
	case "bat-cat":
		names = append(names, "bat")
	}

	// Check install methods for package names
	for _, method := range tool.InstallMethods {
		if method.Package != "" {
			names = append(names, method.Package)
		}
	}

	return names
}

// DetectAll detects all tools in a list
func (d *ToolDetector) DetectAll(tools []domain.Tool) map[string]domain.ToolState {
	states := make(map[string]domain.ToolState)
	for _, tool := range tools {
		states[tool.ID] = d.Detect(tool)
	}
	return states
}

// DetectByCommand detects a tool by running a version command
func (d *ToolDetector) DetectByCommand(cmd string, versionFlag string) (string, error) {
	_, err := exec.LookPath(cmd)
	if err != nil {
		return "", err
	}

	// Try different version flags
	flags := []string{versionFlag, "--version", "-v", "-V", "version", "--version-short"}
	var output []byte

	for _, flag := range flags {
		output, err = exec.Command(cmd, flag).Output()
		if err == nil && len(output) > 0 {
			break
		}
	}

	if err != nil || len(output) == 0 {
		return "", err
	}

	// Parse version from output
	return d.parseVersion(string(output)), nil
}

// parseVersion extracts version number from command output
func (d *ToolDetector) parseVersion(output string) string {
	lines := strings.Split(output, "\n")
	if len(lines) == 0 {
		return ""
	}

	// First line usually contains the version
	firstLine := lines[0]

	// Try to extract version number (format: "tool version X.Y.Z" or "vX.Y.Z")
	words := strings.Fields(firstLine)
	for _, word := range words {
		// Check if word looks like a version (starts with digit or 'v' followed by digit)
		cleanWord := strings.TrimPrefix(word, "v")
		if len(cleanWord) > 0 && (cleanWord[0] >= '0' && cleanWord[0] <= '9') {
			// Clean up the version string
			cleanWord = strings.TrimRight(cleanWord, ",")
			if strings.Contains(cleanWord, ".") || len(cleanWord) >= 1 {
				return cleanWord
			}
		}
	}

	// If no version found in first line, check other lines
	for _, line := range lines[1:] {
		words := strings.Fields(line)
		for _, word := range words {
			cleanWord := strings.TrimPrefix(word, "v")
			if len(cleanWord) > 0 && (cleanWord[0] >= '0' && cleanWord[0] <= '9') {
				cleanWord = strings.TrimRight(cleanWord, ",")
				if strings.Contains(cleanWord, ".") || len(cleanWord) >= 1 {
					return cleanWord
				}
			}
		}
	}

	return firstLine
}

// IsCommandAvailable checks if a command is available in PATH
func (d *ToolDetector) IsCommandAvailable(cmd string) bool {
	_, err := exec.LookPath(cmd)
	return err == nil
}

// getCommandPath returns the full path to a command
func (d *ToolDetector) getCommandPath(cmd string) string {
	path, err := exec.LookPath(cmd)
	if err != nil {
		return ""
	}
	return path
}

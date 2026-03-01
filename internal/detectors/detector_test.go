package detectors

import (
	"testing"

	"devtools-installer/internal/domain"
)

func TestToolDetector_Detect(t *testing.T) {
	detector := NewToolDetector()

	tool := domain.Tool{
		ID:   "git",
		Name: "Git",
		InstallMethods: []domain.InstallMethod{
			{Type: domain.InstallMethodHomebrew, Package: "git", Platform: domain.PlatformMacOS},
		},
	}

	state := detector.Detect(tool)

	if state.ToolID != "git" {
		t.Errorf("ToolID = %v, want git", state.ToolID)
	}

	// Status should be either installed or not_installed
	if state.Status != domain.StatusInstalled && state.Status != domain.StatusNotInstalled {
		t.Errorf("Status = %v, want installed or not_installed", state.Status)
	}
}

func TestToolDetector_DetectAll(t *testing.T) {
	detector := NewToolDetector()

	tools := []domain.Tool{
		{ID: "git", Name: "Git"},
		{ID: "nodejs", Name: "Node.js"},
		{ID: "python", Name: "Python"},
	}

	states := detector.DetectAll(tools)

	if len(states) != 3 {
		t.Errorf("DetectAll returned %d states, want 3", len(states))
	}

	for _, tool := range tools {
		if _, ok := states[tool.ID]; !ok {
			t.Errorf("Missing state for tool %s", tool.ID)
		}
	}
}

func TestToolDetector_DetectByCommand(t *testing.T) {
	detector := NewToolDetector()

	// Test with a command that should exist on most systems
	version, err := detector.DetectByCommand("sh", "--version")
	if err != nil {
		// sh might not return version, which is fine
		t.Log("sh version not available, skipping version check")
		return
	}

	if version == "" {
		t.Error("sh found but version is empty")
	}
}

func TestToolDetector_IsCommandAvailable(t *testing.T) {
	detector := NewToolDetector()

	// Test with a command that should exist on most systems
	if !detector.IsCommandAvailable("sh") {
		t.Error("sh command should be available")
	}

	// Test with a command that should not exist
	if detector.IsCommandAvailable("nonexistentcommand12345") {
		t.Error("nonexistentcommand12345 should not be available")
	}
}

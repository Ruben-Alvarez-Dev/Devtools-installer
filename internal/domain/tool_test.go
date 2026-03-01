package domain

import (
	"testing"
)

// =============================================================================
// TDD: Tests for AI categories and install methods
// =============================================================================

func TestCategoryConstants(t *testing.T) {
	tests := []struct {
		name     string
		category Category
		expected string
	}{
		{"runtime", CategoryRuntime, "runtime"},
		{"ide", CategoryIDE, "ide"},
		{"ai_ide", CategoryAIIDE, "ai_ide"},
		{"ai_cli", CategoryAICLI, "ai_cli"},
		{"ai_extension", CategoryAIExtension, "ai_extension"},
		{"local_model", CategoryLocalModel, "local_model"},
		{"self_hosted", CategorySelfHosted, "self_hosted"},
		{"devops", CategoryDevOps, "devops"},
		{"cli", CategoryCLI, "cli"},
		{"database", CategoryDatabase, "database"},
		{"framework", CategoryFramework, "framework"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if string(tt.category) != tt.expected {
				t.Errorf("Category %s = %q, want %q", tt.name, tt.category, tt.expected)
			}
		})
	}
}

func TestInstallMethodTypeConstants(t *testing.T) {
	tests := []struct {
		name       string
		methodType InstallMethodType
		expected   string
	}{
		{"homebrew", InstallMethodHomebrew, "homebrew"},
		{"homebrew-cask", InstallMethodHomebrewCask, "homebrew-cask"},
		{"apt", InstallMethodApt, "apt"},
		{"dnf", InstallMethodDnf, "dnf"},
		{"winget", InstallMethodWinget, "winget"},
		{"choco", InstallMethodChoco, "choco"},
		{"snap", InstallMethodSnap, "snap"},
		{"direct", InstallMethodDirect, "direct"},
		{"script", InstallMethodScript, "script"},
		{"npm", InstallMethodNPM, "npm"},
		{"pip", InstallMethodPip, "pip"},
		{"cargo", InstallMethodCargo, "cargo"},
		{"go", InstallMethodGo, "go"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if string(tt.methodType) != tt.expected {
				t.Errorf("InstallMethodType %s = %q, want %q", tt.name, tt.methodType, tt.expected)
			}
		})
	}
}

func TestToolHasAIFields(t *testing.T) {
	tool := Tool{
		ID:          "test-tool",
		Name:        "Test Tool",
		Description: "A test tool for testing",
		Category:    CategoryAICLI,
		WhySpecial:  "This tool is special because...",
		IdealUse:    "Best for testing purposes",
		ConfigPath:  "~/.test-tool/",
	}

	if tool.WhySpecial == "" {
		t.Error("Tool.WhySpecial should be settable")
	}
	if tool.IdealUse == "" {
		t.Error("Tool.IdealUse should be settable")
	}
	if tool.ConfigPath == "" {
		t.Error("Tool.ConfigPath should be settable")
	}
}

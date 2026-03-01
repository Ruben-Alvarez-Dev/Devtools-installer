package domain

import "fmt"

// Config represents the application configuration
type Config struct {
	Version         string            `json:"version" yaml:"version"`
	InstallDir      string            `json:"installDir" yaml:"installDir"`
	ShimsDir        string            `json:"shimsDir" yaml:"shimsDir"`
	AutoUpdate      bool              `json:"autoUpdate" yaml:"autoUpdate"`
	CheckUpdates    bool              `json:"checkUpdates" yaml:"checkUpdates"`
	UpdateInterval  int               `json:"updateInterval" yaml:"updateInterval"` // hours
	CustomPath      []string          `json:"customPath" yaml:"customPath"`
	PreferredMethod map[string]string `json:"preferredMethod" yaml:"preferredMethod"` // toolId -> method type
	Theme           string            `json:"theme" yaml:"theme"`
}

// DefaultConfig returns the default configuration
func DefaultConfig() Config {
	return Config{
		Version:        "1.0.0",
		InstallDir:     getDefaultInstallDir(),
		ShimsDir:       getDefaultShimsDir(),
		AutoUpdate:     false,
		CheckUpdates:   true,
		UpdateInterval: 24,
		CustomPath:     []string{},
		PreferredMethod: make(map[string]string),
		Theme:          "dark",
	}
}

// getDefaultInstallDir returns the default installation directory for the current platform
func getDefaultInstallDir() string {
	// This will be implemented based on runtime.GOOS
	return "~/.devtools"
}

// getDefaultShimsDir returns the default shims directory
func getDefaultShimsDir() string {
	return "~/.devtools/shims"
}

// Validate validates the configuration
func (c *Config) Validate() error {
	if c.InstallDir == "" {
		return fmt.Errorf("install directory cannot be empty")
	}
	if c.ShimsDir == "" {
		return fmt.Errorf("shims directory cannot be empty")
	}
	if c.UpdateInterval < 0 {
		return fmt.Errorf("update interval cannot be negative")
	}
	return nil
}

package main

import (
	"context"
	"fmt"

	"devtools-installer/internal/domain"
	"devtools-installer/internal/platform"
	"devtools-installer/pkg/catalog"
)

// App struct
type App struct {
	ctx     context.Context
	catalog *catalog.Service
	config  *domain.Config
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Initialize catalog service
	cat, err := catalog.NewService()
	if err != nil {
		fmt.Printf("Failed to load catalog: %v\n", err)
	} else {
		a.catalog = cat
	}

	// Load or create config
	cfg := domain.DefaultConfig()
	a.config = &cfg
}

// ===========================================
// CATALOG API
// ===========================================

// GetCatalog returns all tools in the catalog
func (a *App) GetCatalog() []domain.Tool {
	if a.catalog == nil {
		return nil
	}
	return a.catalog.GetAll()
}

// GetToolByID returns a tool by its ID
func (a *App) GetToolByID(id string) *domain.Tool {
	if a.catalog == nil {
		return nil
	}
	return a.catalog.GetByID(id)
}

// GetToolsByCategory returns tools filtered by category
func (a *App) GetToolsByCategory(category string) []domain.Tool {
	if a.catalog == nil {
		return nil
	}
	return a.catalog.GetByCategory(domain.Category(category))
}

// SearchTools searches tools by query
func (a *App) SearchTools(query string) []domain.Tool {
	if a.catalog == nil {
		return nil
	}
	return a.catalog.Search(query)
}

// GetCategories returns all available categories
func (a *App) GetCategories() []string {
	categories := []string{
		string(domain.CategoryRuntime),
		string(domain.CategoryIDE),
		string(domain.CategoryAIIDE),
		string(domain.CategoryAICLI),
		string(domain.CategoryAIExtension),
		string(domain.CategoryLocalModel),
		string(domain.CategorySelfHosted),
		string(domain.CategoryDevOps),
		string(domain.CategoryCLI),
		string(domain.CategoryDatabase),
		string(domain.CategoryFramework),
	}
	return categories
}

// ===========================================
// PLATFORM API
// ===========================================

// GetPlatformInfo returns current platform information
func (a *App) GetPlatformInfo() map[string]string {
	info := platform.GetCurrentPlatform()
	return map[string]string{
		"os":   string(info.OS),
		"arch": string(info.Arch),
	}
}

// ===========================================
// CONFIG API
// ===========================================

// GetConfig returns the current configuration
func (a *App) GetConfig() domain.Config {
	if a.config == nil {
		return domain.DefaultConfig()
	}
	return *a.config
}

// SaveConfig saves the configuration
func (a *App) SaveConfig(config domain.Config) error {
	if err := config.Validate(); err != nil {
		return err
	}
	a.config = &config
	return nil
}

// ===========================================
// INSTALLATION API (Stub implementations)
// ===========================================

// InstallTool installs a tool
func (a *App) InstallTool(toolId string, version string) error {
	// TODO: Implement installation logic
	return fmt.Errorf("installation not yet implemented")
}

// UninstallTool uninstalls a tool
func (a *App) UninstallTool(toolId string, version string) error {
	// TODO: Implement uninstallation logic
	return fmt.Errorf("uninstallation not yet implemented")
}

// GetInstalledTools returns all installed tools
func (a *App) GetInstalledTools() map[string]domain.ToolState {
	// TODO: Implement detection logic
	return make(map[string]domain.ToolState)
}

// GetToolState returns the state of a specific tool
func (a *App) GetToolState(toolId string) domain.ToolState {
	// TODO: Implement detection logic
	return domain.ToolState{
		ToolID: toolId,
		Status: domain.StatusNotInstalled,
	}
}

// CheckForUpdates checks for available updates
func (a *App) CheckForUpdates() map[string]bool {
	// TODO: Implement update checking
	return make(map[string]bool)
}

// UpdateTool updates a tool to the latest version
func (a *App) UpdateTool(toolId string) error {
	// TODO: Implement update logic
	return fmt.Errorf("update not yet implemented")
}

// UpdateAllTools updates all installed tools
func (a *App) UpdateAllTools() error {
	// TODO: Implement bulk update logic
	return fmt.Errorf("bulk update not yet implemented")
}

// ===========================================
// VERSION API (Stub implementations)
// ===========================================

// GetAvailableVersions returns available versions for a tool
func (a *App) GetAvailableVersions(toolId string) []domain.Version {
	// TODO: Implement version fetching
	return nil
}

// GetInstalledVersions returns installed versions for a tool
func (a *App) GetInstalledVersions(toolId string) []domain.InstalledVersion {
	// TODO: Implement version detection
	return nil
}

// SetActiveVersion sets the active version for a tool
func (a *App) SetActiveVersion(toolId string, version string) error {
	// TODO: Implement version switching
	return fmt.Errorf("version switching not yet implemented")
}

package catalog

import (
	"embed"
	"fmt"
	"strings"

	"gopkg.in/yaml.v3"

	"devtools-installer/internal/domain"
)

//go:embed tools.yaml
var catalogFS embed.FS

// Catalog represents the YAML catalog structure
type Catalog struct {
	Version string       `yaml:"version"`
	Tools   []domain.Tool `yaml:"tools"`
}

// Service handles catalog operations
type Service struct {
	catalog *Catalog
}

// NewService creates a new catalog service
func NewService() (*Service, error) {
	s := &Service{}
	if err := s.load(); err != nil {
		return nil, fmt.Errorf("failed to load catalog: %w", err)
	}
	return s, nil
}

// load reads the catalog from embedded FS or external file
func (s *Service) load() error {
	// Try embedded catalog first
	data, err := catalogFS.ReadFile("tools.yaml")
	if err != nil {
		return fmt.Errorf("failed to read embedded catalog: %w", err)
	}

	var catalog Catalog
	if err := yaml.Unmarshal(data, &catalog); err != nil {
		return fmt.Errorf("failed to parse catalog: %w", err)
	}

	s.catalog = &catalog
	return nil
}

// GetAll returns all tools in the catalog
func (s *Service) GetAll() []domain.Tool {
	if s.catalog == nil {
		return nil
	}
	return s.catalog.Tools
}

// GetByID returns a tool by its ID
func (s *Service) GetByID(id string) *domain.Tool {
	for _, tool := range s.catalog.Tools {
		if tool.ID == id {
			return &tool
		}
	}
	return nil
}

// GetByCategory returns all tools in a category
func (s *Service) GetByCategory(category domain.Category) []domain.Tool {
	var tools []domain.Tool
	for _, tool := range s.catalog.Tools {
		if tool.Category == category {
			tools = append(tools, tool)
		}
	}
	return tools
}

// Search searches tools by name, description, or tags
func (s *Service) Search(query string) []domain.Tool {
	var results []domain.Tool
	for _, tool := range s.catalog.Tools {
		if matchesQuery(tool, query) {
			results = append(results, tool)
		}
	}
	return results
}

// matchesQuery checks if a tool matches the search query
func matchesQuery(tool domain.Tool, query string) bool {
	// Simple case-insensitive matching
	query = lower(query)
	if contains(lower(tool.ID), query) ||
		contains(lower(tool.Name), query) ||
		contains(lower(tool.Description), query) {
		return true
	}
	for _, tag := range tool.Tags {
		if contains(lower(tag), query) {
			return true
		}
	}
	return false
}

func lower(s string) string {
	return strings.ToLower(s)
}

func contains(s, substr string) bool {
	return strings.Contains(s, substr)
}

// GetCategories returns all available categories
func (s *Service) GetCategories() []domain.Category {
	return []domain.Category{
		domain.CategoryRuntime,
		domain.CategoryIDE,
		domain.CategoryAIIDE,
		domain.CategoryAICLI,
		domain.CategoryAIExtension,
		domain.CategoryLocalModel,
		domain.CategorySelfHosted,
		domain.CategoryDevOps,
		domain.CategoryCLI,
		domain.CategoryDatabase,
		domain.CategoryFramework,
	}
}

// GetInstallMethod returns the best install method for a tool on the current platform
func (s *Service) GetInstallMethod(toolID string, platform domain.Platform, preferredType domain.InstallMethodType) *domain.InstallMethod {
	tool := s.GetByID(toolID)
	if tool == nil {
		return nil
	}

	// First, try to find the preferred method type
	if preferredType != "" {
		for _, method := range tool.InstallMethods {
			if method.Platform == platform && method.Type == preferredType {
				return &method
			}
		}
	}

	// Fall back to any method for the platform
	for _, method := range tool.InstallMethods {
		if method.Platform == platform {
			return &method
		}
	}

	return nil
}

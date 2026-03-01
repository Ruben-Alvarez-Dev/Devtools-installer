package main

import (
	"testing"

	"devtools-installer/internal/domain"
)

// =============================================================================
// TDD: Tests for App API
// =============================================================================

func TestGetCategoriesReturnsAllCategories(t *testing.T) {
	app := NewApp()
	categories := app.GetCategories()

	if len(categories) != 11 {
		t.Errorf("GetCategories() returned %d categories, want 11", len(categories))
	}

	categorySet := make(map[string]bool)
	for _, cat := range categories {
		categorySet[cat] = true
	}

	required := []string{
		string(domain.CategoryAIIDE),
		string(domain.CategoryAICLI),
		string(domain.CategoryAIExtension),
		string(domain.CategoryLocalModel),
		string(domain.CategorySelfHosted),
	}

	for _, req := range required {
		if !categorySet[req] {
			t.Errorf("GetCategories() missing required category: %s", req)
		}
	}
}

func TestGetToolsByCategoryAICLI(t *testing.T) {
	app := NewApp()
	app.startup(nil)

	tools := app.GetToolsByCategory(string(domain.CategoryAICLI))

	if len(tools) == 0 {
		t.Error("GetToolsByCategory(ai_cli) returned 0 tools")
	}
}

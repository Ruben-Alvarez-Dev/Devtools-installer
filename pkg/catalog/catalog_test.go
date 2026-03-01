package catalog

import (
	"testing"

	"devtools-installer/internal/domain"
)

// =============================================================================
// TDD: Tests for catalog service
// =============================================================================

func TestGetCategoriesIncludesAI(t *testing.T) {
	svc, err := NewService()
	if err != nil {
		t.Fatalf("NewService() error = %v", err)
	}

	categories := svc.GetCategories()

	if len(categories) != 11 {
		t.Errorf("GetCategories() returned %d categories, want 11", len(categories))
	}

	categoryMap := make(map[domain.Category]bool)
	for _, cat := range categories {
		categoryMap[cat] = true
	}

	required := []domain.Category{
		domain.CategoryAIIDE, domain.CategoryAICLI, domain.CategoryAIExtension,
		domain.CategoryLocalModel, domain.CategorySelfHosted,
	}

	for _, cat := range required {
		if !categoryMap[cat] {
			t.Errorf("GetCategories() missing category: %s", cat)
		}
	}
}

func TestGetByCategoryAICLI(t *testing.T) {
	svc, err := NewService()
	if err != nil {
		t.Fatalf("NewService() error = %v", err)
	}

	tools := svc.GetByCategory(domain.CategoryAICLI)

	if len(tools) < 5 {
		t.Errorf("GetByCategory(ai_cli) returned %d tools, want at least 5", len(tools))
	}

	for _, tool := range tools {
		if tool.Category != domain.CategoryAICLI {
			t.Errorf("Tool %s has category %s, expected ai_cli", tool.ID, tool.Category)
		}
	}
}

func TestGetByCategoryAIIDE(t *testing.T) {
	svc, err := NewService()
	if err != nil {
		t.Fatalf("NewService() error = %v", err)
	}

	tools := svc.GetByCategory(domain.CategoryAIIDE)

	if len(tools) < 5 {
		t.Errorf("GetByCategory(ai_ide) returned %d tools, want at least 5", len(tools))
	}
}

func TestGetByCategoryAIExtension(t *testing.T) {
	svc, err := NewService()
	if err != nil {
		t.Fatalf("NewService() error = %v", err)
	}

	tools := svc.GetByCategory(domain.CategoryAIExtension)

	if len(tools) < 5 {
		t.Errorf("GetByCategory(ai_extension) returned %d tools, want at least 5", len(tools))
	}
}

func TestGetByCategoryLocalModel(t *testing.T) {
	svc, err := NewService()
	if err != nil {
		t.Fatalf("NewService() error = %v", err)
	}

	tools := svc.GetByCategory(domain.CategoryLocalModel)

	if len(tools) < 5 {
		t.Errorf("GetByCategory(local_model) returned %d tools, want at least 5", len(tools))
	}
}

func TestAIToolsHaveRequiredFields(t *testing.T) {
	svc, err := NewService()
	if err != nil {
		t.Fatalf("NewService() error = %v", err)
	}

	categories := []domain.Category{
		domain.CategoryAICLI, domain.CategoryAIIDE,
		domain.CategoryAIExtension, domain.CategoryLocalModel,
	}

	for _, cat := range categories {
		tools := svc.GetByCategory(cat)
		for _, tool := range tools {
			if tool.WhySpecial == "" {
				t.Errorf("Tool %s in category %s missing whySpecial", tool.ID, cat)
			}
			if tool.IdealUse == "" {
				t.Errorf("Tool %s in category %s missing idealUse", tool.ID, cat)
			}
		}
	}
}

func TestSearchAITools(t *testing.T) {
	svc, err := NewService()
	if err != nil {
		t.Fatalf("NewService() error = %v", err)
	}

	results := svc.Search("claude")
	if len(results) == 0 {
		t.Error("Search('claude') returned 0 results")
	}
}

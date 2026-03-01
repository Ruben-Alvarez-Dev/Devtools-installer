import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useAppStore } from '../stores/appStore';
import { ToolCard } from '../components/ToolCard';
import { Header } from '../components/Header';
import { categoryLabels } from '../theme';

export const Catalog: React.FC = () => {
  const {
    tools,
    toolStates,
    selectedCategory,
    searchQuery,
    onInstall,
    setSelectedToolId
  } = useAppStore();

  // Filter tools
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTitle = () => {
    if (selectedCategory) {
      return `${categoryLabels[selectedCategory] || selectedCategory} Tools`;
    }
    return 'All Tools';
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          {getTitle()}
        </Typography>

        {filteredTools.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="text.secondary">No tools in this category</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredTools.map((tool) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
                <ToolCard
                  tool={tool}
                  state={toolStates[tool.id]}
                  onInstall={onInstall}
                  onSelect={setSelectedToolId}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAppStore } from '../stores/appStore';
import { ToolCard } from '../components/ToolCard';
import { ToolDetailModal } from '../components/ToolDetailModal';
import { Header } from '../components/Header';

export const Dashboard: React.FC = () => {
  const {
    tools,
    toolStates,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
    onInstall,
    selectedToolId,
    setSelectedToolId,
  } = useAppStore();

  const [detailOpen, setDetailOpen] = useState(false);

  const selectedTool = tools.find(t => t.id === selectedToolId) || null;

  // Filter tools based on category and search
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSelectTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
    setSelectedToolId(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={48} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Loading tools...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          <Typography variant="subtitle2">Error loading catalog</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  const stats = [
    { label: 'Total Tools', value: tools.length },
    { label: 'Installed', value: Object.values(toolStates).filter(s => s.status === 'installed').length },
    { label: 'Updates Available', value: Object.values(toolStates).filter(s => s.updateAvailable).length },
    { label: 'Categories', value: new Set(tools.map(t => t.category)).size },
  ];

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat) => (
            <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
              <Card>
                <CardContent sx={{ py: 2 }}>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tools grid */}
        {filteredTools.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography color="text.secondary">No tools found</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredTools.map((tool) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
                <ToolCard
                  tool={tool}
                  state={toolStates[tool.id]}
                  onInstall={onInstall}
                  onSelect={handleSelectTool}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Tool Detail Modal */}
      <ToolDetailModal
        tool={selectedTool}
        state={selectedToolId ? toolStates[selectedToolId] : undefined}
        open={detailOpen}
        onClose={handleCloseDetail}
        onInstall={onInstall}
      />
    </Box>
  );
};

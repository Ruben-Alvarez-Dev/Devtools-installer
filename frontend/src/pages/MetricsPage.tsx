import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
} from '@mui/material';

export const MetricsPage: React.FC = () => {
  const epics = [
    { name: 'Epic 1: Catálogo Universal', progress: 100, color: '#3b82f6', done: 4, total: 4 },
    { name: 'Epic 2: Sistema Instalación', progress: 25, color: '#10b981', done: 1, total: 4 },
    { name: 'Epic 3: Configuración Agéntica', progress: 0, color: '#8b5cf6', done: 0, total: 3 },
    { name: 'Epic 4: Gestión API Keys', progress: 0, color: '#f59e0b', done: 0, total: 2 },
    { name: 'Epic 5: Skills y Workflows', progress: 0, color: '#ec4899', done: 0, total: 2 },
    { name: 'Epic 6: UI/UX', progress: 60, color: '#06b6d4', done: 3, total: 5 },
  ];

  const velocityData = [
    { sprint: 'Sprint 1', committed: 20, completed: 20 },
    { sprint: 'Sprint 2', committed: 16, completed: 10 },
  ];

  const totalStats = {
    epics: epics.length,
    completedEpics: epics.filter(e => e.progress === 100).length,
    totalStories: epics.reduce((sum, e) => sum + e.total, 0),
    doneStories: epics.reduce((sum, e) => sum + e.done, 0),
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Project Metrics
      </Typography>

      {/* Overview Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" fontWeight={700}>{totalStats.epics}</Typography>
              <Typography variant="body2" color="text.secondary">Total Epics</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" fontWeight={700} color="success.main">{totalStats.completedEpics}</Typography>
              <Typography variant="body2" color="text.secondary">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" fontWeight={700}>{totalStats.doneStories}</Typography>
              <Typography variant="body2" color="text.secondary">Stories Done</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" fontWeight={700} color="primary.main">
                {Math.round((totalStats.doneStories / totalStats.totalStories) * 100)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Epic Progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Epic Progress
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {epics.map((epic) => (
              <Box key={epic.name}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{epic.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {epic.done}/{epic.total} stories ({epic.progress}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={epic.progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: 'background.default',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: epic.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Velocity */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Sprint Velocity
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {velocityData.map((sprint) => (
              <Box key={sprint.sprint} sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {sprint.sprint}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 120 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: `${(sprint.committed / 25) * 100}%`,
                      bgcolor: 'primary.light',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      pb: 1,
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>{sprint.committed}</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: `${(sprint.completed / 25) * 100}%`,
                      bgcolor: 'success.main',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      pb: 1,
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>{sprint.completed}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Typography variant="caption" color="primary.light">Committed</Typography>
                  <Typography variant="caption" color="success.main">Completed</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

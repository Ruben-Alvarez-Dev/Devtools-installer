import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as StartIcon,
  CheckCircle as CompleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { Sprint, Story } from '../../types/sprints';

// Mock data
const mockSprints: Sprint[] = [
  {
    id: 'sprint-1',
    name: 'Sprint 1 - Catálogo Universal',
    goal: 'Completar el catálogo universal de herramientas',
    startDate: '2026-03-01',
    endDate: '2026-03-14',
    status: 'completed',
    stories: [
      { id: '1.1', title: 'Catálogo IDEs con IA', description: '', points: 5, status: 'done' },
      { id: '1.2', title: 'Catálogo CLIs de IA', description: '', points: 5, status: 'done' },
      { id: '1.3', title: 'Catálogo Extensiones', description: '', points: 5, status: 'done' },
      { id: '1.4', title: 'Catálogo Modelos Locales', description: '', points: 5, status: 'done' },
    ],
  },
  {
    id: 'sprint-2',
    name: 'Sprint 2 - UI/UX',
    goal: 'Migrar a Material UI y mejorar la experiencia',
    startDate: '2026-03-15',
    endDate: '2026-03-28',
    status: 'active',
    stories: [
      { id: '6.1', title: 'Dashboard con estado', description: '', points: 5, status: 'done' },
      { id: '6.2', title: 'Catálogo navegable', description: '', points: 5, status: 'in_progress' },
      { id: '6.3', title: 'Vista de detalles', description: '', points: 3, status: 'todo' },
      { id: '6.4', title: 'Búsqueda y filtros', description: '', points: 3, status: 'todo' },
    ],
  },
];

export const SprintsPage: React.FC = () => {
  const [sprints] = useState<Sprint[]>(mockSprints);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const getStatusColor = (status: Sprint['status']) => {
    switch (status) {
      case 'active': return 'primary';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getStoryStatusColor = (status: Story['status']) => {
    switch (status) {
      case 'done': return 'success';
      case 'in_progress': return 'primary';
      case 'review': return 'warning';
      default: return 'default';
    }
  };

  const getSprintStats = (sprint: Sprint) => {
    const total = sprint.stories.reduce((sum: number, s: Story) => sum + s.points, 0);
    const done = sprint.stories.filter((s: Story) => s.status === 'done').reduce((sum: number, s: Story) => sum + s.points, 0);
    return { total, done, progress: total > 0 ? (done / total) * 100 : 0 };
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Sprints
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          New Sprint
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label="Active" />
        <Tab label="Planning" />
        <Tab label="Completed" />
      </Tabs>

      <Grid container spacing={3}>
        {sprints
          .filter(s => {
            if (tabValue === 0) return s.status === 'active';
            if (tabValue === 1) return s.status === 'planning';
            return s.status === 'completed';
          })
          .map((sprint) => {
            const stats = getSprintStats(sprint);
            return (
              <Grid size={{ xs: 12, md: 6 }} key={sprint.id}>
                <Card
                  sx={{ cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
                  onClick={() => setSelectedSprint(sprint)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {sprint.name}
                      </Typography>
                      <Chip
                        label={sprint.status.toUpperCase()}
                        size="small"
                        color={getStatusColor(sprint.status)}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {sprint.goal}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Start: {new Date(sprint.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        End: {new Date(sprint.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption">
                          Progress: {stats.done}/{stats.total} points
                        </Typography>
                        <Typography variant="caption">{Math.round(stats.progress)}%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={stats.progress}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {sprint.stories.slice(0, 4).map((story: Story) => (
                        <Chip
                          key={story.id}
                          label={story.id}
                          size="small"
                          color={getStoryStatusColor(story.status)}
                          sx={{ fontSize: 10 }}
                        />
                      ))}
                      {sprint.stories.length > 4 && (
                        <Chip label={`+${sprint.stories.length - 4}`} size="small" />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      {/* Sprint Detail Dialog */}
      <Dialog
        open={!!selectedSprint}
        onClose={() => setSelectedSprint(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedSprint && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedSprint.name}
                <Chip label={selectedSprint.status.toUpperCase()} color={getStatusColor(selectedSprint.status)} />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {selectedSprint.goal}
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>Stories</Typography>
              <List>
                {selectedSprint.stories.map((story: Story) => (
                  <ListItem key={story.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
                    <ListItemText
                      primary={story.title}
                      secondary={`${story.points} points`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={story.status.replace('_', ' ').toUpperCase()}
                        size="small"
                        color={getStoryStatusColor(story.status)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedSprint(null)}>Close</Button>
              {selectedSprint.status === 'planning' && (
                <Button variant="contained" startIcon={<StartIcon />}>Start Sprint</Button>
              )}
              {selectedSprint.status === 'active' && (
                <Button variant="contained" color="success" startIcon={<CompleteIcon />}>Complete Sprint</Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

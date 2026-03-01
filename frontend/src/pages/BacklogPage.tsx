import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  DragIndicator as DragIcon,
  PlayCircle as PlayIcon,
  CheckCircle as DoneIcon,
  Schedule as TodoIcon,
} from '@mui/icons-material';

interface BacklogItem {
  id: string;
  title: string;
  description: string;
  epic: string;
  points: number;
  status: 'backlog' | 'ready' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
}

const mockBacklog: BacklogItem[] = [
  { id: '1.1', title: 'Catálogo IDEs con IA', description: 'Añadir Cursor, Windsurf, Zed, etc.', epic: 'Epic 1', points: 5, status: 'done', priority: 'high' },
  { id: '1.2', title: 'Catálogo CLIs de IA', description: 'Claude Code, Aider, Goose, etc.', epic: 'Epic 1', points: 5, status: 'done', priority: 'high' },
  { id: '1.3', title: 'Catálogo Extensiones', description: 'Copilot, Cline, Continue, etc.', epic: 'Epic 1', points: 5, status: 'done', priority: 'high' },
  { id: '1.4', title: 'Catálogo Modelos Locales', description: 'Ollama, LM Studio, etc.', epic: 'Epic 1', points: 5, status: 'done', priority: 'medium' },
  { id: '2.1', title: 'Homebrew installer', description: 'Implementar instalación via Homebrew', epic: 'Epic 2', points: 5, status: 'done', priority: 'high' },
  { id: '2.2', title: 'Winget installer', description: 'Implementar instalación via Winget', epic: 'Epic 2', points: 5, status: 'backlog', priority: 'high' },
  { id: '2.3', title: 'Progress bar', description: 'Barra de progreso de instalación', epic: 'Epic 2', points: 3, status: 'backlog', priority: 'medium' },
  { id: '3.1', title: 'Config Claude Code', description: 'CLAUDE.md y settings.json', epic: 'Epic 3', points: 8, status: 'backlog', priority: 'high' },
  { id: '3.2', title: 'Config Cursor', description: '.cursorrules y settings', epic: 'Epic 3', points: 5, status: 'backlog', priority: 'medium' },
  { id: '3.3', title: 'Sistema de perfiles', description: 'Perfiles work, personal, etc.', epic: 'Epic 3', points: 8, status: 'backlog', priority: 'low' },
  { id: '4.1', title: 'Keychain storage', description: 'Almacenamiento seguro de API keys', epic: 'Epic 4', points: 8, status: 'backlog', priority: 'high' },
  { id: '4.2', title: 'Anthropic API support', description: 'Soporte para Anthropic API', epic: 'Epic 4', points: 3, status: 'backlog', priority: 'high' },
  { id: '6.1', title: 'Dashboard', description: 'Dashboard con estado de herramientas', epic: 'Epic 6', points: 5, status: 'done', priority: 'high' },
  { id: '6.2', title: 'Catálogo navegable', description: 'Navegación por categorías', epic: 'Epic 6', points: 5, status: 'in-progress', priority: 'high' },
  { id: '6.4', title: 'Búsqueda y filtros', description: 'Búsqueda y filtros avanzados', epic: 'Epic 6', points: 3, status: 'backlog', priority: 'medium' },
];

export const BacklogPage: React.FC = () => {
  const [backlog] = useState<BacklogItem[]>(mockBacklog);
  const [searchQuery, setSearchQuery] = useState('');
  const [epicFilter, setEpicFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);

  const epics = [...new Set(backlog.map(item => item.epic))];

  const filteredBacklog = backlog.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEpic = epicFilter === 'all' || item.epic === epicFilter;
    const matchesTab = tabValue === 0 || (tabValue === 1 && item.status !== 'done') || (tabValue === 2 && item.status === 'done');
    return matchesSearch && matchesEpic && matchesTab;
  });

  const getStatusIcon = (status: BacklogItem['status']) => {
    switch (status) {
      case 'done': return <DoneIcon color="success" fontSize="small" />;
      case 'in-progress': return <PlayIcon color="primary" fontSize="small" />;
      default: return <TodoIcon color="disabled" fontSize="small" />;
    }
  };

  const getStatusColor = (status: BacklogItem['status']) => {
    switch (status) {
      case 'done': return 'success';
      case 'in-progress': return 'primary';
      case 'ready': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: BacklogItem['priority']) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'default';
    }
  };

  const stats = {
    total: backlog.length,
    done: backlog.filter(i => i.status === 'done').length,
    inProgress: backlog.filter(i => i.status === 'in-progress').length,
    totalPoints: backlog.reduce((sum, i) => sum + i.points, 0),
    donePoints: backlog.filter(i => i.status === 'done').reduce((sum, i) => sum + i.points, 0),
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Product Backlog
      </Typography>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="h4" fontWeight={700}>{stats.total}</Typography>
              <Typography variant="body2" color="text.secondary">Total Items</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="success.main">{stats.done}</Typography>
              <Typography variant="body2" color="text.secondary">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="h4" fontWeight={700} color="primary.main">{stats.inProgress}</Typography>
              <Typography variant="body2" color="text.secondary">In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ py: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>Progress</Typography>
              <LinearProgress
                variant="determinate"
                value={stats.totalPoints > 0 ? (stats.donePoints / stats.totalPoints) * 100 : 0}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                {stats.donePoints}/{stats.totalPoints} points
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search backlog..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          sx={{ minWidth: 250 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={epicFilter}
            onChange={(e) => setEpicFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="all">All Epics</MenuItem>
            {epics.map(epic => (
              <MenuItem key={epic} value={epic}>{epic}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2 }}>
        <Tab label="All" />
        <Tab label="Active" />
        <Tab label="Completed" />
      </Tabs>

      {/* Backlog Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 40 }}></TableCell>
              <TableCell sx={{ width: 80 }}>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell sx={{ width: 120 }}>Epic</TableCell>
              <TableCell sx={{ width: 80 }}>Points</TableCell>
              <TableCell sx={{ width: 100 }}>Priority</TableCell>
              <TableCell sx={{ width: 120 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBacklog.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ opacity: item.status === 'done' ? 0.6 : 1 }}
              >
                <TableCell>
                  <IconButton size="small" disabled>
                    <DragIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>{item.id}</Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>{item.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.description}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={item.epic} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>{item.points}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.priority.toUpperCase()}
                    size="small"
                    color={getPriorityColor(item.priority)}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(item.status)}
                    label={item.status.replace('-', ' ').toUpperCase()}
                    size="small"
                    color={getStatusColor(item.status)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

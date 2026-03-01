import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Chip,
} from '@mui/material';
import { GanttTask } from '../../types/sprints';

// Mock data for Gantt
const mockTasks: GanttTask[] = [
  { id: 'epic-1', name: 'Epic 1: Catálogo Universal', start: new Date('2026-03-01'), end: new Date('2026-03-14'), progress: 100, type: 'project', color: '#3b82f6' },
  { id: '1.1', name: 'Catálogo IDEs con IA', start: new Date('2026-03-01'), end: new Date('2026-03-04'), progress: 100, type: 'task', parentId: 'epic-1', color: '#3b82f6' },
  { id: '1.2', name: 'Catálogo CLIs de IA', start: new Date('2026-03-03'), end: new Date('2026-03-06'), progress: 100, type: 'task', parentId: 'epic-1', color: '#3b82f6' },
  { id: '1.3', name: 'Catálogo Extensiones', start: new Date('2026-03-05'), end: new Date('2026-03-08'), progress: 100, type: 'task', parentId: 'epic-1', color: '#3b82f6' },
  { id: '1.4', name: 'Catálogo Modelos Locales', start: new Date('2026-03-07'), end: new Date('2026-03-10'), progress: 100, type: 'task', parentId: 'epic-1', color: '#3b82f6' },

  { id: 'epic-6', name: 'Epic 6: UI/UX', start: new Date('2026-03-08'), end: new Date('2026-03-28'), progress: 60, type: 'project', color: '#8b5cf6' },
  { id: '6.1', name: 'Dashboard con estado', start: new Date('2026-03-08'), end: new Date('2026-03-12'), progress: 100, type: 'task', parentId: 'epic-6', color: '#8b5cf6' },
  { id: '6.2', name: 'Catálogo navegable', start: new Date('2026-03-10'), end: new Date('2026-03-16'), progress: 70, type: 'task', parentId: 'epic-6', color: '#8b5cf6' },
  { id: '6.3', name: 'Vista de detalles', start: new Date('2026-03-14'), end: new Date('2026-03-18'), progress: 30, type: 'task', parentId: 'epic-6', color: '#8b5cf6' },
  { id: '6.4', name: 'Búsqueda y filtros', start: new Date('2026-03-16'), end: new Date('2026-03-20'), progress: 0, type: 'task', parentId: 'epic-6', color: '#8b5cf6' },

  { id: 'epic-2', name: 'Epic 2: Sistema Instalación', start: new Date('2026-03-20'), end: new Date('2026-04-10'), progress: 0, type: 'project', color: '#10b981' },
  { id: '2.1', name: 'Homebrew installer', start: new Date('2026-03-20'), end: new Date('2026-03-25'), progress: 0, type: 'task', parentId: 'epic-2', color: '#10b981' },
  { id: '2.2', name: 'Winget installer', start: new Date('2026-03-25'), end: new Date('2026-03-30'), progress: 0, type: 'task', parentId: 'epic-2', color: '#10b981' },
  { id: '2.3', name: 'Progress bar', start: new Date('2026-03-30'), end: new Date('2026-04-05'), progress: 0, type: 'task', parentId: 'epic-2', color: '#10b981' },
];

const DAY_WIDTH = 30;

export const GanttPage: React.FC = () => {
  const [tasks] = useState<GanttTask[]>(mockTasks);

  const { startDate, endDate, days } = useMemo(() => {
    const dates = tasks.flatMap(t => [t.start, t.end]);
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    // Add padding
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 2);

    const days: Date[] = [];
    const current = new Date(minDate);
    while (current <= maxDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return { startDate: minDate, endDate: maxDate, days };
  }, [tasks]);

  const getTaskPosition = (task: GanttTask) => {
    const startOffset = Math.floor((task.start.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.floor((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return { left: startOffset * DAY_WIDTH, width: duration * DAY_WIDTH };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Gantt Chart
      </Typography>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', overflow: 'auto' }}>
            {/* Task names column */}
            <Box sx={{ minWidth: 280, borderRight: 1, borderColor: 'divider' }}>
              <Box sx={{ height: 60, borderBottom: 1, borderColor: 'divider', px: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" fontWeight={600}>Task</Typography>
              </Box>
              {tasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    height: 40,
                    borderBottom: 1,
                    borderColor: 'divider',
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    pl: task.type === 'task' ? 4 : 2,
                    bgcolor: task.type === 'project' ? 'background.default' : 'transparent',
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={task.type === 'project' ? 600 : 400}
                    sx={{ fontSize: task.type === 'task' ? 13 : 14 }}
                  >
                    {task.name}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Timeline */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {/* Header with dates */}
              <Box sx={{ height: 60, borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                {days.map((day, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: DAY_WIDTH,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: 1,
                      borderColor: 'divider',
                      bgcolor: day.getDay() === 0 || day.getDay() === 6 ? 'background.default' : 'transparent',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </Typography>
                    <Typography variant="caption" fontWeight={600} sx={{ fontSize: 11 }}>
                      {day.getDate()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Task bars */}
              {tasks.map((task) => {
                const pos = getTaskPosition(task);
                return (
                  <Box
                    key={task.id}
                    sx={{
                      height: 40,
                      borderBottom: 1,
                      borderColor: 'divider',
                      position: 'relative',
                      bgcolor: task.type === 'project' ? 'background.default' : 'transparent',
                    }}
                  >
                    {days.map((day, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: 'absolute',
                          left: i * DAY_WIDTH,
                          width: DAY_WIDTH,
                          height: '100%',
                          borderRight: 1,
                          borderColor: 'divider',
                          bgcolor: day.getDay() === 0 || day.getDay() === 6 ? 'rgba(255,255,255,0.02)' : 'transparent',
                        }}
                      />
                    ))}
                    <Tooltip title={`${task.name} (${formatDate(task.start)} - ${formatDate(task.end)})`} arrow>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: pos.left,
                          top: 8,
                          width: pos.width,
                          height: 24,
                          borderRadius: 1,
                          bgcolor: task.color,
                          opacity: task.type === 'project' ? 1 : 0.8,
                          display: 'flex',
                          alignItems: 'center',
                          pl: 1,
                          overflow: 'hidden',
                        }}
                      >
                        {/* Progress fill */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: `${task.progress}%`,
                            height: '100%',
                            bgcolor: 'rgba(255,255,255,0.2)',
                          }}
                        />
                        {pos.width > 60 && (
                          <Typography variant="caption" sx={{ color: 'white', fontSize: 11, zIndex: 1 }}>
                            {task.progress}%
                          </Typography>
                        )}
                      </Box>
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Legend */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Chip label="Epic 1: Catálogo" sx={{ bgcolor: '#3b82f6', color: 'white' }} />
        <Chip label="Epic 6: UI/UX" sx={{ bgcolor: '#8b5cf6', color: 'white' }} />
        <Chip label="Epic 2: Instalación" sx={{ bgcolor: '#10b981', color: 'white' }} />
      </Box>
    </Box>
  );
};

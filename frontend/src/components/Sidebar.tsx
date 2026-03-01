import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Cached as CachedIcon,
  Dashboard as DashboardIcon,
  Apps as AppsIcon,
  CalendarMonth as SprintIcon,
  Timeline as GanttIcon,
} from '@mui/icons-material';
import { useAppStore, PageType } from '../stores/appStore';

const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'catalog', label: 'Catalog', icon: <AppsIcon /> },
  { id: 'sprints', label: 'Sprints', icon: <SprintIcon /> },
  { id: 'gantt', label: 'Gantt Chart', icon: <GanttIcon /> },
];

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, categories, selectedCategory, setSelectedCategory, setSelectedToolId } = useAppStore();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedToolId(null);
    setCurrentPage('catalog');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CachedIcon sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            DevTools
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Installer
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Main Navigation */}
      <List sx={{ px: 1, py: 2 }}>
        <Typography
          variant="caption"
          sx={{ px: 2, py: 1, display: 'block', fontWeight: 600, color: 'text.secondary' }}
        >
          NAVIGATION
        </Typography>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={currentPage === item.id}
              onClick={() => setCurrentPage(item.id)}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Categories */}
      <List sx={{ flex: 1, overflowY: 'auto', px: 1, py: 2 }}>
        <Typography
          variant="caption"
          sx={{ px: 2, py: 1, display: 'block', fontWeight: 600, color: 'text.secondary' }}
        >
          CATEGORIES
        </Typography>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton
              selected={selectedCategory === category && currentPage === 'catalog'}
              onClick={() => handleCategoryClick(category)}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemText
                primary={category.replace('_', ' ').toUpperCase()}
                primaryTypographyProps={{ fontSize: 12, fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Footer */}
      <Box sx={{ p: 1 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 14 }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
};

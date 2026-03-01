import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Cached as CachedIcon,
  Apps as AppsIcon,
  Code as CodeIcon,
  Cloud as CloudIcon,
  Terminal as TerminalIcon,
  SmartToy as SmartToyIcon,
  Psychology as PsychologyIcon,
  Extension as ExtensionIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  Widgets as WidgetsIcon,
} from '@mui/icons-material';
import { useAppStore } from '../stores/appStore';
import { categoryLabels } from '../theme';

const categoryIcons: Record<string, React.ReactNode> = {
  runtime: <AppsIcon />,
  ide: <CodeIcon />,
  ai_ide: <SmartToyIcon />,
  ai_cli: <PsychologyIcon />,
  ai_extension: <ExtensionIcon />,
  local_model: <StorageIcon />,
  self_hosted: <DnsIcon />,
  devops: <CloudIcon />,
  cli: <TerminalIcon />,
  database: <DnsIcon />,
  framework: <WidgetsIcon />,
};

export const Sidebar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory, setSelectedToolId } = useAppStore();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedToolId(null);
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

      {/* Navigation */}
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
              selected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {categoryIcons[category] || <AppsIcon />}
              </ListItemIcon>
              <ListItemText
                primary={categoryLabels[category] || category}
                primaryTypographyProps={{ fontSize: 14 }}
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

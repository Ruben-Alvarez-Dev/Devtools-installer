import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  ErrorOutline as ErrorIcon,
  GetApp as InstallIcon,
  Autorenew as UpdatingIcon,
} from '@mui/icons-material';
import { Tool, ToolState } from '../types';
import { categoryColors } from '../theme';

interface ToolCardProps {
  tool: Tool;
  state?: ToolState;
  onInstall: (toolId: string) => void;
  onSelect: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, state, onInstall, onSelect }) => {
  const theme = useTheme();
  const isInstalled = state?.status === 'installed';
  const isInstalling = state?.status === 'installing' || state?.status === 'updating';
  const hasUpdate = state?.updateAvailable;
  const categoryColor = categoryColors[tool.category] || '#64748b';

  const getStatusIcon = () => {
    if (isInstalling) {
      return <UpdatingIcon sx={{ color: 'primary.main', animation: 'spin 1s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />;
    }
    if (isInstalled) {
      if (hasUpdate) {
        return <ErrorIcon sx={{ color: 'warning.main' }} />;
      }
      return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    }
    return null;
  };

  const getButtonText = () => {
    if (isInstalling) return 'Installing...';
    if (hasUpdate) return 'Update';
    if (isInstalled) return 'Installed';
    return 'Install';
  };

  return (
    <Card
      onClick={() => onSelect(tool.id)}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Category indicator bar */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${categoryColor}, ${alpha(categoryColor, 0.6)})`,
        }}
      />

      <CardContent sx={{ p: 2 }}>
        {/* Title row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Icon */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${categoryColor}, ${alpha(categoryColor, 0.7)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {tool.name.substring(0, 2).toUpperCase()}
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  transition: 'color 0.2s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {tool.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {tool.category.replace('_', ' ')}
              </Typography>
            </Box>
          </Box>
          {getStatusIcon()}
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tool.description}
        </Typography>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {tool.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: 11,
                  height: 22,
                  bgcolor: 'background.default',
                }}
              />
            ))}
          </Box>
        )}

        {/* Action button */}
        <Button
          variant="contained"
          fullWidth
          size="small"
          startIcon={<InstallIcon />}
          onClick={(e) => {
            e.stopPropagation();
            if (!isInstalled || hasUpdate) {
              onInstall(tool.id);
            }
          }}
          disabled={(isInstalled && !hasUpdate) || isInstalling}
          sx={{
            fontWeight: 600,
            ...(isInstalled && !hasUpdate && {
              bgcolor: 'action.disabledBackground',
              color: 'text.disabled',
              '&:hover': { bgcolor: 'action.disabledBackground' },
            }),
          }}
        >
          {getButtonText()}
        </Button>

        {/* Installed version */}
        {isInstalled && state?.installedVersion && (
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
            v{state.installedVersion.version}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { Box, Typography, LinearProgress, Paper, IconButton, alpha, useTheme } from '@mui/material';
import { Close as CloseIcon, CheckCircle as SuccessIcon, Error as ErrorIcon } from '@mui/icons-material';
import { InstallProgress as InstallProgressType } from '../types';

interface InstallProgressBarProps {
  progress: InstallProgressType;
  toolName?: string;
  onClose?: () => void;
  compact?: boolean;
}

const stageLabels: Record<string, string> = {
  preparing: 'Preparing...',
  downloading: 'Downloading...',
  extracting: 'Extracting...',
  configuring: 'Configuring...',
  installing: 'Installing...',
  complete: 'Complete!',
  failed: 'Failed',
};

const stageIcons: Record<string, string> = {
  preparing: '⏳',
  downloading: '📥',
  extracting: '📦',
  configuring: '⚙️',
  installing: '🔧',
  complete: '✅',
  failed: '❌',
};

export const InstallProgressBar: React.FC<InstallProgressBarProps> = ({
  progress,
  toolName,
  onClose,
  compact = false,
}) => {
  const theme = useTheme();
  const { stage, progress: pct, message, error } = progress;
  const isComplete = stage === 'complete';
  const isFailed = stage === 'failed';

  const getProgressColor = () => {
    if (isFailed) return 'error';
    if (isComplete) return 'success';
    return 'primary';
  };

  if (compact) {
    return (
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="caption" sx={{ fontSize: 10 }}>
            {stageIcons[stage]} {stageLabels[stage]}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto', fontSize: 10 }}>
            {pct}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={isFailed ? 100 : pct}
          color={getProgressColor()}
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          }}
        />
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: isFailed ? 'error.main' : isComplete ? 'success.main' : 'divider',
        borderRadius: 2,
        bgcolor: isFailed
          ? alpha(theme.palette.error.main, 0.05)
          : isComplete
          ? alpha(theme.palette.success.main, 0.05)
          : 'background.default',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        {/* Status Icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isFailed
              ? alpha(theme.palette.error.main, 0.1)
              : isComplete
              ? alpha(theme.palette.success.main, 0.1)
              : alpha(theme.palette.primary.main, 0.1),
            fontSize: 20,
          }}
        >
          {isFailed ? <ErrorIcon color="error" /> : isComplete ? <SuccessIcon color="success" /> : stageIcons[stage]}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {toolName && (
            <Typography variant="subtitle2" fontWeight={600} noWrap>
              {toolName}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {error || message || stageLabels[stage]}
          </Typography>

          {/* Progress bar */}
          {!isComplete && !isFailed && (
            <Box sx={{ mt: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {stageLabels[stage]}
                </Typography>
                <Typography variant="caption" fontWeight={600}>
                  {pct}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={pct}
                color={getProgressColor()}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
              />
            </Box>
          )}

          {/* Error details */}
          {isFailed && error && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                display: 'block',
                mt: 1,
                fontFamily: 'monospace',
                fontSize: 11,
                wordBreak: 'break-word',
              }}
            >
              {error}
            </Typography>
          )}
        </Box>

        {/* Close button */}
        {onClose && (isComplete || isFailed) && (
          <IconButton size="small" onClick={onClose} sx={{ mt: -0.5, mr: -0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

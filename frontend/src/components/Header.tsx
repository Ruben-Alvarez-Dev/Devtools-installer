import React from 'react';
import { Box, InputBase, IconButton, Chip, Badge, alpha, useTheme } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useAppStore } from '../stores/appStore';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, platformInfo } = useAppStore();
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      {/* Search */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: 400,
          flex: 1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'text.secondary',
          }}
        >
          <SearchIcon fontSize="small" />
        </Box>
        <InputBase
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '100%',
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            pl: 4,
            pr: 2,
            py: 1,
            fontSize: 14,
            '&:focus-within': {
              borderColor: 'primary.main',
            },
          }}
        />
      </Box>

      {/* Right side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Platform badges */}
        {platformInfo && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={platformInfo.os}
              size="small"
              sx={{
                textTransform: 'capitalize',
                bgcolor: 'background.default',
              }}
            />
            <Chip
              label={platformInfo.arch}
              size="small"
              sx={{
                textTransform: 'uppercase',
                bgcolor: 'background.default',
              }}
            />
          </Box>
        )}

        {/* Notifications */}
        <IconButton size="small">
          <Badge color="error" variant="dot">
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

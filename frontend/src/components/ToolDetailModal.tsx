import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Chip,
  Button,
  Grid,
  Link,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  GetApp as InstallIcon,
  OpenInNew as LinkIcon,
  CheckCircle as InstalledIcon,
  Schedule as PendingIcon,
} from '@mui/icons-material';
import { Tool, ToolState } from '../types';
import { categoryColors, categoryLabels } from '../theme';

interface ToolDetailModalProps {
  tool: Tool | null;
  state?: ToolState;
  open: boolean;
  onClose: () => void;
  onInstall: (toolId: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  state,
  open,
  onClose,
  onInstall,
}) => {
  if (!tool) return null;

  const isInstalled = state?.status === 'installed';
  const categoryColor = categoryColors[tool.category] || '#64748b';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}88)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {tool.name.substring(0, 2).toUpperCase()}
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {tool.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                <Chip
                  label={categoryLabels[tool.category] || tool.category}
                  size="small"
                  sx={{ bgcolor: categoryColor, color: 'white' }}
                />
                {isInstalled && (
                  <Chip
                    icon={<InstalledIcon />}
                    label="Installed"
                    size="small"
                    color="success"
                  />
                )}
              </Box>
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Description */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          {tool.description}
        </Typography>

        {/* Special features */}
        <Grid container spacing={3}>
          {tool.whySpecial && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 2, bgcolor: 'background.default', border: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Why it's special
                </Typography>
                <Typography variant="body2">{tool.whySpecial}</Typography>
              </Card>
            </Grid>
          )}
          {tool.idealUse && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ p: 2, bgcolor: 'background.default', border: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle2" color="secondary" gutterBottom>
                  Ideal use case
                </Typography>
                <Typography variant="body2">{tool.idealUse}</Typography>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Links */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>Links</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {tool.website && (
              <Link href={tool.website} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LinkIcon fontSize="small" /> Website
              </Link>
            )}
            {tool.documentation && (
              <Link href={tool.documentation} target="_blank" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LinkIcon fontSize="small" /> Documentation
              </Link>
            )}
          </Box>
        </Box>

        {/* Config path */}
        {tool.configPath && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Config Location</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'background.default', p: 1, borderRadius: 1 }}>
              {tool.configPath}
            </Typography>
          </Box>
        )}

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Tags</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {tool.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}

        {/* Install methods */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>Install Methods</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {tool.installMethods.map((method, index) => (
              <Box
                key={index}
                sx={{
                  p: 1.5,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Chip
                    label={method.type}
                    size="small"
                    sx={{ mr: 1, textTransform: 'capitalize' }}
                  />
                  <Typography variant="body2" component="span">
                    {method.platform} {method.arch && `(${method.arch})`}
                  </Typography>
                </Box>
                {method.package && (
                  <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                    {method.package}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          startIcon={isInstalled ? <InstalledIcon /> : <InstallIcon />}
          onClick={() => onInstall(tool.id)}
          disabled={isInstalled}
        >
          {isInstalled ? 'Installed' : 'Install'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Simple Card component for inline use
const Card: React.FC<{ children: React.ReactNode; sx?: object }> = ({ children, sx }) => (
  <Box sx={{ ...sx }}>{children}</Box>
);

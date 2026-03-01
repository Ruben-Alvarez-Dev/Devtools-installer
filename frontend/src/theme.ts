import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: '#334155',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #334155',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

// Category colors for gradients
export const categoryColors: Record<string, string> = {
  runtime: '#3b82f6',
  ide: '#8b5cf6',
  ai_ide: '#ec4899',
  ai_cli: '#10b981',
  ai_extension: '#f59e0b',
  local_model: '#06b6d4',
  self_hosted: '#ef4444',
  devops: '#f97316',
  cli: '#22c55e',
  database: '#6366f1',
  framework: '#14b8a6',
};

export const categoryLabels: Record<string, string> = {
  runtime: 'Runtimes',
  ide: 'IDEs',
  ai_ide: 'AI IDEs',
  ai_cli: 'AI CLIs',
  ai_extension: 'AI Extensions',
  local_model: 'Local Models',
  self_hosted: 'Self-Hosted',
  devops: 'DevOps / Cloud',
  cli: 'CLI Tools',
  database: 'Databases',
  framework: 'Frameworks',
};

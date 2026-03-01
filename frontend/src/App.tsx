import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { darkTheme } from './theme';
import { useWails } from './hooks/useWails';

function App() {
  // Initialize Wails bindings
  useWails();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout sidebar={<Sidebar />}>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

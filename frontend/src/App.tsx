import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Catalog } from './pages/Catalog';
import { SprintsPage, GanttPage } from './pages/Sprints';
import { darkTheme } from './theme';
import { useWails } from './hooks/useWails';
import { useAppStore } from './stores/appStore';

function App() {
  // Initialize Wails bindings
  useWails();
  const currentPage = useAppStore((state) => state.currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <Catalog />;
      case 'sprints':
        return <SprintsPage />;
      case 'gantt':
        return <GanttPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout sidebar={<Sidebar />}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;

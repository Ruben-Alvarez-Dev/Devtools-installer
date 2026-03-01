import React from 'react';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { useWails } from './hooks/useWails';
import './style.css';

function App() {
  // Initialize Wails bindings
  useWails();

  return (
    <Layout sidebar={<Sidebar />}>
      <Dashboard />
    </Layout>
  );
}

export default App;

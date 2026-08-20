import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { nordTheme, gruvboxTheme } from './theme';
import { useThemeStore } from './stores/useThemeStore';
import { useSearchStore } from './stores/useSearchStore';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import LeagueView from './views/LeagueView';

const App = () => {
  const mode = useThemeStore((state) => state.mode);
  const fetchSearchEntities = useSearchStore((state) => state.fetchSearchEntities);

  const activeTheme = mode === 'gruvbox' ? gruvboxTheme : nordTheme;

  // Ladataan hakuhakemisto kerran välimuistiin käynnistyksessä
  useEffect(() => {
    fetchSearchEntities();
  }, [fetchSearchEntities]);

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/competitions/:code" element={<LeagueView />} />
          <Route path="/teams/:id" element={<HomeView />} />
          <Route path="/players/:id" element={<HomeView />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
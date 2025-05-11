import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, IconButton, AppBar, Toolbar, Tab, Tabs } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Login from './pages/Login';
import Favorites from './pages/Favorites';

function AppContent() {
  const [mode, setMode] = useState('light');
  const [value, setValue] = useState(0);
  const location = useLocation();

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  useEffect(() => {
    if (location.pathname === '/home') setValue(0);
    else if (location.pathname === '/favorites') setValue(1);
  }, [location]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Tabs value={value} onChange={handleTabChange} textColor="inherit">
            <Tab label="Home" component={Link} to="/home" />
            <Tab label="Favorites" component={Link} to="/favorites" />
          </Tabs>
          <IconButton onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SearchBar from './SearchBar';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              gap: 1,
            }}
          >
            <SportsSoccerIcon color="primary" />
            <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: 0.5 }}>
              Pallo<span style={{ opacity: 0.7 }}>Stats</span>
            </Typography>
          </Box>

          <SearchBar />

          <ThemeSwitcher />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
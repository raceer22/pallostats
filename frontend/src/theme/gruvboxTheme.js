import { createTheme } from '@mui/material/styles';

export const gruvboxTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#282828',
      paper: '#3C3836',
    },
    primary: {
      main: '#FABD2F', // Warm Yellow
    },
    secondary: {
      main: '#B8BB26', // Bright Olive/Green
    },
    text: {
      primary: '#EBDBB2',
      secondary: '#BDAE93',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#3C3836',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          },
        },
      },
    },
  },
});
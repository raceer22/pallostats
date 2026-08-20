import { createTheme } from '@mui/material/styles';

export const nordTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#2E3440',
      paper: '#3B4252',
    },
    primary: {
      main: '#88C0D0', // Frost Cyan
    },
    secondary: {
      main: '#A3BE8C', // Aurora Green
    },
    text: {
      primary: '#ECEFF4',
      secondary: '#D8DEE9',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#3B4252',
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
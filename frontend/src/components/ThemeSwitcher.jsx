import React from 'react';
import { Button, Tooltip } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { useThemeStore } from '../stores/useThemeStore';

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useThemeStore();

  return (
    <Tooltip title={`Vaihda teemaan: ${mode === 'nord' ? 'Gruvbox' : 'Nord'}`}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<PaletteIcon />}
        onClick={toggleTheme}
        sx={{ textTransform: 'capitalize' }}
      >
        {mode}
      </Button>
    </Tooltip>
  );
};

export default ThemeSwitcher;
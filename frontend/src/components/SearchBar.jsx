import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { useSearchStore } from '../stores/useSearchStore';

const SearchBar = () => {
  const navigate = useNavigate();
  const { entities, query, setQuery, clearQuery } = useSearchStore();

  // Suodatetaan tulokset useMemolla suoraan välimuistitetusta listasta
  const filteredOptions = useMemo(() => {
    const trimmed = query?.trim().toLowerCase();
    if (!trimmed || trimmed.length < 2) return [];

    return entities
      .filter((item) => item?.name?.toLowerCase().includes(trimmed))
      .slice(0, 15);
  }, [query, entities]);

  const handleSelect = (event, selectedItem) => {
    if (!selectedItem || typeof selectedItem === 'string') return;

    clearQuery();

    if (selectedItem.type === 'competition') {
      navigate(`/competitions/${selectedItem.code || selectedItem.id}`);
    } else if (selectedItem.type === 'team') {
      navigate(`/teams/${selectedItem.id}`);
    } else if (selectedItem.type === 'player') {
      navigate(`/players/${selectedItem.id}`);
    }
  };

  return (
    <Box sx={{ width: { xs: 200, sm: 320, md: 400 } }}>
      <Autocomplete
        freeSolo
        options={filteredOptions}
        open={Boolean(query && query.trim().length >= 2)}
        groupBy={(option) => option.type?.toUpperCase()}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name || ''
        }
        inputValue={query}
        onInputChange={(event, newInputValue) => {
          setQuery(newInputValue);
        }}
        onChange={handleSelect}
        noOptionsText={
          <Typography variant="body2" color="text.secondary">
            Ei tuloksia haulle "{query}"
          </Typography>
        }
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;
          return (
            <Box
              component="li"
              key={key || `${option.type}-${option.id}`}
              {...otherProps}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                {option.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {option.type === 'player' && `${option.team || 'Joukkue ei tiedossa'} • ${option.league || ''}`}
                {option.type === 'team' && `${option.league || 'Sarja'}`}
                {option.type === 'competition' && 'Kilpailu'}
              </Typography>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Hae sarjoja, joukkueita, pelaajia..."
            variant="outlined"
            size="small"
            fullWidth
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
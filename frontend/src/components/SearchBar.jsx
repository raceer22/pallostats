import React, { useMemo } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchQuery, useSearchData, useUIActions } from '../stores/useUIStore';

const SearchBar = () => {
  const navigate = useNavigate();
  const searchQuery = useSearchQuery();
  const searchData = useSearchData() || [];
  const { setSearchQuery } = useUIActions();

  const filteredOptions = useMemo(() => {
    const query = searchQuery?.trim().toLowerCase();
    if (!query || query.length < 2) return [];

    return searchData
      .filter((item) => item?.name?.toLowerCase().includes(query))
      .slice(0, 15); 
  }, [searchQuery, searchData]);

  const handleSelect = (event, selectedItem) => {
    if (!selectedItem) return;

    if (selectedItem.type === 'competition') {
      navigate(`/competitions/${selectedItem.code || selectedItem.id}`);
    } else if (selectedItem.type === 'team') {
      navigate(`/teams/${selectedItem.id}`);
    } else if (selectedItem.type === 'player') {
      navigate(`/players/${selectedItem.id}`);
    }
  };

  return (
    <Box sx={{ width: 350 }}>
      <Autocomplete
        freeSolo
        options={filteredOptions}
        groupBy={(option) => option.type?.toUpperCase()}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name || ''
        }
        inputValue={searchQuery}
        onInputChange={(event, newInputValue) => {
          setSearchQuery(newInputValue);
        }}
        onChange={handleSelect}
        noOptionsText={
          <Typography variant="body2" color="text.secondary">
            No results found for "{searchQuery}"
          </Typography>
        }
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;
          return (
            <Box
              component="li"
              key={key || `${option.type}-${option.id}`}
              {...otherProps}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 1,
              }}
            >
              <Typography variant="body1" fontWeight={500}>
                {option.name}
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                {option.type === 'player' && `${option.team} • ${option.league}`}
                {option.type === 'team' && `${option.league}`}
                {option.type === 'competition' && 'Competition'}
              </Typography>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search competitions, teams, players..."
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
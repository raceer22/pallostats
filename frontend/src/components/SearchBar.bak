import { Button, TextField } from '@mui/material'
import { useSearchQuery, useUIActions } from '../stores/useUIStore';

const SearchBar = () => {
  const searchQuery = useSearchQuery()
  const { setSearchQuery } = useUIActions()
  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" color="primary">
        Search
      </Button>
    </>
  );
};


export default SearchBar
import { Container, TextField, Button } from '@mui/material';
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom';
import {
  useState,
  useEffect
} from 'react';
import teamService from './services/teams';
import leagueService from './services/leagues';
import searchService from './services/search'
import { useSearchQuery, useSearchData, useUIActions } from './stores/useUIStore';
import { useCurrentLeague, useLeagueActions } from './stores/useLeagueStore';

import SearchBar from './components/SearchBar.jsx';
import Home, { CompetitionDetail } from './components/Home';

const App = () => {
  const { setCurrentLeague } = useLeagueActions()
  const { setSearchData } = useUIActions()

  useEffect(() => {
    searchService.getAll().then(response => {
      console.log(response.data);
      setSearchData(response.data)
    })
  }, [setSearchData])

  return (
    <Container>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App
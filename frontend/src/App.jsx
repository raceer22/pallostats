import { Container, TextField, Button } from '@mui/material';
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom';
import {
  useState,
  useEffect
} from 'react';
import teamService from './services/teams';
import leagueService from './services/leagues';
import { useSearchQuery } from './stores/useUIStore';
import { useCurrentLeague, useLeagueActions } from './stores/useLeagueStore';

import SearchBar from './components/SearchBar';
import Home from './components/Home';

const App = () => {
  const { setCurrentLeague } = useLeagueActions()

  useEffect(() => {
    leagueService.getLeagueTeams('PL').then(response => {
      console.log(response.data);
      setCurrentLeague(response.data);
    });
  }, [setCurrentLeague])

  return (
    <Container>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Container>
  )
}

export default App
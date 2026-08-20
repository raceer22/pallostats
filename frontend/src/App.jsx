import { Container, TextField, Button } from '@mui/material';
import { useLocation, Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom';
import {
  useState,
  useEffect
} from 'react';
import searchService from './services/search'
import { useSearchQuery, useSearchData, useUIActions } from './stores/useUIStore';
import { useCurrentLeague, useLeagueActions } from './stores/useLeagueStore';

import SearchBar from './components/SearchBar.jsx';
import Home from './components/Home';
import CompetitionPage from './pages/CompetitionPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import PlayerPage from './pages/PlayerPage.jsx';
import { LinkToHome } from './components/Home';

const App = () => {
  const { setCurrentLeague } = useLeagueActions()
  const { setSearchData } = useUIActions()

  const isRoot = useLocation().pathname === '/';

  useEffect(() => {
    searchService.getAll().then(response => {
      console.log(response.data);
      setSearchData(response.data)
    })
  }, [setSearchData])

  return (
    <Container>
      <SearchBar/>
      { !isRoot && <LinkToHome/> }
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/competitions/:id" element={<CompetitionPage/>} />
        <Route path="/teams/:id" element={<TeamPage/>} />
        <Route path="/players/:id" element={<PlayerPage/>} />
      </Routes>
    </Container>
  )
}

export default App
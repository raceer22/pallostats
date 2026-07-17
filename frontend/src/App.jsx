import { Container, TextField, Button } from '@mui/material';
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom';
import {
  useState,
  useEffect
} from 'react';
import teamService from './services/teams';
import leagueService from './services/leagues';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
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

const LeagueDetails = ({ league }) => {
  if (!league) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{league.competition.name}</h2>
      <ul>
        {league.teams.map((team) => (
          <li key={team.id}>
            {team.name} 
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home = ({ league }) => {
  return (
    <div>
      <h1>Home</h1>
      <LeagueDetails league={league} />
    </div>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [league, setLeague] = useState(null);
  const [leagues, setLeagues] = useState(null);

  useEffect(() => {
  }, []);

  useEffect(() => {
    leagueService.getLeagueTeams('PL').then(response => {
      setLeague(response.data);
    });
  }, [])

  return (
    <Container>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home league={league} />} />
      </Routes>
    </Container>
  )
}

export default App;
import { useCurrentLeague } from "../stores/useLeagueStore";
import { useSearchQuery } from "../stores/useUIStore";

const Home = () => {
  const currentLeague = useCurrentLeague()
  const searchQuery = useSearchQuery()

  const matchingTeams = currentLeague?.teams ?
    currentLeague?.teams.filter(
      team => 
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : null

  const filteredLeague = currentLeague
    ? { ...currentLeague, teams: matchingTeams }
    : null

  return (
    <div>
      <h1>Home</h1>
      <LeagueDetails league={filteredLeague} />
    </div>
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
            {team?.name} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home
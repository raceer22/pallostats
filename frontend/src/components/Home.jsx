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
          <TeamDetails key={team.id} team={team}/>
        ))}
      </ul>
    </div>
  );
};

const TeamDetails = ({ team }) => {
  if (!team) {
    console.log('no data');
    return null
  }
  return (
    <li>
      {team?.name} 
      <h3>Players</h3>
      <ul>
        {team.squad.map((person) => (
          <PlayerDetails key={person.id} player={person}/>
        ))}
      </ul>
    </li>
  )
}

const PlayerDetails = ({ player }) => {
  if (!player) {
    return null
  }
  return (
    <li>
      {player.name}
    </li>
  )
}

export default Home
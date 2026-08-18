import React, { useMemo } from 'react'
import { useCurrentLeague } from "../stores/useLeagueStore";
import { useSearchQuery, useSearchData } from "../stores/useUIStore";

const Home = () => {
  const currentLeague = useCurrentLeague()
  const searchQuery = useSearchQuery()
  const searchData = useSearchData()

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const competitions = []
    const teams = []
    const players = []

    if (!query || query.length < 2) {
      return { competitions, teams, players}
    }

    for (const item of searchData) {
      const matchesName = item?.name?.toLowerCase().includes(query)

      if (matchesName) {
        if (item.type === 'competition') competitions.push(item)
        else if (item.type === 'team') teams.push(item)
        else if (item.type === 'player') players.push(item)
      }
    }

    return {
      competitions: competitions.slice(0, 5),
      teams: teams.slice(0, 8),
      players: players.slice(0, 15),
    }
  }, [searchQuery, searchData])




  return (
    <div>
      <h1>Home</h1>
      {searchQuery?.trim().length >= 2 && (
        <div className="search-results-dropdown">
          {searchResults.competitions.length > 0 && (
            <div className="search-group">
              <h3>Competitions</h3>
              {searchResults.competitions.map((comp) => (
                <div key={`comp-${comp.id}`}>{comp.name}</div>
              ))}
            </div>
          )}

          {searchResults.teams.length > 0 && (
            <div className="search-group">
              <h3>Teams</h3>
              {searchResults.teams.map((team) => (
                <div key={`team-${team.id}`}>
                  {team.name} <small>({team.league})</small>
                </div>
              ))}
            </div>
          )}

          {searchResults.players.length > 0 && (
            <div className="search-group">
              <h3>Players</h3>
              {searchResults.players.map((player) => (
                <div key={`player-${player.id}`}>
                  {player.name} <small>({player.team} - {player.league})</small>
                </div>
              ))}
            </div>
          )}

          {searchResults.competitions.length === 0 &&
            searchResults.teams.length === 0 &&
            searchResults.players.length === 0 && (
              <p>No results found for "{searchQuery}"</p>
            )}
        </div>
      )}
    </div>
  );
};

export default Home
const axios = require('axios')
const config = require('config')
const redisClient = require('../utils/redis')

const footballApi = axios.create({
  baseURL: config.get('footballData.api'),
  headers: {
    'X-Auth-Token': config.get('footballData.apiKey'),
  }
});

const normalizeCompetition = (rawComp) => ({
  id: rawComp.id,
  name: rawComp.name,
  code: rawComp.code,
  emblem: rawComp.emblem,
  type: 'competition'
})

const normalizeTeam = (rawTeam, leagueName = '') => ({
  id: rawTeam.id,
  name: rawTeam.name || rawTeam.shortName,
  badge: rawTeam.crest,
  league: leagueName,
  type: 'team'
})

const normalizePlayer = (rawPlayer, teamName = '', leagueName = '') => ({
  id: rawPlayer.id,
  name: rawPlayer.name,
  position: rawPlayer.position || 'Unknown',
  team: teamName,
  league: leagueName,
  type: 'player'
})

const getLeaguesTeamsPlayers = async () => {
  const cacheKey = `competitions:all`

  const cached = await redisClient.get(cacheKey)
  if (cached) return JSON.parse(cached);

  const res = await footballApi.get(`/all`)
  const data = res.data

  const normalizedPlayers = []
  const normalizedTeams = []
  const normalizedCompetitions = []

  data.competitions.forEach(competition => {
    normalizedCompetitions.push(normalizeCompetition(competition))

  })
}

module.exports = {
  normalizeCompetition,
  normalizeTeam,
  normalizePlayer
}
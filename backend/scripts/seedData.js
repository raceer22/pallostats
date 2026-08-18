const axios = require('axios');
const config = require('config');
const redisClient = require('../utils/redis');
const {
  normalizeTeam,
  normalizePlayer,
  normalizeCompetition
} = require('../services/footballService');

const footballApi = axios.create({
  baseURL: config.get('footballData.api'),
  headers: {
    'X-Auth-Token': config.get('footballData.apiKey')
  }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TTL_WEEK = 86400 * 7


const getCompetitions = async () => {
  // const cacheKey = `competitions:all`

  // const cached = await redisClient.get(cacheKey)
  // if (cached) return JSON.parse(cached);

  const res = await footballApi.get(`/competitions`)
  const data = res.data
  console.log("ok")

  const normalizedCompetitions = []

  data.competitions.forEach(competition => {
    normalizedCompetitions.push(normalizeCompetition(competition))
  })

  return normalizedCompetitions
}


const runSeeder = async () => {
  try {
    console.log('Yhdistetään Redisiin...');
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    console.log('Aloitetaan 13 liigan lataus ja indeksointi...');
    const competitions = await getCompetitions()

    const COMPETITION_CODES = competitions
      .map((c) => c.code)
      .filter((code) => Boolean(code))
    

    const allSearchEntities = [...competitions];

    for (const code of COMPETITION_CODES) {
      console.log(`\nNoudetaan sarja: ${code}...`);

      try {
        const [compRes, teamsRes] = await Promise.all([
          footballApi.get(`/competitions/${code}`),
          footballApi.get(`/competitions/${code}/teams`)
        ]);

        const compData = compRes.data;
        const teamsData = teamsRes.data;
        const competitionName = compData.name;

        const normalizedComp = normalizeCompetition(compData);
        allSearchEntities.push(normalizedComp);

        const leagueTeams = [];
        const leaguePlayers = [];

        if (teamsData.teams && Array.isArray(teamsData.teams)) {
          teamsData.teams.forEach((team) => {
            const normTeam = normalizeTeam(team, competitionName);
            leagueTeams.push(normTeam);
            allSearchEntities.push(normTeam);

            if (team.squad && Array.isArray(team.squad)) {
              team.squad.forEach((player) => {
                const normPlayer = normalizePlayer(player, team.name, competitionName);
                leaguePlayers.push(normPlayer);
                allSearchEntities.push(normPlayer);
              });
            }
          });
        }

        const leaguePayload = {
          competition: normalizedComp,
          teams: leagueTeams,
          players: leaguePlayers
        };

        await redisClient.set(
          `league_full:${code}`,
          JSON.stringify(leaguePayload),
          { EX: TTL_WEEK }
        );

        console.log(`✅ ${leagueName} tallennettu: ${leagueTeams.length} joukkuetta, ${leaguePlayers.length} pelaajaa.`);
      } catch (err) {
        console.error(`Virhe liigan ${code} noudossa:`, err.response?.data?.message || err.message);
      }

      console.log('⏸️  Odotetaan hetki API-rajoitusten vuoksi...');
      await sleep(6500);
    }

    console.log(`\n Tallennetaan hakuhakemisto Redisiin (${allSearchEntities.length} kohdetta)...`);
    await redisClient.set('search:all_entities', JSON.stringify(allSearchEntities), {
      EX: TTL_WEEK
    });

    console.log('🎉 Kaikki data alustettu ja valmiina hakuja varten!');
  } catch (error) {
    console.error('Kriittinen virhe alustuksessa:', error);
  } finally {
    await redisClient.quit();
    process.exit(0);
  }
};

runSeeder();
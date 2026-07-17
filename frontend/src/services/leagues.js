import axios from 'axios';
const baseUrl = '/api/league';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
}

const getLeagueTeams = async (leagueCode) => {
  const response = await axios.get(`${baseUrl}/${leagueCode}/teams`);
  return response;
}

export default {
  getAll,
  getLeagueTeams
}
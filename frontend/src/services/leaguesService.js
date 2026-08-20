import apiClient from './apiClient';

const getAllCompetitions = async () => {
  const response = await apiClient.get('/leagues');
  return response.data;
};

const getLeagueByCode = async (code) => {
  const response = await apiClient.get(`/leagues/${code}/teams`);
  return response.data;
};

export default { getAllCompetitions, getLeagueByCode };
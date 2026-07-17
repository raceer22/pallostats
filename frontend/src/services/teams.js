import axios from 'axios';
const baseUrl = '/api/teams';

export const getAll = () => {
  return axios.get(baseUrl);
};

export default {
  getAll,
}
import axios from 'axios';
const baseUrl = '/api/search';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/list`);
  return response;
}

export default {
  getAll,
}
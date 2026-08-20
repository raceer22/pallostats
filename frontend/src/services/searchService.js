import apiClient from './apiClient';

const getAllEntities = async () => {
  const response = await apiClient.get('/search/entities');
  console.log(response)
  return response.data;
};

export default { getAllEntities };
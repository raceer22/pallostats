const axios = require('axios');
const headers = require('./headers');

// const url = 'https://spl.torneopal.net/taso/rest/'
const url = 'https://v3.football.api-sports.io';

const getPlayer = async ({ id }) => {
  // const api = `/getPlayer?player_id=${id}`
  console.log(id);
  const api = `/sidelined?player=${id}`;
  const targetUrl = url + api;

  const config = {
    headers: {
      'x-apisports-key': '1e7f7da3323f790b3887667fd4cc8b15',
    },
  };

  console.log(targetUrl);
  try {
    // const response = await axios.get("https://v3.football.api-sports.io/sidelined?player=276", config)
    const response = await axios.get(targetUrl, config);
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

module.exports = {
  getPlayer,
};

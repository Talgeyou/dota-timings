import axios from 'axios';

const openDotaAxios = axios.create({
  baseURL: 'https://api.opendota.com/api/',
});

export default openDotaAxios;

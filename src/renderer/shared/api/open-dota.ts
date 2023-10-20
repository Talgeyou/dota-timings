import axios from 'axios';

export const openDotaAxios = axios.create({
  baseURL: 'https://api.opendota.com/api/',
});

import axios from 'axios';

const BASE_URL = process.env.CHIMONEY_BASE_URL;
const API_KEY = process.env.CHIMONEY_API_KEY;

const CHIPAY_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'accept': 'application/json',
    'content-Type': 'application/json',
    'X-API-KEY': `${API_KEY}`,
  }

})

export { CHIPAY_API };
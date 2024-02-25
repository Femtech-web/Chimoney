import axios from "axios";

// const BASE_URL = import.meta.env.VITE_LIVE_BASE_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
})

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('fintrust-current-user'));
  if (localStorage.getItem('fintrust-token') && user) {
    console.log(user._id)
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('fintrust-token'))}`;
    req.headers["X-UserId"] = `${user._id}`
  }

  return req;
});



export { API };
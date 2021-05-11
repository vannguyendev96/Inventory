import axios from 'axios';
import queryString from 'query-string';
import { getCookie } from 'src/utlis/cookies';

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    //'authorization': token
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  if(error.response.status === 401){
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    window.location.reload(); 
  }
  // Handle errors
  throw error;
});

export default axiosClient;
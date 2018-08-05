import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://twittergender.local:3000',
});

axiosInstance.interceptors.request.use((config) => {
  const conf = config;

  conf.headers['Oauth-Access-Token'] = 'abc123uyh876';

  return conf;
});

export default axiosInstance;

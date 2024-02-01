import axios from 'axios';
import configDev from './config/config.dev';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SERVER = axios.create({
  baseURL: configDev.API_URL,
});

SERVER.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('__token__');

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    } finally {
      return config;
    }
  },
  error => {
    console.log(`axios helper error: ${error}`);
    return Promise.reject(error);
  },
);
//   async function (response) {
//     try {
//       const { httpMetric } = response.config.metadata;

//       httpMetric.setHttpResponseCode(response.status);
//       httpMetric.setResponseContentType(response.headers['content-type']);
//       await httpMetric.stop();
//     } finally {
//       return response;
//     }
//   },
//   async function (error) {
//     try {
//       const { httpMetric } = error.config.metadata;

//       httpMetric.setHttpResponseCode(error.response.status);
//       httpMetric.setResponseContentType(error.response.headers['content-type']);
//       await httpMetric.stop();
//     } finally {
//       // Ensure failed requests throw after interception
//       console.log(error, 'news error');
//       return Promise.reject(error);
//     }
//   },
// );

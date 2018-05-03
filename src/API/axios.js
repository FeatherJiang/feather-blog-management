import axios from 'axios';
import envconfig from '../config';

export default function (method, url, params) {
  let argument = params;
  if (argument.params !== undefined) {
    Object.keys(argument.params).forEach((item) => {
      if (argument.params[item] === '' || argument.params[item] === null) {
        delete argument.params[item];
      }
    });
  }
  return new Promise((resolve, reject) => {
    if (typeof params !== 'object') argument = {};
    let option = argument;
    option = {
      method,
      url,
      baseURL: envconfig.baseURL,
      timeout: 30000,
      params: null,
      data: null,
      headers: null,
      withCredentials: true, // 是否携带cookies发起请求
      validateStatus: status => status >= 200 && status < 300,
      ...argument,
    };
    axios.interceptors.request.use((config) => {
      const conf = config;
      conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    });
    axios.request(option).then(
      (res) => {
        resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
      },
      (error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      },
    );
  });
}

import axios from 'axios';
import { cookie } from '../utils/index';
const instance = axios.create({
  baseURL: 'http://localhost:3000/api', //'http://localhost:8080/api',
  timeout: 5000,
  withCredentials: true
});

instance.interceptors.response.use(
  (res: any) => {
    if (res.data.token) {
      cookie.set('token', JSON.stringify(res.data.token), 10);
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

const get = (url: string, params?: any) => {
  return instance.get(url, {
    params: params
  });
};
const post = (url: string, data: any) => {
  return instance.post(url, data, {
    withCredentials: url !== '/login'
  });
};

const put = (url: string, data: any) => {
  return instance.put(url, data);
};

const remove = (url: string) => {
  return instance.delete(url);
};

export { get, post, put, remove };

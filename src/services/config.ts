import axios from 'axios';
import { cookie } from '../utils/index';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', //'http://localhost:8080/api',
  timeout: 5000,
  withCredentials: true
});

instance.interceptors.response.use(
  (res: any) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

const get = (url: string, params?: any) => {
  return instance.get(url, {
    params: params,
    headers: {
      Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
    }
  });
};
const post = (url: string, data: any) => {
  const config: any = {
    withCredentials: true
  };
  if (url !== '/login') {
    config.withCredentials = true;
    config.headers = {
      Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
    };
  } else {
    config.withCredentials = false;
  }
  return instance.post(url, data, config);
};

const put = (url: string, data: any) => {
  return instance.put(url, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
    }
  });
};

const remove = (url: string) => {
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
    }
  });
};

export { get, post, put, remove };

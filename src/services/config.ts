import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
});

instance.interceptors.response.use(
  (req) => {
    return req.data;
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
  return instance.post(url, data);
};

const remove = (url: string) => {
  return instance.delete(url);
};

export { get, post, remove };

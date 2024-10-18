import axios from 'axios';
import { ElMessage } from 'element-plus';
import { emitter } from '@/middleware/Emitter'
import { useLoginStore } from '@/stores/login';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',  //'http://121.37.10.32:3000/api',
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res: any) => {
    if(res.data.code === 204) {
      return undefined;
    }
    return res.data;
  },
  (error) => {
    if(error.status === 401) {
      ElMessage.error('登录超时，请重新登录')
      emitter.emit('API:UN_AUTH');
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error.response.data);
    }
  }
);

instance.interceptors.request.use(
  (config) => {
    const { token } = useLoginStore()
    if (config.url !== '/login') {
      config.withCredentials = true;
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.withCredentials = false;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
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

const put = (url: string, data: any) => {
  return instance.put(url, data);
};

const remove = (url: string) => {
  return instance.delete(url);
};

export { get, post, put, remove };

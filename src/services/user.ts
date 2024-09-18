import { id } from 'element-plus/es/locales.mjs';
import { get, post, remove } from './config';

export const getUser = () => get('/user');

export const creatUser = (data: any) => post('/creatUser', data);

export const deleteUser = (id: string) => {
  const url = '/deleteUser/' + id;
  return remove(url);
};

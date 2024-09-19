import { get, post, put, remove } from './config';

export const getUser = (params: any) => get('/user', params);

export const creatUser = (data: any) => post('/user/creatUser', data);

export const updateUser = (data: any) => {
  const url = '/user/updateUser/' + data._id;
  return put(url, data);
}; 

export const resetPassword = (data: any) => {
  const url = '/user/resetPassword/' + data._id;
  return put(url, data);
};

export const deleteUser = (id: string) => {
  const url = '/user/deleteUser/' + id;
  return remove(url);
};
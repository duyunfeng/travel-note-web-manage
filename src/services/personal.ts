import { get, put } from './config';
export const getPersonal = (params?:any) => get('/personal/getPersonal', params);
export const updatePersonal = (params: any) => put('/personal/updatePersonal', params);

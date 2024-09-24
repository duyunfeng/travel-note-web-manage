import { get, put } from './config';

export const getPersonal = () => get('/personal/getPersonal');
export const updatePersonal = (params: any) => put('/personal/updatePersonal', params);

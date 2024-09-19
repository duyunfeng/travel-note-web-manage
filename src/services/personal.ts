import { get } from './config'

export const getPersonal = (params: any) => get('/personal/getPersonal', params);


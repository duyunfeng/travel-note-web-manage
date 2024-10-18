import { get, post, put, remove } from './config';

export const createSource = (params: any) => post('/resource/createResource', params);

export const updateSource = (params: any) => put('/resource/updateResource', params);

export const deleteSource = (id: string) => remove(`/resource/deleteResource/${id}`);

export const getSource = (params: any) => get('/resource/getResource', params);

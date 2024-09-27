import { get, post, put } from './config';

export const createSource = (params: any) => post('/resource/createResource', params);

export const updateSource = (params: any) => put('/resource/updateResource', params);

export const deleteSource = (id: string) => post('/resource/deleteResource', { id });

export const getSource = (params: any) => get('/resource/getResource', params);

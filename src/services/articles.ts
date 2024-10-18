import { get, post, put, remove } from './config';

export const createArticle = (params: any) => post('/article/createArticle', params);

export const updateArticle = (params: any) => put('/article/updateArticle', params);

export const auditArticle = (data: any) => {
    const url = '/article/auditArticle/' + data.id;
    return put(url, data);
  }; 

export const deleteArticle = (id: string) => remove(`/article/deleteArticle/${id}`);

export const getArticle = (params: any) => get('/article/getArticle', params);

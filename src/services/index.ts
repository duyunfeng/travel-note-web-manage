import { get } from './config';
import * as login from './login';
import * as user from './user';
import * as personal from './personal';
import * as resources from './sources';
import * as articles from './articles';
import * as uploads from './upload';

export const getLog = (params: any) => get('/log', params);

export { login, user, personal, resources, articles, uploads };

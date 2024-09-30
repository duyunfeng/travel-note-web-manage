import * as login from './login';
import * as user from './user';
import * as personal from './personal';
import * as resources from './sources';
import { get } from './config';
export const getLog = (params: any) => get('/log', params);

export { login, user, personal, resources };

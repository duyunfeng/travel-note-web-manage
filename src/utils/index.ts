import _ from 'lodash';
import cookie from './cookie';
const parsePx = (px: string | number) => (_.isNumber(px) ? `${px}px` : px);

export { cookie, parsePx };

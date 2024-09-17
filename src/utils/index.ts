import _ from 'lodash'
export const parsePx = (px: string | number) => (_.isNumber(px) ? `${px}px` : px)

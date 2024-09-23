import Cookies from 'js-cookie';
const getCookie = (name: string) => Cookies.get(name);
const setCookie = (name: string, value: string) => Cookies.set(name, value);
const removeCookie = (name: string) => Cookies.remove(name);
const cookie = {
  get: getCookie,
  set: setCookie,
  remove: removeCookie
};
export { cookie as default };

import Cookies from 'js-cookie';
const getCookie = (name: string) => Cookies.get(name);
const setCookie = (name: string, value: string, time: number) =>
  Cookies.set(name, value, { expires: time });
const removeCookie = (name: string) => Cookies.remove(name);
const cookie = {
  get: getCookie,
  set: setCookie,
  remove: removeCookie
};
export { cookie as default };

import _ from 'lodash';
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus';
import moment from 'moment';
import { provinces } from '@/views/resources/provinces';
import cookie from './cookie';
const parsePx = (px: string | number) => (_.isNumber(px) ? `${px}px` : px);
const getProvincesOptions = () => {
  return provinces.map((item) => {
    return {
      label: item.name,
      value: item.code
    };
  });
};

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

const setDarkMode = (isDark: boolean) => document.documentElement.classList.toggle('dark', isDark);

const formatDate = (date: string | number | Date): string => moment(date).format('YYYY-MM-DD HH:mm:ss');
export { cookie, parsePx, getProvincesOptions, beforeUpload, formatDate, setDarkMode };

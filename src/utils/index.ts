import _ from 'lodash';
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus';
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
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
export { cookie, parsePx, getProvincesOptions, beforeUpload };

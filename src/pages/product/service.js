/* eslint-disable import/prefer-default-export */
import Request from '../../utils/request';

export const demo = data => Request({
  url: 'http://saas.crrcdt.com:8015/api/rms-ts/v1/rms/rmsProductorder/findPage/',
  method: 'GET',
  data,
});

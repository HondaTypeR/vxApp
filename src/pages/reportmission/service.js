/* eslint-disable import/prefer-default-export */
import Request from '../../utils/request';

export const getPeople = data => Request({
  url: 'http://saas.crrcdt.com:8015/api/rms-ts/v1/rms/rmsProductorder/findUsers/',
  method: 'GET',
  data,
});

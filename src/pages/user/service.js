/* eslint-disable import/prefer-default-export */
import Request from '../../utils/request';

export const login = (data) => Request({
  url: `http://test.crrcdt.com:8181/api/sys/v1/sso/appLogin?username=${data.username}&password=${data.password}`,
  method: 'POST',
});

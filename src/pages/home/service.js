import Request from '../../utils/request';

export const getNotify = data =>
  Request({
    url: 'http://saas.crrcdt.com:8015/v1/sys/sysNotify/?pageNum=1&pageSize=20&readFlag=&sortField=readFlag&sortOrder=ascend',
    method: 'GET',
    data,
  });

export const product = data =>
  Request({
    url: '/product/filter',
    method: 'GET',
    data,
  });

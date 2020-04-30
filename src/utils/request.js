import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

const request_data = {

};

export default (options = { method: 'GET', data: {} }) => {
  // if (!noConsole) {
  //   console.log(
  //     `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
  //       options.data
  //     )}`
  //   );
  // }
  return Taro.request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data,
    },
    header: {
      'Accept': '*/*',
      'Content-Type': 'application/json ; charset=utf-8',
      'access-token':`${Taro.getStorageSync('TOKEN')}`
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          res.data
        );
      }
      if (data.code !== 1) {
        if(data.message === '登录失败！用户名或密码错误！'){
          console.log('login filed')
        }else{
          Taro.showToast({
            title: `${res.data.message}` || '服务器请求错误',
            icon: 'none',
            mask: true,
          });
        }
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};

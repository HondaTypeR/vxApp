import * as userApi from './service';
// eslint-disable-next-line import/first
import Taro from '@tarojs/taro';

const imgs = {
  url:'https://www.crrcgc.cc/Portals/136/Uploads/Images/2016/4-14/635962323611393275.jpg',
  url2:'https://www.crrcgc.cc/Portals/136/Uploads/Images/2016/4-14/635962323813725631.jpg'
}
const userInfo = {}
export default {
  namespace: 'user',
  state: {
    username:'',
    password:'',
    imgs,
    userInfo,
    logining:false,
    errorMessage:false,
  },

  effects: {
     *login(_, { call, select, put}) {
      const { username,password } = yield select(state => state.user)
      const response = yield call(userApi.login,{username, password})
      if(response.code === 1){
        Taro.setStorage({ key: 'TOKEN', data: response.data.token })
        Taro.setStorageSync('name',response.data.userInfo.name)
        Taro.setStorageSync('oraName',response.data.userInfo.organizationName)
        Taro.setStorageSync('photo',response.data.userInfo.photo)
        Taro.setStorageSync('no',response.data.userInfo.no)
        Taro.setStorageSync('mobile',response.data.userInfo.mobile)
        yield put({
          type:'updateUserMessage',
          payload:response
        })
        yield put({
          type:'updateLoginFlag',
          payload:false,
        })
        // Taro.showToast({
        //   title: `登录成功，欢迎${Taro.getStorageSync('name')}`,
        //   icon: 'none',
        // });
      }else{
        yield put({
          type:'updateLoginFlag',
          payload:false,
        })
      }
      return response
    },
  },

  reducers: {
    updateLoginFlag(state,{payload}){
      return{
        ...state,
        logining:payload
      }
    },
    updateUserMessage(state,{ payload }){
      return{
        ...state,
        userInfo:payload.data
      }
    },
    changeUsername(state, { payload }){
      return{
        ...state,
        username:payload,
      }
    },
    changePassword(state, { payload }){
      return{
        ...state,
        password:payload,
      }
    },
    resetData(state){
      return{
        ...state,
        username:'',
        password:'',
      }
    },
    loginOut(state){
      Taro.clearStorageSync()
      return{
        ...state,
        username:'',
        password:'',
        userInfo:{},
      }
    }
  },

};

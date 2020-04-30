import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    swiperImg:[
      {img_src:'https://www.crrcgc.cc/Portals/136/Uploads/Images/2016/7-18/636044286286328447.jpg'},
      {img_src:'https://www.crrcgc.cc/Portals/136/Uploads/Images/2016/7-18/636044278703623129.jpg'},
      {img_src:'https://www.crrcgc.cc/Portals/136/Uploads/Images/2016/7-18/636044286717981205.jpg'}
    ],
    isLogin:'',
    notifyList:[],
  },
  effects: {
    *fetchNotify(_,{call, put }){
      const response = yield call(homeApi.getNotify)
      yield put({
        type:'updateNotyList',
        payload:response.data,
      })
    }
   
  },
  reducers: {
    updateNotyList(state,{ payload }){
      return {
        ...state,
        notifyList:payload.dataList,
      }
    },
    changeFlag(state,{ payload }){
      return {
        ...state,
        isLogin:payload,
      }
    },
  },
};

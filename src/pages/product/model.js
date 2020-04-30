import * as productApi from './service';

const list ={}
export default {
  namespace: 'product',
  state: {
    list,
    dataLists:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const params = payload
      const response = yield call(productApi.demo,params)
      yield put({
        type:'updateTable',
        payload:response.data
      })
      return response
    },
  },

  reducers: {
    updateTable(state, { payload }) {
      return { 
        ...state, 
        list:payload, 
        dataLists:payload.dataList
      };
    },
  },

};

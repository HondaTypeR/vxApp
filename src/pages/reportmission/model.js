import * as reportMissionApi from './service';

export default {
  namespace: 'reportmission',
  state: {
    peopleList:{},
  },

  effects: {
    *getPeople({ payload }, { call, put }) {
      const response = yield call(reportMissionApi.getPeople, payload);
      yield put({
        type:'updataPeople',
        payload:response.data,
      })
      return response
      
    },
    *doReport({ payload }, { call }){
      const response = yield call(reportMissionApi.doReport, payload);
      return response
    }
  },

  reducers: {
    updataPeople(state, { payload }) {
      return { 
        ...state, 
        peopleList:payload,
      };
    },
  },

};

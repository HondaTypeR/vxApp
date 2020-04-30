import * as executeApi from './service';

export default {
  namespace: 'execute',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(executeApi.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

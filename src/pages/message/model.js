import * as messageApi from './service';

export default {
  namespace: 'message',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(messageApi.demo, {});
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

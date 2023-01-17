import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import createPersistedState from 'vuex-persistedstate'
import createMultiTabState from 'vuex-multi-tab-state';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
},
plugins: [
    createMultiTabState({
        statesPaths: ['auth.user'],
        
      }),
    createPersistedState({
        storage: window.sessionStorage,
    }),
],
})

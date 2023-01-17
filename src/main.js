import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  VueAxios,
  Vuex,
  axios,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')

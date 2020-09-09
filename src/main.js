import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

import './axios'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
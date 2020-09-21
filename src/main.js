import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './axios'
import './permission'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
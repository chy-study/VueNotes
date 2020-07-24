import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.component('button-counter', {　
  data(){
    return {
      count: 0
    }
  },
  template: '<button id="count" v-on:click="count++">You clicked me {{ count }} times.</button>' 
})

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
Vue.config.productionTip = false
import './permission.js'
import Storage from '@/utils/localStorage'
Vue.use(Storage)
//获取url参数
import {
  GetRequest
} from '@/utils/common'
Vue.prototype.global = {
  corpVal: GetRequest()
}

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
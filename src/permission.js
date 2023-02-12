// import * as dd from 'dingtalk-jsapi'
import router from './router'
// import * as Api from '@/apis/commonApi.js'
import {
  Toast
} from 'vant'
import {
  GetRequest
} from '@/utils/common'


const whiteList = ['/noPersion', '/login']
router.beforeEach((to, from, next) => {
  next()

})
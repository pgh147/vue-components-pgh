import {
  get,
  post
} from '@/utils/fetch.js'
import Variable from '@/assets/js/global_variable'
// 登录接口
export const getLogin = (data) => {
  let apiName = ''
  if (process.env.VUE_APP_ENV === 'development') {
    apiName = `${Variable.baseUrl}/api/dingtalk-auth-service/login`
  } else {
    apiName = `${Variable.baseUrl}/api/dingtalk-api-service/login`
  }
  // const apiName = '/login'
  return post(apiName, data)
}
// 账号
export const getUcAccount = (data) => {
  const apiName = `${Variable.baseUrl}/api/transfer/authority/uc-user-authority/getUcAccount`
  return get(
    apiName, {
      params: data
    }
  )
}
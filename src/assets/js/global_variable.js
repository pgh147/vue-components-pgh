// 全局参数

const corpVal = {}
const authCode = ''
let uthUrl = ''
let baseUrl = ''
let gateWUrl = ''
let gateWayPath = ''
console.log(process.env.VUE_APP_ENV, 9999999999999)
switch (process.env.VUE_APP_ENV) {
  case 'development':
    // baseUrl = "http://10.0.50.154:6100/" //这里是开发环境中的url
    // uthUrl = "/api/dingats-web-117" //这里是开发环境中的url
    baseUrl = 'https://mhr-test2.belle.net.cn' // 这里是测试环境中的url
    // gateWUrl = 'https://gateway-dev.belle.net.cn/office-data-clock' //网关
    gateWUrl = 'https://platform-gateway-test-out.belle.net.cn/office-data-clock'
    uthUrl = '/api/dingtalk-iacs-modian' // 这里是测试环境中的url
    gateWayPath = 'https://platform-gateway-test-out.belle.net.cn'
    break
  case 'release': // 注意这里的名字要和步骤二中设置的环境名字对应起来
    baseUrl = 'https://mhr-test2.belle.net.cn' // 这里是测试环境中的url
    gateWUrl = 'https://platform-gateway-test-out.belle.net.cn/office-data-clock' //网关
    uthUrl = '/api/dingtalk-iacs-modian' // 这里是测试环境中的url
    gateWayPath = 'https://platform-gateway-test-out.belle.net.cn'
    break
  case 'production':
    baseUrl = 'https://nhr.belle.net.cn' // 生产环境url
    gateWUrl = 'https://platform-gateway2.belle.net.cn/office-data-clock' //网关
    uthUrl = '/api/dingtalk-iacs-modian' // 生产环境url
    gateWayPath = 'https://platform-gateway2.belle.net.cn'
    break
  default:
    // baseUrl = "http://10.234.7.125:6300" //这里是本地的请求url
    gateWUrl = 'https://platform-gateway2.belle.net.cn/office-data-clock' //网关
    baseUrl = 'https://mhr-test2.belle.net.cn'
    gateWayPath = 'https://platform-gateway2.belle.net.cn'
    // uthUrl = "/api/dingats-web-117" //这里是本地的请求url
    uthUrl = '/api/dingtalk-iacs-modian'
}
console.log(process.env.VUE_APP_ENV, baseUrl, uthUrl)
export default {
  corpVal,
  authCode,
  gateWUrl,
  uthUrl,
  baseUrl,
  gateWayPath
}
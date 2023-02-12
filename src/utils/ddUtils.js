import * as dd from 'dingtalk-jsapi'
// import { isPc } from '../utils/utils'
export const isDdEnv = dd.env.platform !== "notInDingTalk";

//修改标题
export const setTitle = title => {
  if (isDdEnv) {
    dd.biz.navigation.setTitle({
        title: title
    })
  }
}
// 判断是否在钉钉客户端
// export const isInDingClient = function () {
//   let isInClient = false
//   const UA = window.navigator.userAgent
//   if (UA.indexOf('DingTalk') !== -1) {
//     isInClient = true
//   }
//   return isInClient
// }

// // 启动下拉刷新
// export const ddEnablePullToRefresh = function (type = false, callback) {
//   if (isInDingClient()) {
//     if (!type) {
//       localStorage.setItem('open', 'open')
//     }
//     if (!isPc()) {
//       dd.ui.pullToRefresh.enable({
//         onSuccess: function (e) {
//           dd.ui.pullToRefresh.stop()
//           if (callback) {
//             callback()
//           } else {
//             window.location.reload()
//           }
//         },
//         onFail: function () {}
//       })
//     }
//   }
// }

// // 禁用下拉刷新
// export const ddDisablePullToRefresh = function (type) {
//   if (isInDingClient()) {
//     if (!type) {
//       localStorage.removeItem('open')
//     }
//     if (!isPc()) {
//       dd.ui.pullToRefresh.disable()
//     }
//   }
// }

// // 针对ios 启用 or 关闭 弹性模式
// export const ddwebViewBounce = function (type) {
//   if (isInDingClient() && !isPc()) {
//     if (type) {
//       dd.ui.webViewBounce.enable()
//     } else {
//       dd.ui.webViewBounce.disable()
//     }
//   }
// }

// // 跳转当前应用页面
// export const open = function (url, data) {
//   if (!isPc()) {
//     dd.biz.util.open({
//       name: url, // 要打开链接的地址
//       params: {
//         corpId: localStorage.getItem('corpId'),
//         ...data
//       } // 传参
//     })
//   }
// }

// // 跳转
// export const openLink = function (url, cb) {
//   const rootPath = process.env.NODE_ENV === 'production' ? '/sell-data-fe/' : '/'
//   if (url.indexOf('?') !== -1) {
//     url += '&random=' + new Date().getTime()
//   } else {
//     url += '?random=' + new Date().getTime()
//   }
//   if (isPc()) {
//     window.location.href = window.location.origin + rootPath + '#' + url
//     // dd.biz.util.open({
//     //   name: window.location.origin + rootPath + '#' + url // 要打开链接的地址// 传参
//     // })
//   } else {
//     dd.biz.util.openLink({
//       url: window.location.origin + rootPath + '#' + url, // 要打开链接的地址
//       onSuccess: function (result) {
//         cb && cb()
//       },
//       // eslint-disable-next-line handle-callback-err
//       onFail: function (err) {}
//     })
//   }
// }

// // 设置导航栏标题
// export const setTitle = function (title) {
//   if (isInDingClient() && !isPc()) {
//     // document.title = title
//     dd.ready(function () {
//       dd.biz.navigation.setTitle({
//         title: title,
//         onSuccess: function (result) {
//           document.title = title
//         },
//         onFail: function (err) { console.log(err) }
//       })
//     })
//   }
// }

// // 设置导航栏右侧自定义菜单按钮
// export const setNavbarCustomeMenu = function (options) {
//   if (isInDingClient() && !isPc()) {
//     const defaultOpt = {
//       items: [
//         {
//           id: '1',
//           iconId: 'file',
//           text: '帮助',
//           url: 'http://img.alicdn.com/tps/TB1XLjqNVXXXXc4XVXXXXXXXXXX-170-64.png'
//         }
//       ],
//       onSuccess: function (data) {},
//       // eslint-disable-next-line handle-callback-err
//       onFail: function (err) {}
//     }
//     dd.biz.navigation.setMenu(options || defaultOpt)
//   }
// }

// // 获取钉钉鉴权code
// export const requestAuthCode = function (corpId, successCallback, errorCallback) {
//   if (isInDingClient()) {
//     dd.ready(function () {
//       dd.runtime.permission.requestAuthCode({
//         corpId: corpId,
//         onSuccess: function (result) {
//           successCallback(result)
//         },
//         onFail: function (err) {
//           errorCallback('获取code失败:' + JSON.stringify(err))
//         }
//       })
//     })
//   } else {
//     errorCallback('请在钉钉环境下打开')
//   }
// }

// // 全屏窗口跳转
// export const jumpFullScreen = function (url) {
//   const randomParam = `_random=${new Date().getTime()}`
//   url += url.indexOf('?') === -1 ? `?${randomParam}` : `&${randomParam}`
//   dd.ready(function () {
//     if (isPc()) {
//       localStorage.setItem('damei-jumpUrl', window.location.href)
//       window.location.href = window.location.origin + url
//       // dd.biz.util.open({
//       //   name: window.location.origin + rootPath + '#' + url // 要打开链接的地址// 传参
//       // })
//     } else {
//       dd.biz.util.openLink({
//         url: window.location.origin + url, // 要打开链接的地址
//         onSuccess: function (result) {
//           console.log('openLinkSuc', result)
//         },
//         onFail: function (err) {
//           console.log('openLinkFail', err)
//         }
//       })
//     }
//   })
// }

// // 旋转屏幕 (仅仅安卓支持， ios和pc均不支持)
// export const rotateView = function (showStatusBar = true, clockwise = true) {
//   return new Promise((resolve, reject) => {
//     // dd.ready(function () {
//     dd.device.screen.rotateView({
//       showStatusBar: showStatusBar, // 否显示statusbar
//       clockwise: clockwise, // 是否顺时针方向
//       onSuccess: function (result) {
//         console.log('rotateViewSuc', result)
//         resolve(result)
//       },
//       onFail: function (err) {
//         console.log('rotateViewFail', err)
//         reject(err)
//       }
//     })
//     // })
//   })
// }

// // 重置旋转屏幕
// export const resetView = function () {
//   dd.ready(function () {
//     dd.device.screen.resetView({
//       onSuccess: function (result) {
//         console.log('resetViewSuc', result)
//       },
//       onFail: function (err) {
//         console.log('resetViewFail', err)
//       }
//     })
//   })
// }

// // 关闭当前浏览器窗口(关闭当前层)
// export const closeView = function () {
//   dd.ready(function () {
//     dd.biz.navigation.close({
//       onSuccess: function (result) {
//         console.log('closeSuc', result)
//       },
//       onFail: function (err) {
//         console.log('closeFail', err)
//       }
//     })
//   })
// }

// // 返回上一页
// export const goBack = function () {
//   dd.ready(function () {
//     dd.ready(function () {
//       dd.biz.navigation.goBack({
//         onSuccess: function (result) {
//           console.log('goBackSuc', result)
//         },
//         onFail: function (err) {
//           console.log('goBackFail', err)
//         }
//       })
//     })
//   })
// }

// // 设置iOS Webview弹性效果 (true启用，false禁用)
// export const setWebViewBounce = function (flag = true /* true启用，false禁用 */) {
//   if (flag) {
//     dd.ui.webViewBounce.enable()
//   } else {
//     dd.ui.webViewBounce.disable()
//   }
// }

// // 退到后台的事件监听(webview)
// export const setDDPause = function (callback = () => {}) {
//   dd.ready(function () {
//     document.addEventListener('pause', function (e) {
//       e.preventDefault()
//       callback()
//     }, false)
//   })
// }

// // 页面唤起事件的监听
// export const setDDResume = function (callback = () => {}) {
//   dd.ready(function () {
//     document.addEventListener('resume', (e) => {
//       // e.preventDefault()
//       callback()
//     })
//   })
// }
// // 钉钉storage本地存储
// export const setStorageItem = function (key, value, callback = () => {}) {
//   dd.ready(function () {
//     dd.util.domainStorage.setItem({
//       name: key, // 存储信息的key值
//       value: value, // 存储信息的Value值
//       onSuccess: function (info) {
//         callback()
//       },
//       onFail: function (err) {
//         console.log(err)
//       }
//     })
//   })
// }
// // 钉钉storage本地存储获取
// export const getStorageItem = function (key, callback = () => {}) {
//   dd.ready(function () {
//     dd.util.domainStorage.getItem({
//       name: key, // 存储信息的key值
//       onSuccess: function (info) {
//         console.log('getStorageItemSucc', info)
//       },
//       onFail: function (err) {
//         console.log('getStorageItemErr', err)
//       }
//     })
//   })
// }

// // 钉钉storage本地存储移除
// export const removeStorageItem = function (key, callback = () => {}) {
//   dd.ready(function () {
//     dd.util.domainStorage.removeItem({
//       name: key, // 存储信息的key值
//       onSuccess: function (info) {
//         console.log('removeStorageItemSucc', info)
//       },
//       onFail: function (err) {
//         console.log('removeStorageItemErr', err)
//       }
//     })
//   })
// }

// // 监听页面回退事件(仅安卓有效， iphone需要重写setLeft组件绑定)
// export const listenBackbutton = function (callback = () => {}) {
//   dd.ready(function () {
//     console.log('listenBackbutton监听成功')
//     document.addEventListener('backbutton', function (e) {
//       // 在这里处理你的业务逻辑
//       e.preventDefault()
//       // callback()
//       dd.device.notification.alert({
//         message: '哎呀，你不小心点到返回键啦!',
//         title: '...警告...'
//       })
//     }, false)
//   })
// }

// // 获取获取当前地理位置信息
// export const geolocation = function (targetAccuracy, coordinate, withReGeocode, useCache, successCallback, errorCallback) {
//   dd.ready(function () {
//     dd.device.geolocation.get({
//       targetAccuracy: targetAccuracy, // 建议按照业务需求设置定位精度，推荐采用200m，可获得较好的精度和较短的响应时长
//       coordinate: coordinate, // 1：获取高德坐标 0：获取标准坐标 推荐使用高德坐标，标准坐标没有 address字段。
//       withReGeocode: withReGeocode, // 是否需要带有逆地理编码信息。该功能需要网络请求，请根据自己的业务场景使用
//       useCache: useCache, // 是否缓存地理位置信息。默认是true。如果为true，客户端会对定位的地理位置信息缓存，在缓存期内 (2分钟) 再次定位会返回旧的定位。
//       onSuccess: function (result) {
//         successCallback(result)
//       },
//       onFail: function (err) {
//         errorCallback(err)
//       }
//     })
//   })
// }

// // 调用钉钉input方法唤起键盘(不支持 ----)
// export const ddInput = function (placeholder, text, successCallback, errorCallback) {
//   dd.ready(function () {
//     dd.ui.input.plain({
//       placeholder: placeholder, // 占位符
//       text: text, // 默认填充文本
//       onSuccess: function (result) {
//         successCallback(result)
//       },
//       onFail: function (err) {
//         errorCallback(err)
//       }
//     })
//   })
// }

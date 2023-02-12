import { Toast } from 'vant'

let needLoadingRequestCount = 0
let toastInstance = null

function showFullScreenLoading () {
  return new Promise((resolve, reject) => {
    if (needLoadingRequestCount === 0) {
      toastInstance = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    }
    needLoadingRequestCount++
    resolve()
  })
}

function tryHideFullScreenLoading () {
  return new Promise((resolve, reject) => {
    if (needLoadingRequestCount <= 0) {
      resolve()
    } else {
      needLoadingRequestCount--
      if (needLoadingRequestCount === 0) {
        toastInstance.clear()
      }
      resolve()
    }
  })
}

export function handleLoading (showLoading) {
  if (showLoading) {
    return showFullScreenLoading()
  } else {
    return tryHideFullScreenLoading()
  }
}

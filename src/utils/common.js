export function GetRequestParams() {
  const url = location.search // 获取url中"?"符后的字串
  let strs = []
  const theRequest = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}

// time1开始时间，time2结束时间
export function count_time(time1, time2) {
  time1 = Date.parse(new Date(time1))
  time2 = Date.parse(new Date(time2))
  return Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24))
}

export function newFormatTime(s) {
  var t = ''
  if (s > -1) {
    var hour = Math.floor(s / 3600)
    // var min = Math.floor(s / 60) % 60;
    // var sec = s % 60;
    var day = parseInt(hour / 24)
    if (day > 0) {
      hour = hour - 24 * day
      t = day
    }

    if (hour && hour > 0) {
      t += hour
    }
  }
  return t === '' ? '0' : t
}
export function newFormatTimeByHoursJ(s, b, a, c) {
  var t = ''
  if (s > -1) {
    s = s - c
    var x = s / 3600
    var ta = x - a
    if (ta < 0) {
      ta = 0
    }
    var hour = x - ta % b

    if (hour && hour > 0) {
      t = hour
    }
  }
  return t === '' ? '0' : t
}

export function getWeekByDate(date) {
  var day = new Date(Date.parse(date)) // 需要正则转换的则 此处为 ： var day = new Date(Date.parse(date.replace(/-/g, '/')));
  var today = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return today[day.getDay()]
}

// date计算的日期  dayNumber计算的数量
export function getDateCalculate(date, dayNumber) {
  date = date ? new Date(date) : new Date()
  var ms = dayNumber * (1000 * 60 * 60 * 24)
  var newdays = new Date(date.getTime() + ms)
  var y = newdays.getFullYear()
  var m = newdays.getMonth() + 1
  var d = newdays.getDate()
  var value = y + '-' + p(m) + '-' + p(d)
  return value
}

// 获取当前日期  yyyy-MM-dd
export function getCurrentTime(sms) {
  var myDate = new Date()
  // 获取当前年
  var year = myDate.getFullYear()
  // 获取当前月
  var month = myDate.getMonth() + 1
  // 获取当前日
  var date = myDate.getDate()
  var h = myDate.getHours() // 获取当前小时数(0-23)
  var m = myDate.getMinutes() // 获取当前分钟数(0-59)
  var s = myDate.getSeconds()
  if (sms) {
    return year + '-' + p(month) + '-' + p(date) + ' ' + p(h) + ':' + p(m) + ':' + p(s)
  }

  return year + '-' + p(month) + '-' + p(date)
}

// 获取当前日期  yyyy-MM-dd
export function dateToStr(myDate, type) {
  if (myDate.length === 16) {
    myDate = myDate + ':00'
    myDate = myDate.replace(/-/g, '/')
  }
  // 获取当前年
  myDate = new Date(myDate)

  var year = myDate.getFullYear()
  // 获取当前月
  var month = myDate.getMonth() + 1
  // 获取当前日
  var date = myDate.getDate()
  var h = myDate.getHours() // 获取当前小时数(0-23)
  var m = myDate.getMinutes() // 获取当前分钟数(0-59)
  var s = myDate.getSeconds();
  if (type === 'datetime') {
    return year + '-' + p(month) + '-' + p(date) + ' ' + p(h) + ':' + p(m) + ':' + p(s)
  } else if (type === 'time') {
    return p(h) + ':' + p(m) + ':' + p(s)
  } else {
    return year + '-' + p(month) + '-' + p(date)
  }
}

export function MathRand(digit) {
  var Num = ''
  for (var i = 0; i < digit; i++) {
    Num += Math.floor(Math.random() * 10)
  }
  return Num
}

export function GetRequest() {
  var url = location.search // 获取url中"?"符后的字串
  if (url.indexOf('-') > -1) {
    url = unescape(url).replace('-', '&')
  }
  var theRequest = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}
// 根据日期加减
export function getOperationTime(dateA, operation, days) {
  var myDate = new Date(dateA.replace(/-/g, '/'))
  // 获取当前年

  if (operation === '-') {
    myDate.setDate(myDate.getDate() - 1 * days)
  } else {
    myDate.setDate(myDate.getDate() + 1 * days)
  }

  var year = myDate.getFullYear()
  // 获取当前月
  var month = myDate.getMonth() + 1
  // 获取当前日
  var date = myDate.getDate()
  // var h = myDate.getHours(); // 获取当前小时数(0-23)
  // var m = myDate.getMinutes(); // 获取当前分钟数(0-59)
  // var s = myDate.getSeconds();
  return year + '-' + month + '-' + date
}

export function AddDays(date, value) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  return date.setDate(date.getDate() + value)
}

// 两个日期相减 得到天数
export function DateMinus(sDate, eDate) {
  var sdate = new Date(sDate.replace(/-/g, '/'))
  var now = new Date(eDate.replace(/-/g, '/'))
  var days = now.getTime() - sdate.getTime()
  var day = parseInt(days / (1000 * 60 * 60 * 24))
  return day
}

export function ckdate(starttime, endtime) {
  var start = new Date(starttime.replace('-', '/').replace('-', '/'))
  var end = new Date(endtime.replace('-', '/').replace('-', '/'))
  if (end < start) {
    return false
  } else {
    return true
  }
}

export function showToast(types, message) {
  var content = message
  var type = types
  var duration = '2000'
  // eslint-disable-next-line
  insight.ui.showToast(content, type, duration)
    .then(data => {
      // balabala
    })
    .catch(error => {
      console.log(error)
      // alert(JSON.stringify(error));
    })
}

// 获取前后几个月
export function GetTimeTo(m, type) {
  // var preYear = 0;
  var resultDate, year, month, day
  var currDate = new Date()
  year = currDate.getFullYear()
  month = currDate.getMonth() + 1
  day = currDate.getDate()
  // / eslint-disable-next-line
  var days = new Date(year, month, 0)
  // eslint-disable-next-line
  days = days.getDate(); // 获取当前日期中月的天数
  var year2 = year
  var month2 = parseInt(month) - m
  if (month2 <= 0) {
    // preYear = parseInt(m / 12);
    year2--
    month2 = 12 - (Math.abs(month2) % 12)
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 > 12) {
    year2++
    month2 -= 12
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }

  let d = ''
  switch (type) {
    case 'start':
      d = '01'
      break
    case 'now':
      d = day2
      break
    case 'end':
      d = new Date(year2, month2, 0).getDate()
      break

    default:
      break
  }
  resultDate = year2 + '/' + month2 + '/' + d
  return resultDate
}

// 获取上月的第一天
export function GetFristDay() {
  var nowdays = new Date()
  var year = nowdays.getFullYear()
  var month = nowdays.getMonth()
  if (month === 0) {
    month = 12
    year = year - 1
  }
  if (month < 10) {
    month = '0' + month
  }
  return year + '-' + month + '-' + '01' // 上个月的第一天
}

// 获取上月第一天
export function GetFristDayTemp() {
  return new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
}

// 获取本月最后一天
export function GetLastDayTemp() {
  var date = new Date()
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function GetLastDay() {
  var endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 1)
  endDate.setDate(0)

  return new Date(endDate).toString('yyyy-MM-dd')
}

export function GetVacation(value) {

}

export function myTimeToLocal(inputTime) {
  if (!inputTime && typeof inputTime !== 'number') {
    return ''
  }
  var localTime = ''
  inputTime = new Date(inputTime).getTime()
  const offset = (new Date()).getTimezoneOffset()
  localTime = (new Date(inputTime - offset * 60000)).toISOString()
  localTime = localTime.substr(0, localTime.lastIndexOf('.'))
  localTime = localTime.replace('T', ' ')
  return new Date(Date.parse(localTime.replace('-', '/').replace('-', '/')))
}

export function GetRuleConfig(id) {
  var obj = JSON.parse(localStorage.getItem('ruleConfigList'))
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].configType === id) {
      return obj[i]
    }
  }
  return {}
}

function p(s) {
  return s < 10 ? '0' + s : s
}

// 节流函数 fun 方法 time 时间
let timeOut
export function throttleFun(fun, time) {
  timeOut && clearTimeout(timeOut)
  timeOut = setTimeout(() => {
    fun()
  }, time)
}

export function isMobile() {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}
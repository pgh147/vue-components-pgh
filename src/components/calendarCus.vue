<template>
  <div ref="sliderDay" class="timepicker">
    <div class="timepicker-box">
      <div class="box-section">
        <div v-drag class="section-slider" id="section-slider">
          <div class="slider-week">
            <span v-for="(item, key) in weekList" :key="key" class="week-item">{{ item.name }}</span>
          </div>
          <div
            :class="{ 'slider-day-div': showSlider }"
            style="white-space: nowrap"
            :style="{ transform: `translateX(${preXLeng}px)` }"
          >
            <!-- 上个月日期列表start -->
            <div class="slider-day" style="position: relative">
              <div
                v-for="(item, key) in preActiveDayList"
                :key="key"
                class="day-item not-current-month"
                :class="{
                  hiddenDiv: defaultLine && (item._d.getTime() < startTime || item._d.getTime() > endTime)
                }"
              >
                <div class="day-item-span">
                  {{ item._d.getDate() }}
                </div>
                <div class="day-item-err-div"></div>
              </div>
            </div>
            <!-- 上个月日期列表end -->
            <!-- 当前月日期列表start -->
            <div class="slider-day" style="position: relative">
              <div
                v-for="(item, key) in activeDayList"
                :key="key"
                class="day-item"
                :class="{
                  'day-item-current':
                    item._d.getDate() === activeDay.day &&
                    item._d.getMonth() + 1 === activeDay.month &&
                    item._d.getFullYear() === activeDay.year,
                  'not-current-month': !(item._d.getMonth() + 1 === queryMonth && item._d.getFullYear() === queryYear),
                  hiddenDiv: defaultLine && (item._d.getTime() < startTime || item._d.getTime() > endTime)
                }"
                @click="changeOhterMonthDate(item)"
              >
                <!-- v-show="item._d.getMonth() + 1 == queryMonth && item._d.getFullYear() == queryYear" -->
                <!-- :style="{
                    visibility:
                      item._d.getMonth() + 1 == queryMonth && item._d.getFullYear() == queryYear ? 'visible' : 'hidden'
                  }" -->
                <div class="day-item-span">
                  {{ item._d.getDate() }}
                </div>
                <div class="day-item-err-div">
                  <span
                    class="day-item-err"
                    v-show="
                      statusOps.errDate
                        ? statusOps.errDate[
                            item._d.getFullYear() +
                              '-' +
                              (item._d.getMonth() + 1 > 9 ? item._d.getMonth() + 1 : '0' + (item._d.getMonth() + 1)) +
                              '-' +
                              (item._d.getDate() > 9 ? item._d.getDate() : '0' + item._d.getDate())
                          ]
                        : false
                    "
                  ></span>
                  <span
                    class="day-item-over"
                    v-show="
                      statusOps.infoDate
                        ? statusOps.infoDate[
                            item._d.getFullYear() +
                              '-' +
                              (item._d.getMonth() + 1 > 9 ? item._d.getMonth() + 1 : '0' + (item._d.getMonth() + 1)) +
                              '-' +
                              (item._d.getDate() > 9 ? item._d.getDate() : '0' + item._d.getDate())
                          ]
                        : false
                    "
                  ></span>
                  <span
                    class="day-item-normal"
                    v-show="
                      statusOps.normalDate
                        ? statusOps.normalDate[
                            item._d.getFullYear() +
                              '-' +
                              (item._d.getMonth() + 1 > 9 ? item._d.getMonth() + 1 : '0' + (item._d.getMonth() + 1)) +
                              '-' +
                              (item._d.getDate() > 9 ? item._d.getDate() : '0' + item._d.getDate())
                          ]
                        : false
                    "
                  ></span>
                </div>
              </div>
            </div>
            <!-- 当前月日期列表end -->
            <!-- 下个月日期列表start -->
            <div class="slider-day" style="position: relative">
              <div
                v-for="(item, key) in nextActiveDayList"
                :key="key"
                class="day-item not-current-month"
                :class="{
                  hiddenDiv: defaultLine && (item._d.getTime() < startTime || item._d.getTime() > endTime)
                }"
              >
                <div class="day-item-span">
                  {{ item._d.getDate() }}
                </div>
                <div class="day-item-err-div"></div>
              </div>
            </div>
            <!-- 下个月日期列表end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * desc:自定义日历，支持左右拖动切换日期
 * in: options
 *     errDate
 * emit:changeMonth  切换月份
 *      handlerSelect 切换日期
 */
export default {
  name: 'CalendarCus',
  directives: {
    drag(el, binding, vnode) {
      const me = vnode.context
      const oDiv = el // 当前元素
      // 禁止选择网页上的文字
      oDiv.onselectstart = function () {
        return false
      }
      oDiv.onmousedown = function (e) {
        // console.log('directives down')
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - oDiv.offsetLeft
        const disY = e.clientY - oDiv.offsetTop

        oDiv.onmousemove = function (e) {
          // 计算移动的距离
          const l = e.clientX - disX
          // const fw = me.GetSlideDirection(disX, disY, e.clientX, e.clientY)
          // if (fw === 'swipeleft') {
          me.posLong = l
          // } else if (fw === 'swiperight') {
          //   me.posLong = l
          // }
        }
        oDiv.onmouseup = function (e) {
          // me.preXLeng = me.xtrans
          const fw = me.GetSlideDirection(disX, disY, e.clientX, e.clientY)
          console.log('onmouseup', fw)
          if (fw === 'swipeleft') {
            me.preXLeng = 0
            me.getNextMonthDayList()
          } else if (fw === 'swiperight') {
            me.preXLeng = me.xtrans * 2
            me.getPreMonthDayList()
          } else {
            me.preXLeng = me.xtrans
          }

          oDiv.onmousemove = null
          oDiv.onmouseup = null
        }
        // 防止onmouseup失效
        return false
      }

      oDiv.ontouchstart = function (event) {
        let e
        if (event.touches) {
          e = event.touches[0]
        } else {
          e = event
        }
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - oDiv.offsetLeft
        const disY = e.clientY - oDiv.offsetTop

        oDiv.ontouchmove = function (event) {
          let e
          if (event.touches) {
            e = event.touches[0]
          } else {
            e = event
          }
          // 计算移动的距离
          const l = e.clientX - disX
          // const fw = me.GetSlideDirection(disX, disY, e.clientX, e.clientY)
          // if (fw === 'swipeleft') {
          me.posLong = l
          // } else if (fw === 'swiperight') {
          //   me.posLong = l
          // }
        }
        oDiv.ontouchend = function (event) {
          // me.preXLeng = me.xtrans
          let e
          if (event.touches && event.touches.length > 0) {
            e = event.touches[0]
          } else if (event.changedTouches && event.changedTouches.length > 0) {
            e = event.changedTouches[0]
          } else {
            e = event
          }
          // 计算移动的距离
          // const l = e.clientX - disX
          // const t = e.clientY - disY
          //   if (l < 3) {

          //       return
          //   }
          const fw = me.GetSlideDirection(disX, disY, e.clientX, e.clientY)
          // if (fw === 'swipeleft') {
          //   me.getNextMonthDayList()
          // } else if (fw === 'swiperight') {
          //   me.getPreMonthDayList()
          // }
          console.log('ontouchend', fw)
          if (fw === 'swipeleft') {
            me.preXLeng = me.xtrans * 2
            me.getNextMonthDayList()
          } else if (fw === 'swiperight') {
            me.preXLeng = 0
            me.getPreMonthDayList()
          } else {
            me.preXLeng = me.xtrans
          }

          if (fw === 'swipeleft' || fw === 'swiperight') {
            oDiv.ontouchmove = null
            oDiv.ontouchstart = null
          }
          // oDiv.ontouchend = null
        }
        // 防止onmouseup失效
        return true
      }
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    statusOps: {
      type: Object,
      default: () => {
        return { errDate: {}, infoDate: {}, normalDate: {} }
      }
    },
    defaultLineProp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultLine: false,
      // 星期数组
      weekList: [
        { name: '日' },
        { name: '一' },
        { name: '二' },
        { name: '三' },
        { name: '四' },
        { name: '五' },
        { name: '六' }
      ],
      // 正在渲染的日历
      activeDayList: [],
      preActiveDayList: [],
      nextActiveDayList: [],
      // 选取的日期
      activeDay: {},
      // 相对正在选取的日期的月前进数
      step: 0,
      queryYear: null,
      queryMonth: null,
      startTime: '', //默认显示一行的时候，开始时间范围
      endTime: '', //默认显示一行的时候，结束时间范围
      startX: 0, // 拖动开始X轴
      startY: 0, // 拖动开始Y轴
      xtrans: 0, //起始位置
      preXLeng: 0, // 计算得出的上一次Y轴拖动位置
      posLong: 0, // y轴拖动距离
      showSlider: false //显示拖动效果
    }
  },
  computed: {},
  watch: {
    posLong(val) {
      // console.log('滚动距离,,,,,,', val, this.preXLeng)
      this.preXLeng = val + this.xtrans
      return val
    },
    defaultLineProp(val) {
      this.defaultLine = val
    },
    //异常状态变了
    statusOps: {
      handler(val) {
        //重绘日期
        this.drawCalendar(this.activeDay._d)
      },
      deep: true
    }
    // options:{
    //   handler(val){

    //   },
    //   deep:true
    // }
  },
  created() {
    this.defaultLine = this.defaultLineProp
  },
  mounted() {
    this.preXLeng = this.xtrans = -document.getElementById('section-slider').offsetWidth
    setTimeout(() => {
      this.showSlider = true
    }, 300)
    let min = null
    if (this.options.defaultDate) {
      this.queryYear = parseInt(this.options.defaultDate.split('-')[0])
      this.queryMonth = parseInt(this.options.defaultDate.split('-')[1])
      // 最小选择日期
      min = new Date(this.options.defaultDate.replaceAll('-', '/'))
    } else {
      this.queryYear = new Date().getFullYear()
      this.queryMonth = new Date().getMonth() + 1
      // 最小选择日期
      min = new Date()
    }
    //切换默认显示一行的开始结束时间区间
    this.changeStartEndTime(min)
    //开始组装日历时间
    this.drawCalendar(min)
  },
  methods: {
    GetSlideAngle(dx, dy) {
      return (Math.atan2(dy, dx) * 180) / Math.PI
    },
    GetSlideDirection(startX, startY, endX, endY) {
      var dy = startY - endY
      var dx = endX - startX
      var result = 0

      // 如果滑动距离太短
      if (Math.abs(dx) < 58 && Math.abs(dy) < 58) {
        return result
      }

      var angle = this.GetSlideAngle(dx, dy)
      if (angle >= -45 && angle < 45) {
        result = 'swiperight'
      } else if (angle >= 45 && angle < 135) {
        result = 'swipeup'
      } else if (angle >= -135 && angle < -45) {
        result = 'swipedown'
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 'swipeleft'
      }
      return result
    },
    // 计算一个月的天数
    calDayGenerator(year, month) {
      const actualMonth = month - 1
      const timeDistance = +new Date(year, month) - +new Date(year, actualMonth)
      return timeDistance / (1000 * 60 * 60 * 24)
    },
    // 计算某年某某日星期几
    calWeekGenerator(year, month, day) {
      const actualMonth = month - 1
      const date = new Date()
      date.setFullYear(year)
      date.setMonth(actualMonth)
      date.setDate(day)
      return date.getDay()
    },
    // 获取前一个月日历
    getPreMonthDayList() {
      this.activeDayList = []
      this.step = this.step - 1
      const queryYear = this.activeDay.year + Math.ceil((this.activeDay.month + this.step) / 12) - 1
      const queryMonth =
        this.activeDay.month + this.step < 13 && this.activeDay.month + this.step > 0
          ? this.activeDay.month + this.step
          : (this.activeDay.month + this.step) % 12 === 0
          ? 12
          : this.activeDay.month + this.step < 0
          ? 12 + ((this.activeDay.month + this.step) % 12)
          : (this.activeDay.month + this.step) % 12
      this.queryYear = queryYear
      this.queryMonth = queryMonth
      // this.drawDayList(queryYear, queryMonth)
      this.selectDateClick({ _d: new Date(queryYear + '/' + queryMonth + '/01') })
      // this.activeDay
      this.$emit('changeMonth', queryYear, queryMonth)
    },
    // 获取下个月日历
    getNextMonthDayList() {
      this.step = this.step + 1
      // Math.floor((this.activeDay.month + this.step)/12)
      const queryYear = this.activeDay.year + Math.ceil((this.activeDay.month + this.step) / 12) - 1
      const queryMonth =
        this.activeDay.month + this.step < 13 && this.activeDay.month + this.step > 0
          ? this.activeDay.month + this.step
          : (this.activeDay.month + this.step) % 12 === 0
          ? 12
          : this.activeDay.month + this.step < 0
          ? 12 + ((this.activeDay.month + this.step) % 12)
          : (this.activeDay.month + this.step) % 12
      if (this.options.endYearMonth) {
        const ymArr = this.options.endYearMonth.split('-')
        // eslint-disable-next-line
        if (ymArr[0] < queryYear || (ymArr[0] == queryYear && parseInt(ymArr[1]) <= queryMonth)) {
          this.step--
          return
        }
      }
      this.activeDayList = []
      this.queryYear = queryYear
      this.queryMonth = queryMonth
      // this.drawDayList(queryYear, queryMonth)
      this.selectDateClick({ _d: new Date(queryYear + '/' + queryMonth + '/01') })
      this.$emit('changeMonth', queryYear, queryMonth)
    },
    restDrawCalendar(d) {
      this.queryYear = d.getFullYear()
      this.queryMonth = d.getMonth() + 1
      this.drawCalendar(d)
    },
    // 绘制日历
    drawCalendar(d) {
      const currentYear = d.getFullYear()
      const currentMonth = d.getMonth() + 1
      const currentDay = d.getDate()
      let currentWeek
      if (this.options.endYearMonth) {
        // console.log(currentYear, currentMonth, currentDay, 'start')
        const ymArr = this.options.endYearMonth.split('-')
        // eslint-disable-next-line
        if (ymArr[0] < currentYear || (ymArr[0] == currentYear && parseInt(ymArr[1]) <= currentMonth)) return true
        // console.log(currentYear, currentMonth, currentDay, 'end', parseInt(ymArr[1]) <= currentMonth)
      }

      this.step = 0
      // 转换周一到周日
      switch (d.getDay()) {
        case 0:
          currentWeek = '周日'
          break
        case 1:
          currentWeek = '周一'
          break
        case 2:
          currentWeek = '周二'
          break
        case 3:
          currentWeek = '周三'
          break
        case 4:
          currentWeek = '周四'
          break
        case 5:
          currentWeek = '周五'
          break
        case 6:
          currentWeek = '周六'
          break
        default:
          break
      }
      this.activeDay = {
        _d: d,
        year: currentYear,
        month: currentMonth,
        week: currentWeek,
        day: currentDay
      }
      this.drawDayList(currentYear, currentMonth)
      // console.log('this.activeDay  ==>', this.activeDay)
      // console.log('d  ==>', d)
      // 传递点击的值
      // this.$emit('handlerSelect', d)
    },
    // 绘制日期
    drawDayList(year, month) {
      this.preActiveDayList = this.combineDayListGenerator(month == 1 ? year - 1 : year, month == 1 ? 12 : month - 1)
      this.activeDayList = this.combineDayListGenerator(year, month)
      this.nextActiveDayList = this.combineDayListGenerator(month == 12 ? year + 1 : year, month == 12 ? 1 : month + 1)

      for (const item of this.activeDayList) {
        // 最小选择日期
        const min = new Date()
        min.setTime(min.getTime() + 3600 * 1000 * 24 * 4)
        if (item._d < min) {
          item.current = false
        }
        // 最大选择日期
        const max = new Date()
        max.setMonth(max.getMonth() + 1)
        if (item._d > max) {
          item.current = false
        }
      }
      // console.log('this.activeDayList   ==>', this.activeDayList)
    },
    // 将上个月当前月和下个月的时间对象合并
    combineDayListGenerator(year, month) {
      const pre = this.preDayListGenerator(year, month)
      const current = this.dayListGenerator(year, month)
      const next = this.nextDayListGenerator(year, month)
      const total = pre.concat(current).concat(next)
      return total
    },
    // 生成某年月缺少前一个月的时间对象数组
    preDayListGenerator(year, month) {
      let preDayNum, preSurplusDayNum, actualPreMonth
      if (month === 1) {
        preDayNum = this.calDayGenerator(year - 1, 12)
        preSurplusDayNum = this.calWeekGenerator(year, month, 1)
        actualPreMonth = month - 2
      } else {
        preDayNum = this.calDayGenerator(year, month - 1)
        preSurplusDayNum = this.calWeekGenerator(year, month, 1)
        actualPreMonth = month - 2
      }
      const preDayList = []
      for (let i = 1; i < preDayNum + 1; i++) {
        const currentDay = {
          _d: new Date(year, actualPreMonth, i),
          current: false
        }
        preDayList.push(currentDay)
      }
      return preSurplusDayNum === 0 ? [] : preDayList.slice(-preSurplusDayNum)
    },
    // 生成某年月天数日期对象数组
    dayListGenerator(year, month) {
      const dayNum = this.calDayGenerator(year, month)
      const actualMonth = month - 1
      const dayList = []
      for (let i = 1; i < dayNum + 1; i++) {
        const currentDay = {
          _d: new Date(year, actualMonth, i),
          current: true
        }
        dayList.push(currentDay)
      }
      return dayList
    },
    // 生成某年月应该添加后一个月的时间对象数组
    nextDayListGenerator(year, month) {
      const preSurplusDayNum = this.calWeekGenerator(year, month, 1)
      const dayNum = this.calDayGenerator(year, month)
      const NextDayNum = this.calDayGenerator(year, month + 1)
      const NextSurplusDayNum = 7 * 6 - (preSurplusDayNum + dayNum)
      const actualNextMonth = month
      const nextDayList = []
      for (let i = 1; i < NextDayNum + 1; i++) {
        const currentDay = {
          _d: new Date(year, actualNextMonth, i),
          current: false
        }
        nextDayList.push(currentDay)
      }
      return nextDayList.slice(0, NextSurplusDayNum)
    },
    changeOhterMonthDate(item) {
      if (!(item._d.getMonth() + 1 === this.queryMonth && item._d.getFullYear() === this.queryYear)) {
        if (item._d.getMonth() + 1 < this.queryMonth) {
          this.preXLeng = 0
        } else {
          this.preXLeng = this.xtrans * 2
        }
        this.queryMonth = item._d.getMonth() + 1
        this.queryYear = item._d.getFullYear()
      }
      this.selectDateClick(item)
    },
    // 切换日期
    selectDateClick(item) {
      this.changeStartEndTime(item._d)
      // this.$nextTick(() => {
      //   this.preXLeng = this.xtrans
      //   this.showSlider = true
      // })
      setTimeout(() => {
        this.showSlider = false
        this.preXLeng = this.xtrans
      }, 510)
      setTimeout(() => {
        this.showSlider = true
      }, 600)
      //不是同一个月的不让切换日期
      if (!(item._d.getMonth() + 1 === this.queryMonth && item._d.getFullYear() === this.queryYear)) {
        return false
      }
      //是否要有截止日期，有截止日期就不会显示截止日期后的数据
      if (this.options.endYearMonth) {
        if (
          item._d.getFullYear() > this.options.endYearMonth.split('-')[0] ||
          // eslint-disable-next-line
          (item._d.getFullYear() == this.options.endYearMonth.split('-')[0] &&
            // eslint-disable-next-line
            item._d.getMonth() + 1 >= parseInt(this.options.endYearMonth.split('-')[1]))
        ) {
          return false
        }
      }
      this.drawCalendar(item._d)
      this.$emit('handlerSelect', item._d)
      // this.$sensors.track('attend_cus_mate_event', {
      //   field_name: '考勤日历',
      //   value_name: ''
      // })
    },
    changeDefaultLine(flag) {
      this.defaultLine = flag
    },
    /**
     * 切换开始结束时间
     * selectDate:Date  所选择的日期
     */
    changeStartEndTime(selectDate) {
      this.startTime = new Date(
        new Date(
          selectDate.getFullYear() +
            '/' +
            (selectDate.getMonth() + 1 > 9 ? selectDate.getMonth() + 1 : '0' + (selectDate.getMonth() + 1)) +
            '/' +
            (selectDate.getDate() > 9 ? selectDate.getDate() : '0' + selectDate.getDate()) +
            ' 00:00:00'
        ).getTime() -
          selectDate.getDay() * 24 * 60 * 60 * 1000
      ).getTime()
      this.endTime = new Date(selectDate.getTime() + (6 - selectDate.getDay()) * 24 * 60 * 60 * 1000).getTime()
    }
  }
}
</script>
<style lang="scss" scoped>
.timepicker {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  width: 100%;

  .timepicker-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 500px;
    // transform: translate(-50%, -50%);
    background: #fff;
    z-index: 100;

    .box-section {
      position: relative;

      .section-slider {
        .slider-week {
          flex-basis: 10%;
          display: flex;
          align-items: center;

          .week-item {
            flex: 1;
            font-size: 22px;
            height: 50px;
            line-height: 50px;
            color: #7d8799;
            text-align: center;
          }
        }
        .slider-day-div {
          transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
          transition-property: transform;
          transition-duration: 500ms;
        }
        .slider-day {
          white-space: normal;
          display: inline-block;
          width: 100%;
          // flex: 1;
          // display: flex;
          // flex-wrap: wrap;

          .day-item {
            width: 14.285%;
            display: inline-block;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            position: relative;
            color: #3a4058;
            margin-bottom: 10px;
            vertical-align: top;

            div:first-child {
              width: 61px;
              height: 61px;
              line-height: 61px;
              text-align: center;
              font-size: 25px;
              position: relative;
              margin: 0 auto;
            }
            &-err-div {
              /* prettier-ignore */
              height: 7PX;
              /* prettier-ignore */
              line-height: 2PX;
              width: 100%;
              text-align: center;
            }
            &-err {
              /* prettier-ignore */
              width: 5PX;
              /* prettier-ignore */
              height: 5PX;
              background: #ff5219;
              display: inline-block;
              border-radius: 50%;
            }
            &-normal {
              /* prettier-ignore */
              width: 5PX;
              /* prettier-ignore */
              height: 5PX;
              background: #2994ff;
              margin-left: 1px;
              display: inline-block;
              border-radius: 50%;
            }
            &-over {
              /* prettier-ignore */
              width: 5PX;
              /* prettier-ignore */
              height: 5PX;
              margin-left: 1px;
              background: #fc9b05;
              display: inline-block;
              border-radius: 50%;
            }
          }
          .hiddenDiv {
            display: none;
          }
          .not-current-month {
            div {
              color: #dbdde1;
            }
          }

          .day-item-current {
            div:first-child {
              border-radius: 100%;
              color: #fff;
              // background: #2966f2;
              background: #2994ff;
            }
          }
        }
      }
    }
  }
}
</style>

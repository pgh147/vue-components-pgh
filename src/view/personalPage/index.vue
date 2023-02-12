<template>
  <div class="pange-cont">
    <div v-if="!iseffect" class="page-panel">
      <!-- style="background: #f0f0f5" -->
      <div>
        <div class="p-card p-header user-info" style="position: relative">
          <div class="p-logo">
            <!-- <img :src="userInfo.avatar" alt=""> -->
            <van-image width="100%" height="100%" :src="userInfo.avatar" />
          </div>
          <div class="p-desc">
            <p>
              {{ userInfo.name ? userInfo.name : '-' }}
              <span>&nbsp;&nbsp;{{ userInfo.title ? userInfo.title : '-' }}</span>
            </p>
            <p>
              {{ userInfo.dept ? userInfo.dept : '-' }}{{ userInfo.leaderName ? '(' + userInfo.leaderName + ')' : '' }}
            </p>
          </div>
          <div class="tiaozdep" @click="toDept">异常处理</div>
          <div class="other-info">
            <div>
              <span class="span-tag" style="color: #666666; white-space: nowrap">{{
                userInfo.staffPropertyName ? userInfo.staffPropertyName : '-'
              }}</span>
            </div>
            <div>{{ userInfo.email ? userInfo.email : '-' }}</div>
          </div>
        </div>
        <!-- 日维度  start -->
        <div class="p-card" style="border-bottom: 1px solid #eee; margin-bottom: 0px">
          <div class="p-card-header">考勤日历</div>
          <div ref="calPanelContent" class="p-card-content" :class="{ 'hidden-content': calPanelHidden }">
            <div class="cal-time">
              <span>
                {{ nowDay.getFullYear() }}
                &nbsp;
                {{
                  (nowDay.getMonth() + 1 > 9 ? nowDay.getMonth() + 1 : '0' + (nowDay.getMonth() + 1)) +
                  '-' +
                  (nowDay.getDate() > 9 ? nowDay.getDate() : '0' + nowDay.getDate())
                }}
              </span>
              <span style="color: #999999" @click="changeDate"> {{ dateFlag == 2 ? '昨天' : '回到今天' }} </span>
            </div>

            <calendar-cus
              class="cal-content"
              ref="calref"
              :options="calOps"
              :statusOps="calStatusOps"
              :defaultLineProp="true"
              @handlerSelect="handlerSelect"
              @changeMonth="changeMonth"
            />
          </div>

          <div class="p-card-foot cal-attend">
            <van-icon :name="calPanelHidden ? 'arrow-down' : 'arrow-up'" @click="calClickPanel" />
          </div>
          <div class="tips-div" :class="{ 'hidden-tips': !showTips }">
            <div class="tips">
              <van-icon name="cross" class="closeTips" @click="showTips = false" />
              <p class="normal">全天考勤正常</p>
              <p class="error">当天存在异常：迟到、早退、缺卡、旷工</p>
              <p class="over">当天提交过：请假、出差、外出、补卡申请</p>
            </div>
          </div>
        </div>
        <div class="p-card att-summary" style="margin-bottom: 0px">
          <div class="p-card-header">当日考勤汇总</div>
          <div class="p-card-content">
            <div class="now-att-sum last">
              <div class="now-att-sum-row" style="white-space: nowrap">
                <span class="att-s-word">当日班次：</span>
                <span class="att-s-num">
                  {{ todayAttendStatisticsVO.currentClass ? todayAttendStatisticsVO.currentClass : '-' }}
                </span>
              </div>
              <div
                class="now-att-sum-row"
                v-show="
                  dateFlag == 1 &&
                  !(todayAttendStatisticsVO.currentClass && todayAttendStatisticsVO.currentClass.indexOf('休息') >= 0)
                "
                style="white-space: nowrap"
              >
                <span class="att-s-word">考勤状态：</span>
                <span
                  class="att-s-num"
                  v-show="
                    todayAttendStatisticsVO.attendanceStatus && todayAttendStatisticsVO.attendanceStatus.length > 0
                  "
                >
                  <span
                    class="span-tag"
                    v-for="(item, index) of todayAttendStatisticsVO.attendanceStatus"
                    :class="{
                      'tag-info': errStatusMap[item] == 'primary',
                      'tag-danger': errStatusMap[item] == 'danger',
                      'tag-warning': errStatusMap[item] == 'warning'
                    }"
                    :key="'s-' + index"
                    >{{ item }}</span
                  >
                </span>
                <!-- <span v-show="!todayAttendStatisticsVO.attendanceStatus">-</span> -->
              </div>
            </div>
            <div
              class="now-att-list"
              v-show="
                (dateFlag == 1 || dateFlag == 2) &&
                !(todayAttendStatisticsVO.currentClass && todayAttendStatisticsVO.currentClass.indexOf('休息') >= 0)
              "
            >
              <time-line :line-data="timeLineData"></time-line>
            </div>
            <div class="now-att-sum last">
              <div class="now-att-sum-item" style="white-space: nowrap">
                <span class="att-s-word">统计时间：</span>
                <span class="att-s-num">
                  {{ todayAttendStatisticsVO.etlTime ? todayAttendStatisticsVO.etlTime : '-' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 日维度  end -->
        <!-- <div id="waitePanel" class="p-card">
          <div class="p-card-header">{{ isPersonal ? '本人待处理异常' : '该员工待处理事项' }}</div>
          <div class="p-card-content wait-panel" :class="{ 'hidden-content3': waitPanelHidden }">
            <table-cus
              ref="waitRef"
              class="myTable"
              :width-percent="true"
              :cols="waitToDoCols"
              :data="exceptionPunchClockVOS"
            >
              <template #url="{ data }">
                <div v-if="data.typeDesc == '未排班'" style="color: #2966f2" data-sensors-click @click="doHandle(data)">
                  去处理
                </div>
                <div v-else style="color: #2966f2" data-sensors-click @click="doRemind(data)">去提醒</div>
              </template>
            </table-cus>
          </div>
          <div
            class="p-card-foot"
            :class="{ fixedBotton: !waitPanelHidden }"
            @click="
              () => {
                waitPanelHidden = !waitPanelHidden
              }
            "
          >
            <van-icon :name="waitPanelHidden ? 'arrow-down' : 'arrow-up'" />
          </div>
        </div> -->
      </div>
    </div>
    <div v-else style="text-align: center">该链接已失效</div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tab, Tabs, Popover, Row, Col, CheckboxGroup, Checkbox, Toast, Icon, Image, Dialog } from 'vant'
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Popover)
Vue.use(Row)
Vue.use(Col)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Image)
Vue.use(Dialog)
import { waitToDoCols } from './common/tableHead.js'
import calendarCus from '@/components/calendarCus.vue'
import tableCus from '@/components/tableCus.vue'
import timeLine from './common/timeLine.vue'
import { dateToStr } from '@/utils/common'
import { Base64 } from 'js-base64'
import { getOfficeAttend, getOfficeDetail, getPersonalInformation, getAttendanceCalendar, createGroup } from './apis'
export default {
  name: 'PersonalPage',
  components: {
    calendarCus,
    tableCus,
    timeLine
  },
  data() {
    return {
      iseffect: false,
      isPersonal: true,
      hiddenTips: true, //是否显示提示
      showTips: true, //提示关闭的过渡效果
      nowDay: new Date(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      userInfo: {
        name: '',
        title: '',
        dept: '',
        avatar: '',
        staffPropertyName: '',
        email: ''
      },
      todayAttendStatisticsVO: {
        eltTime: '-', // 统计时间
        currentClass: '-', //当日班次
        attendanceStatus: [] //考勤状态
      },
      calPanelHidden: true, //日历那里默认显示一行
      waitPanelHidden: false,
      exceptionPunchClockVOS: [{ typeDesc: '未打卡', workDate: '2022-11-11', exceptionMsg: 'asdfasdf' }],
      waitToDoCols,
      calOps: {
        defaultDate: ''
      },
      calStatusOps: {
        errDate: {},
        normalDate: {},
        infoDate: {}
      },
      staffNo: '', //被查看员工工号
      timeLineData: [],
      errStatusMap: {
        正常: 'primary',
        福利班: 'primary',
        迟到: 'danger',
        早退: 'danger',
        缺卡: 'danger',
        旷工: 'danger',
        育儿假: 'warning',
        调休: 'warning',
        事假: 'warning',
        丧假: 'warning',
        全薪病假: 'warning',
        陪产假: 'warning',
        年假: 'warning',
        流产假: 'warning',
        婚假: 'warning',
        工伤假: 'warning',
        儿童陪伴假: 'warning',
        待岗假: 'warning',
        产检假: 'warning',
        产假: 'warning',
        病假: 'warning',
        请假: 'warning',
        出差: 'warning',
        外出: 'warning',
        补卡: 'warning'
      }
    }
  },
  beforeCreate() {
    console.log('c beforeCreated')
  },
  created() {
    console.log('c created', this.$route.query)
    // this.staffNo = '200699610'
    if (this.$route.params && this.$route.params.dateStr) {
      this.unitId = this.$route.params.unitId
      this.orgUnitId = this.$route.params.unitId
      this.nowDay = new Date(this.$route.params.dateStr.replaceAll('-', '/'))
      this.calOps.defaultDate = this.$route.params.dateStr
      this.staffNo = this.$route.params.staffNo
      this.isPersonal = this.$route.params.isPersonal
      this.getOfficeDetailData()
    } else if (this.global?.corpVal?.key) {
      const keyArrs = Base64.decode(this.global?.corpVal?.key).split('&')
      let dparam = ''
      for (let index = 0; index < keyArrs.length; index++) {
        if (keyArrs[index].indexOf('unitId=') === 0) {
          this.unitId = keyArrs[index].split('=')[1]
          this.orgUnitId = keyArrs[index].split('=')[1]
        } else if (keyArrs[index].indexOf('d=') === 0) {
          dparam = keyArrs[index].split('=')[1]
          this.nowDay = new Date(dparam.replaceAll('-', '/'))
          this.calOps.defaultDate = dparam
        } else if (keyArrs[index].indexOf('staffNo=') === 0) {
          this.staffNo = keyArrs[index].split('=')[1]
        } else if (keyArrs[index].indexOf('isPersonal=') === 0) {
          this.isPersonal = keyArrs[index].split('=')[1]
        }
      }
      this.dayStr = dateToStr(new Date())
      if (this.dayStr === dparam) {
        this.iseffect = false
      } else {
        // this.iseffect = true
        // return
      }
      this.getOfficeDetailData()
    } else {
      // this.iseffect = true
      // return
    }
  },
  beforeMount() {
    // console.log('c beforeMounted')
  },
  computed: {
    dateFlag() {
      let selectDayStr = dateToStr(this.nowDay)
      let nowDateStr = dateToStr(new Date())
      if (selectDayStr == nowDateStr) {
        return 2
      } else if (parseInt(selectDayStr.replaceAll('-', '')) < parseInt(nowDateStr.replaceAll('-', ''))) {
        return 1
      } else {
        return 3
      }
    },
    startDateStr() {
      return (
        this.nowDay.getFullYear() +
        '-' +
        (this.nowDay.getMonth() + 1 > 9 ? this.nowDay.getMonth() + 1 : '0' + (this.nowDay.getMonth() + 1)) +
        '-01'
      )
    },
    endDateStr() {
      var year = this.nowDay.getFullYear() //获取年份
      var month = this.nowDay.getMonth() + 1 //获取月份
      var lastDate = new Date(year, month, 0).getDate() //获取当月最后一日
      month = month < 10 ? '0' + month : month //月份补 0
      return [year, month, lastDate].join('-')
    }
  },
  mounted() {
    console.log('c mounted')
  },
  methods: {
    getOfficeDetailData() {
      getOfficeDetail({
        staffNo: this.staffNo,
        date: dateToStr(this.nowDay),
        startDate: this.startDateStr,
        endDate: this.endDateStr
      })
        .then(res => {
          if (res.data) {
            this.userInfo.title = res.data.information?.title
            this.userInfo.avatar = res.data.information?.avatar
            this.userInfo.dept = res.data.information?.department
            this.userInfo.name = res.data.information?.name
            this.userInfo.staffPropertyName = res.data.information?.staffPropertyName
            this.userInfo.email = res.data.information?.email
            this.timeLineData = [
              {
                clockType: '上班打卡',
                clockTime:
                  res.data.attendance && res.data.attendance.ondutyCheckTime
                    ? res.data.attendance.ondutyCheckTime.replace(dateToStr(this.nowDay), '')
                    : '',
                content: res.data.attendance?.ondutyCheckAddress
              },
              {
                clockType: '下班打卡',
                clockTime:
                  res.data.attendance && res.data.attendance.offdutyCheckTime
                    ? res.data.attendance.offdutyCheckTime.replace(dateToStr(this.nowDay), '')
                    : '',
                content: res.data.attendance?.offdutyCheckAddress
              }
            ]
            this.$set(this.todayAttendStatisticsVO, 'etlTime', res.data.attendance?.etlTime)
            this.$set(this.todayAttendStatisticsVO, 'currentClass', res.data.attendance?.currentClass)
            this.$set(
              this.todayAttendStatisticsVO,
              'attendanceStatus',
              res.data.attendance && res.data.attendance.attendanceStatus ? res.data.attendance.attendanceStatus : []
            )
            //考勤日历异常
            if (res.data.attendanceCalendar) {
              this.calStatusOps.errDate = {}
              this.calStatusOps.normalDate = {}
              this.calStatusOps.infoDate = {}
              for (let key in res.data.attendanceCalendar) {
                if (res.data.attendanceCalendar[key] && res.data.attendanceCalendar[key].length > 0) {
                  for (let i = 0; i < res.data.attendanceCalendar[key].length; i++) {
                    if (res.data.attendanceCalendar[key][i] == 1) {
                      this.calStatusOps.normalDate[key] = true
                    } else if (res.data.attendanceCalendar[key][i] == 2) {
                      this.calStatusOps.errDate[key] = true
                    } else if (res.data.attendanceCalendar[key][i] == 3) {
                      this.calStatusOps.infoDate[key] = true
                    }
                  }
                }
              }
            }
          }
        })
        .catch(err => {
          this.userInfo = {}
          this.timeLineData = [
            {
              clockType: '上班打卡',
              clockTime: '-',
              content: '-'
            },
            {
              clockType: '下班打卡',
              clockTime: '-',
              content: ''
            }
          ]
          this.todayAttendStatisticsVO.etlTime = '-'
          this.todayAttendStatisticsVO.currentClass = '-'
          this.todayAttendStatisticsVO.attendanceStatus = ''
          Toast.fail(err.message)
        })
    },
    getPersonalInformationData() {
      getPersonalInformation({ staffNo: this.staffNo, date: dateToStr(this.nowDay) })
        .then(res => {
          if (res.data) {
            this.userInfo.title = res.data.information.title
            this.userInfo.avatar = res.data.information.avatar
            this.userInfo.dept = res.data.information.department
            this.userInfo.name = res.data.information.name
            this.userInfo.staffPropertyName = res.information?.staffPropertyName
            this.userInfo.email = res.information?.email
          }
        })
        .catch(err => {
          this.userInfo = {}
        })
    },
    getOfficeAttendData() {
      getOfficeAttend({ staffNo: this.staffNo, date: dateToStr(this.nowDay) })
        .then(res => {
          if (res.data) {
            this.timeLineData = [
              {
                clockType: '上班打卡',
                clockTime: res.data.ondutyCheckTime ? res.data.ondutyCheckTime.replace(dateToStr(this.nowDay), '') : '',
                content: res.data?.ondutyCheckAddress
              },
              {
                clockType: '下班打卡',
                clockTime: res.data.offdutyCheckTime
                  ? res.data.offdutyCheckTime.replace(dateToStr(this.nowDay), '')
                  : '',
                content: res.data.offdutyCheckAddress
              }
            ]
            this.$set(this.todayAttendStatisticsVO, 'etlTime', res.data.etlTime)
            this.$set(this.todayAttendStatisticsVO, 'currentClass', res.data.currentClass)
            this.$set(
              this.todayAttendStatisticsVO,
              'attendanceStatus',
              res.data.attendanceStatus ? res.data.attendanceStatus : []
            )
          }
        })
        .catch(err => {
          this.timeLineData = [
            {
              clockType: '上班打卡',
              clockTime: '-',
              content: '-'
            },
            {
              clockType: '下班打卡',
              clockTime: '-',
              content: ''
            }
          ]
          this.todayAttendStatisticsVO.etlTime = '-'
          this.todayAttendStatisticsVO.currentClass = '-'
          this.todayAttendStatisticsVO.attendanceStatus = ''
          Toast.fail(err.message)
        })
    },
    getAttendanceCalendarData() {
      getAttendanceCalendar({ staffNo: this.staffNo, startDate: this.startDateStr, endDate: this.endDateStr })
        .then(res => {
          if (res.data) {
            this.calStatusOps.errDate = {}
            this.calStatusOps.normalDate = {}
            this.calStatusOps.infoDate = {}
            for (let key in res.data) {
              if (res.data[key] && res.data[key].length > 0) {
                for (let i = 0; i < res.data[key].length; i++) {
                  if (res.data[key][i] == 1) {
                    this.calStatusOps.normalDate[key] = true
                  } else if (res.data[key][i] == 2) {
                    this.calStatusOps.errDate[key] = true
                  } else if (res.data[key][i] == 3) {
                    this.calStatusOps.infoDate[key] = true
                  }
                }
              }
            }
          }
        })
        .catch(err => {
          this.calStatusOps.errDate = {}
          this.calStatusOps.normalDate = {}
          this.calStatusOps.infoDate = {}
        })
    },
    calClickPanel() {
      this.calPanelHidden = !this.calPanelHidden
      this.$refs.calref.changeDefaultLine(this.calPanelHidden)
    },
    //切换日期
    changeDate() {
      console.log(this.nowDay, dateToStr(this.nowDay), dateToStr(new Date()), 'changeDate')
      //相等就去昨天
      if (dateToStr(this.nowDay) == dateToStr(new Date())) {
        let d = new Date()
        d.setDate(d.getDate() - 1)
        console.log(dateToStr(d))
        this.$refs.calref.changeOhterMonthDate({ _d: d })
      } else {
        this.$refs.calref.changeOhterMonthDate({ _d: new Date() })
      }
    },
    // 日期变动
    handlerSelect(date) {
      let reqCalFlag = date.getMonth() == this.nowDay.getMonth()
      this.nowDay = date
      this.month = date.getMonth() + 1
      console.log(date, 'handlerselect')
      //日期变动调接口，获取数据
      this.getOfficeAttendData()
      if (!reqCalFlag) this.getAttendanceCalendarData()
    },
    // 月份变动
    changeMonth(year, month1) {
      this.month = month1
      this.year = year
      console.log(month1, year, 'changeMonth')
    },
    toDept() {
      Dialog.confirm({
        title: '发起异常聊天',
        message: '去发起群聊，HR协助处理异常'
      }).then(() => {
        createGroup(this.staffNo, { employeeCode: this.staffNo })
          .then(res => {
            if (res.code == 200) {
              Toast.success('创建异常处理钉钉群成功.')
            }
          })
          .catch(e => {
            Toast.fail('创建异常处理钉钉群失败：' + e.message)
          })
        // on confirm
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/common';
.pange-cont {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #fff;
  .page-panel {
    height: 100%;
    width: 100%;
    overflow: auto;
    overflow-x: hidden;
    background: #fff;
    @include p-card();
    .p-header {
      border-bottom: 1px solid #eee;
      margin: 0;
      display: flex;
      .other-info {
        font-size: 24px;
        position: absolute;
        top: 138px;
        display: flex;
        > :first-child {
          width: 88px;
          > span {
            background: none;
            border: 1px solid #eee;
          }
        }
        > :last-child {
          padding-left: 20px;
        }
      }
      .p-logo {
        height: 88px;
        width: 88px;
        background: #f8f8f8;
        border-radius: 10px;
        overflow: hidden;
      }
      .p-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        padding: 10px 0 7px 20px;
        :first-child {
          font-weight: bold;
          color: #333333;
          line-height: 30px;
          font-size: 26px;
        }
        :last-child {
          font-weight: 400;
          color: #666666;
          line-height: 28px;
          font-size: 24px;
        }
      }
    }
    .user-info {
      padding-bottom: 76px;
    }
    .tiaozdep {
      width: 160px;
      height: 60px;
      line-height: 60px;
      background: #2994ff;
      border-radius: 10px;
      position: absolute;
      right: 20px;
      top: 40px;
      color: #fff;
    }
    .tips-div {
      width: 690px;
      margin: 0 auto;
      height: 157px;
      overflow: hidden;
      background: #f8f8f8;
      position: relative;
      transition: height 0.2s ease-in-out;
      .tips {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        height: 100%;
        text-align: left;

        .closeTips {
          position: absolute;
          right: 8px;
          top: 8px;
          color: #999;
        }
        > p {
          height: 33px;
          font-size: 22px;
          font-weight: 400;
          color: #666666;
          line-height: 33px;
          position: relative;
          padding-left: 10px;
        }

        %m5 {
          content: '';
          /* prettier-ignore */
          width: 5PX;
          /* prettier-ignore */
          height: 5PX;
          position: absolute;
          border-radius: 50%;
          top: 50%;
          left: -5px;
          transform: translateY(-50%);
        }

        .normal::before {
          @extend %m5;
          background: #2994ff;
        }
        .error::before {
          @extend %m5;
          background: #ff5219;
        }
        .over::before {
          @extend %m5;
          background: #fc9b05;
        }
      }
    }
    .hidden-tips {
      height: 0px;
      margin-bottom: 0px;
      overflow: hidden;
    }
    .fixedBotton {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: white;
    }
    /**显示的日历时间 */
    .cal-content {
      width: 100%;
      // margin: 0 auto;
      background: #fff;
    }
    .cal-time {
      font-size: 22px;
      font-weight: 500;
      color: #333333;
      line-height: 26px;
      margin: 15px 0 30px 0px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      :last-child {
        width: 14%;
        text-align: center;
      }
    }
    .span-tag {
      position: relative;
      display: inline-block;
      padding: 0 8px;
      color: #fff;
      /* prettier-ignore */
      font-size: 12PX;
      /* prettier-ignore */
      line-height: 20PX;
      /* prettier-ignore */
      height: 18PX;
      border-radius: 8px;
      margin-right: 5px;
      background-color: #9e9e9e;
    }
    /**当日考勤汇总 */
    .att-summary {
      color: #3a4058;
      .p-card-content {
        padding-left: 15px;
      }
      .now-att-sum {
        text-align: left;
        &-item {
          width: 50%;
          height: 36px;
          margin-bottom: 10px;
          display: inline-block;
          font-size: 24px;
          color: #999999;
          line-height: 36px;
        }
        &-row {
          @extend .now-att-sum-item;
          width: 100%;

          .tag-info {
            background: #2994ff;
          }
          .tag-danger {
            background: #ff5219;
          }
          .tag-warning {
            background: #fc9b05;
          }
        }
        &-line {
          width: 1px;
          background: #eee;
          margin-top: 19px;
          height: 100px;
        }
      }
      .now-att-list {
        margin: 30px 0;
        padding: 0 15px;
      }
      // .now-att-sum.last {
      //   padding-top: 30px;
      // }
    }
    .more-icon-cus {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url('~@/assets/img/down.png');
      background-size: 100%;
      transform: rotate(0deg);
      transition: 500ms transform;
    }
    .p-card-foot {
      text-align: center;
      color: #999999;
      font-size: 30px;
      position: relative;
    }
    .cal-attend {
      margin-bottom: 30px;
    }
    .p-card-filter {
      display: flex;
      font-size: 22px;
      line-height: 26px;
      padding: 20px 0 5px 30px;
      > :first-child {
        margin-right: 60px;
      }
      i {
        color: #999999;
      }
    }
    // /deep/ .van-calendar__body {
    //   display: flex;
    //   .van-calendar__month {
    //     width: 100%;
    //     flex-shrink: 0;
    //   }
    // }
    .now-att-list {
      // background: #f8f9fb;
      overflow: hidden;
      padding: 0;
      &-item {
        height: 63px;
        background: #ffffff;
        margin-top: 8px;
      }
    }
    .wait-panel {
      // background: #f8f9fb;
      overflow: hidden;
      // padding: 10px;
    }
    .no-warp-table {
      /deep/.t_body_s {
        white-space: nowrap;
      }
    }
    /deep/ span.t_body_s {
      line-height: 65px;
    }

    #waitePanel {
      padding: 28px 0;
      .p-card-header {
        margin: 0 28px;
      }
    }
  }
}
</style>

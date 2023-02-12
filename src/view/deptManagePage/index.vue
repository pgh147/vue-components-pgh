<template>
  <div style="height: 100%; width: 100%">
    <div v-if="!iseffect" class="p-page">
      <div class="p-content">
        <div class="p-card att-summary">
          <div style="padding: 10px 0; color: #ababab">
            数据更新截止：{{ pageData.updateTime ? pageData.updateTime : '-' }}
          </div>
          <div style="color: #666666">
            {{ pageData.unitName ? pageData.unitName : '-' }}
          </div>
        </div>
        <div class="p-card" style="overflow-x: hidden; margin-bottom: 0; padding-bottom: 0">
          <!-- <div class="dept-list">当前部门：</div> -->
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
              :defaultLineProp="true"
              @handlerSelect="handlerSelect"
              @changeMonth="changeMonth"
            />
            <div class="p-card-foot cal-attend">
              <van-icon :name="calPanelHidden ? 'arrow-down' : 'arrow-up'" @click="calClickPanel" />
            </div>
          </div>

          <div class="p-body">
            <div class="p-body-content">
              <div class="p-body-content-svg">
                <div class="p-body-svg">
                  <!-- <Progress></Progress> -->
                  <svg-charts
                    :rate="parseFloat(`${pageData.sjcql ? pageData.sjcql : 0}`)"
                    bg-ring-color="#F2F4F7"
                    ring-color="#296DFF"
                    :stroke-width="20"
                    :show-rate="0.5"
                    :start-pos="0.5"
                  >
                    <p class="svg-flag">出勤率:{{ `${pageData.sjcql ? (pageData.sjcql * 100).toFixed(2) : 0}%` }}</p>
                    <p class="svg-num">{{ pageData.sjcq }}/{{ pageData.ycq }}</p>
                    <p class="svg-title">实出勤/应出勤</p>
                    <p class="svg-total">总人数:{{ pageData.zrs }}</p>
                  </svg-charts>
                </div>
                <!-- <div class="absolute-p">
                  <div class="tips">提示：实出勤人数包含出勤不满一天的人数</div>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="p-card att-summary">
          <div class="p-card-header">考勤概况</div>
          <div class="p-card-content">
            <van-row>
              <van-col span="6">
                <div class="cont-item">
                  <span>总人数</span><span>{{ pageData.zrs }}</span>
                </div>
              </van-col>
              <van-col span="6">
                <div class="cont-item">
                  <span>应出勤</span><span>{{ pageData.ycq }}</span>
                </div>
              </van-col>
              <van-col span="6">
                <div class="cont-item">
                  <span>无需打卡</span><span>{{ pageData.wxdk }}</span>
                </div>
              </van-col>
              <van-col span="6">
                <div class="cont-item">
                  <span>请假全天</span><span>{{ pageData.sjqt }}</span>
                </div>
              </van-col>
            </van-row>
            <!-- <div style="width: 100%; text-align: left"> -->
            <span class="tips">提示：总人数=应出勤人数+无需打卡人数+请假全天人数</span>
            <!-- </div> -->
          </div>
        </div>
        <div class="p-card att-summary">
          <div class="p-card-header">出勤统计</div>
          <div class="p-card-content">
            <van-row>
              <!-- <van-col span="6">
                <div class="cont-item" @click="clickToOtherApp('scq')">
                  <span>实出勤</span><span>{{ pageData.sjcq }}</span>
                </div>
              </van-col> -->
              <van-col span="8">
                <div class="cont-item text-col-b" @click="clickToOtherApp('gsdk')">
                  <span>公司打卡</span><span>{{ pageData.gsdk }}</span>
                </div>
              </van-col>
              <van-col span="8">
                <div class="cont-item text-col-b" @click="clickToOtherApp('wqdk')">
                  <span>外勤打卡</span><span>{{ pageData.wqdk }}</span>
                </div>
              </van-col>
              <van-col span="8">
                <div class="cont-item text-col-b" @click="clickToOtherApp('wc')">
                  <span>外出</span><span>{{ pageData.wc }}</span>
                </div>
              </van-col>
              <van-row>
                <van-col span="8">
                  <div class="cont-item text-col-b" @click="clickToOtherApp('qj')">
                    <span>请假</span><span>{{ pageData.qj }}</span>
                  </div>
                </van-col>
              </van-row>
              <!-- <van-col span="6">
                <div class="cont-item" @click="clickToOtherApp('kqyc')">
                  <span>考勤异常</span><span>{{ pageData.kqyc }}</span>
                </div>
              </van-col> -->
            </van-row>
            <!-- <div style="width: 100%; text-align: left"> -->
            <span class="tips">单位：人数</span>
            <!-- </div> -->
          </div>
        </div>
        <div class="p-card att-summary">
          <div class="p-card-header">考勤异常</div>
          <div class="p-card-content">
            <van-row>
              <van-col span="8">
                <div class="cont-item text-col-b" @click="clickToOtherApp('wdk')">
                  <span>未打卡</span><span>{{ pageData.wdk }}</span>
                </div>
              </van-col>
              <!-- <van-col span="8" v-show="dateFlag == 2">
                <div class="cont-item" @click="clickToOtherApp('wdk')">
                  <span>未打下班卡</span><span>{{ pageData.wdxbk }}</span>
                </div>
              </van-col> -->
              <van-col span="8">
                <div class="cont-item text-col-b" @click="clickToOtherApp('cd')">
                  <span>迟到</span><span>{{ pageData.cd }}</span>
                </div>
              </van-col>
              <van-col span="8">
                <div class="cont-item text-col-b" @click="clickToOtherApp('zt')">
                  <span>早退</span><span>{{ pageData.zt }}</span>
                </div>
              </van-col>
              <van-col span="8">
                <div class="cont-item text-col-b" @click="clickToOtherApp('kg')">
                  <span>旷工</span><span>{{ pageData.kg }}</span>
                </div>
              </van-col>
            </van-row>
            <!-- <div style="width: 100%; text-align: left"> -->
            <span class="tips">单位：人次</span>
            <!-- </div> -->
          </div>
        </div>
        <div class="p-card att-summary">
          <div class="p-card-header">用工类型</div>
          <div class="p-card-content">
            <van-row>
              <van-col :span="8">
                <div class="cont-item two" @click="clickToOtherApp('htg')">
                  <span>合同工</span><span>{{ pageData.htyg }}</span>
                </div>
              </van-col>
              <van-col :span="8">
                <div class="cont-item two" @click="clickToOtherApp('sxs')">
                  <span>实习生</span><span>{{ pageData.sxyg }}</span>
                </div>
              </van-col>
              <van-col :span="8">
                <div class="cont-item two" @click="clickToOtherApp('wb')">
                  <span>外包</span><span>{{ pageData.wbyg }}</span>
                </div>
              </van-col>
            </van-row>
            <span class="tips">单位：人数</span>
          </div>
        </div>
        <!-- v-show="pageData.deptClockVOS && pageData.deptClockVOS.length > 0" -->
        <div class="p-card att-summary">
          <div class="p-card-header">部门出勤</div>
          <div class="p-card-content">
            <table-cus
              ref="waitRef"
              class="myTable"
              :showBorderLeft="false"
              :width-percent="true"
              :cols="deptCols"
              :data="pageData.deptClockVOS"
            >
              <template #attendRate="{ data }">
                <div style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column">
                  <div
                    :style="{
                      width: data.attendRate ? data.attendRate * 100 + '%' : '0%',
                      background: '#296dff',
                      height: '50%'
                    }"
                  ></div>
                  <div style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); color: #eee">
                    {{ data.attendRate ? parseFloat((data.attendRate * 100).toFixed(2)) + '%' : '0%' }}
                  </div>
                </div>
              </template>
              <!-- <template #shouldAttendNum="{ data }">
                <div>
                  {{ (data.attendNum ? data.attendNum : 0) + '/' + (data.shouldAttendNum ? data.shouldAttendNum : 0) }}
                </div>
              </template> -->
            </table-cus>
          </div>
        </div>
        <!-- <div class="p-card att-summary">
          <div class="p-card-header">部门出勤</div>
          <div class="p-card-content">
            <div style="text-align: center; height: 100px; line-height: 100px; border: 1px solid #eee; color: #6a6767">
              开发中，敬请期待...
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div v-else style="text-align: center">该链接已失效</div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tab, Tabs, Popover, Row, Col, CheckboxGroup, Checkbox, Toast, Icon } from 'vant'
import SvgCharts from '@/components/svgCharts.vue'
import calendarCus from '@/components/calendarCus.vue'
import tableCus from '@/components/tableCus.vue'
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Popover)
Vue.use(Row)
Vue.use(Col)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Toast)
Vue.use(Icon)
import { getOfficeAttend } from './apis'
import { dateToStr } from '@/utils/common'
// import { deptCols } from './cols'
import { Base64 } from 'js-base64'
export default {
  name: 'DeptManagePage',
  components: { SvgCharts, calendarCus, tableCus },
  data() {
    return {
      tabActive: 1,
      tabActivedd: 1,
      showPep: false,
      nowDay: new Date(),
      calOps: {
        //日历默认配置
        defaultDate: ''
      },
      isMorning: true, //是否上午推送  new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds() < 64800, //是否早上（当前时间小于18:00就代表晚上）
      popSelects: [], //选中的部门列表
      pList: [
        // { unitId: 1, fullName: '第二部门' },
        // { unitId: '3', fullName: '第三部门' }
      ], //部门列表
      pageData: {
        unitName: '',
        updateTime: '',
        ydsbk: 0, //已打上班卡
        ydxbk: 0, //已打下班卡
        wdsbk: 0, //未打上班卡
        wdxbk: 0, //未打下班卡
        wdk: 0, //未打卡
        gsdk: 0, //公司打卡
        wqdk: 0, //外勤打卡
        sjcq: 0,
        sjcql: 0,
        ycq: 0,
        cd: 0,
        qk: 0,
        zt: 0,
        kg: 0, //旷工
        tx: 0,
        bj: 0,
        sj: 0,
        nj: 0,
        xjqt: 0,
        wc: 0,
        cc: 0,
        ztqt: 0,
        zgs: 0,
        pjgs: 0,
        jbpjgs: 0,
        sbdddk: 0,
        xbdddk: 0,
        sbmjdk: 0,
        xbmjdk: 0,
        jbrs: 0,
        checkRank: [],
        dksd: [],
        zrs: 0,
        wxdk: 0, //无需打卡
        sjqt: 0, //请假全天
        hxb24: 0, //24dian下班
        hxb22: 0, //22点下班

        sbdkdd: [], //上班打卡地点
        xbdkdd: [], //下班打卡地点

        // sbbldsdk: 0, //  上班百丽大厦打卡  废弃
        // sbrbdsdk: 0, //  上班荣宝大厦打卡  废弃
        // sbqtdddk: 0, // 上班其他地点 打卡  废弃
        // xbbldsdk: 0, //  百丽大厦  废弃
        // xbrbdsdk: 0, //  荣宝大厦  废弃
        // xbqtdddk: 0, // 其他地点  废弃

        htyg: 0, //  合同员工
        sxyg: 0, // 实习员工
        wbyg: 0, // 外包员工
        qj: 0,
        yglx: [],
        deptClockVOS: [],
        empClockVOS: []
      },
      orgData: {},
      myCharts: null,
      checkType: 'OnDuty', //上班(OnDuty)/下班(OffDuty)
      unitId: '',
      orgUnitId: '',
      clickIndex: null,
      iseffect: false, //是否失效
      timesTick: [],
      isDynamic: false,
      unitName: '', //部门名字
      calPanelHidden: true, //是否影藏日历块
      deptClockVOS: [], //部门出勤明细列表数据
      empClockVOS: [
        { name: '臧三', post: 'web开发工程师', clockTime: '09:10', id: 454 },
        { name: '臧三', post: 'web开发工程师', clockTime: '09:10', id: 4549 }
      ], //员工出勤列表数据
      deptCols: [
        {
          width: '25%',
          title: '部门',
          field: 'deptName'
        },
        {
          width: '15%',
          title: '总人数',
          field: 'deptTotalNum'
        },
        {
          width: '15%',
          // slot: true,
          title: '应出勤',
          field: 'shouldAttendNum'
        },
        {
          width: '15%',
          // slot: true,
          title: '实出勤',
          field: 'attendNum'
        },
        {
          width: '30%',
          title: '出勤率',
          slot: true,
          field: 'attendRate'
        }
      ] //部门列表字段
      // empCols //员工列表字段
    }
  },
  beforeCreate() {
    // console.log('c beforeCreated')
  },
  created() {
    // console.log('c created')
    if (this.global?.corpVal?.key) {
      const keyArrs = Base64.decode(this.global?.corpVal?.key).split('&')
      let dparam = ''
      // let OffDutyTime = ''
      for (let index = 0; index < keyArrs.length; index++) {
        if (keyArrs[index].indexOf('checkType=') === 0) {
          this.checkType = keyArrs[index].split('=')[1]
          this.isMorning = this.checkType === 'OnDuty'
        } else if (keyArrs[index].indexOf('unitId=') === 0) {
          this.unitId = keyArrs[index].split('=')[1]
          this.orgUnitId = keyArrs[index].split('=')[1]
        } else if (keyArrs[index].indexOf('d=') === 0) {
          dparam = keyArrs[index].split('=')[1]

          this.nowDay = new Date(dparam.replaceAll('-', '/'))
          this.calOps.defaultDate = dparam
          // } else if (keyArrs[index].indexOf('OffDutyTime=') === 0) {
          //   OffDutyTime = keyArrs[index].split('=')[1]
        } else if (keyArrs[index].indexOf('dynamic=') === 0) {
          this.isDynamic = keyArrs[index].split('=')[1] == 'dynamic'
        }
      }
      const date = new Date()
      let dateTimeArr = dateToStr(date, 'datetime').split(' ')
      let dayStr = dateTimeArr[0]
      //链接中没有配置日期就默认当天
      if (!dparam || dayStr === dparam) {
        let timeStr = dateTimeArr[1].replaceAll(':', '')
        //   当前时间小于8:00:00默认显示昨天的数据
        if (timeStr < 80000) {
          date.setDate(date.getDate() - 1)
          let yesterDayStr = dateToStr(date)
          this.nowDay = new Date(yesterDayStr.replaceAll('-', '/'))
          this.calOps.defaultDate = yesterDayStr
          date.setDate(date.getDate() + 1)
        } else {
          this.calOps.defaultDate = this.dayStr
        }
      }
      Promise.all([this.getOfficeAttendData].map(s => s()))
        .then(() => {
          this.loading = false
          this.isLoading = false
        })
        .catch(err => {
          this.loading = false
          this.isLoading = false
          console.log(err, 99999999)
        })
    } else {
      // this.iseffect = true
      // return
    }
  },
  beforeMount() {
    // console.log('c beforeMounted')
  },
  mounted() {
    console.log('c mounted')
    // this.$nextTick(() => {
    //   this.myCharts = echarts.init(document.getElementById('maychar'))
    // })
  },
  computed: {
    //2：今天，1：历史，3：将来
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
    }
  },

  methods: {
    getOfficeAttendData() {
      return new Promise((resolve, reject) => {
        ;(this.isDynamic
          ? getOfficeAttend //getDynamicOfficeAttend
          : getOfficeAttend)({
          checkType: this.checkType,
          date: dateToStr(this.nowDay),
          unitId: this.unitId,
          staffNo: sessionStorage.getItem('userNo'),
          userId: sessionStorage.getItem('userId')
        })
          .then(res => {
            if (res.data) {
              resolve(res.data)
              const allData = res.data
              this.unitName = this.unitName ? this.unitName : allData.officeCheck.unitName
              this.orgData = {
                old: {
                  unitName: '',
                  updateTime: '',
                  sjcq: 0,
                  sjcql: 0,
                  ycq: 0,
                  cd: 0,
                  qk: 0,
                  zt: 0,
                  kg: 0,
                  tx: 0,
                  bj: 0,
                  sj: 0,
                  nj: 0,
                  xjqt: 0,
                  wc: 0,
                  cc: 0,
                  ztqt: 0,
                  zgs: 0,
                  pjgs: 0,
                  jbpjgs: 0,
                  xbdddk: 0,
                  sbdddk: 0,
                  xbmjdk: 0,
                  sbmjdk: 0,
                  jbrs: 0,
                  checkRank: [],
                  dksd: [],
                  zrs: 0,
                  wxdk: 0, //无需打卡
                  sjqt: 0, //请假全天
                  hxb24: 0, //24dian下班
                  hxb22: 0, //22点下班
                  // sbbldsdk: 0, //  上班百丽大厦打卡
                  // sbrbdsdk: 0, //  上班荣宝大厦打卡
                  // sbqtdddk: 0, // 上班其他地点 打卡
                  // xbbldsdk: 0, //  下班百丽大厦打卡
                  // xbrbdsdk: 0, //  下班荣宝大厦打卡
                  // xbqtdddk: 0, // 下班其他地点打卡
                  htyg:
                    allData.yesterdayStaffProperty && allData.yesterdayStaffProperty.contractWorkerNum
                      ? allData.yesterdayStaffProperty.contractWorkerNum
                      : 0, //  合同员工
                  sxyg:
                    allData.yesterdayStaffProperty && allData.yesterdayStaffProperty.internsNum
                      ? allData.yesterdayStaffProperty.internsNum
                      : 0, // 实习员工
                  wbyg:
                    allData.yesterdayStaffProperty && allData.yesterdayStaffProperty.outsourcingPersonnelNum
                      ? allData.yesterdayStaffProperty.outsourcingPersonnelNum
                      : 0, // 外包员工
                  qj: 0, //请假人数
                  deptClockVOS: [],
                  empClockVOS: [],
                  ydsbk: 0, //已打上班卡
                  ydxbk: 0, //已打下班卡
                  wdsbk: 0, //未打上班卡
                  wdxbk: 0, //未打下班卡
                  wdk: 0, //未打卡
                  gsdk: 0, //公司打卡
                  wqdk: 0 //外勤打卡
                },
                mor: allData.officeCheck
                  ? {
                      unitName: allData.officeCheck.unitName,
                      updateTime: allData.officeCheck.updateTime,
                      sjcq: allData.officeCheck.attendNum,
                      sjcql: allData.officeCheck.attendRate,
                      ycq: allData.officeCheck.shouldAttendNum,
                      cd: allData.officeCheck.lateNum,
                      qk: this.isMorning ? allData.officeCheck.lossOnCheckNum : allData.officeCheck.lossCheckNum,
                      zt: allData.officeCheck.earlyNum,
                      kg: allData.officeCheck.absenteeismNum,
                      tx: allData.officeCheck.sabbaticalNum,
                      bj: allData.officeCheck.sickLeaveNum,
                      sj: allData.officeCheck.personalLeaveNum,
                      nj: allData.officeCheck.annualLeaveNum,
                      xjqt: allData.officeCheck.otherLeaveNum,
                      wc: allData.officeCheck.goOutNum,
                      cc: allData.officeCheck.evectionNum,
                      // ztqt: allData.officeCheck.attendNum,
                      zgs: allData.officeCheck.attendNum,
                      pjgs: allData.officeCheck.attendNum,
                      jbpjgs: allData.officeCheck.attendNum,
                      sbdddk: allData.officeCheck.onDingCheckNum,
                      xbdddk: allData.officeCheck.offDingCheckNum || 0,
                      sbmjdk: allData.officeCheck.onAtmCheckNum || 0,
                      xbmjdk: allData.officeCheck.offAtmCheckNum || 0,
                      jbrs: allData.officeCheck.overtimeNum,

                      checkRank: allData.checkRank ? allData.checkRank : [],
                      dksd: allData.distribution ? allData.distribution : [],
                      zrs: allData.officeCheck.deptTotalNum || 0,
                      wxdk: allData.officeCheck.noneedCheckNum, //无需打卡
                      sjqt: allData.officeCheck.leaveAllDayNum || 0, //请假全天
                      hxb24: allData.officeCheck.overtimeNum24 || 0, //24dian下班
                      hxb22: allData.officeCheck.overtimeNum22 || 0, //22点下班
                      qj: allData.officeCheck.leaveNum || 0, //请假人数
                      // sbbldsdk: 0, //  上班百丽大厦打卡
                      // sbrbdsdk: 0, //  上班荣宝大厦打卡
                      // sbqtdddk: 0, // 上班其他地点 打卡
                      // xbbldsdk: 0, //  百丽大厦
                      // xbrbdsdk: 0, //  荣宝大厦
                      // xbqtdddk: 0, // 其他地点
                      htyg:
                        allData.currentStaffProperty && allData.currentStaffProperty.contractWorkerNum
                          ? allData.currentStaffProperty.contractWorkerNum
                          : 0, //  合同员工
                      sxyg:
                        allData.currentStaffProperty && allData.currentStaffProperty.internsNum
                          ? allData.currentStaffProperty.internsNum
                          : 0, // 实习员工
                      wbyg:
                        allData.currentStaffProperty && allData.currentStaffProperty.outsourcingPersonnelNum
                          ? allData.currentStaffProperty.outsourcingPersonnelNum
                          : 0, // 外包员工
                      // yglx: allData.officeCheck.staffPropertyJson
                      //   ? JSON.parse(allData.officeCheck.staffPropertyJson)
                      //   : [], //用工类型
                      deptClockVOS:
                        allData.currentUnitDetail && allData.currentUnitDetail.deptDetails
                          ? allData.currentUnitDetail.deptDetails
                          : [],
                      empClockVOS:
                        allData.currentUnitDetail && allData.currentUnitDetail.staffDetails
                          ? allData.currentUnitDetail.staffDetails
                          : [],
                      ydsbk: allData.officeCheck.ondutyCheckNum || 0, //已打上班卡
                      ydxbk: allData.officeCheck.offdutyCheckNum || 0, //已打下班卡
                      wdsbk: allData.officeCheck.lossOnCheckNum || 0, //未打上班卡
                      wdxbk: allData.officeCheck.lossOffCheckNum || 0, //未打下班卡
                      wdk: allData.officeCheck.lossCheckNum || 0, //未打卡
                      gsdk:
                        allData.attendanceStatistics && allData.attendanceStatistics.insideCheckNum
                          ? allData.attendanceStatistics.insideCheckNum
                          : 0, //公司打卡
                      wqdk:
                        allData.attendanceStatistics && allData.attendanceStatistics.outsideCheckNum
                          ? allData.attendanceStatistics.outsideCheckNum
                          : 0 //外勤打卡
                    }
                  : {
                      sjcq: 0,
                      sjcql: 0,
                      ycq: 0,
                      cd: 0,
                      qk: 0,
                      zt: 0,
                      kg: 0,
                      tx: 0,
                      bj: 0,
                      sj: 0,
                      nj: 0,
                      xjqt: 0,
                      wc: 0,
                      cc: 0,
                      ztqt: 0,
                      zgs: 0,
                      pjgs: 0,
                      jbpjgs: 0,
                      sbdddk: 0,
                      xbdddk: 0,
                      sbmjdk: 0,
                      xbmjdk: 0,
                      jbrs: 0,
                      checkRank: [],
                      dksd: [],
                      zrs: 0,
                      wxdk: 0, //无需打卡
                      sjqt: 0, //请假全天
                      hxb24: 0, //24dian下班
                      hxb22: 0, //22点下班
                      // sbbldsdk: 0, //  上班百丽大厦打卡
                      // sbrbdsdk: 0, //  上班荣宝大厦打卡
                      // sbqtdddk: 0, // 上班其他地点 打卡
                      // xbbldsdk: 0, //  百丽大厦
                      // xbrbdsdk: 0, //  荣宝大厦
                      // xbqtdddk: 0, // 其他地点
                      htyg:
                        allData.currentStaffProperty && allData.currentStaffProperty.contractWorkerNum
                          ? allData.currentStaffProperty.contractWorkerNum
                          : 0, //  合同员工
                      sxyg:
                        allData.currentStaffProperty && allData.currentStaffProperty.internsNum
                          ? allData.currentStaffProperty.internsNum
                          : 0, // 实习员工
                      wbyg:
                        allData.currentStaffProperty && allData.currentStaffProperty.outsourcingPersonnelNum
                          ? allData.currentStaffProperty.outsourcingPersonnelNum
                          : 0, // 外包员工
                      qj: 0,
                      sbdkdd: [],
                      xbdkdd: [],
                      deptClockVOS: [],
                      empClockVOS: [],
                      ydsbk: 0, //已打上班卡
                      ydxbk: 0, //已打下班卡
                      wdsbk: 0, //未打上班卡
                      wdxbk: 0, //未打下班卡
                      wdk: 0, //未打卡
                      gsdk:
                        allData.attendanceStatistics && allData.attendanceStatistics.insideCheckNum
                          ? allData.attendanceStatistics.insideCheckNum
                          : 0, //公司打卡
                      wqdk:
                        allData.attendanceStatistics && allData.attendanceStatistics.outsideCheckNum
                          ? allData.attendanceStatistics.outsideCheckNum
                          : 0 //外勤打卡
                    }
              }
              if (allData.currentCheckAddress && allData.currentCheckAddress.offCheckAddressNum) {
                let offArr = []
                for (let key in allData.currentCheckAddress.offCheckAddressNum) {
                  offArr.push({ name: key, value: allData.currentCheckAddress.offCheckAddressNum[key] })
                }
                this.orgData.mor['xbdkdd'] = offArr
              }

              if (allData.currentCheckAddress && allData.currentCheckAddress.onCheckAddressNum) {
                let onArr = []
                for (let key in allData.currentCheckAddress.onCheckAddressNum) {
                  onArr.push({ name: key, value: allData.currentCheckAddress.onCheckAddressNum[key] })
                }
                this.orgData.mor['sbdkdd'] = onArr //上班打卡地点
              }
              this.changePageData()
            } else {
              // resolve(null)
            }
          })
          .catch(err => {
            reject('查询考勤数据失败：' + err.message)
            // Toast({
            //   message: '查询考勤数据失败：' + err.errorMessage,
            //   position: 'bottom'
            // })
          })
      })
    },
    changePageData() {
      this.pageData = this.orgData['mor']
    },
    calClickPanel() {
      this.calPanelHidden = !this.calPanelHidden
      this.$refs.calref.changeDefaultLine(this.calPanelHidden)
    },
    // 日期变动
    handlerSelect(date) {
      this.nowDay = date
      this.month = date.getMonth() + 1
      console.log(date, 'handlerselect')
      //日期变动调接口，获取数据
      this.getOfficeAttendData()
    },
    // 月份变动
    changeMonth(year, month1) {
      this.month = month1
      this.year = year
      console.log(month1, year, 'changeMonth')
    },
    //切换日期
    changeDate() {
      console.log(this.nowDay, dateToStr(this.nowDay), dateToStr(new Date()), 'changeDate')
      //相等就去昨天
      if (dateToStr(this.nowDay) == dateToStr(new Date())) {
        let d = new Date()
        d.setDate(d.getDate() - 1)
        console.log(dateToStr(d))
        this.$refs.calref.selectDateClick({ _d: d })
      } else {
        this.$refs.calref.changeOhterMonthDate({ _d: new Date() })
      }
    },
    routeToPage(data) {
      this.$router.push({ name: 'personalPage', params: { dateStr: dateToStr(this.nowDay), staffNo: data.staffNo } })
    },
    clickToOtherApp(type) {
      if (this.dateFlag == 2) {
        //公司打卡，外勤打卡
        if (type == 'gsdk' || type == 'wqdk' || type == 'wdk') {
          this.$router.push({
            name: 'dkListPage',
            params: {
              workDate: dateToStr(this.nowDay),
              unitId: this.unitId,
              from: type == 'gsdk' ? 1 : type == 'wqdk' ? 2 : 3
            }
          })
        } else if (type == 'wc') {
          this.$router.push({
            name: 'outEmpPage',
            params: { workDate: dateToStr(this.nowDay), unitId: this.unitId, from: 2 }
          })
        } else if (type == 'qj') {
          this.$router.push({
            name: 'outEmpPage',
            params: { workDate: dateToStr(this.nowDay), unitId: this.unitId, from: 1 }
          })
        } else if (type == 'cd' || type == 'zt' || type == 'kg') {
          const typeObj = { cd: 3, zt: 4, kg: 5 }
          this.$router.push({
            name: 'outEmpPage',
            params: { workDate: dateToStr(this.nowDay), unitId: this.unitId, from: typeObj[type] }
          })
        } else {
          // Toast('目前只支持外出、请假下钻到明细. ')
        }
      } else {
        Toast('暂不支持下钻到历史日期的明细. ')
      }

      // this.dd.biz.util.openLink({
      //   url: data.url ? data.url : '' // 要打开链接的地址
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/common';
.p-page {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .p-body {
    background: #fff;
    min-height: 200px;
    &-name {
      font-size: 30px;
      font-weight: 600;
      color: #333333;
      line-height: 35px;
    }

    &-content {
      //   display: flex;
      //   justify-content: space-between;

      /deep/ .progress-desc {
        top: 37%;
      }

      .absolute-p {
        position: absolute;
        width: 100%;
        bottom: 0;
        .tips {
          transform-origin: 50%;
        }
      }

      &-svg {
        width: 100%;
        height: 250px;
        overflow: hidden;
        position: relative;

        .p-body-svg {
          margin: 0 auto;
          height: 380px;
          width: 360px;
          position: relative;
          // margin: 33PX auto;
          .svg-title {
            font-size: 20px;
            color: #999999;
          }
          .svg-total {
            font-size: 20px;
            color: #333;
            padding-top: 15px;
          }
          .svg-num {
            font-size: 60px;
            color: #296dff;
            font-weight: bold;
            padding: 5px 0;
          }
          .svg-flag {
            font-size: 20px;
            font-weight: 400;
            color: #333333;
          }
        }
      }
      &-zb {
        padding: 20px 0;
        text-align: left;
        .zb-item {
          display: flex;
          background: aliceblue;
          margin-right: 15px;
          border-radius: 10px;
          width: 30%;
          display: inline-block;
          margin-bottom: 15px;
          text-align: center;

          &-name {
            font-size: 28px;
            font-weight: 400;
            color: #666666;
            padding: 5px 0;
            width: 100px;
            display: inline-block;
          }
          &-num {
            font-size: 32px;
            font-weight: 600;
            color: #333333;
            padding: 5px 0;
            width: 100px;
            display: inline-block;
          }
        }
      }
    }
  }

  .cus-tabs {
    width: 30%;
    height: 38px;
    line-height: 38px;
    font-size: 22px;
    text-align: center;
    color: #333333;
    box-sizing: border-box;
    &-tab {
      width: 50%;
      display: inline-block;
      line-height: 24px;
      position: relative;
    }
    &-tab:last-child {
      text-align: right;
    }
    &-tab:first-child {
      text-align: left;
    }
    &-tab:first-child::after {
      content: ' ';
      display: inline-block;
      border-left: 1px solid #e7e8ea;
      height: 100%;
      /* width: 0.5px; */
      height: 24px;
      position: absolute;
      right: 0;
      background: #e7e8ea;
    }
    &-tab.active {
      color: #2994ff;
    }
  }

  .dept-list {
    font-size: 28px;
    font-weight: bold;
    color: #3a4058;
    text-align: left;
    position: relative;
    margin-bottom: 15px;
  }
  .tips {
    font-size: 18px;
    color: #ababab;
    transform: scale(0.8);
    display: inline-block;
    transform-origin: 0 0;
    white-space: nowrap;
    // width: 100%;
  }
  .p-content {
    height: 100%;
    overflow: auto;
    background: #ffffff;

    @include p-card();
    .att-summary {
      margin-bottom: 0;
      padding: 10px 28px;
      text-align: left;
    }
    /deep/ .van-col {
      padding: 0 10px 10px 0;
    }

    .p-card-header-tips {
      color: #bec1c9;
      font-size: 10px;
      font-weight: 400;
    }
    .min-c-hight {
      min-height: 60px;
    }
    .p-card-content {
      // padding-left: 20px;
      // > div,
      .cont-item {
        color: #666666;
        line-height: 35px;
        display: inline-block;
        padding: 12.5px 10px;
        width: 100%;
        height: 60px;
        background: #f4f6fa;
        border-radius: 8px;

        // opacity: 1;
        // margin: 10px;
        > span:last-child {
          font-size: 26px;
          font-weight: 600;
          color: #333333;
          display: inline-block;
          float: right;
        }
        > span:first-child {
          font-size: 24px;
          display: inline-block;
          float: left;
          white-space: nowrap;
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .text-col-b {
        color: #2994ff;
        > span:last-child {
          color: #2994ff;
        }
      }
      .cont-item:active {
        background-color: #d1d6df;
      }
    }
  }
}
.pop-div-panel {
  padding: 15px;
  max-height: 50vw;
  overflow: auto;
}
/deep/ .van-tab {
  font-size: 30px;
}
/deep/ .van-tab.van-tab--active {
  font-size: 36px;
}
.cal-attend {
  margin-bottom: 30px;
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
}
.p-body-svg {
  display: flex;
  justify-content: center;
  height: 380px;
  width: 360px;
  // margin: 40px auto;
  .svg-title {
    font-size: 26px;
    color: #999999;
  }
  .svg-num {
    font-size: 60px;
    color: #333333;
    font-weight: 600;
    padding: 20px 0;
  }
  .svg-flag {
    font-size: 26px;
    font-weight: 400;
    color: #333333;
  }
  // margin-top: 40px;
}

.att-s-num {
  font-size: 40px;
  font-weight: 600;
  padding: 22px 0;
  text-align: center;
}
.att-s-word {
  font-size: 28px;
  font-weight: 400;
  color: #666666;
  text-align: center;
}
#maychar {
  width: 670px;
  height: 380px;
}
.times-tick {
  position: absolute;
  // bottom: 7px;
  color: #a2d1fe;
  font-size: 10px;
  display: flex;
  span {
    flex-grow: 0;
    flex-shrink: 0;
    flex: 1;
    display: inline-block;
    white-space: nowrap;
    // transform: translateX(-17px);
  }
}
/deep/ .van-checkbox__label {
  font-size: 26px;
}
/deep/ .van-checkbox__icon {
  font-size: 26px;
  .van-icon {
    line-height: 24px;
  }
}
</style>

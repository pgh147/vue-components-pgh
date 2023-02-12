<template>
  <div class="personal-list" :class="{ noTab: userParams.from != 3 }">
    <div class="info">
      <div class="time">数据更新截止：{{ getNowDate() }}</div>
      <div class="cell2" v-if="userParams.from == 3">
        <van-tabs v-model="active" type="card" color="#2994ff">
          <van-tab title="未打上班卡"></van-tab>
          <van-tab title="未打下班卡"></van-tab>
        </van-tabs>
      </div>
      <div class="cell">
        <el-select v-model="region" placeholder="请选择" size="small" value-key="value" multiple collapse-tags>
          <el-option v-for="item in regionList" :key="item.value" :value="item" :label="item.label" />
        </el-select>
        <div class="num">
          {{
            (userParams.from == 3 ? '未打卡人数：' : userParams.from == 2 ? '外勤打卡人数：' : '公司打卡人数：') + total
          }}
        </div>
        <van-button @click="handleExport" color="#a191e8" size="mini" type="info">导出数据</van-button>
      </div>
    </div>
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
    <!-- <van-list finished-text="没有更多了"> -->

    <div v-for="(item, index) in personList" @click.stop="toDetails(item)" :key="index" class="list">
      <div class="img"><img :src="item.avatar || require('../../assets/img/default.png')" /></div>
      <div class="list-right">
        <div class="list-content">
          <div class="name">{{ item.staffName }}</div>
          <div class="unit">{{ item.deptName }}</div>
        </div>
        <div class="icon"></div>
      </div>
    </div>
    <div class="nodata" v-show="!personList || personList.length == 0">暂无数据...</div>
    <!-- </van-list> -->
    <!-- </van-pull-refresh> -->
    <van-dialog v-model="show" :show-cancel-button="false" confirm-button-color="#3464e0" theme="round-button">
      <span class="dialog-content" slot="default"
        >请注意查收 人事小助手 发送给您的下载消息，并登入pc端进行下载操作</span
      >
      <div slot="title" class="dialog-png">
        <img :src="require('../../assets/img/success-fill.png')" />
        <!-- <van-icon color="green" name="passed" /> -->
        导出成功
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  getOfficeLossCheckDetail,
  getOfficeLossCheck,
  getOfficeLossCheckExport,
  getOfficeInsideCheckDetail,
  getOfficeInsideCheck,
  getOfficeInsideCheckExport,
  getOfficeOutsideCheckDetail,
  getOfficeOutsideCheck,
  getOfficeOutsideCheckExport
} from './apis'
import { setTitle } from '../../utils/ddUtils'
import Vue from 'vue'
import { PullRefresh, List, Button, Dialog, Icon, Tab, Tabs } from 'vant'
import { Select, Option } from 'element-ui'
;[PullRefresh, List, Select, Option, Button, Dialog, Icon, Tab, Tabs].forEach(item => {
  Vue.use(item)
})
export default {
  name: 'DkListPage',
  data() {
    return {
      active: 0,
      personList: [],
      loading: false,
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      refreshing: false,
      pageNo: 1,
      pageSize: 20,
      total: '',
      userParams: {
        unitId: '',
        from: null,
        workDate: ''
      },
      region: [],
      regionList: [
        {
          value: '全部',
          label: '全部'
        }
      ],
      orgDeptData: {
        lossOnCheckDetail: {
          deptList: [],
          totalNum: 0
        },
        lossOffCheckDetail: {
          deptList: [],
          totalNum: 0
        }
      },
      show: false
    }
  },
  computed: {
    compTargetUnitId() {
      if (
        this.region.some(item => {
          return item.value == '全部'
        })
      ) {
        return ''
      } else {
        return this.region.map(item => item.value).join('|')
      }
    } //: this.region.map(item => item.value).join('|'),
  },
  watch: {
    active(val) {
      if (val == 1) {
        this.regionList = this.orgDeptData['lossOffCheckDetail'].deptList.map(item => {
          return {
            value: item.deptKey,
            label: item.deptName
          }
        })
      } else {
        this.regionList = this.orgDeptData['lossOnCheckDetail'].deptList.map(item => {
          return {
            value: item.deptKey,
            label: item.deptName
          }
        })
      }
      this.regionList.unshift({
        value: '全部',
        label: '全部'
      })
      this.getList()
    },
    region(val) {
      this.getList()
    }
  },
  beforeRouteLeave(to, from, next) {
    setTitle('打卡数据应用')
    next()
  },
  mounted() {
    if (!this.$route.params.unitId || !this.$route.params.from || !this.$route.params.workDate) {
      this.userParams = JSON.parse(sessionStorage.getItem('userParams'))
    } else {
      this.userParams = this.$route.params
      sessionStorage.setItem('userParams', JSON.stringify(this.$route.params))
    }
    if (this.userParams.from === 3) {
      setTitle('未打卡人员列表')
    } else if (this.userParams.from === 1) {
      setTitle('公司打卡人员列表')
    } else if (this.userParams.from === 2) {
      setTitle('外勤打卡人员列表')
    }
    this.getDeptListData()
    // this.getList()
  },
  methods: {
    handleExport() {
      ;(this.userParams.from == 3
        ? getOfficeLossCheckExport
        : this.userParams.from == 2
        ? getOfficeOutsideCheckExport
        : getOfficeInsideCheckExport)({
        unitId: this.userParams.unitId,
        targetUnitId: this.compTargetUnitId,
        date: this.userParams.workDate
      })
        .then(res => {
          this.show = true
        })
        .catch(err => {
          Toast('导出失败. ')
        })
    },
    onClickTab(name, title) {
      this.onRefresh()
      console.log(name, title)
    },
    getNowDate() {
      // 格式化数字
      const formatNumber = n => {
        n = n.toString()
        return !n[1] ? '0' + n : n
      }
      const todayDate = new Date()
      const year = todayDate.getFullYear()
      const month = todayDate.getMonth() + 1
      const day = todayDate.getDate()
      const nowDay = [year, formatNumber(month), formatNumber(day)].join('-')
      const hour = todayDate.getHours() // 时
      const minutes = todayDate.getMinutes() // 分
      const seconds = todayDate.getSeconds() // 秒
      return nowDay + '  ' + formatNumber(hour) + ':' + formatNumber(minutes) + ':' + formatNumber(seconds)
    },
    toDetails(item) {
      this.$router.push({
        name: 'personalPage',
        params: {
          dateStr: this.userParams.workDate,
          staffNo: item.staffNo
        }
      })
    },
    getDeptListData() {
      ;(this.userParams.from == 3
        ? getOfficeLossCheckDetail
        : this.userParams.from == 2
        ? getOfficeOutsideCheckDetail
        : getOfficeInsideCheckDetail)({
        unitId: this.userParams.unitId,
        date: this.userParams.workDate
      })
        .then(res => {
          if (res.code == 200) {
            if (res.data) {
              if (this.userParams.from == 3) {
                this.orgDeptData = res.data
                this.regionList = res.data['lossOnCheckDetail'].deptList.map(item => {
                  return {
                    value: item.deptKey,
                    label: item.deptName
                  }
                })
              } else {
                this.regionList = res.data.deptList.map(item => {
                  return {
                    value: item.deptKey,
                    label: item.deptName
                  }
                })
              }
              this.regionList.unshift({
                value: '全部',
                label: '全部'
              })
            }
            this.getList()
          }
        })
        .catch(err => {})
    },
    async getList() {
      this.personList = []
      const params = {
        // pageNo: this.pageNo, // 当前页码
        // pageSize: this.pageSize, // 条数
        targetUnitId: this.compTargetUnitId,
        unitId: this.userParams.unitId,
        onOrOff: this.active == 0 ? 1 : 2, // 1-上班卡 2-下班卡
        date: this.userParams.workDate
      }
      try {
        const res = await (this.userParams.from == 3
          ? getOfficeLossCheck
          : this.userParams.from == 2
          ? getOfficeOutsideCheck
          : getOfficeInsideCheck)(params)
        //   if (this.refreshing) {
        //     this.personList = []
        //     this.refreshing = false
        //   }
        if (res.data.length === 0) {
          this.total = 0
          this.personList = []
          this.finished = true
        } else {
          this.total = res.data.length
          this.personList.push(...res.data)
        }
      } catch (error) {
        this.total = 0
        this.personList = []
      }

      //   this.total = res.data.total
      this.loading = false // 加载状态结束
      //   // 如果list长度大于等于总数据条数,数据全部加载完成
      //   if (this.personList.length >= res.data.total) {
      //     this.finished = true // 结束加载状态
      //   }
    }
    // // 列表加载
    // onLoad() {
    //   this.getList()
    //   this.pageNo++
    // },
    // // 下拉刷新
    // onRefresh() {
    //   this.refreshing = true
    //   this.finished = false
    //   this.loading = true
    //   this.pageNo = 1
    //   this.onLoad()
    // }
  }
}
</script>

<style lang="scss" scoped>
.personal-list {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 222px;
  .info {
    position: absolute;
    top: 0;
    width: 710px;
    background: white;
    z-index: 9;
  }
  .time {
    font-size: 24px;
    color: #666;
    margin-top: 10px;
    display: flex;
  }

  /deep/ .van-tab {
    height: 56px;
    line-height: 40px;
    font-size: 24px;
  }
  /deep/ .van-tabs--card > .van-tabs__wrap {
    height: 60px;
  }
  /deep/ .van-tabs__nav--card {
    height: 60px;
  }

  .cell2 {
    margin: 32px 0px 16px 0;
  }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0px 32px 0;
    ::-webkit-input-placeholder {
      // color: #aab2bd;
      font-size: 20px;
    }
    .num {
      font-size: 24px;
    }
    /deep/ .el-tag--mini {
      height: 28px;
    }
    /deep/ .el-input--small .el-input__inner {
      width: 260px;
      height: 44px;
      line-height: 44px;
    }
    /deep/ .el-range-editor--small.el-input__inner {
      height: 40px;
      width: 320px;
      line-height: 40px;
    }
    /deep/ .el-date-editor .el-range-separator {
      padding: 0;
      font-size: 20px;
    }
    /deep/ .el-select__tags-text {
      display: inline-block;
      max-width: 230px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /deep/ .el-tag.el-tag--info .el-tag__close {
      vertical-align: super;
    }
    /deep/ .el-input--small .el-input__icon {
      line-height: 40px;
    }
    /deep/ .van-button--mini {
      // font-size: 16px;
      padding: 0 24px;
    }
    /deep/ .el-select__tags {
      align-items: flex-start;
      flex-wrap: nowrap;
    }
    /deep/ .el-select__tags-text {
      display: inline-block;
      max-width: 110px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /deep/ .el-tag.el-tag--info .el-tag__close {
      vertical-align: super;
    }
    /deep/ .el-select .el-tag {
      margin: 4px 0 4px 4px;
    }
    /deep/ .el-input__icon {
      width: 24px;
    }
  }
  .nodata {
    text-align: center;
    width: 100%;
    display: block;
    line-height: 50px;
    color: #858383;
  }
  .list {
    display: flex;
    align-items: center;
    height: 120px;
    .img img {
      width: 72px;
      height: 72px;
      border-radius: 6px;
    }
    .list-right {
      height: 120px;
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      padding-right: 30px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: #e0e0e0;
        transform: scaleY(0.5);
      }
      .list-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 20px;
        font-size: 28px;
        .name {
          color: #333;
        }
        .unit {
          color: #999;
          margin-top: 16px;
          font-size: 24px;
        }
      }
      .icon {
        border: 2px solid #c2c0c0;
        width: 28px;
        height: 28px;
        border-left-color: transparent;
        border-top-color: transparent;
        transform: rotate(-45deg); //右箭头
      }
    }
  }
  .van-dialog {
    border-radius: 10px;
  }
  /deep/ .van-dialog--round-button .van-dialog__confirm {
    border-radius: 3px !important;
    height: 44px;
    line-height: 44px;
    font-size: 24px;
  }
  /deep/ .van-dialog--round-button .van-dialog__footer {
    padding: 0 240px 16px !important;
  }
  .dialog-content {
    color: #333;
    font-size: 24px;
    display: inline-block;
    padding: 0 20px 30px 24px;
    text-align: start;
    line-height: 40px;
  }
  .dialog-png {
    display: flex;
    padding-left: 20px;
    padding-bottom: 26px;
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
  }
}
.noTab {
  padding-top: 124px;
}
</style>

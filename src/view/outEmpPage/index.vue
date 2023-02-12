<template>
  <div class="personal-list">
    <!-- <div v-for="(item, index) in personList" :key="index" class="list">
			<div class="img"><img :src="item.avatar || require('../../assets/img/default.png')" /></div>
			<div class="list-right">
				<div class="list-content">
					<div class="name">{{ item.name }}</div>
					<div class="unit">{{ item.unit }}</div>
				</div>
				<div class="icon" @click="toDetails"></div>
			</div>
		</div> -->
    <div class="time">数据更新截止：{{getNowDate()}}</div>
    <!-- <div class="tabs">
      <van-tabs type="card" @click="onClickTab">
        <van-tab title="未打上班卡" />
        <van-tab title="未打上班卡" />
      </van-tabs>
    </div> -->
    <div class="cell">
      <el-select
        v-model="region"
        placeholder="请选择"
        size="small"
        value-key="value"
        multiple
        collapse-tags
      >
        <el-option
          v-for="item in regionList"
          :key="item.value"
          :value="item"
          :label="item.label"
        />
      </el-select>
      <div class="num">未打卡人数:261</div>
      <van-button @click="handleExport" color="#a191e8" size="mini" type="info">导出数据</van-button>

    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
      </van-list>
    </van-pull-refresh>
    <van-dialog
      v-model="show"
      :show-cancel-button="false"
      confirm-button-color="#3464e0"
      theme="round-button"
      >
      <span class="dialog-content" slot="default">请注意查收 人事小助手 发送给您的下载消息，并登入pc端进行下载操作</span>
      <div slot="title" class="dialog-png">
        <img :src="require('../../assets/img/success-fill.png')" />
        <!-- <van-icon color="green" name="passed" /> -->
        导出成功
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { getOfficeAttend } from './apis'
import { setTitle } from '../../utils/ddUtils'
import Vue from 'vue'
import { PullRefresh, List, Button, Dialog, Icon } from 'vant'
import { Select, Option } from 'element-ui'
[PullRefresh, List, Select, Option, Button, Dialog, Icon].forEach((item) => {
  Vue.use(item)
})
export default {
  name: 'OutEmpPage',
  data() {
    return {
      personList: [
        // {
        // 	name: '杨凡',
        // 	unit: 'IM管理组'
        // },
        // {
        // 	name: '刘安石',
        // 	unit: 'UED用户交互设计组'
        // }
      ],
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
          value: '选项9',
          label: '全部'
        }, {
          value: '选项1',
          label: '供应链系统部'
        }, {
          value: '选项2',
          label: '办公系统部'
        }
      ],
      show: false
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
    if (this.userParams.from === 2) {
      setTitle('外出人员列表')
    } else if (this.userParams.from === 1) {
      setTitle('请假人员列表')
    }
    // this.getList()
  },
	methods: {
    handleExport() {
      this.show = true
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
			this.$router.push(
				{
					name: 'personalPage',
					params: {
						dateStr: this.userParams.workDate,
						staffNo: item.staffNo
					}
				})
		},

		async getList() {
			const params = {
				pageNo: this.pageNo, // 当前页码
				pageSize: this.pageSize, // 条数
        unitId: this.userParams.unitId,
        from: this.userParams.from, // 1-请假 2-外出
        workDate: this.userParams.workDate
      }
      const res = await getOfficeAttend(params)
      if (this.refreshing) {
        this.personList = []
        this.refreshing = false
      }
      if (res.data.records.length === 0) {
        this.personList = []
        this.finished = true
      }
      this.total = res.data.total
      this.personList.push(...res.data.records)
      this.loading = false // 加载状态结束
      // 如果list长度大于等于总数据条数,数据全部加载完成
      if (this.personList.length >= res.data.total) {
        this.finished = true // 结束加载状态
      }
    },
    // 列表加载
    onLoad() {
      this.getList()
      this.pageNo++
    },
    // 下拉刷新
    onRefresh() {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.pageNo = 1
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-list {
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 10px;
  height: 100vh;
  .time {
    font-size: 24px;
    color: #666;
    margin-top: 10px;
    display: flex;
  }
  // .tabs {
  //   margin-top: 32px;
  //   /deep/ .van-tab {
  //     font-size: 24px;
  //   }
  //   /deep/ .van-tabs--card>.van-tabs__wrap {
  //     height: 46px;
  //   }
  //   /deep/ .van-tabs__nav--card {
  //     height: 44px;
  //     border: 1px solid #3464e0;
  //   }
  //   /deep/ .van-tabs__nav--card .van-tab.van-tab--active {
  //     color: #fff;
  //     height: 42px;
  //     background: #3464e0;
  //   }
  //   /deep/ .van-tabs__nav--card .van-tab {
  //     color: #333;
  //     border-right: 1px solid #3464e0;
  //   }
  //   /deep/ .van-tabs__nav--card .van-tab:last-child {
  //     border-right: none;
  //   }
  //   /deep/ .van-tab__text--ellipsis {
  //     overflow: inherit;
  //   }
  // }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 32px 0;
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
    /deep/ .el-select__tags{
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
				transform: rotate( -45deg);//右箭头
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
</style>

<template>
  <div class="page">
    <div class="page-con" @click="itemClick">
      <div
        v-for="(item, index) of list"
        :key="item.id + '-' + index"
        class="page-con-item list-item"
        v-bind:data-index="index"
        :class="{ 'item-first': index == 0, 'item-last': index == list.length - 1 }"
      >
        <div class="page-con-item-left">
          <div class="log-div">
            <div :class="item.logCls"></div>
          </div>
          <div>
            {{ item.name }}
          </div>
        </div>
        <div class="page-con-item-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- <div class="page-con-item item-calcel">
        <div class="page-con-item-left">
          <div class="log-div">
            <div class="zuzhiyidong"></div>
          </div>
          <div>组织异动</div>
        </div>
        <div class="page-con-item-right">
          <van-icon name="arrow" />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Icon } from 'vant'
Vue.use(Icon)
export default {
  data() {
    return {
      isManager: false,
      list: [
        {
          name: '补卡',
          logCls: 'buka',
          url: 'dingtalk://dingtalkclient/action/openapp?app_id=-4&container_type=work_platform&corpid=ding9b264447257f031335c2f4657eb6378f&ddtab=true&redirect_type=jump&redirect_url=https%3A%2F%2Faflow.dingtalk.com%2Fdingtalk%2Fmobile%2Fhomepage.htm%3FappUuid%3Dding9b264447257f031335c2f4657eb6378f%26back_control%3Dfalse%26backcontrol%3Dfalse%26corpid%3Dding9b264447257f031335c2f4657eb6378f%26dd_progress%3Dfalse%26dd_share%3Dfalse%26ddtab%3Dtrue%26showmenu%3Dfalse%23%2Fcustom%3Fpcredirect%3Dself%26processCode%3DPROC-DC5ABAEE-63B4-4E6F-AF80-C7DA02A5ABBD',
          id: 's11'
        },
        {
          name: '请假',
          logCls: 'qingjia',
          url: 'https://retailr1.newbelle.cn/hrms-dingats-mobile/index.html?CorpId=ding9b264447257f031335c2f4657eb6378f&AgentId=623979947#/leaveapply',
          id: 's12'
        },
        {
          name: '出差',
          logCls: 'chuchai',
          url: 'dingtalk://dingtalkclient/action/openapp?app_id=-4&container_type=work_platform&corpid=ding1fe1756a8a80ba0effe93478753d9884&ddtab=true&redirect_type=jump&redirect_url=https%3A%2F%2Faflow.dingtalk.com%2Fdingtalk%2Fmobile%2Fhomepage.htm%3FappUuid%3Dding1fe1756a8a80ba0effe93478753d9884%26back_control%3Dfalse%26backcontrol%3Dfalse%26corpid%3Dding1fe1756a8a80ba0effe93478753d9884%26dd_progress%3Dfalse%26dd_share%3Dfalse%26ddtab%3Dtrue%26showmenu%3Dfalse%23%2Fcustom%3Fpcredirect%3Dself%26processCode%3DPROC-791A9BE9-EF70-4312-8582-CA34853121F1',
          id: 's13'
        },
        {
          name: '外出',
          logCls: 'waichu',
          url: 'dingtalk://dingtalkclient/action/openapp?app_id=-4&container_type=work_platform&corpid=ding9b264447257f031335c2f4657eb6378f&ddtab=true&redirect_type=jump&redirect_url=https%3A%2F%2Faflow.dingtalk.com%2Fdingtalk%2Fmobile%2Fhomepage.htm%3FappUuid%3Dding9b264447257f031335c2f4657eb6378f%26back_control%3Dfalse%26backcontrol%3Dfalse%26corpid%3Dding9b264447257f031335c2f4657eb6378f%26dd_progress%3Dfalse%26dd_share%3Dfalse%26ddtab%3Dtrue%26showmenu%3Dfalse%23%2Fcustom%3Fpcredirect%3Dself%26processCode%3DPROC-7DC7D946-5810-46FF-B391-0270BF4EEF61',
          id: 's14'
        },
        {
          name: '加班',
          logCls: 'jiaban',
          url: 'dingtalk://dingtalkclient/action/openapp?app_id=-4&container_type=work_platform&corpid=ding9b264447257f031335c2f4657eb6378f&ddtab=true&redirect_type=jump&redirect_url=https%3A%2F%2Faflow.dingtalk.com%2Fdingtalk%2Fmobile%2Fhomepage.htm%3FappUuid%3Dding9b264447257f031335c2f4657eb6378f%26back_control%3Dfalse%26backcontrol%3Dfalse%26corpid%3Dding9b264447257f031335c2f4657eb6378f%26dd_progress%3Dfalse%26dd_share%3Dfalse%26ddtab%3Dtrue%26showmenu%3Dfalse%23%2Fcustom%3Fpcredirect%3Dself%26processCode%3DPROC-7DC7D946-5810-46FF-B391-0270BF4EEF61',
          id: 's15'
        }
        // { name: '组织异动', url: '', id: 's16' }
      ]
    }
  },
  created() {
    this.getUserRole()
  },
  methods: {
    getUserRole() {
      new Promise((reslove, reject) => {
        setTimeout(() => {
          reslove(1)
        }, 1500)
      }).then(data => {
        this.isManager = true
      })
    },
    itemClick(e) {
      let path = e.path || (e.composedPath && e.composedPath())
      if (path && path.length > 0) {
        let arr = path.filter(item => {
          return (item.nodeName === 'div' || item.nodeName === 'DIV') && item.className.indexOf('list-item') > 0
        })
        if (arr.length) {
          this.currentIndex = Number(arr[0].dataset.index)

          if (this.list[arr[0].dataset.index].url) {
            this.dd.biz.util.openLink({
              url: this.list[arr[0].dataset.index].url // 要打开链接的地址
            })
          } else {
            Toast.fail('跳转失败，不是正确的链接')
          }
        } else {
          //组织异动
          // this.dd.biz.navigation.goBack()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: #f2f3f5;
  padding: 20px 20px 0 20px;
  &-con {
    width: 100%;
    &-item {
      background: #fff;
      // height: 80px;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      padding: 20px 30px;
      color: #3d4045;
      font-size: 24px;
      &-left {
        > div {
          display: inline-block;
          vertical-align: middle;
        }
        .log-div {
          height: 80px;
          width: 80px;
          border-radius: 50%;
          background: #f4f2ff;
          margin-right: 20px;
          .common-log {
            width: 40px;
            height: 40px;
            margin: 20px 0 0 20px;
            background-size: 100%;
          }
          .jiaban {
            @extend .common-log;
            background-image: url('~@/assets/img/jiaban.png');
            // background: url('~@/assets/img/down.png');
          }
          .chuchai {
            @extend .common-log;
            background-image: url('~@/assets/img/chuchai.png');
          }
          .qingjia {
            @extend .common-log;
            background-image: url('~@/assets/img/qingjia.png');
          }
          .buka {
            @extend .common-log;
            background-image: url('~@/assets/img/buka.png');
          }
          .waichu {
            @extend .common-log;
            background-image: url('~@/assets/img/waichu.png');
          }
          .zuzhiyidong {
            @extend .common-log;
            background-image: url('~@/assets/img/zuzhiyidong.png');
          }
        }
      }
      &:focus {
        background: #fff;
        outline: 0px;
      }
      &:active {
        background: #f1ecec;
      }
    }
    .item-first {
      border-radius: 10px 10px 0 0;
    }
    .item-last {
      border-radius: 0 0 10px 10px;
    }
    .item-calcel {
      margin-top: 20px;
      border: 0;
      border-radius: 10px;
    }
  }
}
/deep/ .van-icon {
  color: #c5bbbb;
  // font-size: 10px;
}
</style>

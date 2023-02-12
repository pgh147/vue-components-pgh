<template>
  <div class="scroll-con" @scroll="scrollEvent">
    <div v-if="!widthPercent" class="left" :style="{ width: cols[0].width + 'px' }">
      <div class="h-row t_head" style="width: 100%" :style="{ top: absTop + 'px' }">
        <div>{{ cols[0].title }}</div>
      </div>
      <template v-if="data && data.length > 0">
        <div
          v-for="(item, index) of data"
          :key="'s' + index"
          class="b-row-l"
          :class="{ 'hover-cls': nowHoverIndex == index + 1, drank: index % 2 == 1 }"
          :data-index="index"
          @mouseenter="hoverEvent"
          @mouseleave="hoverOverEvent"
        >
          <!-- <span class="t_body_s fix-active">{{ item[cols[0].field] }}</span> -->
          <div v-if="cols[0].slot" class="t_body_s fix-active" style="border-left: 0">
            <div>
              <slot v-if="cols[0].slot" :name="cols[0].field" :data="item"></slot>
            </div>
          </div>
          <div v-else class="t_body_s fix-active" style="border-left: 0">
            <div>
              {{ item[cols[0].field] ? item[cols[0].field] : '-' }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <div ref="scroll" class="right" :style="{ width: widthPercent ? '100%' : `calc( 100% - ${cols[0].width}px )` }">
      <div @scroll.once="scrollRightEvent">
        <!-- table头 -->
        <div class="row h-row" :style="{ top: absTop + 'px' }">
          <template v-for="(col, index) of cols">
            <div
              v-if="index > 0 || widthPercent"
              :key="index + col.field"
              class="t_head"
              :style="{
                width: (col.width + '').indexOf('%') > -1 ? col.width : col.width + 'px',
                'border-left': (widthPercent && index == 0) || !showBorderLeft ? 0 : ''
              }"
            >
              <div>
                {{ col.title }}
              </div>
            </div>
          </template>
        </div>
        <!-- table数据 -->
        <template v-if="data && data.length > 0">
          <div
            v-for="(item, index) of data"
            :key="'sr' + index"
            class="row b-row"
            :data-index="index"
            :class="{ 'hover-cls': nowHoverIndex == index + 1, drank: index % 2 == 1 }"
            @mouseenter="hoverEvent"
            @mouseleave="hoverOverEvent"
          >
            <template v-for="(col, index2) of cols">
              <div
                v-if="index2 > 0 || widthPercent"
                :key="index2 + col.field"
                :style="{ width: (col.width + '').indexOf('%') > -1 ? col.width : col.width + 'px' }"
              >
                <div
                  class="t_body_s"
                  :style="{ 'border-left': (widthPercent && index2 == 0) || !showBorderLeft ? 0 : '' }"
                >
                  <slot v-if="col.slot" :name="col.field" :data="item"></slot>
                  <div v-else>
                    {{ col.formatter ? col.formatter(item) : item[col.field] ? item[col.field] : '-' }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
        <!-- <van-empty v-else description="暂无数据">
          <template v-slot:image>
            <van-image src="/assets/image/empty.png" />
          </template>
        </van-empty> -->
      </div>
    </div>
    <van-empty v-if="!data || data.length == 0" description="暂无数据">
      <template #image>
        <!-- <van-image :src="env == 'development'?'/assets/image/empty.png':'/store-attendance/assets/image/empty.png'" /> -->
        <van-image :src="`${publicPath}/assets/image/empty.png`" />
      </template>
    </van-empty>
    <!-- <div v-else class="row">
          暂无数据
        </div> -->
  </div>
</template>

<script>
/**
 * 表格组件
 * desc:
 * input:
 *   cols:
 *   data
 *   time
 * output:
 *   无
 */
import Vue from 'vue'
// import Empty from 'vant/lib/empty'
// import 'vant/lib/empty/style'
// import Image from 'vant/lib/image'
// import 'vant/lib/image/style'
import { Empty, Image } from 'vant'
Vue.use(Empty)
Vue.use(Image)
export default {
  name: 'TableCus',
  props: {
    tableId: {
      type: String,
      require: true,
      default: ''
    },
    widthPercent: {
      type: Boolean,
      default: false
    },
    cols: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    showBorderLeft: {
      type: Boolean,
      default: true
    },
    tabType: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      nowHoverIndex: '',
      isMouseEnter: false,
      absTop: 0,
      publicPath: process.env.VUE_APP_BASE_R_URL
      // emptyImage: require('../assets/image/empty.png')
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    hoverOverEvent(e) {
      this.nowHoverIndex = ''
    },
    hoverEvent(e) {
      this.nowHoverIndex = parseInt(e.target.attributes['data-index'].nodeValue) + 1
    },
    goHoverEvent(index) {
      this.nowHoverIndex = index === 0 ? index + 1 : index ? index + 1 : ''
    },
    scrollEvent(e) {
      console.log(e.srcElement.scrollTop, 99999)
      this.absTop = e.srcElement.scrollTop
    },
    scrollRightEvent() {
      if (!this.tabType) return
      this.$sensors.track('attend_cus_mate_event', {
        field_name: this.tabType === 'week' ? '周报表点击' : '月报表点击',
        value_name: ''
      })
    }
  }
}
</script>
<style scoped lang="scss">
.t_head {
  color: #999999;
  // font-weight: bold;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  background: #f2f2f2;
  border-left: 1px solid #e2e2e2;
  // border-bottom: 1px solid #e2e2e2;
  // box-sizing: content-box;
  > div {
    width: 100%;
    white-space: unset;
    white-space: pre-wrap;
    // line-height: 15px;
    text-overflow: ellipsis;
    word-break: break-all;
  }
}

.row {
  // display: flex;
  // flex-shrink: 0;
  min-width: 100%;
  display: inline-block;
  white-space: nowrap;
  > div {
    // flex-shrink: 0;
    display: inline-block;
  }
}
div.drank {
  background: #fbfbfb;
  > div {
    background: #fbfbfb;
  }
}
div.hover-cls {
  > div {
    background: #e9eaed;
  }
  .t_body_s {
    background: #e9eaed;
  }
}
.b-row {
  // margin-top: 8px;
  background: #fff;
  // border-bottom: 1px solid #e2e2e2;
  height: 65px;
  line-height: 65px;

  > div {
    background: #fff;
    height: 100%;
    vertical-align: top;
  }
}

.b-row-l {
  // margin-top: 8px;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
  height: 65px;
  line-height: 65px;

  > div {
    background: #fff;
  }
  //   .fix-active {
  //     color: #57bcff;
  //   }
}

.t_body_s {
  line-height: 23px;
  // padding: 20px 0;
  text-align: center;
  color: #3a4058;
  display: block;
  width: 100%;
  word-wrap: break-word;
  word-break: normal;
  border-left: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  // border-bottom: 1px solid #e2e2e2;
  word-break: break-all;
  white-space: normal;
  height: 100%;
  position: relative;
  > div {
    position: absolute;
    left: 0;
    top: 50%;
    display: inline-block;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
  }
}

.scroll-con {
  display: flex;
  overflow: auto;
  height: 100%;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;
  font-size: 22px;
  position: relative;
  min-height: 213px;

  > div {
    flex-shrink: 0;
  }

  .h-row {
    position: absolute;
    z-index: 99;
    // height: 65px;
    line-height: 65px;
    background: #f2f2f2;
    border-bottom: 1px solid #e2e2e2;
  }

  .left {
    z-index: 99;
    // padding-left: 2px;
    position: relative;
    padding-top: 67px;
    .t_head:first-child {
      border-left: 0;
    }
    div {
      flex-shrink: 0;
    }
  }

  .right {
    position: relative;
    white-space: nowrap;
    overflow-y: visible;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
    z-index: 10;

    > div {
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;
      position: relative;
      white-space: pre-line;
      white-space: pre-wrap;
      white-space: break-spaces;
      padding-top: 67px;
      overflow-x: auto;
      overflow-y: hidden;
      text-align: left;
      width: 100%;
    }

    .scroll-content {
      display: inline-block;
    }
  }

  /deep/ .van-empty {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 64px 0 20px 0;
    z-index: 9;

    &__description {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
    }

    &__image {
      width: 128px;
      height: 100px;
    }
  }
  // /deep/ .van-empty__image {
  //   width: 128px;
  //   height: 100px;
  // }
}
</style>

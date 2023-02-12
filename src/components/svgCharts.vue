<template>
  <div class="progress">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 400">
      <!-- 定义渐变色 -->
      <defs v-if="showGradient">
        <linearGradient :id="gradient.id" :x1="gradient.x1" :y1="gradient.y1" :x2="gradient.x2" :y2="gradient.y2">
          <stop
            v-for="(item, index) in gradient.colorStops"
            :key="index"
            :offset="item.offset"
            :stop-color="item.color"
          />
        </linearGradient>
      </defs>
      <!-- 底部背景圆环 -->
      <circle
        cx="200"
        cy="200"
        :r="radius"
        :stroke="bgRingColor"
        :stroke-dasharray="strokeDasharray0"
        :stroke-dashoffset="strokeDashoffset0"
        :stroke-width="strokeWidth"
        fill="none"
      />
      <!-- 进度条圆环 -->
      <circle
        class="progress-bar"
        cx="200"
        cy="200"
        :r="radius"
        :stroke="showGradient ? `url(#${gradient.id})` : ringColor"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        fill="none"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset0"
      />
      <!-- 环形分割细线 -->
      <!-- <circle
        cx="200"
        cy="200"
        :r="radius"
        stroke="#071727"
        fill="transparent"
        :stroke-width="strokeWidth + 2"
        :stroke-dasharray="strokeDasharray1"
        transform="rotate(-90, 200, 200)"
      ></circle> -->
    </svg>
    <!-- 中间描述文字 -->
    <div class="progress-desc">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Progress',
  props: {
    rate: {
      type: Number,
      default: 0
    },
    bgRingColor: {
      type: String,
      default: '#25b489'
    },
    ringColor: {
      type: String,
      default: '#67C23A'
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    strokeWidth: {
      type: Number,
      default: 20
    },
    part: {
      type: Number,
      default: 20
    },
    showRate: {
      //圆环显示比例1：满圆，0.5：半圆，0.75:3/4圆
      type: Number,
      default: 0.75
    },
    startPos: {
      //圆环开始位置：0.5：正左边开始，0.38：左下角开始
      type: Number,
      default: 0.38
    },
    partGap: {
      type: Number,
      default: 12
    },
    showGradient: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Object,
      default: () => {
        return {
          id: 'svg-linear-gradient',
          x1: '0%',
          y1: '0%',
          x2: '0%',
          y2: '100%',
          colorStops: [
            {
              offset: '0%',
              color: 'yellow'
            },
            {
              offset: '100%',
              color: 'orange'
            }
          ]
        }
      }
    }
  },
  computed: {
    radius() {
      return 200 - this.strokeWidth / 2
    },
    strokeDasharray0() {
      return 2 * Math.PI * this.radius * this.showRate + ',' + 2 * Math.PI * this.radius * (1 - this.showRate)
    },
    strokeDashoffset0() {
      return -(2 * Math.PI * this.radius * this.startPos)
    },
    strokeDasharray() {
      // return 2 * Math.PI * this.radius
      let rate = this.rate
      if (rate > 1) {
        rate = 1
      } else if (rate < 0) {
        rate = 0
      }
      const length = 2 * Math.PI * this.radius * this.showRate

      return (
        length - length * (1 - rate) + ',' + (2 * Math.PI * this.radius * (1 - this.showRate) + length * (1 - rate))
      )
    },
    // strokeDashoffset() {
    //   let val = 0
    //   let rate = this.rate
    //   if (rate > 1) {
    //     rate = 1
    //   } else if (rate < 0) {
    //     rate = 0
    //   }
    //   if (this.strokeLinecap === 'round') {
    //     val = 2 * Math.PI * this.radius * (1 - rate) + this.strokeWidth
    //   } else {
    //     val = 2 * Math.PI * this.radius * (1 - rate)
    //   }
    //   return val
    // },
    strokeDasharray1() {
      var partLength = (2 * Math.PI * this.radius) / this.part
      return `${this.partGap} ${partLength - this.partGap}`
    }
  }
}
</script>
<style scoped>
.progress {
  position: relative;
  width: 100%;
  height: 100%;
}
.progress-desc {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Microsoft YaHei';
  font-size: 20px;
  text-align: center;
  width: 100%;
}
.progress-bar {
  transition: stroke-dashoffset 1s ease;
}
</style>

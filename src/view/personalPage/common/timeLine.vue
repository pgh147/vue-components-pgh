<template>
  <div class="line">
    <div v-if="timeList && timeList.length > 0">
      <div class="line-item" v-for="(item, index) of timeList" :key="item.id + '--' + index">
        <div class="line-item-header">{{ item.clockType + '：' + (item.clockTime || '-') }}</div>
        <div class="line-item-content" v-if="index != timeList.length - 1 || item.content">
          <van-icon name="location-o" v-if="item.content" />&nbsp;{{ item.content || '-' }}
        </div>
      </div>
    </div>
    <div v-else>暂无数据</div>
  </div>
</template>
<script>
export default {
  name: 'TimeLine',
  props: {
    lineData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    lineData(newVal, oldVal) {
      this.timeList = []
      newVal.forEach(element => {
        this.timeList.push(element)
      })
    }
  },
  created() {
    this.timeList = this.lineData
  },
  data() {
    return {
      timeList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  &-item {
    text-align: left;
    &-header {
      color: #333333;
      height: 34px;
      font-size: 26px;
      font-weight: bold;
      line-height: normal;
      padding-left: 30px;
      position: relative;
    }
    &-header::before {
      content: '';
      /* prettier-ignore */
      width: 5PX;
      /* prettier-ignore */
      height: 5PX;
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 0px;
      background: #999999;
      transform: translateY(-50%);
    }
    &-content {
      height: 88px;
      padding: 15px 0 0 30px;
      border-left: 1px solid #999999;
      /* prettier-ignore */
      margin-left: 2PX;

      font-size: 22px;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
    }
  }
  > div > :last-child .line-item-content {
    min-height: 40px;
    border: 0;
  }
}
</style>

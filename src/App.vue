<template>
  <div id="app">
    <div v-if="!isPc || hash.indexOf('login') >= 0 || hash.indexOf('blankPage') >= 0" class="overhidden">
      <keep-alive>
        <router-view v-if="$route.meta.setCache" />
      </keep-alive>
      <router-view v-if="!$route.meta.setCache" />
    </div>
    <div v-else style="height: 40px">
      <p class="tips">建议在手机上访问以获取更好体验</p>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/utils/common'
export default {
  name: 'App',
  data() {
    return {
      isPc: false,
      hash: window.location.hash
    }
  },
  created() {
    if (isMobile()) {
      this.isPc = false
    } else {
      this.isPc = true
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: $base-color333;
  // margin-top: 60px;
}
.tips {
  text-align: center;
}
</style>

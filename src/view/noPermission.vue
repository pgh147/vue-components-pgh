<template>
  <div style="text-align: center">请在百灵上访问...</div>
</template>
<script>
import Vue from 'vue'

export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      dialogShow: false,
      token: '',
      noPerssion: false,
      signIn: false,
      // // usercode: '201509491626203420',
      // password: '488802440',
      // // usercode: "126705166224187934",//pgh
      // usercode: '171669474535128216', // tsw
      usercode: '',
      password: '',
      corpId: 'ding1fe1756a8a80ba0effe93478753d9884'
    }
  },
  mounted() {
    console.log(this.$route, 999999)
  },
  methods: {}
}
</script>

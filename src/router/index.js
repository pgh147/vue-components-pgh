import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      component: () => import('@/view/personalPage/index.vue'),
      meta: {
        title: '打卡数据应用',
        setCache: true,
        inHistory: false
      }
    },

    {
      path: '/personalPage',
      name: 'personalPage',
      component: () => import('@/view/personalPage/index.vue'),
      meta: {
        title: '打卡数据应用',
        setCache: false,
        inHistory: false
      }
    },
    {
      path: '/domainSumPage',
      name: 'domainSumPage',
      component: () => import('@/view/domainSumPage/index.vue'),
      meta: {
        title: '打卡数据应用',
        setCache: false,
        inHistory: false
      }
    },
    {
      path: '/teamSumPage',
      name: 'teamSumPage',
      // component: () => import('@/view/teamSumPage/index.vue'),
      component: () => import('@/view/deptManagePage/index.vue'),
      meta: {
        title: '打卡数据应用',
        setCache: false,
        inHistory: false
      }
    },
    {
      path: '/deptManagePage',
      name: 'deptManagePage',
      component: () => import('@/view/deptManagePage/index.vue'),
      meta: {
        title: '打卡数据应用',
        setCache: false,
        inHistory: false
      }
    },
    {
      path: '/outEmpPage',
      name: 'outEmpPage',
      component: () => import('@/view/outEmpPage/index.vue'),
      meta: {
        title: '人员列表',
        setCache: false,
        inHistory: false
      }
    },{
      path: '/dkListPage',
      name: 'dkListPage',
      component: () => import('@/view/dkListPage/index.vue'),
      meta: {
        title: '人员列表',
        setCache: false,
        inHistory: false
      }
    },
    {
      path: "/noPermission",
      name: 'noPermission',
      component: () => import('@/view/noPermission.vue'),
      meta: {
        title: '没有访问权限',
        setCache: false,
        inHistory: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = to.query.title
  }
  next()
})

export default router
export const tableNowDate = [{
    width: '76',
    title: '姓名',
    slot: true,
    field: 'name'
  },
  {
    width: '75',
    title: '班次',
    field: 'classTimeRange'
  },
  {
    width: '76',
    title: '考勤状态',
    slot: true,
    field: 'timeResult'
  },
  {
    width: '76',
    title: '上班卡',
    field: 'onDutyCheckTime'
    //   formatter: ({
    //     manbian
    //   }) => (manbian * 100).toFixed() + '%'
  },
  {
    width: '76',
    title: '下班卡',
    field: 'offDutyCheckTime'
  },
  {
    width: '96',
    title: '打卡时长(h)',
    field: 'clockTime'
  },
  {
    width: '76',
    title: '员工状态',
    field: 'employeeStatus'
  }
]
export const tableNowDate2 = [{
    width: '76',
    title: '姓名',
    slot: true,
    field: 'name'
  },
  {
    width: '75',
    title: '班次',
    field: 'classTimeRange'
  },
  {
    width: '76',
    title: '考勤状态',
    slot: true,
    field: 'timeResult'
  },
  {
    width: '76',
    title: '上班卡',
    field: 'onDutyCheckTime'
    //   formatter: ({
    //     manbian
    //   }) => (manbian * 100).toFixed() + '%'
  },
  {
    width: '76',
    title: '下班卡',
    field: 'offDutyCheckTime'
  }, {
    width: '96',
    title: '打卡时长(h)',
    field: 'clockTime'
  }, {
    width: '76',
    title: '调店时间',
    field: 'transferDateDesc'
    //   formatter: ({
    //     check_rate
    //   }) => (check_rate * 100).toFixed() + '%'
  },
  {
    width: '150',
    title: '归属店铺',
    field: 'belongStoreName'
  },
  {
    width: '76',
    title: '员工状态',
    field: 'employeeStatus'
  }
]
export const waitToDoCols = [{
    width: '13%',
    title: '待处理',
    field: 'typeDesc'
  },
  {
    width: '24%',
    title: '日期',
    field: 'workDate'
  },
  {
    width: '50%',
    title: '处理内容',
    field: 'exceptionMsg'
  },
  {
    width: '13%',
    title: '操作',
    slot: true,
    field: 'url'
  }
]
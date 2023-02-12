export const deptCols = [{
        width: '80',
        title: '部门',
        field: 'deptName'
    },
    {
        width: '80',
        title: '总人数',
        field: 'deptTotalNum'
    },
    {
        width: '80',
        // slot: true,
        title: '应出勤',
        field: 'shouldAttendNum'
    },
    {
        width: '80',
        // slot: true,
        title: '实出勤',
        field: 'attendNum'
    },
    {
        width: '80',
        title: '出勤率',
        // slot: true,
        field: 'attendRate'
    },
    {
        width: '80',
        title: '请假',
        // slot: true,
        field: 'leaveNum'
    },
    {
        width: '80',
        title: '外出',
        // slot: true,
        field: 'goOutNum'
    },
    {
        width: '80',
        title: '未打上班卡',
        // slot: true,
        field: 'lossOnCheckNum'
    },
    {
        width: '80',
        title: '未打下班卡',
        // slot: true,
        field: 'lossOffCheckNum'
    },
    {
        width: '80',
        title: '迟到',
        // slot: true,
        field: 'lateNum'
    },
    {
        width: '80',
        title: '早退',
        // slot: true,
        field: 'earlyNum'
    },
    {
        width: '80',
        title: '旷工',
        // slot: true,
        field: 'absenteeismNum'
    }
];
export const empCols = [{
        width: '15%',
        title: '姓名',
        slot: true,
        field: 'staffName'
    },
    {
        width: '25%',
        title: '岗位',
        field: 'positionName'
    },
    {
        width: '15%',
        title: '用工类型',
        field: 'staffPropertyName'
    },
    {
        width: '15%',
        title: '签到时间',
        field: 'ondutyCheckTime'
    },
    {
        width: '15%',
        title: '签退时间',
        field: 'offdutyCheckTime'
    },
    {
        width: '15%',
        title: '考勤状态',
        field: 'url1'
    }
]
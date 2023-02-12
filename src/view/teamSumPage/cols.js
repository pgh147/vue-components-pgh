export const deptCols = [{
        width: '25%',
        title: '部门',
        field: 'deptName'
    },
    {
        width: '35%',
        title: '出勤率',
        slot: true,
        field: 'attendRate'
    },
    {
        width: '25%',
        slot: true,
        title: '实出勤/应出勤',
        field: 'shouldAttendNum'
    },
    {
        width: '15%',
        title: '总人数',
        field: 'deptTotalNum'
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
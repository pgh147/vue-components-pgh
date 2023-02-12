import {
    axiosGet,
    axiosPost
} from '@/utils/request'
import Variable from '@/assets/js/global_variable'
// /office/attend 当日考勤详情
export const getOfficeAttend = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        `/office/personal/detail/attendance`
    return axiosGet(apiName,
        params
    )
}

// /office/所有信息接口
export const getOfficeDetail = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        '/office/personal/detail'
    return axiosGet(apiName,
        params
    )
}

export const getPersonalInformation = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        '/office/personal/detail/information'
    return axiosGet(apiName,
        params
    )
}

export const getAttendanceCalendar = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        '/office/personal/detail/attendance/calendar'
    return axiosGet(apiName,
        params
    )
}

export const createGroup = (empCode, params) => {
    const apiName = Variable.gateWayPath + // + Variable.uthUrl +
        '/dingtalk-hr/change-manage/create-group?employeeCode=' + empCode
    return axiosPost(apiName,
        params
    )
}
import {
    axiosGet
} from '@/utils/request'
import Variable from '@/assets/js/global_variable'

// /office/attend 获取考勤数据
export const getOfficeAttend = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        // const apiName = Variable.baseUrl + Variable.uthUrl +
        `/office/attend`
    return axiosGet(apiName,
        params
    )
}

// /office/attend 获取考勤数据
export const getOfficeWcSj = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        // const apiName = Variable.baseUrl + Variable.uthUrl +
        `/attend/get-att-day-count`
    return axiosGet(apiName,
        params
    )
}
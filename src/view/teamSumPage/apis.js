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

// /office/sub-unit获取子组织
export const getOfficeSubUnit = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        '/office/sub-unit'
    return axiosGet(apiName,
        params
    )
}

export const getDynamicOfficeSubUnit = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        'dynamic/office/sub-unit'
    return axiosGet(apiName,
        params
    )
}

export const getDynamicOfficeAttend = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        // const apiName = Variable.baseUrl + Variable.uthUrl +
        `dynamic/office/attend`
    return axiosGet(apiName,
        params
    )
}
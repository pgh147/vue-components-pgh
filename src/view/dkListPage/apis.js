import {
    axiosPost,
    axiosGet
} from '@/utils/request'
import Variable from '@/assets/js/global_variable'

// 获取公司打卡人员接口
export const getOfficeInsideCheckDetail = params => {
    const apiName = Variable.gateWUrl +
        `/office/inside/check/detail`
    return axiosGet(apiName,
        params
    )
}
// 获取公司打卡人员接口
export const getOfficeInsideCheck = params => {
    const apiName = Variable.gateWUrl +
        `/office/inside/check`
    return axiosGet(apiName,
        params
    )
}
// 获取公司打卡人员接口  -导出
export const getOfficeInsideCheckExport = params => {
    const apiName = Variable.gateWUrl +
        `/office/inside/check/export`
    return axiosGet(apiName,
        params
    )
}





// 获取外勤打卡人员接口
export const getOfficeOutsideCheckDetail = params => {
    const apiName = Variable.gateWUrl +
        `/office/outside/check/detail`
    return axiosGet(apiName,
        params
    )
}
// 获取外勤打卡人员接口
export const getOfficeOutsideCheck = params => {
    const apiName = Variable.gateWUrl +
        `/office/outside/check`
    return axiosGet(apiName,
        params
    )
}
// 获取外勤打卡人员接口  -导出
export const getOfficeOutsideCheckExport = params => {
    const apiName = Variable.gateWUrl +
        `/office/outside/check/export`
    return axiosGet(apiName,
        params
    )
}



// 获取未打卡人员接口
export const getOfficeLossCheck = params => {
    const apiName = Variable.gateWUrl +
        `/office/loss/check`
    return axiosGet(apiName,
        params
    )
}
// 获取未打卡人员接口
export const getOfficeLossCheckDetail = params => {
    const apiName = Variable.gateWUrl +
        `/office/loss/check/detail`
    return axiosGet(apiName,
        params
    )
}
// 获取未打卡人员接口--导出
export const getOfficeLossCheckExport = params => {
    const apiName = Variable.gateWUrl +
        `/office/loss/check/export`
    return axiosGet(apiName,
        params
    )
}
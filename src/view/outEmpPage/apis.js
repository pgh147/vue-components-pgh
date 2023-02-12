import {
    axiosPost
} from '@/utils/request'
import Variable from '@/assets/js/global_variable'

// 获取人员接口
export const getOfficeAttend = params => {
    const apiName = Variable.gateWUrl + // + Variable.uthUrl +
        // const apiName = Variable.baseUrl + Variable.uthUrl +
        `/attend/get-att-day-count-page`
    return axiosPost(apiName,
        params
    )
}

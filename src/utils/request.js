import axios from './axios-do'
import qs from 'qs'

export function axiosPost(url, params = {}, needDDLogind = true) {
    return new Promise((resolve, reject) => {
        handleLoading(true)
        const path = apiname.indexOf('/api?') !== -1 ? url + apiname : apiname
        axios.post(path, parameters, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': Authorization
                }
            })
            .then(res => {
                handleLoading(false)
                resolve(res.data)
            }).catch(err => {
                handleLoading(false)
                reject(err)
            })
    })
}
export function axiosGet(apiname, param, needDDLogind = true) {
    return new Promise((resolve, reject) => {
        handleLoading(false)
        const path = apiname.indexOf('/api?') !== -1 ? url + apiname : apiname
        if (param) {
            axios.get(path, param)
                .then(res => {
                    handleLoading(false)
                    resolve(res.data)
                }).catch(err => {
                    handleLoading(false)
                    reject(err)
                })
        } else {
            axios.get(path)
                .then(res => {
                    handleLoading(false)
                    resolve(res.data)
                }).catch(err => {
                    handleLoading(false)
                    reject(err)
                })
        }
    })
}
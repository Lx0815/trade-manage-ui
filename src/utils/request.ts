import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {ElMessage} from "element-plus"
import {useRouter} from "vue-router";

export interface Response<T> extends AxiosResponse {
    code: string
    data: T
    message: string
}

const service: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000000000,
    withCredentials: true
})

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {

        // const token = Vue.ls.get(ACCESS_TOKEN)
        // if (token) {
        //     config.headers['Authorization'] = 'Bearer ' + token
        // }

        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // if (config.headers.isJwt) {
        // const token = localStorage.getItem('ACCESS_TOKEN')
        // if (config.headers != undefined && token) {
        //     config.headers.Authorization = 'Bearer ' + token
        // }
        // }
        // config.headers = {
        //     'Cookie': "TestCookie=123456789"
        // }
        return config
    },
    (error: any) => {
        console.log(error)
    },
)


// 响应拦截器
service.interceptors.response.use(
    // 请求成功
    (response: AxiosResponse) => {
        // if (res.headers.authorization) {
        //     localStorage.setItem('id_token', res.headers.authorization);
        // } else {
        //     if (res.data && res.data.token) {
        //         localStorage.setItem('id_token', res.data.token);
        //     }
        // }

        if (response.status === 200) {
            // return Promise.resolve(response.data);

            return response
        } else {
            errorHandle(response)
            // return Promise.reject(response.data);
            return response
        }
    },
    // 请求失败
    (error: any) => {
        console.log('error: ' + error)
        const {response} = error
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response)
            return Promise.reject(response)
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            ElMessage.warning('网络连接异常,请稍后再试!')
        }
    }
)

/**
 * http握手错误
 * @param res 响应回调,根据不同响应进行不同操作
 */
function errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
        case 401:
            break;
        case 403:
            break;
        case 404:
            ElMessage.warning('请求的资源不存在');
            break;
        default:
            ElMessage({
                message: '服务器异常',
                type: 'error',
                duration: 5 * 1000
            })
    }
}

export const SUCCESS_CODE = "00000"
export const FAIL_CODE = "B0001"
export const NOT_LOGIN = "A0302"

export default service

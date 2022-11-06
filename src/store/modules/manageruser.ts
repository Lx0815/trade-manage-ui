import {ManagerUser, LoginInfo} from "@/pojo/manageruser"
import {checkUsernameIsExist, exit, login} from "@/api/manageruser"
import {Module} from "vuex"
import {AxiosResponse} from "axios"
import {FAIL_CODE, Response, SUCCESS_CODE} from "@/utils/request"
import {GlobalDataState} from "@/store";
import {ElMessage} from "element-plus";

export type managerUserState = {
    user: ManagerUser,
    usernameIsExist: boolean
}

export const managerUserStore: Module<managerUserState, GlobalDataState> = {
    namespaced: true,
    state: (): managerUserState => ({
        user: new ManagerUser(),
        usernameIsExist: false
    }),

    getters: {
        loginInfo: (state: managerUserState): ManagerUser => {
            return state.user
        },
        usernameIsExist: (state: managerUserState): boolean => {
            return state.usernameIsExist
        }
    },

    mutations: {
        SER_USER(state: managerUserState, user: ManagerUser): void {
            state.user = user
        },
        SET_USERNAME_EXIST(state: managerUserState, isExist: boolean): void {
            state.usernameIsExist = isExist
        },
        DELETE_USER(state: managerUserState): void {
            state.user = new ManagerUser()
        }
    },

    actions: {

        login({commit}, userInfo: LoginInfo) {
            return new Promise<void>((resolve, reject) => {
                login(userInfo).then((response: AxiosResponse<Response<ManagerUser>>) => {
                    if (response.data.code == SUCCESS_CODE) {
                        commit('SER_USER', response.data.data)
                        ElMessage({
                            type: 'success',
                            message: '登录成功'
                        })
                        resolve()
                    } else {
                        ElMessage({
                            type: 'error',
                            message: response.data.message
                        })
                        reject("登陆失败")
                    }
                }).catch(error => {
                    console.dir(error)
                    reject(error)
                })
            })
        },

        checkUsername({commit}, username: string) {
            return new Promise<void>((resolve, reject) => {
                checkUsernameIsExist(username)
                    .then((response: AxiosResponse<Response<any>>) => {
                        if (response.data.code == SUCCESS_CODE) {
                            commit('SET_USERNAME_EXIST', false)
                        } else if (response.data.code == FAIL_CODE) {
                            commit('SET_USERNAME_EXIST', true)
                        }
                        resolve()
                    })
                    .catch((error) => {
                        console.dir(error)
                        reject(error)
                    })
            })
        },

        exitLogin({commit}, userId: number) {
            return new Promise<void>((resolve, reject) => {
                exit().then((response: AxiosResponse<Response<any>>) => {
                    if (response.data.code == SUCCESS_CODE) {
                        commit('DELETE_USER')
                    }
                    resolve()
                })
                    .catch((error) => {
                        console.dir(error)
                        reject(error)
                    })
            })
        }
    }
}

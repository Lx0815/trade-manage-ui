import request from '@/utils/request'
import { LoginInfo } from "@/pojo/manageruser"

export function login(user: LoginInfo) {
    return request({
        url: '/manager/manageruser/login',
        method: 'POST',
        data: {
            user: {
                username: user.username,
                password: user.password
            },
            captcha: user.captcha,
        },
    })
}


export function checkUsernameIsExist(username: string) {
    return request({
        url: `/manager/manageruser/check/username/${username}`,
        method: 'GET',
    })
}


export function exit() {
    return request({
        url: '/manager/manageruser/exit',
        method: 'DELETE'
    })
}

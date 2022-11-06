import request from "@/utils/request"

export function getCaptchaImage() {
    return request({
        url: '/common/captcha',
        method: 'POST',
    })
}

import request from '@/utils/request'

export function fetchSchools() {
    return request({
        url: '/manager/schools',
        method: 'GET'
    })
}

export function fetchSchoolsByKeyWord(keyWord: string) {
    return request({
        url: `/manager/schools/${keyWord}`,
        method: 'GET'
    })
}

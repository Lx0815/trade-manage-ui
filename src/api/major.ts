import request from '@/utils/request'


export function fetchMajorsByKeyword(keyword: string) {
    return request({
        url: `/manager/majors/${keyword}`,
        method: 'GET'
    })
}
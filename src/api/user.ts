import request from '@/utils/request'
import {User, UserDetail, UserFilter} from "@/pojo/user";

export function fetchAllUser() {
    return request({
        url: '/manager/users',
        method: 'GET',
    })
}


export function fetchUserDetail(userId: number) {
    return request({
        url: `/manager/user/detail/${userId}`,
        method: 'GET'
    })
}


export function fetchUserByUserFilter(userFilter: UserFilter) {
    return request({
        url: '/manager/users/filter',
        method: 'GET',
        params: userFilter
    })
}

export function addOneUser(user: User, userDetail: UserDetail) {
    return request({
        url: '/manager/user',
        method: 'POST',
        data: {
            user,
            userDetail
        }
    })
}

export function deleteUser(user: User) {
    return request({
        url: `/manager/user/${user.id}`,
        method: 'DELETE',
    })
}

export function deleteUsers(ids: number[]) {
    return request({
        url: 'manager/users',
        method: 'DELETE',
        data: {
            ids,
        }
    })
}

export function editOneUser(user: User) {
    return request({
        url: '/manager/user',
        method: 'PATCH',
        data: user,
    })
}

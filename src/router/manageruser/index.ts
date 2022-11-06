import { RouteRecordRaw } from "vue-router"

export const userRouter: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/index.vue')
    }
]

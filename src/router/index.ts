import {
    createRouter,
    createWebHashHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteRecordRaw
} from "vue-router"
import {userRouter} from './manageruser'
import {store} from '@/store'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/home',
        name: 'index',
        component: () => import('@/views/home/index.vue')
    },
    ...userRouter
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export let excludeLoginInterceptor: string[] = ['/login']
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    if (excludeLoginInterceptor.includes(to.path)
            || store?.getters["managerUser/loginInfo"].id > 0) {
        next()
    } else {
        next({path: '/login'})
    }
})


export default router

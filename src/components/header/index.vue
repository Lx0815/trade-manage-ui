<template>

    <el-menu :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
             :ellipsis="false"
            @select="handleSelect">
        <span id="logo-span">校园交易后台管理</span>

        <div class="flex-grow" />

        <el-sub-menu index="1">
            <template #title>
                <el-icon><Avatar/></el-icon>
            </template>
            <el-menu-item index="1-1">个人中心</el-menu-item>
            <el-menu-item @click="handlerExitLogin" index="1-2">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {Avatar} from '@element-plus/icons-vue'
import {useStore} from '@/store'
import {useRouter} from 'vue-router'
import {ElMessage} from "element-plus";
const store = useStore()
const router = useRouter()

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handlerExitLogin = () => {
    store.dispatch('managerUser/exitLogin')
        .then(() => {
            router.push({path: '/login'})
        })
        .catch((error) => {
            ElMessage({
                type: 'error',
                message: '服务器繁忙，退出登录失败'
            })
        })
}
</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}

.el-menu {
    height: 100%;
}

#logo-span {
    font-size: 2em;
    font-family: 黑体, system-ui;
}
</style>

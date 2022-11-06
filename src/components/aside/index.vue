<template>

    <el-menu
        default-active="1"
        class="el-menu--vertical-demo">

        <el-menu-item index="1" @click="$emit('changeView', 1)">
            <el-icon><HomeFilled /></el-icon>
            <template #title>
                主页
            </template>
        </el-menu-item>

        <el-menu-item index="2" @click="$emit('changeView', 2)">
            <el-icon><User /></el-icon>
            <template #title>
                用户管理
            </template>
        </el-menu-item>


    </el-menu>

</template>

<script setup lang="ts">
import { HomeFilled, User } from '@element-plus/icons-vue'

defineEmits([
    'changeView'
])
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
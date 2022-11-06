<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header/>
            </el-header>

            <el-container>
                <el-aside width="200px">

                    <Aside @change-view="changeElMain"/>

                </el-aside>

                <el-main>


                    <KeepAlive>
                        <component :is="currentComponent" :key="currentIndex"/>
                    </KeepAlive>


                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue'
import Aside from '@/components/aside/index.vue'
import Main from '@/components/main/index.vue'
import UserManager from '@/components/user/manager/index.vue'
import {ref, shallowRef} from 'vue'

const components = [
    Main,
    UserManager
]
let currentComponent = shallowRef(Main)
let currentIndex = ref<number>(0)

const changeElMain = (componentIndex: number): void => {
    currentComponent.value = components[componentIndex - 1]
    currentIndex.value = componentIndex - 1
}

</script>

<style scoped>
.el-header {
    height: 50px;
}
</style>
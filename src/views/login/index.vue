<template>
    <div class="common-layout">
        <el-container>
            <el-header></el-header>
            <el-main>

                <!--        <div  id="titleText">-->
                <!--          <span>欢迎使用普惠后台管理系统</span>-->
                <!--        </div>-->

                <div class="radius" :style="{borderRadius: 'var(--el-border-radius-round)'}">

                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="70px"
                             class="demo-ruleForm">

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username" type="text" autocomplete="off" size="large"/>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" type="password" autocomplete="off" size="large"
                                      show-password/>
                        </el-form-item>

                        <el-form-item label="验证码" prop="captcha">
                            <el-input v-model="ruleForm.captcha" :style="{width: 160 + 'px'}"/>
                            <el-image :style="{width: '150px', height: '33px'}" :src="captchaImage"
                                      fit="contain" @click="changeCaptchaImage()"></el-image>
                        </el-form-item>

                        <el-form-item>
                            <el-button :loading="loginBtnLoading" type="primary" @click="submitForm(ruleFormRef)">登录
                            </el-button>
                        </el-form-item>
                    </el-form>

                </div>

            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import {useStore} from '@/store'
import {useRouter} from "vue-router"
import {getCaptchaImage} from "@/api/capthca"
import {AxiosResponse} from "axios"

let captchaImage = ref()
let loginBtnLoading = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const store = useStore()
const router = useRouter()

const checkCaptcha = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入验证码'))
    }
    callback()
}
const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    }
    // if (! asyncCheckUsernameIsExits(value)) {
    //     callback(new Error('用户名已被使用'))
    // }
    callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    }
    callback()
}

const ruleForm = reactive({
    username: '',
    password: '',
    captcha: '',
})

const rules = reactive({
    username: [{validator: validateUsername, trigger: 'blur'}],
    password: [{validator: validatePassword, trigger: 'blur'}],
    captcha: [{validator: checkCaptcha, trigger: 'blur'}],
})


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            loginBtnLoading.value = true

            store.dispatch('managerUser/login', {username: ruleForm.username, password: ruleForm.password, captcha: ruleForm.captcha})
                .then(() => {
                    loginBtnLoading.value = false
                    router.push({name: 'index'})
                }, () => {
                    loginBtnLoading.value = false
                })
                .catch((error) => {
                    console.dir(error)
                    loginBtnLoading.value = false
                })
        } else {
            console.log('error submit!')
            return false
        }
    })
}


const asyncCheckUsernameIsExits = (username: string): boolean => {
    store.dispatch('managerUser/checkUsername', username)
        .then(() => {
            console.log('用户名查询成功')
        })
        .catch((error) => {
            console.dir(error)
        })
    return store.getters["managerUser/usernameIsExist"]
}

const changeCaptchaImage = (): void => {
    getCaptchaImage().then((res: AxiosResponse) => {
        captchaImage.value = 'data:image/jpeg;base64,' + res.data.data.toString()
    })
}

onMounted(() => {
    // 获取图片验证码
    changeCaptchaImage()
})


</script>

<style scoped>
.common-layout,
.el-container {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/loginBackground.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

}

.el-header {
    height: 40px;
}

.el-footer {
    height: 60px;
    width: 100%;
}

.el-main {
    width: 100%;
}

.radius {
    height: 60%;
    width: 30%;
    border: 1px solid var(--el-border-color);
    border-radius: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 10px;
}

.el-form {
    margin: auto;
    width: 80%;
    height: 33%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

#titleText {
    font-size: 3em;
    width: 17%;
    margin: auto;
    position: absolute;
    top: 80px;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>

import { createApp } from 'vue'
import App from './App.vue'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// router
import router from './router'
// vuex
import {key, store} from '@/store'

let app = createApp(App);


app.use(ElementPlus, {
    locale: zhCn
})


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store, key)
app.use(router)
app.mount('#app')

import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })
  vueApp.use(ElementPlus, {
    locale: zhCn,
  })
})

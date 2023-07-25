<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { adviceList, serviceList } from '~/utils/jiaofei'

useHead(() => {
  return {
    title: '缴费专辑',
    meta: [
      { name: 'description', content: 'EasyAPI服务市场为您提供各类缴费类接口，欢迎在线咨询，并开通使用。' },
      { name: 'keyword', content: '话费充值API,游戏充值API,水电煤API,加油卡API' },
    ],
  }
})
</script>

<template>
  <div>
    <div class="top">
      <Header class="no-bg" />
    </div>
    <div class="banner">
      <p>充值缴费API集合</p>
      <div class="banner-text">
        专注为金融、快消品、手机3C、农产品、美妆等行业电商、综合性电商、区域电商网站，移动APP，微
        <br>
        信公众号，第三方支付平台等提供话费充值、流量充值、生活缴费、票务购买、加油卡充值等数字产品API接入服务。
      </div>
    </div>
    <div class="main">
      <div class="jiaofei-wrapper">
        <h2 class="my-16 text-center text-2xl">
          我们的服务
        </h2>
        <div class="flex sm:flex-wrap sm:justify-between sm:flex-row flex-col">
          <div v-for="(item, key) in serviceList" :key="key" class="jiaofei-list">
            <div>
              <img :src="item.icon" alt="图片加载中...">
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <span>{{ item.subtitle1 }}</span>
              <span>{{ item.subtitle2 }}</span>
            </div>
            <div>
              <label class="pointer">立即使用</label>
            </div>
          </div>
        </div>
        <h2 class="my-16 text-center text-2xl">
          我们的优势
        </h2>
        <div class="flex sm:flex-wrap sm:justify-between sm:flex-row flex-col">
          <div v-for="(item, key) in adviceList" :key="key" class="jiao-us-advan">
            <div>
              <img :src="item.icon" alt="图片加载中...">
            </div>
            <div>
              {{ item.title }}
            </div>
            <div>
              {{ item.subtitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import "pages/jiaofei/index.scss";
</style>

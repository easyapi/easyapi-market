<script setup lang="ts">
import { reactive } from 'vue'
import Footer from '~/components/Footer'

const data = reactive({
  imgList: [{
    href: 'https://withdraw.easyapi.com',
    src: 'https://qiniu.easyapi.com/scene/withdraw.png',
    title: '快速提现',
  },
  {
    href: 'https://shop.easyapi.com',
    src: 'https://qiniu.easyapi.com/scene/shop.png',
    title: '微商城',
  },
  {
    href: 'https://fapiao.easyapi.com',
    src: 'https://qiniu.easyapi.com/scene/invoice.png',
    title: '发票管理',
  },
  ],
})
</script>

<template>
  <div>
    <Header />
    <div class="main">
      <div class="flex flex-wrap md:justify-between justify-center">
        <div v-for="(item, index) in data.imgList" :key="index" class="scene-card">
          <a :href="item.href" class="img" target="_blank">
            <div>
              <img :src="item.src" alt="图片加载中...">
            </div>
            <span>{{ item.title }}</span>
          </a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import 'pages/scene/index.scss';
</style>

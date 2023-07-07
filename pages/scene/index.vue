<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Footer from '~/components/Footer'
import { sceneList } from '~/utils/scene'

useHead(() => {
  return {
    title: '场景化服务',
    meta: [
      {
        name: 'description',
        content: 'EasyAPI服务市场为您提供各类场景化服务接口，例如类似有赞、微盟的微商城全套接口，您企业的非核心模块，EasyAPI都可以为您提供。',
      },
      {
        name: 'keyword',
        content:
          '会员营销API接口,快速提现API接口,广告管家API接口,签到打开API接口,微商城API接口,积分商城API接口,电子发票API接口,工单系统API接口,抽奖活动API接口',
      },
    ],
  }
})
</script>

<template>
  <div>
    <Header />
    <div class="main">
      <div class="flex flex-wrap md:justify-between justify-center">
        <div v-for="(item, index) in sceneList" :key="index" class="scene-card">
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

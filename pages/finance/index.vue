<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { serviceList, typeList } from '~/utils/finance'

useHead(() => {
  return {
    title: '金融专辑',
    meta: [
      { name: 'description', content: 'EasyAPI服务市场为您提供各类泛金融类接口，欢迎在线咨询，并开通使用。' },
      { name: 'keyword', content: '证件识别,银行卡类别,企业工商数据,银行卡四元素校验,三网手机实名认证' },
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
      <p>海量泛金融API服务</p>
      <div class="banner-text">
        适用多场景金融征信服务，权威数据。身份/银行卡认证，
        <br>
        识别功能，企业信息，股票查询等API服务
      </div>
    </div>
    <div class="main">
      <div class="finance-wrapper">
        <div class="flex flex-wrap justify-between">
          <div v-for="(item, index) in typeList" :key="index" class="finance-top-list">
            <div>
              <img :src="item.img" alt="图片加载中...">
            </div>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <h2 class="my-12 text-center text-2xl">
        相关API推荐
      </h2>
      <div class="flex flex-wrap justify-between pd-20">
        <div v-for="(item, index) in serviceList" :key="index" class="finance-rl-inner">
          <div>
            <img :src="item.img" alt="图片加载中...">
          </div>
          <div>
            <span>{{ item.title }}</span>
            <label>{{ item.money }}</label>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import "pages/finance/index.scss";
</style>

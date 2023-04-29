<script setup lang="ts">
import { reactive } from 'vue'
import { qiniuUrl } from '~/api/api'

const data = reactive({
  dataList: [{
    img: `${qiniuUrl}/market/finance/individual-risk.png`,
    title: '个人风控数据',
  }, {
    img: `${qiniuUrl}/market/finance/portrayal.png`,
    title: '用户画像数据',
  }, {
    img: `${qiniuUrl}/market/finance/enterprise.png`,
    title: '企业相关数据',
  }, {
    img: `${qiniuUrl}/market/finance/risk.png`,
    title: '金融风控数据 ',
  }],
  apiDataList: [{
    img: `${qiniuUrl}/withdraw.png`,
    title: '身份证OCR识别',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '身份证实名认证',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '运营商三要素',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '金融反欺诈',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '三网手机实名认证',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}//ip.png`,
    title: '银行卡三元素校验',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '银行卡四元素校验',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '证件识别',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '企业工商数据',
    money: '￥0.15/次',
  }, {
    img: `${qiniuUrl}/withdraw.png`,
    title: '银行卡类别',
    money: '￥0.15/次',
  }],
})

useHead(() => {
  return {
    title: '金融专辑 - EasyAPI服务市场',
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
          <div v-for="(item, index) in data.dataList" :key="index" class="finance-top-list">
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
        <div v-for="(item, index) in data.apiDataList" :key="index" class="finance-rl-inner">
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

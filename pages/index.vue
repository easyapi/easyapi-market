<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="service-market">
        <Category></Category>
        <div class="service-market-right">
          <a href="https://www.easyapi.com" target="_blank">
            <img src="https://qiniu.easyapi.com/market/ad/easyapi.png" alt />
          </a>
        </div>
      </div>

      <div class="recommend-service">
        <div class="recommend-service-title">
          <span class="border"></span>
          <span>推荐服务</span>
        </div>
        <div class="recommend-service-con">
          <div class="col" v-for="(item, index) in recommendServiceList" :key="index">
            <nuxt-link :to="{ name: 'service-id', params: { id: item.serviceId } }">
              <p class="img">
                <img v-bind:src="item.img" alt />
              </p>
              <p class="text">{{ item.name }}</p>
              <p class="price" v-if="item.type === 1">免费</p>
              <p class="price" v-if="item.type === 2">￥{{ item.unitPrice }}/次</p>
              <p class="price" v-if="item.type === 3">￥{{ item.unitPrice }}/月</p>
              <p class="price" v-if="item.type === 4">按需</p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="newest-update">
        <div class="newest-update-title">
          <span class="border"></span>
          <span>最新更新</span>
        </div>
        <div class="newest-update-con-top">
          <div class="newest-update-con-left">
            <div class="row">
              <div class="col" v-for="(item, index) in newestServiceList" :key="item.serviceId">
                <nuxt-link class="col-item flex-c" v-if="index < 8" :to="{ name: 'service-id', params: { id: item.serviceId } }">
                  <p class="img">
                    <img v-bind:src="item.img" alt />
                  </p>
                  <p class="text">{{ item.name }}</p>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="newest-update-con-right">
            <div class="row flex justify-between">
              <div>
                <span class="more-state">更多动态</span>
              </div>
              <div>
                <a href="https://www.easyapi.com/post/" target="_blank" class="more">更多</a>
              </div>
            </div>
            <div class="row-con" v-for="(item, index) in list" :key="index">
              <div>
                <span class="circle"></span>
                <span class="circle-con">
                  <a :href="'https://www.easyapi.com/post/' + item.articleId" target="_blank">{{ item.title }}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="newest-update-con-bottom">
          <span class="scenarioServices">
            <nuxt-link to="/scene">场景化服务</nuxt-link>
          </span>
          <span class="paymentAlbum">
            <nuxt-link to="/jiaofei">缴费专辑</nuxt-link>
          </span>
          <span class="financialAlbum">
            <nuxt-link to="/finance">金融专辑</nuxt-link>
          </span>
          <span class="clickInvoice">
            <a target="_blank" href="https://fapiao.easyapi.com">电子发票</a>
          </span>
        </div>
      </div>

      <div class="join-market">
        <div class="join-market-title">
          <span class="border"></span>
          <span>加入市场</span>
        </div>
        <div class="join-market-con">
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_time.png" alt />
              </div>
              <div>
                <p class="text">提升开发效率</p>
                <p class="join-market-text">提供统一风格接口服务</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_money.png" alt />
              </div>
              <div>
                <p class="text">服务转化收益</p>
                <p class="join-market-text">把您的服务共享出来</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_earth.png" alt />
              </div>
              <div>
                <p class="text">繁荣数据生态</p>
                <p class="join-market-text">喂养数据，制造生态</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_feedback.png" alt />
              </div>
              <div>
                <p class="text">让世界拥抱API</p>
                <p class="join-market-text">让一切服务通过API相连</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Index from './index.js'

export default Index
</script>

<template>
  <div>
    <div class='top'>
      <Header class='no-bg'></Header>
    </div>
    <div class='banner'>
      <p>海量泛金融API服务</p>
      <div class='banner-text'>
        适用多场景金融征信服务，权威数据。身份/银行卡认证，
        <br />识别功能，企业信息，股票查询等API服务
      </div>
    </div>
    <div class='main'>
      <div class='finance-wrapper'>
        <div class='flex flex-wrap justify-between'>
          <div class='finance-top-list' v-for='(item,index) in dataList' :key='index'>
            <div>
              <img :src='item.img' alt='图片加载中...' />
            </div>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <h2 class='my-12 text-center text-2xl'>相关API推荐</h2>
      <div class='flex flex-wrap justify-between'>
        <div class='finance-rl-inner' v-for='(item,index) in apiDataList' :key='index'>
          <div>
            <img :src='item.img' alt='图片加载中...' />
          </div>
          <div>
            <span>{{ item.title }}</span>
            <label>{{ item.money }}</label>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>

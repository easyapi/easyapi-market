<template>
  <div>
    <div class='top'>
      <Header class='no-bg'></Header>
    </div>
    <div class='banner'>
      <p>充值缴费API集合</p>
      <div class='banner-text'>
        专注为金融、快消品、手机3C、农产品、美妆等行业电商、综合性电商、区域电商网站，移动APP，微 <br />
        信公众号，第三方支付平台等提供话费充值、流量充值、生活缴费、票务购买、加油卡充值等数字产品API接入服务。
      </div>
    </div>
    <div class='main'>
      <div class='jiaofei-wrapper'>
        <h2 class='my-16 text-center text-2xl'>我们的服务</h2>
        <div class='flex flex-wrap justify-between'>
          <div class='jiaofei-list' v-for='(item,key) in serviceList' :key='key'>
            <div>
              <img :src='item.icon' alt='图片加载中...' />
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <span>{{ item.subtitle1 }}</span>
              <span>{{ item.subtitle2 }}</span>
            </div>
            <div>
              <label class='pointer'>立即使用</label>
            </div>
          </div>
        </div>
        <h2 class='my-16 text-center text-2xl'>我们的优势</h2>
        <div class='flex flex-wrap justify-between'>
          <div class='jiao-us-advan' v-for='(item,key) in adviceList' :key='key'>
            <div>
              <img :src='item.icon' alt='图片加载中...' />
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
    <Footer></Footer>
  </div>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>

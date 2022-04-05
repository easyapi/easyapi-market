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
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { qiniuUrl } from '../api/api'

export default {
  name: 'jiaofei',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      serviceList: [
        {
          icon: `${qiniuUrl}/market/jiaofei/communication.png`,
          title: '通讯业务',
          subtitle1: '话费充值',
          subtitle2: '宽带充值'
        },
        {
          icon: `${qiniuUrl}/market/jiaofei/game.png`,

          title: '游戏充值',
          subtitle1: '网络游戏',
          subtitle2: '手机游戏'
        },
        {
          icon: `${qiniuUrl}/market/jiaofei/payment.png`,
          title: '生活缴费',
          subtitle1: '水电煤',
          subtitle2: '加油卡'
        }
      ],
      adviceList: [
        {
          icon: `${qiniuUrl}/market/jiaofei/api.png`,
          title: 'API充值',
          subtitle: '无需提前充值，通过EasyAPI充值API接口，随充随用，不占用资金'

        },
        {
          icon: `${qiniuUrl}/market/jiaofei/goods.png`,
          title: '货源稳定',
          subtitle: '海量优质货源供应，众多供应商后台随机切换，保障货源稳定'

        },
        {
          icon: `${qiniuUrl}/market/jiaofei/others.png`,
          title: '其他',
          subtitle: '如果您需要更多其他充值缴费相关，请联系我们'
        }
      ]
    }
  },
  head() {
    return {
      title: '缴费专辑 - EasyAPI服务市场',
      meta: [
        { hid: 'description', name: 'description', content: 'EasyAPI服务市场为您提供各类缴费类接口，欢迎在线咨询，并开通使用。' },
        { hid: 'keyword', name: 'keyword', content: '话费充值API,游戏充值API,水电煤API,加油卡API' }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.top .header .header-service-center {
  border-left: 0 !important;
}

.top .header .header-market {
  border-right: 0 !important;
}

.top .header #showTeamInfo {
  border: 0 !important;
}

.banner {
  width: 100%;
  height: 365px;
  background-image: url('https://qiniu.easyapi.com/market/bg_jiaofei_banner.png');
  background-size: cover;

  p {
    font-size: 36px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    padding-top: 133px;
    text-align: center;
  }

  .banner-text {
    width: 830px;
    height: 53px;
    font-size: 16px;
    text-align: center;
    margin: 24px auto 0 auto;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 34px;
  }
}

.pointer {
  cursor: pointer;
}

.no-bg {
  margin-bottom: 0 !important;
  background: transparent !important;
  position: absolute !important;
  width: 100%;
}

.img {
  display: block;
}

.jiaofei-list {
  width: 338px;
  padding: 51px 0 0;
  border: 1px solid #ddd;
}

.jiaofei-list img {
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background-color: white;
  border-radius: 100%;
}

.jiaofei-list h3 {
  font-size: 24px;
  color: #333;
  text-align: center;
}

.jiaofei-list div:nth-child(1) {
  margin-bottom: 33px;
}

.jiaofei-list div:nth-child(2) {
  padding-bottom: 35px;
}

.jiaofei-list div:nth-child(3) {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  text-align: center;
}

.jiaofei-list div:nth-child(2) span {
  display: block;
  margin-top: 13px;
  color: #999;
  font-size: 18px;
  text-align: center;
}

.jiaofei-list label {
  display: block;
  height: 100%;
  color: #00b2c8;
  background: #fff no-repeat 289px 23px;
  background-size: 17px auto;
}

.jiaofei-list:hover {
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 1, 0, 0.1);
}

.jiaofei-list:hover label {
  background: #00b2c8 url(../assets/images/arrow-right.png) no-repeat;
  background-position: right 23px bottom 23px;
  color: #fff;
}

.jiao-us-advan {
  width: 338px;
  padding: 51px 55px 66px;
  border: 1px solid #ddd;
}

.jiao-us-advan div:nth-child(1) {
  margin-bottom: 16px;
}

.jiao-us-advan div:nth-child(2) {
  margin-bottom: 18px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

.jiao-us-advan div:nth-child(3) {
  text-align: center;
  font-size: 18px;
  color: #999;
  line-height: 33px;
}

.jiao-us-advan div:nth-child(1) img {
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background-color: #EAFDFF;
  border-radius: 100%;
}
</style>

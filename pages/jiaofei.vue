<template>
  <div>
    <div class="top">
      <Header class="no-bg"></Header>
    </div>
    <div class="banner">
      <p>充值缴费API集合</p>
      <div class="banner-text">
        专注为金融、快消品、手机3C、农产品、美妆等行业电商、综合性电商、区域电商网站，移动APP，微 <br/>
        信公众号，第三方支付平台等提供话费充值、流量充值、生活缴费、票务购买、加油卡充值等数字产品API接入服务。
      </div>
    </div>
    <div class="container">

      <div class='jiaofei-wrapper'>
        <TitleMid>我们的服务</TitleMid>
        <DivListWrap>
          <div class='jiaofei-list' v-for="(item,key) in serviceList" :key="key">
            <div>
              <img :src="item.icon" alt="图片加载中..."/>
            </div>
            <div>
              <h3>{{item.title}}</h3>
              <span>{{item.freeSay}}</span>
              <span>{{item.flow}}</span>
              <span>{{item.network}}</span>
            </div>
            <div>
              <label class="pointer">免费试用</label>
            </div>
          </div>
        </DivListWrap>

        <TitleMid>我们的优势</TitleMid>
        <DivListWrap>
          <div class='jiao-us-advan' v-for="(item,key) in adviceList" :key="key">
            <div>
              <img :src="item.icon" alt="图片加载中..."/>
            </div>
            <div>
              {{item.title}}
            </div>
            <div>
              {{item.freeSay}}
            </div>
          </div>

        </DivListWrap>

      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import DivListWrap from '~/components/layout/divListWrap'
  import TitleMid from '~/components/layout/titleMid'

  export default {
    name: 'jiaofei',
    components: {
      Header,
      Footer,
      DivListWrap,
      TitleMid
    },
    data () {
      return {
        serviceList: [
          {
            icon: 'https://qiniu.easyapi.com/market/jiaofei/communication.png',
            title: '通讯业务',
            freeSay: '话费充值',
            flow: '流量充值',
            network: '宽带充值',
          },
          {
            icon: 'https://qiniu.easyapi.com/market/jiaofei/game.png',

            title: '游戏充值',
            freeSay: '网络游戏',
            flow: '手机游戏',
            network: ' QQ业务',
          },
          {
            icon: 'https://qiniu.easyapi.com/market/jiaofei/payment.png',
            title: '生活缴费',
            freeSay: '水电煤',
            flow: '加油卡',
            network: '交通罚款',
          }
        ],
        adviceList: [
          {
            icon: 'https://qiniu.easyapi.com/market/jiaofei/api.png',
            title: 'API充值',
            freeSay: '无需提前充值，通过EasyAPI充值API接口，随冲随用，不占用资金',

          },
          {
            icon: 'https://qiniu.easyapi.com/market/jiaofei/goods.png',
            title: '货源稳定',
            freeSay: '海量优质货源供应，众多供应商后台随机切换，保障货源稳定',

          },
          {
            icon: 'https://qiniu.easyapi.com/market/jiaofei/others.png',
            title: '其他',
            freeSay: ' 如果您需要更多其他充值缴费相关，请联系我们',
          },
        ]
      }
    },
    head () {
      return {
        title: '缴费专辑 - EasyAPI服务市场',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '服务市场场景化服务' },
          { hid: 'keyword', name: 'keyword', content: '服务市场场景化服务' }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
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

    P {

      font-size: 36px;
      font-family: MicrosoftYaHei;
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
      font-family: MicrosoftYaHei;
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

  // .tex {
  //   position absolute
  //   bottom 20px
  //   left 40%
  //   color #454545
  // }

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
    color: #18C1D6;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 289px 23px;
    background-size: 17px auto;
  }

  .jiaofei-list:hover {
    cursor: pointer;
    box-shadow: 0 0 8px rgba(0, 1, 0, 0.1);
  }

  .jiaofei-list:hover label {
    background-image: url(../assets/images/arrow.png);
    background-color: #18C1D6;
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

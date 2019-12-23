<template>
  <div>
    <div class="top">
      <Header class="no-bg"></Header>
    </div>
    <div class="banner">
      <p>海量泛金融API服务</p>
      <div class="banner-text">
        适用多场景金融征信服务，权威数据。身份/银行卡认证，
        <br/>识别功能，企业信息，股票查询等API服务
      </div>
    </div>
    <div class="container">
      <div class="finance-wrapper">
        <DivListWrap>
          <div class="finance-top-list" v-for="(item,index) in dataList" :key="index">
            <div>
              <img :src="item.img" alt="图片加载中..."/>
            </div>
            <span>{{item.title}}</span>
          </div>
        </DivListWrap>
      </div>

      <div class="finance-title">
        <TitleMid>相关API推荐</TitleMid>
      </div>

      <div class="finance-recommend-list">
        <DivListWrap>
          <div class="finance-rl-inner" v-for="(item,index) in apiDatalist" :key="index">
            <div>
              <img :src="item.img" alt="图片加载中..."/>
            </div>
            <div>
              <span>{{item.title}}</span>
              <label>{{item.money}}</label>
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
    name: 'finance',
    components: {
      Header,
      Footer,
      DivListWrap,
      TitleMid
    },
    data () {
      return {
        dataList: [
          {
            img: 'https://qiniu.easyapi.com/market/finance/individual-risk.png',
            title: '个人风控数据'
          },
          {
            img: 'https://qiniu.easyapi.com/market/finance/portrayal.png',
            title: '用户画像数据'
          },

          {
            img: 'https://qiniu.easyapi.com/market/finance/enterprise.png',
            title: '企业相关数据'
          },
          {
            img: 'https://qiniu.easyapi.com/market/finance/risk.png',
            title: '金融风控数据 '
          }
        ],
        apiDatalist: [
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '身份证OCR识别',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '身份证实名认证',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '运营商三要素',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '金融反欺诈',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '三网手机实名认证',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/ip.png',
            title: '银行卡三元素校验',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '银行卡四元素校验',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '证件识别',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '企业工商数据',
            money: '￥0.15/次'
          },
          {
            img: 'https://qiniu.easyapi.com/withdraw.png',
            title: '银行卡类别',
            money: '￥0.15/次'
          }
        ]
      }
    },
    head () {
      return {
        title: '金融专辑 - EasyAPI服务市场',
        meta: [
          { hid: 'description', name: 'description', content: '服务市场场景化服务' },
          { hid: 'keyword', name: 'keyword', content: '服务市场场景化服务' }
        ]
      }
    }
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
    background-image: url('https://qiniu.easyapi.com/market/bg_finance_banner.png');
    background-size: cover;
    background-color: white;

    p {
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

  .no-bg {
    margin-bottom: 0 !important;
    background: transparent !important;
    position: absolute !important;
    width: 100%;
  }

  .img {
    display: block;
  }

  .finance-wrapper {
    padding: 54px 0 0;
  }

  .finance-top-list {
    min-width: 285px;
  }

  .finance-top-list div {
    height: 180px;
    background-color: white;
  }

  .finance-top-list span {
    display: block;
    line-height: 48px;
    text-align: center;
    font-size: 18px;
    color: #333;
    border: 1px solid #ddd;
  }

  .finance-rl-inner {
    width: 224px;
    height: 254px;
    margin-bottom: 20px;
    padding: 41px 62px 24px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
  }

  .finance-rl-inner:hover {
    cursor: pointer;
    translate: 0.5s;
    box-shadow: 0 0 8px #e3e4e6;
  }

  .finance-rl-inner img {
    display: block;
    width: 100px;
    height: 100px;
  }

  .finance-rl-inner span {
    display: block;
    font-size: 16px;
    color: #333;
  }

  .finance-rl-inner label {
    display: block;
    font-size: 14px;
    color: #ff3636;
  }

  .finance-rl-inner div:nth-child(1) {
    margin-bottom: 35px;
  }

  .finance-rl-inner div:nth-child(2) {
    text-align: center;
  }
</style>

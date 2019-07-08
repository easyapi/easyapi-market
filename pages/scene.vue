<template>
  <div>
    <Header></Header>
    <div>

    </div>
    <div class="container">
      <DivListWarp>
        <div class="scene-warp" v-for="(item,index) in imgList" :key="index">
          <a :href="item.href" class="img">
            <img :src="item.src" alt="图片加载中...">
          </a>
          <a class="tex" :href="item.href">
            <span class="scene-t-color">{{item.title}}</span>
          </a>
        </div>
      </DivListWarp>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import DivListWarp from '~/components/layout/divListWrap'

  export default {
    name: 'scene',
    components: {
      Header,
      DivListWarp,
      Footer
    },
    data () {
      return {
        imgList: [
          {
            href: 'https://scrm.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/scrm.png',
            title: '会员营销',
          },
          {
            href: 'https://withdraw.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/withdraw.png',
            title: '快速提现',
          },
          {
            href: 'https://ad.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/ad.png',
            title: '广告管家',
          },
          {
            href: 'https://clockin.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/clockin.png',
            title: '签到打卡',
          },
          {
            href: 'https://shop.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/shop.png',
            title: '微商城',
          },
          {
            href: 'https://jifen.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/jifen.png',
            title: '积分商城',
          },
          {
            href: 'https://fapiao.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/invoice.png',
            title: '发票管理',
          },
          {
            href: 'https://workorder.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/work_order.png',
            title: '工单系统',
          },
          {
            href: 'https://lottery.easyapi.com',
            src: 'https://qiniu.easyapi.com/scene/lottery.png',
            title: '抽奖活动',
          },
        ]
      }
    },
    head () {
      return {
        title: '场景化服务 - EasyAPI服务市场',
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
  .scene-warp {
    text-align: center;
    margin-bottom: 20px;
    width: 387px;
    height: 275px;

    img {
      display: block;
      width: 387px;
      height: 223px;
      background-color: white;
    }

    .tex {
      display: block;
      text-align: center;
      line-height: 50px;
      color: #000000;
      font-size: 18px;
      border: 1px solid #ddd;
    }

    .scene-t-color {
      color: #000000 !important;
      font-size: 18px !important;
    }
  }

</style>

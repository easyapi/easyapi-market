<template>
  <div>
    <Header></Header>
    <div class="main">
      <DivListWarp>
        <div class="scene-card" v-for="(item, index) in imgList" :key="index">
          <a :href="item.href" class="img" target="_blank">
            <div>
              <img :src="item.src" alt="图片加载中..." />
            </div>
            <span>{{ item.title }}</span>
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
    Footer,
  },
  data() {
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
      ],
    }
  },
  head() {
    return {
      title: '场景化服务 - EasyAPI服务市场',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '服务市场场景化服务',
        },
        { hid: 'keyword', name: 'keyword', content: '服务市场场景化服务' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.scene-card {
  text-align: center;
  margin-bottom: 20px;
  width: 387px;
  height: 275px;
  border: 1px solid #ddd;

  img {
    width: 386px;
    height: 223px;
    vertical-align: middle;
    display: flex;
  }

  span {
    display: block;
    width: 387px;
    text-align: center;
    line-height: 50px;
    color: #000000;
    font-size: 18px;
  }
}
</style>

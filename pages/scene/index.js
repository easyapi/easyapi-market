import './index.scss'

import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  name: 'scene',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      imgList: [
        {
          href: 'https://withdraw.easyapi.com',
          src: 'https://qiniu.easyapi.com/scene/withdraw.png',
          title: '快速提现'
        },
        {
          href: 'https://ad.easyapi.com',
          src: 'https://qiniu.easyapi.com/scene/ad.png',
          title: '广告管家'
        },
        {
          href: 'https://shop.easyapi.com',
          src: 'https://qiniu.easyapi.com/scene/shop.png',
          title: '微商城'
        },
        {
          href: 'https://fapiao.easyapi.com',
          src: 'https://qiniu.easyapi.com/scene/invoice.png',
          title: '发票管理'
        }
      ]
    }
  },
  head() {
    return {
      title: '场景化服务 - EasyAPI服务市场',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'EasyAPI服务市场为您提供各类场景化服务接口，例如类似有赞、微盟的微商城全套接口，您企业的非核心模块，EasyAPI都可以为您提供。'
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content: '会员营销API接口,快速提现API接口,广告管家API接口,签到打开API接口,微商城API接口,积分商城API接口,电子发票API接口,工单系统API接口,抽奖活动API接口'
        }
      ]
    }
  }
}

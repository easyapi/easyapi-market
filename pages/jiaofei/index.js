import './index.scss'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { qiniuUrl } from '../../api/api'

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

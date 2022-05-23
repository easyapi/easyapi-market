import './index.scss'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { qiniuUrl } from '../../api/api'

export default {
  name: 'finance',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      dataList: [
        {
          img: `${qiniuUrl}/market/finance/individual-risk.png`,
          title: '个人风控数据'
        },
        {
          img: `${qiniuUrl}/market/finance/portrayal.png`,
          title: '用户画像数据'
        },

        {
          img: `${qiniuUrl}/market/finance/enterprise.png`,
          title: '企业相关数据'
        },
        {
          img: `${qiniuUrl}/market/finance/risk.png`,
          title: '金融风控数据 '
        }
      ],
      apiDataList: [
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '身份证OCR识别',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '身份证实名认证',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '运营商三要素',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '金融反欺诈',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '三网手机实名认证',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/ip.png`,
          title: '银行卡三元素校验',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '银行卡四元素校验',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '证件识别',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '企业工商数据',
          money: '￥0.15/次'
        },
        {
          img: `${qiniuUrl}/withdraw.png`,
          title: '银行卡类别',
          money: '￥0.15/次'
        }
      ]
    }
  },
  head() {
    return {
      title: '金融专辑 - EasyAPI服务市场',
      meta: [
        { hid: 'description', name: 'description', content: 'EasyAPI服务市场为您提供各类泛金融类接口，欢迎在线咨询，并开通使用。' },
        { hid: 'keyword', name: 'keyword', content: '证件识别,银行卡类别,企业工商数据,银行卡四元素校验,三网手机实名认证' }
      ]
    }
  }
}

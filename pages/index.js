import './index.scss'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Category from './components/category.vue'
import { getServiceList } from '../api/service'
import { getArticleList } from '../api/article'

export default {
  name: 'Index',
  head() {
    return {
      title: 'EasyAPI服务市场 - API接口服务、API场景化服务',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'EasyAPI服务市场为您提供各类API接口服务，各类场景化接口服务，例如类似有赞、微盟的全套微商城API接口，非核心业务模块接口EasyAPI均能为为您通过，欢迎联系技术专线咨询！'
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'API接口,API接口服务,API场景化服务,电子发票API,微商城API接口,水电煤缴费API接口,手机话费充值API接口,金融API接口,医疗健康API接口,会员营销API接口'
        }
      ]
    }
  },
  components: {
    Header,
    Footer,
    Category
  },
  data() {
    return {
      recommendServiceList: [],
      newestServiceList: [],
      list: [],
      totalPages: 0
    }
  },
  async asyncData(context) {
    let [res] = await Promise.all([getServiceList({ sort: 'sales,desc' }, context)])
    return {
      recommendServiceList: res.data.content
    }
  },
  methods: {
    getNewestServiceList() {
      getServiceList({ sort: 'addTime,desc' }, this).then(res => {
        this.newestServiceList = res.data.content
      })
    },
    getArticleList: function () {
      let params = { size: 7 }
      getArticleList(params, this).then(res => {
        this.list = this.list.length > 0 ? this.list.concat(res.data.content) : res.data.content
        this.totalPages = res.data.totalPages
      })
    }
  },
  mounted() {
    this.getNewestServiceList()
    this.getArticleList()
  }
}

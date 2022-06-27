import './_id.scss'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { subscribeService, getServiceInfo } from '../../api/service'

export default {
  name: 'service-detail',
  loading: true,
  head() {
    return {
      title: this.service.name + ' - EasyAPI服务市场',
      meta: [
        { hid: 'description', name: 'description', content: '服务市场详情' },
        { hid: 'keyswords', name: 'keyswords', content: '服务市场详情' }
      ]
    }
  },
  components: {
    Header,
    Footer
  },
  data() {
    return {
      establish: false,
      subscribe: false,
      message: '暂无团队信息，请前往创建团队才能开通服务。',
      buttonContent: '前 往',
      service: '',
      clicked: 0,
      servicePriceList: []
    }
  },
  async asyncData(context) {
    const res1 = await context.$axios.get(`https://api.easyapi.com/console/service-prices?serviceId=${context.params.id}`)
    const res2 = await context.$axios.get(`https://api.easyapi.com/api/service/${context.params.id}`)
    return {
      servicePriceList: res1.data.content,
      service: res2.data.content
    }
  },
  created() {},
  mounted() {
    this.getServiceInfo()
  },
  methods: {
    use(url, hasConsole, serviceId) {
      if (hasConsole === true) {
        window.location.href = 'https://' + url + '.easyapi.com/console/'
      } else {
        window.location.href = 'https://team.easyapi.com/stat?serviceId=' + serviceId
      }
    },
    homepage(url) {
      window.location.href = 'https://' + url + '.easyapi.com/'
    },
    gotoPage(url) {
      window.location.href = url
    },
    jump() {
      if (this.buttonContent === '前 往') {
        window.open('https://team.easyapi.com/new?from=https://market.easyapi.com/service/' + this.$route.params.id, '_blank')
        this.message = '团队创建成功了吗？'
        this.buttonContent = '刷 新'
      } else {
        location.reload()
      }
    },
    changeItem(index) {
      this.clicked = index
    },
    subscribeDialog() {
      this.subscribe = true
    },
    getServiceInfo() {
      getServiceInfo(this.$route.params.id, this).then(res => {
        this.service = res.data.content
      })
    },
    subscribeService() {
      subscribeService(this.$route.params.id, this)
        .then(res => {
          this.$message.success(res.data.message)
          this.subscribe = false
          if (res.data.code === 1) {
            this.getServiceInfo()
          }
        })
        .catch(error => {
          if (error.response.data.code === -9) {
            window.location.href = 'https://account.easyapi.com/login?from=https://market.easyapi.com/service/' + this.$route.params.id
          } else if (error.response.data.code === -8) {
            this.establish = true
          }
        })
    }
  }
}

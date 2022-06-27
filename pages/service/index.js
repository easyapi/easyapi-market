import './index.scss'

import Header from '~/components/Header'
import Footer from '~/components/Footer'
import { getServiceList, getServiceTypeList } from '../../api/service'

export default {
  name: 'service',
  head() {
    return {
      title: 'API接口 - EasyAPI服务市场',
      meta: [
        { hid: 'description', name: 'description', content: '服务市场API接口' },
        { hid: 'keyword', name: 'keyword', content: '服务市场API接口' }
      ]
    }
  },
  components: {
    Header,
    Footer
  },
  data() {
    return {
      loading: false,
      name: '',
      serviceTypeId: '全部',
      type: '全部',
      sort: '1',
      isNoData: false,
      serviceList: [],

      serviceTypeList: [],
      pageSize: 10, // 每页显示条数
      current: 1, // 当前的页数
      total: 0 // 记录总条数
    }
  },
  async asyncData(context) {
    let [res2] = await Promise.all([getServiceTypeList(context)])
    return {
      serviceTypeList: res2.data.content
    }
  },
  watch: {
    '$store.state.serviceName': function (v, oldv) {
      this.name = this.$store.state.serviceName
    },
    $route: function () {
      this.getServiceList()
    }
  },
  created() {},
  mounted() {
    let name = this.$route.query.name
    let type = this.$route.query.type
    let payType = this.$route.query.payType
    let sort = this.$route.query.sort

    if (name) {
      this.name = name
    }
    if (type) {
      this.serviceTypeId = type
    }
    if (payType) {
      this.type = payType
    }
    if (sort) {
      this.sort = sort
    }
    this.getServiceList()
  },
  methods: {
    getServiceList() {
      let _this = this
      _this.loading = true
      let params = {}
      if (this.name) {
        params.name = this.name
      }
      if (_this.serviceTypeId !== '全部') {
        params.serviceTypeId = this.serviceTypeId
      }
      if (_this.type !== '全部') {
        if (_this.type === '1') {
          params.type = '1'
        } else if (_this.type === '2') {
          params.types = '2,3,4'
        }
      }
      if (_this.sort !== '全部') {
        if (_this.sort === '1') {
          params.sort = 'addTime,desc'
        } else if (_this.sort === '2') {
          params.sort = 'sales,desc'
        }
      }
      params.size = this.pageSize
      params.page = this.current - 1
      getServiceList(params, this)
        .then(res => {
          this.loading = false
          if (res.data.code === 0) {
            _this.isNoData = true
            _this.serviceList = []
            _this.total = 0
          } else {
            _this.isNoData = false
            _this.serviceList = res.data.content
            _this.total = res.data.totalElements
          }
        })
        .catch(error => {
          this.loading = false
          console.log(error.response)
        })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getServiceList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getServiceList()
    },

    //样式切换
    getService(id) {
      this.serviceTypeId = id
      let action = 'click'
      let name = this.$route.query.name
      let type = this.$route.query.type
      let payType = this.$route.query.payType
      let sort = this.$route.query.sort
      this.$router.replace({
        path: '/service',
        query: {
          name: name,
          type: this.serviceTypeId,
          payType: payType,
          sort: sort
        }
      })
      this.getServiceList()
    },
    charge(t) {
      this.type = t
      let name = this.$route.query.name
      let action = 'click'
      let type = this.$route.query.type
      let payType = this.$route.query.payType
      let sort = this.$route.query.sort
      this.$router.replace({
        path: '/service',
        query: {
          name: name,
          type: type,
          payType: t,
          sort: sort
        }
      })
      this.getServiceList()
    },
    styleSwitch(t) {
      this.sort = t
      let name = this.$route.query.name
      let type = this.$route.query.type
      let payType = this.$route.query.payType
      let sort = this.$route.query.sort
      this.$router.replace({
        path: '/service',
        query: {
          name: name,
          type: type,
          payType: payType,
          sort: t
        }
      })
      this.getServiceList()
    },

    //拼接对象
    contactObject(obj) {
      if (!obj) return
      let str = ''

      for (let i in obj) {
        str += `${i}=${obj[i]}&`
      }

      return str.slice(0, str.length)
    }
  }
}

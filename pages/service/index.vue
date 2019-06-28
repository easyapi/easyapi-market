<template>
  <div>
    <Header v-bind:callback='getServiceList'></Header>
    <div class="container">
      <div class="search-list">
        <el-row class="row">
          <el-col :span="2" class="col-left">商品分类：</el-col>
          <el-col :span="22" class="col-right">
            <el-row>
              <el-col :span="2">
                <a class="col-right-con" :class="{active:serviceTypeId==='全部'}" @click="getService('全部')">全部</a>
              </el-col>
              <el-col :span="2" v-for="(item, index) in serviceTypeList" :key="index">
                <a class="col-right-con" :class="{active:serviceTypeId==item.serviceTypeId}"
                   @click="getService(item.serviceTypeId)">
                  {{item.name}}
                </a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" class="col-left">付费类型：</el-col>
          <el-col :span="21" class="col-right">
            <el-row>
              <el-col :span="2"><a class="col-right-con" :class="{active:type==='全部'}" @click="charge('全部')">全部</a>
              </el-col>
              <el-col :span="2"><a class="col-right-con" :class="{active:type==='1'}" @click="charge('1')">免费</a>
              </el-col>
              <el-col :span="2"><a class="col-right-con" :class="{active:type==='2'}" @click="charge('2')">收费</a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" class="col-left" style="font-weight:700;">排序方式：</el-col>
          <el-col :span="21" class="col-right">
            <el-row>
              <el-col :span="2">
                <a class="col-right-con" :class="{tqActive:sort==='1'}" @click="styleSwitch('1')">热门
                  <img src="../../assets/images/arrowTenBlue.png" alt="暂无数据" v-if="sort==='1'">
                  <img src="../../assets/images/arrowTenGray.png" alt="暂无数据" v-else>
                </a>
              </el-col>
              <el-col :span="2">
                <a class="col-right-con" :class="{tqActive:sort==='2'}" @click="styleSwitch('2')">最新
                  <img src="../../assets/images/arrowTenBlue.png" alt="暂无数据" v-if="sort==='2'">
                  <img src="../../assets/images/arrowTenGray.png" alt="暂无数据" v-else>
                </a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="recommend-service">
        <div class="recommend-service-con">
          <div class="col" v-for="(item, index) in serviceList" :key="index">
            <nuxt-link :to="'/service/'+item.serviceId">
              <p class="img"><img v-bind:src="item.img" alt=""></p>
              <p class="text">{{item.name}}</p>
              <p class="price" v-if="item.type===1">免费</p>
              <p class="price" v-if="item.type===2">￥{{item.unitPrice}}次</p>
              <p class="price" v-if="item.type===3">￥{{item.unitPrice}}月</p>
              <p class="price" v-if="item.type===4">按需</p>
            </nuxt-link>
          </div>
          <div v-if="isNoData">
            <img src="https://qiniu.easyapi.com/market/empty.png" alt="">
            <p>暂无服务</p>
            <p>如果您有优质的提供商，欢迎给我们推荐 <a href="leida@easyapi.com" class="text-no-data">leida@easyapi.com</a></p>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="!isNoData">
      <Pagination
        :total="total"
        :current-page='current'
        @pagechange="pageChange"></Pagination>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import Pagination from '~/components/common/pagination'
  import axios from '~/plugins/axios'

  export default {
    name: 'service',
    head () {
      return {
        name: '',
        title: 'API接口 - EasyAPI服务市场',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '服务市场API接口' },
          { hid: 'keyword', name: 'keyword', content: '服务市场API接口' }
        ]
      }
    },
    components: {
      Header,
      Footer,
      Pagination
    },
    data () {
      return {
        name: '',
        serviceTypeId: '全部',
        type: '全部',
        sort: '1',
        isNoData: false,
        serviceList: [],

        serviceTypeList: [],
        total: 150,     // 记录总条数
        pageSize: 10,   // 每页显示条数
        current: 0   // 当前的页数
      }
    },
    async asyncData ({ params, error }) {
      let [res1, res2] = await Promise.all([
        axios.get('/api/services'),
        axios.get('/api/service/types')
      ])
      return {
        serviceList: res1.data.content,
        serviceTypeList: res2.data.content
      }
    },
    methods: {
      pageChange (currentPage) {
        let url = `/api/services?page=${currentPage}&size=${this.pageSize}`
        let urlName = this.$route.query.name && this.$route.query.name.trim()
        return urlName ? this.getServiceList(url, urlName) : this.getServiceList(url)
      },
      //样式切换
      getService (id) {
        this.serviceTypeId = id
        let action = 'click'
        this.getServiceList(null, null, action)
      },
      charge (t) {
        this.type = t
        let action = 'click'
        this.getServiceList(null, null, action)
      },
      styleSwitch (t) {
        this.sort = t
        this.getServiceList()
      },

      getServiceList (url, name, action) {
        let _this = this
        let obj = {}
        if (name) {
          obj.name = name
        }

        if (_this.serviceTypeId !== '全部') {
          obj.serviceTypeId = this.serviceTypeId

          if (name) {
            delete obj.serviceTypeId
          }
        }
        if (_this.type !== '全部') {
          if (_this.type == '1') {
            obj.type = '1'
          } else if (_this.type == '2') {
            obj.types = '2,3,4'
          }
        }
        if (_this.sort !== '全部') {
          if (_this.sort == '1') {
            obj.sort = 'addTime,desc'
          } else if (_this.sort == '2') {
            obj.sort = 'sales,desc'
          }
        }
        let { query: { serviceTypeId, type, sort } } = this.$route

        _this.saveParams({
          serviceTypeId: action ? this.serviceTypeId : serviceTypeId || '全部',
          sort: sort || 1,
          type: action ? this.type : type || '全部',
          ...obj,
        }).then(res => {
          setTimeout(() => {
            let { query } = this.$route

            let newObj = {
              ...query,
              ...obj,
            }

            this.serviceTypeId = query.serviceTypeId
            this.type = query.type

            let { page, size, serviceTypeId, type, sort, types } = newObj

            if (serviceTypeId == '全部') {
              delete newObj.serviceTypeId
            }
            if (type == '全部' || type == '2') {
              delete newObj.type
            }
            if (sort == '1') {
              newObj.sort = 'addTime,desc'
            }

            if (sort == '2') {
              newObj.sort = 'sales,desc'
            }

            delete newObj.page
            delete newObj.size

            _this.serviceList = []
            axios.get(url || '/api/services', {
              params: newObj
            }).then(res => {
              if (res.data.code === 0) {
                _this.isNoData = true
              } else {
                _this.isNoData = false
              }
              _this.serviceList = res.data.content
              _this.total = res.data.totalElements
            }).catch(error => {
              console.log(error.response)
            })
          }, 0)
        })
      },
      getName (name) {
        let currentPage = 0
        let url = `/api/services`
        let urlName = name && name.trim()

        return urlName ? this.getServiceList(url, urlName) : this.getServiceList(url)
      },

      //保存query参数
      saveParams (params) {

        if (params.types == '2,3,4') {
          params.type = 2
        }

        if (params.type == '2') {
          params.types = '2,3,4'
        }

        console.log(params, 'push after')

        if (!params.serviceTypeId) {
          params.serviceTypeId = '全部'
        }

        if (!params.type) {
          params.type = '全部'
        }

        let defaultParams = this.contactObject(params)
        this.$router.push(`/service?${defaultParams}`)
        return Promise.resolve(defaultParams)
      },

      //拼接对象
      contactObject (obj) {
        if (!obj) return
        let str = ''

        for (let i in obj) {
          str += `${i}=${obj[i]}&`
        }

        return str.slice(0, str.length)
      }
    },

    mounted () {
    }

  }
</script>

<style lang="scss" scoped>
  .col-right-con {
    display: block;
  }

  .text-no-data {
    color: rgb(31, 81, 204)
  }

  .search-list {
    padding: 22px 22px 0;
    color: #666;
    font-size: 14px;
    text-align: center;
    background-color: #f6fafa;

    .row {
      .col-left {
        margin-bottom: 43px;
      }

      .col-right {
        a {
          color: #666;
          font-size: 14px;
          height: 23px;
          line-height: 23px;
        }

        .active {
          color: #18c1d6;
          border: 1px solid #18c1d6;
          height: 21px;
          line-height: 21px;
        }

      }
    }
  }

  .tqActive {
    color: #18c1d6 !important;
  }

  .pagination {
    padding-top: 50px;
    text-align: center;
  }

  .recommend-service {
    margin-top: 40px;

    a {
      color: #333;
    }

    .recommend-service-con {
      text-align: center;
      margin-top: 20px;
      overflow: hidden;

      .col {
        padding: 40px 20px 20px;
        border: 1px solid #f4f4f4;
        width: 19%;
        float: left;
        margin-left: 15px;
        margin-bottom: 20px;

        .text {
          font-size: 16px;
          margin-top: 40px;
        }

        .price {
          margin-top: 20px;
          color: #ff3636;
          margin-bottom: 10px;
          font-size: 14px;
        }

        img {
          width: 100px;
        }
      }

      .col:first-of-type {
        margin-left: 0 !important;
      }

      .col:nth-of-type(5n+1) {
        margin-left: 0 !important;
      }
    }
  }
</style>

<template>
  <div>
    <Header v-bind:callback="getServiceList"></Header>
    <div class="container">
      <div class="search-list">
        <el-row class="row">
          <el-col :span="2" class="col-left">商品分类：</el-col>
          <el-col :span="22" class="col-right">
            <el-row>
              <el-col :span="2">
                <a
                  class="col-right-con"
                  :class="{active:serviceTypeId==='全部'}"
                  @click="getService('全部')"
                >全部</a>
              </el-col>
              <el-col :span="2" v-for="(item, index) in serviceTypeList" :key="index">
                <a
                  class="col-right-con"
                  :class="{active:serviceTypeId==item.serviceTypeId}"
                  @click="getService(item.serviceTypeId,)"
                >{{item.name}}</a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" class="col-left">付费类型：</el-col>
          <el-col :span="21" class="col-right">
            <el-row>
              <el-col :span="2">
                <a class="col-right-con" :class="{active:type==='全部'}" @click="charge('全部')">全部</a>
              </el-col>
              <el-col :span="2">
                <a class="col-right-con" :class="{active:type==='1'}" @click="charge('1')">免费</a>
              </el-col>
              <el-col :span="2">
                <a class="col-right-con" :class="{active:type==='2'}" @click="charge('2')">收费</a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" class="col-left" style="font-weight:700;">排序方式：</el-col>
          <el-col :span="21" class="col-right">
            <el-row>
              <el-col :span="2">
                <a class="col-right-con" :class="{tqActive:sort==='1'}" @click="styleSwitch('1')">
                  热门
                  <img src="../../assets/images/arrow-down-blue.png" alt="暂无数据" v-if="sort==='1'"/>
                  <img src="../../assets/images/arrow-down-gray.png" alt="暂无数据" v-else/>
                </a>
              </el-col>
              <el-col :span="2">
                <a class="col-right-con" :class="{tqActive:sort==='2'}" @click="styleSwitch('2')">
                  最新
                  <img src="../../assets/images/arrow-down-blue.png" alt="暂无数据" v-if="sort==='2'"/>
                  <img src="../../assets/images/arrow-down-gray.png" alt="暂无数据" v-else/>
                </a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-loading="loading" class="recommend-service">
        <div class="recommend-service-con">
          <div class="col" v-for="(item, index) in serviceList" :key="index">
            <nuxt-link :to="'/service/'+item.serviceId">
              <p class="img">
                <img v-bind:src="item.img" alt/>
              </p>
              <p class="text">{{item.name}}</p>
              <p class="price" v-if="item.type===1">免费</p>
              <p class="price" v-if="item.type===2">￥{{item.unitPrice}}次</p>
              <p class="price" v-if="item.type===3">￥{{item.unitPrice}}月</p>
              <p class="price" v-if="item.type===4">按需</p>
            </nuxt-link>
          </div>
          <div class="nodata" v-if="isNoData">
            <img src="https://qiniu.easyapi.com/market/empty.png" alt/>
            <p>暂无服务</p>
            <p>
              如果您有优质的提供商，欢迎给我们推荐
              <a href="leida@easyapi.com" class="text-no-data">leida@easyapi.com</a>
            </p>
          </div>
        </div>
      </div>
      <div class="pagination" v-if="!isNoData">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 15, 30]"
          :page-size="pageSize"
          :current-page="current"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import { getServiceList, getServiceTypeList } from '../../api/service'

  export default {
    name: 'service',
    head () {
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
    data () {
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
    async asyncData (context) {
      let [res2] = await Promise.all([getServiceTypeList()])
      return {
        serviceTypeList: res2.data.content
      }
    },
    watch: {
      '$store.state.serviceName': function(v, oldv) {
        this.name = this.$store.state.serviceName
      },
      $route: function() {
        this.getServiceList()
      }
    },
    created () {
    },
    mounted () {
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
      getServiceList () {
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
        getServiceList(params).then(res => {
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
        }).catch(error => {
          this.loading = false
          console.log(error.response)
        })
      },

      handleSizeChange (val) {
        this.pageSize = val
        this.getServiceList()
      },
      handleCurrentChange (val) {
        this.current = val
        this.getServiceList()
      },

      //样式切换
      getService (id) {
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
      charge (t) {
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
      styleSwitch (t) {
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
      contactObject (obj) {
        if (!obj) return
        let str = ''

        for (let i in obj) {
          str += `${i}=${obj[i]}&`
        }

        return str.slice(0, str.length)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nodata {
    padding: 40px 0;
    color: #999;

    img {
      margin-bottom: 10px;
    }

    p {
      padding: 10px 0;
    }
  }

  .col-right-con {
    display: block;
  }

  .text-no-data {
    color: rgb(31, 81, 204);
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
      color: #18c1d6;
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

      .col:nth-of-type(5n + 1) {
        margin-left: 0 !important;
      }
    }
  }
</style>

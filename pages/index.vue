<template>
  <div>
    <Header></Header>
    <div class="index-container">
      <div class="service-market">
        <div class="service-market-left">
          <div class="service-title">
            <h4>服务市场分类</h4>
          </div>
          <el-row class="row">
            <el-col :span="8" class="col">
              <a class="col-fl">生活常用</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">天气预报</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">条码查询</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">即时通讯</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">短信服务</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">语音服务</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">充值缴费</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">加油卡充值</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">话费流量</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">开发服务</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">内容管理</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">广告管家</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">医疗健康</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">常见疾病</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">生活常用</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">金融征信</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">企业开票信息</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">生活常用</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">电商购物</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">生活常用</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">生活常用</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">基础数据</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">省市区数据</a>
            </el-col>
            <el-col :span="8" class="col">
              <a class="col-fl">生活常用</a>
            </el-col>
          </el-row>
        </div>
        <div class="service-market-right">
          <img src="https://qiniu.easyapi.com/market/ad/easyapi.png" alt />
        </div>
      </div>

      <div class="recommend-service">
        <div class="recommend-service-title">
          <span class="border"></span>
          <span>推荐服务</span>
        </div>
        <div class="recommend-service-con">
          <div
            class="col"
            v-for="(item, index) in recommendServiceList"
            :key="index"
          >
            <nuxt-link
              :to="{ name: 'service-id', params: { id: item.serviceId } }"
            >
              <p class="img">
                <img v-bind:src="item.img" alt />
              </p>
              <p class="text">{{ item.name }}</p>
              <p class="price" v-if="item.type === 1">免费</p>
              <p class="price" v-if="item.type === 2">
                ￥{{ item.unitPrice }}/次
              </p>
              <p class="price" v-if="item.type === 3">
                ￥{{ item.unitPrice }}/月
              </p>
              <p class="price" v-if="item.type === 4">按需</p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!--最新更新-->
      <div class="lastest-update">
        <div class="lastest-update-title">
          <span class="border"></span>
          <span>最新更新</span>
        </div>
        <el-row class="lastest-update-con-top">
          <el-col :span="18" class="lastest-update-con-left">
            <el-row class="row">
              <el-col
                :span="6"
                class="col"
                v-for="(item, index) in newestServiceList"
                :key="item.serviceId"
              >
                <nuxt-link
                  v-if="index < 8"
                  :to="{ name: 'service-id', params: { id: item.serviceId } }"
                >
                  <p class="img">
                    <img v-bind:src="item.img" alt />
                  </p>
                  <p class="text">{{ item.name }}</p>
                </nuxt-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="lastest-update-con-right">
            <el-row class="row">
              <el-col :span="20">
                <nuxt-link to="/post/" class="more-state">更多动态</nuxt-link>
              </el-col>
              <el-col :span="4">
                <nuxt-link to="/post/" class="more">更多</nuxt-link>
              </el-col>
            </el-row>
            <div class="row-con" v-for="(item, index) in list" :key="index">
              <div>
                <span class="circle"></span>
                <span class="circle-con">
                  <a @click="jump(item.articleId)">{{ item.title }}</a>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="lastest-update-con-bottom">
          <span class="scenarioServices">
            <nuxt-link to="/scene">场景化服务</nuxt-link>
          </span>
          <span class="paymentAlbum">
            <nuxt-link to="/jiaofei">缴费专辑</nuxt-link>
          </span>
          <span class="financialAlbum">
            <nuxt-link to="/finance">金融专辑</nuxt-link>
          </span>
          <span class="clickInvoice">
            <a target="_blank" href="https://fapiao.easyapi.com">电子发票</a>
          </span>
        </div>
      </div>

      <div class="join-market">
        <div class="join-market-title">
          <span class="border"></span>
          <span>加入市场</span>
        </div>
        <el-row class="join-market-con">
          <el-col :span="6" class="col">
            <el-row>
              <el-col :span="8">
                <img
                  src="https://qiniu.easyapi.com/market/index/ic_time.png"
                  alt
                />
              </el-col>
              <el-col :span="16" style="padding: 30px 0">
                <p class="text">提升开发效率</p>
                <p class="join-market-text">提供统一风格接口服务</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="col">
            <el-row>
              <el-col :span="8">
                <img
                  src="https://qiniu.easyapi.com/market/index/ic_money.png"
                  alt
                />
              </el-col>
              <el-col :span="16" style="padding: 30px 0">
                <p class="text">服务转化收益</p>
                <p class="join-market-text">把您的服务共享出来</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="col">
            <el-row>
              <el-col :span="8">
                <img
                  src="https://qiniu.easyapi.com/market/index/ic_earth.png"
                  alt
                />
              </el-col>
              <el-col :span="16" style="padding: 30px 0">
                <p class="text">繁荣数据生态</p>
                <p class="join-market-text">喂养数据，制造生态</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="col">
            <el-row>
              <el-col :span="8">
                <img
                  src="https://qiniu.easyapi.com/market/index/ic_feedback.png"
                  alt
                />
              </el-col>
              <el-col :span="16" style="padding: 30px 0">
                <p class="text">让世界拥抱API</p>
                <p class="join-market-text">让一切服务通过API相连</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '~/components/header'
import Footer from '~/components/footer'
import { getServiceList } from '../api/service'
import { getArticleList } from '../api/article'

export default {
  name: 'index',
  head() {
    return {
      title: '首页 - EasyAPI服务市场',
      meta: [
        { hid: 'description', name: 'description', content: '服务市场首页' },
        { hid: 'keyword', name: 'keyword', content: '服务市场首页' },
      ],
    }
  },
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      recommendServiceList: [],
      newestServiceList: [],
      arr: [],
      list: [],
      totalPages: 0,
    }
  },
  // async asyncData({ $http }) {
  //   const res = await $http.$get('https://api.easyapi.com/api/services')
  //   return {
  //     recommendServiceList: res.content,
  //   }
  // },
  // async asyncData (context) {
  //   let [res] = await Promise.all([
  //     getServiceList({ sort: 'sales,desc' })
  //   ])
  //   return {
  //     recommendServiceList: res.data.content
  //   }
  // },
  methods: {
    getNewestServiceList() {
      getServiceList({ sort: 'addTime,desc' }).then((res) => {
        this.newestServiceList = res.data.content
      })
    },
    getArticleList: function () {
      let params = { size: 7 }
      getArticleList(params).then((res) => {
        this.list =
          this.list.length > 0
            ? this.list.concat(res.data.content)
            : res.data.content
        this.totalPages = res.data.totalPages
      })
    },
    async fetchSomething() {
      const res = await this.$http.$get('https://api.easyapi.com/api/services')
      this.recommendServiceList = res.content
    },
    jump(articleId) {
      this.$router.push(`/post/${articleId}`)
    },
  },
  created() {},
  mounted() {
    this.getNewestServiceList()
    this.getArticleList()
    this.fetchSomething()
  },
}
</script>

<style lang="scss" scoped>
.index-container {
  font-size: 12px;
  color: #333;
  width: 1200px;
  margin: 0 auto;
  /*服务市场分类*/

  .service-market {
    width: 100%;
    height: 372px;

    a {
      color: #fff;
      font-size: 12px;
    }

    .service-market-left {
      float: left;
      width: 22%;
      height: 100%;
      background: #1bc1d6;

      .service-title {
        color: #fff;
        font-size: 16px;
        border-bottom: 1px solid #8ce0eb;
        height: 45px;
        line-height: 45px;

        h4 {
          margin-left: 10px;
          font-size: 16px;
        }

        a.col-fl {
          font-size: 12px;
        }
      }

      .row {
        height: 40px;
        line-height: 40px;

        .col {
          border-bottom: 1px solid #8ce0eb;
          height: 41px;
        }

        .col:nth-of-type(3n + 1) {
          padding-left: 10px;
          height: 41px;

          a {
            display: inline-block;
            width: 58px;
            height: 22px;
            background-color: rgba(0, 0, 0, 0.1);
            margin: 0 auto;
            line-height: 22px;
            text-align: center;
          }
        }

        .col:nth-of-type(3n) {
          padding-right: 30px;
        }
      }
    }

    .service-market-right {
      margin-left: 1%;
      float: left;
      width: 77%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  /*推荐服务*/

  .recommend-service {
    margin-top: 40px;

    a {
      color: #333;
    }
    color: #333;

    .recommend-service-title {
      font-size: 18px;

      .border {
        border-left: 5px solid #0fc5fe;
        margin-right: 10px;
      }
    }

    .recommend-service-con {
      text-align: center;
      margin-top: 20px;
      overflow: hidden;

      .col {
        padding: 40px 40px 20px;
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

  //最新更新

  .lastest-update {
    margin-top: 40px;
    color: #333;

    a {
      color: #333;
    }

    .lastest-update-title {
      font-size: 18px;
      margin-bottom: 40px;

      .border {
        border-left: 5px solid #57e7b8;
        margin-right: 10px;
      }
    }

    .lastest-update-con-top {
      font-size: 12px;

      .lastest-update-con-left {
        height: 100%;

        .col {
          img {
            width: 100px;
          }

          .text {
            font-size: 16px;
            margin-top: 10px;
            width: 100px;
            text-align: center;
            min-height: 60px;
          }
        }
      }

      .lastest-update-con-right {
        min-height: 310px;
        background: #f2f6f6;
        padding: 10px;

        .row {
          height: 30px;
          line-height: 30px;

          .more-state {
            font-size: 18px;
          }

          .more {
            font-size: 14px;
            color: #999;
          }
        }

        .row-con {
          margin-top: 5px;

          div {
            height: 30px;
            line-height: 30px;

            .circle {
              display: block;
              float: left;
              width: 5px;
              height: 5px;
              background-color: #1cc1d5;
              border-radius: 2px;
              margin-top: 13px;
            }

            .circle-con {
              // float left;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 250px;
              margin-left: 7px;
              color: #333;
            }
          }
        }
      }
    }
  }

  /*加入市场*/

  .join-market {
    margin-top: 40px;

    a {
      color: #000;
    }

    .join-market-title {
      font-size: 18px;

      .border {
        border-left: 5px solid #fe960f;
        margin-right: 10px;
      }
    }

    .join-market-con {
      margin-bottom: 40px;
      margin-top: 20px;
      height: 100px;
      font-size: 14px;

      .text {
        font-weight: 700;
        font-size: 14px;
      }

      .join-market-text {
        color: #888;
        font-size: 12px;
      }

      img {
        width: 90%;
      }
    }
  }
}

.lastest-update-con-bottom {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 10px;
}

.lastest-update-con-bottom .scenarioServices {
  width: 285px;
  height: 146px;
  background: url('https://qiniu.easyapi.com/market/index/scene.png') no-repeat;
  background-size: 100% 100%;
  margin-right: 18px;
}

.lastest-update-con-bottom .scenarioServices a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  line-height: 146px;
  display: block;
}

.lastest-update-con-bottom .paymentAlbum {
  width: 285px;
  height: 146px;
  background: url('https://qiniu.easyapi.com/market/index/jiaofei.png')
    no-repeat;
  background-size: 100% 100%;
  margin-right: 18px;
}

.lastest-update-con-bottom .paymentAlbum a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  line-height: 146px;
  display: block;
}

.lastest-update-con-bottom .financialAlbum {
  width: 285px;
  height: 146px;
  background: url('https://qiniu.easyapi.com/market/index/finance.png')
    no-repeat;
  background-size: 100% 100%;
  margin-right: 18px;
}

.lastest-update-con-bottom .financialAlbum a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  line-height: 146px;
  display: block;
}

.lastest-update-con-bottom .clickInvoice {
  width: 285px;
  height: 146px;
  background: url('https://qiniu.easyapi.com/market/index/e_invoice.png')
    no-repeat;
  background-size: 100% 100%;
}

.lastest-update-con-bottom .clickInvoice a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  line-height: 146px;
  display: block;
}
</style>

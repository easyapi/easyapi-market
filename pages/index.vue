<template>
  <div>
    <Header></Header>
    <div class="index-container">
      <div class="service-market">
        <div class="service-market-left">
          <div class="service-title"><h4>服务市场分类</h4></div>
          <Row class="row">
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">生活常用</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">天气预报</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">条码查询</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">即时通讯</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">短信服务</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">语音服务</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">充值缴费</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">加油卡充值</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">话费流量</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">开发服务</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">内容管理</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">广告管家</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">医疗健康</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">常见疾病</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">生活常用</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">金融征信</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">企业开票信息</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">生活常用</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">电商购物</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">生活常用</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">生活常用</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">基础数据</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">省市区数据</a>
            </Col>
            <Col span="8" class="col">
              <a class="col-fl" @click="getService(index)">生活常用</a>
            </Col>
          </Row>
        </div>
        <div class="service-market-right">
          <img src="https://qiniu.easyapi.com/market/ad/easyapi.png" alt="">
        </div>
      </div>

      <div class="recommend-service">
        <div class="recommend-service-title"><span class="border"></span><span>推荐服务</span></div>
        <div class="recommend-service-con">
          <div class="col" v-for="(item, index) in recommendServiceList" :key="item.serviceId">
            <nuxt-link :to="'/service/'+item.serviceId">
              <p class="img"><img v-bind:src="item.img" alt=""></p>
              <p class="text">{{item.name}}</p>
              <p class="price" v-if="item.type===1">免费</p>
              <p class="price" v-if="item.type===2">￥{{item.unitPrice}}次</p>
              <p class="price" v-if="item.type===3">￥{{item.unitPrice}}月</p>
              <p class="price" v-if="item.type===4">按需</p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!--最新更新-->
      <div class="lastest-update">
        <div class="lastest-update-title"><span class="border"></span><span>最新更新</span></div>
        <Row class="lastest-update-con-top">
          <Col span="18" class="lastest-update-con-left">
            <Row class="row">
              <Col span="6" class="col" v-for="(item, index) in newestServiceList" :key="item.serviceId"
                   v-if="index < 8">
                <nuxt-link :to="{name:'service-id',params:{id:item.serviceId}}">
                  <p class="img"><img v-bind:src="item.img" alt=""></p>
                  <p class="text">{{item.name}}</p>
                </nuxt-link>
              </Col>
            </Row>
          </Col>
          <Col span="6" class="lastest-update-con-right">
            <Row class="row">
              <Col span="20"><nuxt-link to="/post/" class="more-state">更多动态</nuxt-link></Col>
              <Col span="4"><nuxt-link to="/post/" class="more">更多</nuxt-link></Col>
            </Row>
            <div class="row-con" v-for="(item,index) in list" :key="index">
              <div>
                <span class="circle"></span>
                <span class="circle-con">
                <a @click="jump(item.articleId)">{{item.title}}</a>
              </span>
              </div>
            </div>
          </Col>
        </Row>
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
        <div class="join-market-title"><span class="border"></span><span>加入市场</span></div>
        <Row class="join-market-con">
          <Col span="6" class="col">
            <Row>
              <Col span="8"><img src="https://qiniu.easyapi.com/market/index/ic_time.png" alt=""></Col>
              <Col span="16" style="padding: 30px 0">
                <p class="text">提升开发效率</p>
                <p class="join-market-text">提供统一风格接口服务</p>
              </Col>
            </Row>
          </Col>
          <Col span="6" class="col">
            <Row>
              <Col span="8"><img src="https://qiniu.easyapi.com/market/index/ic_money.png" alt=""></Col>
              <Col span="16" style="padding: 30px 0">
                <p class="text">服务转化收益</p>
                <p class="join-market-text">把您的服务共享出来</p>
              </Col>
            </Row>
          </Col>
          <Col span="6" class="col">
            <Row>
              <Col span="8"><img src="https://qiniu.easyapi.com/market/index/ic_earth.png" alt=""></Col>
              <Col span="16" style="padding: 30px 0">
                <p class="text">繁荣数据生态</p>
                <p class="join-market-text">喂养数据，制造生态</p>
              </Col>
            </Row>
          </Col>
          <Col span="6" class="col">
            <Row>
              <Col span="8"><img src="https://qiniu.easyapi.com/market/index/ic_feedback.png" alt=""></Col>
              <Col span="16" style="padding: 30px 0">
                <p class="text">让世界拥抱API</p>
                <p class="join-market-text">让一切服务通过API相连</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import axios from '~/plugins/axios'
  import {getServiceList} from '~/api/api'

  export default {
    name: 'index',
    head() {
      return {
        title: '首页 - EasyAPI服务市场',
        meta: [
          {charset: 'utf-8'},
          {name: 'viewport', content: 'width=device-width, initial-scale=1'},
          {hid: 'description', name: 'description', content: '服务市场首页'},
          {hid: 'keyswords', name: 'keyswords', content: '服务市场首页'}
        ]
      }
    },
    components: {
      Header,
      Footer
    },
    data() {
      return {
        recommendServiceList: [],
        newestServiceList: [],
        arr: [],
        list: [],
        totalPages: 0
      };
    },
    async asyncData({params, error}) {
      let [res1, res2] = await Promise.all([
        axios.get(getServiceList + "?sort=sales,desc"),

      ])
      return {
        recommendServiceList: res1.data.content,

      }
    },
    methods: {
      getNewestServiceList() {
        axios.get(getServiceList + "?sort=addTime,desc").then(res => {
          this.newestServiceList = res.data.content
        })
      },
      getArticleList: function () {
        axios.get(`https://api2.easyapi.com/api/articles?appKey=ja4fkcz35kfqywi7&appSecret=k1v8c637vr4swgr8&size=7`).then(res => {
          this.list = this.list.length > 0 ? this.list.concat(res.data.content) : res.data.content
          this.totalPages = res.data.totalPages
        })
      },
      getService(index) {
      },
      jump(articleId) {
        this.$router.push(`/post/${articleId}`)
      }
    },
    created() {
      this.getNewestServiceList();
      this.getArticleList()
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .lastest-update-con-bottom {
    width: 100%;
    height: auto;
    display: flex;
    margin-top: 10px;
  }

  .lastest-update-con-bottom .scenarioServices {
    width: 285px;
    height: 146px;
    background: url("https://qiniu.easyapi.com/market/index/scene.png") no-repeat;
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
    background: url("https://qiniu.easyapi.com/market/index/jiaofei.png") no-repeat;
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
    background: url("https://qiniu.easyapi.com/market/index/finance.png") no-repeat;
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
    background: url("https://qiniu.easyapi.com/market/index/e_invoice.png") no-repeat;
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
<style lang="stylus">
  .container {
  }

  li {
    list-style: none;
  }

  .index-container {
    font-sie: 12px;
    color: #333;
    width: 1200px;
    margin: 0 auto;
    /*服务市场分类*/

    .service-market {
      width 100%;

      a {
        color #fff;
      }
      height: 372px;

      .service-title {
        color: #fff;
        font-size 16px;
        border-bottom: 1px solid #8ce0eb;
        height: 45px;
        line-height: 45px;

        h4 {
          margin-left 10px;
          font-size 16px
        }
      }

      .service-market-left {
        float left;
        width 22%;
        height 100%;
        background: #1bc1d6;

        .row {
          height 40px;
          line-height: 40px;

          .col {
            border-bottom: 1px solid #8ce0eb;
          }

          .col:nth-of-type(3n+1) {
            padding-left: 10px;
            height 41px;

            a {
              display inline-block
              width 58px;
              height 22px;
              background-color: rgba(0, 0, 0, 0.1);
              margin 0 auto
              line-height 22px
              text-align center
            }
          }

          .col:nth-of-type(3n) {
            padding-right: 30px;
          }
        }
      }

      .service-market-right {
        margin-left 1%;
        float left;
        width 77%;
        height 100%;

        img {
          width 100%;
          height 100%;
        }
      }
    }

    /*推荐服务*/

    .recommend-service {
      margin-top 40px;

      a {
        color: #333;
      }
      color #333;

      .recommend-service-title {
        font-size 18px;

        .border {
          border-left 5px solid #0fc5fe;
          margin-right 10px;
        }
      }

      .recommend-service-con {
        text-align center;
        margin-top 20px;
        overflow hidden;

        .col {
          padding 40px 40px 20px;
          border 1px solid #f4f4f4;
          width 19%;
          float left;
          margin-left: 15px;
          margin-bottom: 20px;

          .text {
            font-size 16px;
            margin-top 40px;
          }

          .price {
            margin-top 20px;
            color: #ff3636;
            margin-bottom 10px;
            font-size 14px;
          }

          img {
            width 100px;
          }
        }

        .col:first-of-type {
          margin-left 0 !important;
        }

        .col:nth-of-type(5n+1) {
          margin-left 0 !important;
        }
      }
    }

    //最新更新

    .lastest-update {
      margin-top 40px;
      color #333;

      a {
        color #333;
      }

      .lastest-update-title {
        font-size 18px;
        margin-bottom 40px;

        .border {
          border-left 5px solid #57e7b8;
          margin-right 10px;
        }
      }

      .lastest-update-con-top {
        .lastest-update-con-left {
          height 100%;

          .col {
            img {
              width 100px;
            }

            .text {
              font-size 16px;
              margin-top 10px;
              width 100px;
              text-align center;
              min-height 60px;
            }
          }
        }

        .lastest-update-con-right {
          min-height: 310px;
          background #f2f6f6;
          padding 10px;

          .row {
            height 30px;
            line-height 30px;

            .more-state {
              font-size 18px;
            }

            .more {
              font: 14px;
              color #999;
            }
          }

          .row-con {
            margin-top 5px;

            div {
              height 30px;
              line-height 30px;

              .circle {
                display block;
                float left;
                width 5px;
                height 5px;
                background-color: #1cc1d5;
                border-radius: 2px;
                margin-top 13px;
              }

              .circle-con {
                // float left;
                display inline-block
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                width: 250px
                margin-left 7px
                color #333
              }
            }
          }
        }
      }
    }

    /*加入市场*/

    .join-market {
      margin-top 40px;

      a {
        color #000;
      }

      .join-market-title {
        font-size 18px;

        .border {
          border-left 5px solid #fe960f;
          margin-right 10px;
        }
      }

      .join-market-con {
        margin-bottom 40px;
        margin-top 20px;
        height 100px;
        font-size 14px;

        .text {
          font-weight 700;
          font-size 14px;
        }

        .join-market-text {
          color: #888;
          font-size: 12px;
        }

        img {
          width 90%;
        }
      }
    }
  }

</style>


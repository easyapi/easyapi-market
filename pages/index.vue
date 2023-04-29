<script setup lang="ts">
import { onMounted, reactive } from 'vue'

import Category from './components/category.vue'

import { service } from '@/api/service'
import { article } from '@/api/article'

const data = reactive({
  recommendServiceList: [],
  newestServiceList: [],
  list: [],
  totalPages: 0,
})

function getServiceList() {
  service.getServiceList({ sort: 'sales,desc' }).then((res: any) => {
    data.recommendServiceList = res.content
  })
}

function getNewestServiceList() {
  service.getServiceList({ sort: 'addTime,desc' }).then((res: any) => {
    data.newestServiceList = res.content
  })
}

function getArticleList() {
  const params = { size: 7 }
  article.getArticleList(params).then((res: any) => {
    data.list = data.list.length > 0 ? data.list.concat(res.content) : res.content
    data.totalPages = res.totalPages
  })
}

onMounted(() => {
  getServiceList()
  getNewestServiceList()
  getArticleList()
})

useHead(() => {
  return {
    title: 'EasyAPI服务市场 - API接口服务、API场景化服务',
    meta: [
      {
        name: 'description',
        content:
          'EasyAPI服务市场为您提供各类API接口服务，各类场景化接口服务，例如类似有赞、微盟的全套微商城API接口，非核心业务模块接口EasyAPI均能为为您通过，欢迎联系技术专线咨询！',
      },
      {
        name: 'keyword',
        content:
          'API接口,API接口服务,API场景化服务,电子发票API,微商城API接口,水电煤缴费API接口,手机话费充值API接口,金融API接口,医疗健康API接口,会员营销API接口',
      },
    ],
  }
})
</script>

<template>
  <div>
    <Header />
    <div class="main">
      <div class="service-market">
        <Category />
        <div class="service-market-right">
          <a href="https://www.easyapi.com" target="_blank">
            <img src="https://qiniu.easyapi.com/market/ad/easyapi.png" alt>
          </a>
        </div>
      </div>

      <div class="recommend-service">
        <div class="recommend-service-title">
          <span class="border" />
          <span>推荐服务</span>
        </div>
        <div class="recommend-service-con">
          <div v-for="(item, index) in data.recommendServiceList" :key="index" class="col">
            <nuxt-link :to="{ name: 'service-id', params: { id: item.serviceId } }">
              <p class="img">
                <img :src="item.img" alt>
              </p>
              <p class="text">
                {{ item.name }}
              </p>
              <p v-if="item.type === 1" class="price">
                免费
              </p>
              <p v-if="item.type === 2" class="price">
                ￥{{ item.unitPrice }}/次
              </p>
              <p v-if="item.type === 3" class="price">
                ￥{{ item.unitPrice }}/月
              </p>
              <p v-if="item.type === 4" class="price">
                按需
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="newest-update">
        <div class="newest-update-title">
          <span class="border" />
          <span>最新更新</span>
        </div>
        <div class="newest-update-con-top">
          <div class="newest-update-con-left">
            <div class="row">
              <div v-for="(item, index) in data.newestServiceList" :key="item.serviceId" class="col">
                <nuxt-link v-if="index < 8" class="col-item flex-c" :to="{ name: 'service-id', params: { id: item.serviceId } }">
                  <p class="img">
                    <img :src="item.img" alt>
                  </p>
                  <p class="text">
                    {{ item.name }}
                  </p>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="newest-update-con-right">
            <div class="row flex justify-between">
              <div>
                <span class="more-state">更多动态</span>
              </div>
              <div>
                <a href="https://www.easyapi.com/post/" target="_blank" class="more">更多</a>
              </div>
            </div>
            <div v-for="(item, index) in data.list" :key="index" class="row-con">
              <div>
                <span class="circle" />
                <span class="circle-con">
                  <a :href="`https://www.easyapi.com/post/${item.articleId}`" target="_blank">{{ item.title }}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="newest-update-con-bottom">
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
          <span class="border" />
          <span>加入市场</span>
        </div>
        <div class="join-market-con">
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_time.png" alt>
              </div>
              <div>
                <p class="text">
                  提升开发效率
                </p>
                <p class="join-market-text">
                  提供统一风格接口服务
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_money.png" alt>
              </div>
              <div>
                <p class="text">
                  服务转化收益
                </p>
                <p class="join-market-text">
                  把您的服务共享出来
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_earth.png" alt>
              </div>
              <div>
                <p class="text">
                  繁荣数据生态
                </p>
                <p class="join-market-text">
                  喂养数据，制造生态
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="flex items-center">
              <div class="img-box">
                <img src="https://qiniu.easyapi.com/market/index/ic_feedback.png" alt>
              </div>
              <div>
                <p class="text">
                  让世界拥抱API
                </p>
                <p class="join-market-text">
                  让一切服务通过API相连
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@media screen and (min-width: 1200px) {
  .newest-update-con-top {
    display: flex;
    justify-content: space-between;

    .newest-update-con-left {
      width: 60%;

      .col {
        width: 25%;
      }
    }

    .newest-update-con-right {
      width: 40%;
    }
  }

  .join-market-con {
    .col {
      width: 25%;
    }
  }

  .recommend-service-con {
    .col {
      width: 19%;

      .text {
        font-size: 16px;
      }
    }
  }

  .service-market-left {
    width: 22%;
  }

  .service-market-right {
    width: 77%;
    margin-left: 1%;
  }

  .newest-update-con-bottom span {
    width: 285px;
    height: 146px;
  }

  .newest-update-con-bottom span a {
    line-height: 146px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  .newest-update-con-top {
    display: flex;
    justify-content: space-between;

    .newest-update-con-left {
      width: 60%;

      .col {
        width: 25%;
      }
    }

    .newest-update-con-right {
      width: 40%;
    }
  }

  .join-market-con {
    .col {
      width: 25%;
    }
  }

  .recommend-service-con {
    .col {
      width: 19%;

      .text {
        font-size: 12px;
        height: 36px;
      }
    }
  }

  .service-market-left {
    width: 100%;
  }

  .service-market-right {
    width: 100%;
    margin-top: 20px;
  }

  .newest-update-con-bottom span {
    width: 178px;
    height: 106px;
  }

  .newest-update-con-bottom span a {
    line-height: 106px;
  }
}

@media screen and (min-width: 500px) and (max-width: 768px) {
  .recommend-service-con {
    .col {
      width: 49%;
    }
  }

  .newest-update-con-left {

    .row {
      flex-wrap: wrap;
    }

    .col {
      width: 50%;
    }
  }

  .join-market-con {
    flex-wrap: wrap;
    margin-bottom: 20px;

    .col {
      width: 50%;
      margin-bottom: 20px;
    }
  }

  .service-market-right {
    width: 100%;
    margin-top: 20px;
  }

  .newest-update-con-bottom span {
    width: 230px;
    height: 106px;
  }

  .newest-update-con-bottom span a {
    line-height: 106px;
  }

  .newest-update-con-bottom .scenarioServices {
    margin-bottom: 10px;
  }
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .recommend-service-con {
    .col {
      width: 95%;
    }
  }

  .newest-update-con-left {

    .row {
      flex-wrap: wrap;
    }

    .col {
      width: 50%;
    }
  }

  .join-market-con {
    flex-wrap: wrap;
    margin-bottom: 20px;

    .col {
      width: 100%;
      margin-bottom: 20px;
      margin-left: 20px;
    }
  }

  .service-market-right {
    width: 100%;
    margin-top: 20px;
  }

  .newest-update-con-bottom span {
    width: 140px;
    height: 86px;
  }

  .newest-update-con-bottom span a {
    line-height: 86px;
  }

  .newest-update-con-bottom .scenarioServices {
    margin-bottom: 10px;
  }
}

.main {
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
      height: 100%;
      background: #00b2c8;

      .service-title {
        color: #fff;
        font-size: 16px;
        border-bottom: 1px solid #0aa5b7;
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
          border-bottom: 1px solid #0aa5b7;
          height: 41px;
          display: flex;
          align-items: center;
          background: #00b2c8;
        }

        .col:nth-of-type(3n + 1) {
          padding-left: 10px;
          height: 41px;

          a {
            display: inline-block;
            width: 58px;
            height: 22px;
            background-color: rgba(0, 0, 0, 0.1);
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
      float: left;
      margin-bottom: 20px;

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
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      text-align: center;
      margin-top: 20px;
      overflow: hidden;

      .col {
        padding: 40px 40px 20px;
        border: 1px solid #f4f4f4;
        float: left;
        margin-bottom: 20px;

        .text {
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
  .newest-update {
    margin-top: 40px;
    color: #333;

    a {
      color: #333;
    }

    .newest-update-title {
      font-size: 18px;
      margin-bottom: 40px;

      .border {
        border-left: 5px solid #57e7b8;
        margin-right: 10px;
      }
    }

    .newest-update-con-top {
      font-size: 12px;
      margin-bottom: 20px;

      .newest-update-con-left {
        height: 100%;

        .row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .col {

          .col-item {
            width: 100%;
            align-items: center;
          }

          img {
            width: 100px;
          }

          .text {
            font-size: 16px;
            margin-top: 10px;
            text-align: center;
            min-height: 60px;
          }
        }
      }

      .newest-update-con-right {
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

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
      font-size: 14px;
      display: flex;
      justify-content: space-between;

      .text {
        font-weight: 700;
        font-size: 14px;
      }

      .join-market-text {
        color: #888;
        font-size: 12px;
      }

      .img-box {
        margin-right: 10px;

        img {
          width: 100%;
        }
      }
    }
  }
}

.newest-update-con-bottom {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap:wrap;
  margin-top: 10px;
  justify-content: space-between;
}

.newest-update-con-bottom .scenarioServices {
  background: url('https://qiniu.easyapi.com/market/index/scene.png') no-repeat;
  background-size: 100% 100%;
}

.newest-update-con-bottom .scenarioServices a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  display: block;
}

.newest-update-con-bottom .paymentAlbum {
  background: url('https://qiniu.easyapi.com/market/index/jiaofei.png') no-repeat;
  background-size: 100% 100%;
}

.newest-update-con-bottom .paymentAlbum a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  display: block;
}

.newest-update-con-bottom .financialAlbum {
  background: url('https://qiniu.easyapi.com/market/index/finance.png') no-repeat;
  background-size: 100% 100%;
}

.newest-update-con-bottom .financialAlbum a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  display: block;
}

.newest-update-con-bottom .clickInvoice {
  background: url('https://qiniu.easyapi.com/market/index/e_invoice.png') no-repeat;
  background-size: 100% 100%;
}

.newest-update-con-bottom .clickInvoice a {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  display: block;
}
</style>

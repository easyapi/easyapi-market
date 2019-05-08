<template>
  <div>
    <Header></Header>
    <div class="container">
      <Row class="service-detail-con">
        <Col :span="18" class="service-detail-left">
          <Row class="service-detail-left-title">
            <Col :span="20" class="col-left">
              <div class="img"><img v-bind:src="service.img" alt=""></div>
              <div class="con">
                <p class="con-title">{{service.name}}</p>
                <p class="con-button">
                  <span v-if="service.category==1"><a herf="">接口服务</a></span>
                  <span v-if="service.category==2"><a herf="">场景服务</a></span>
                  <span v-if="service.category==3"><a herf="">数据服务</a></span>
                  <span v-if="service.state==0"><a herf="">未开通</a></span>
                  <span v-if="service.state==1"><a herf="">正常</a></span>
                  <span v-if="service.state==-1"><a herf="">异常</a></span>
                </p>
                <p class="con-con">
                  <span>{{service.serviceType.name}}</span>
                  |
                  <span>{{service.sales}}次接入</span>
                </p>
              </div>
            </Col>
            <Col :span="4" class="col-right">
              <p v-if="service.hasConsole===true">
                <Button @click="homepage(service.url)">进入官网</Button>
              </p>
              <p>
                <Button>API文档</Button>
              </p>
            </Col>
          </Row>
          <div class="combo">
            <div class="combo-con" v-if="service.type===2">
              <span>套餐:</span>
              <Button :class="[clicked===index?'active':'']" v-for="(item, index) in servicePriceList" :key="index" @click="changeItem(index)">{{item.times}}次
              </Button>
            </div>
            <div class="combo-con" v-if="service.type===3">
              <span>套餐:</span>
              <Button :class="[clicked===index?'active':'']" v-for="(item, index) in servicePriceList" :key="index" @click="changeItem(index)">{{item.month}}个月
              </Button>
            </div>
            <div class="price">
              <p v-if="service.type===2">
                <span>价格：</span>
                <span>{{servicePriceList[clicked].price}}</span>
                <span>元</span><span>（约{{servicePriceList[clicked].price/servicePriceList[clicked].times}}元/次）</span>
              </p>
              <p v-if="service.type===3">
                <span>价格：</span>
                <span>{{servicePriceList[clicked].price}}</span>
                <span>元</span><span>（约{{parseInt(servicePriceList[clicked].price/servicePriceList[clicked].month)}}元/月）</span>
              </p>
            </div>
            <div class="con-btn">
              <Button v-if="service && service.ifBuy == true" @click="use(service.url,service.hasConsole,service.serviceId)">
                立即使用
              </Button>
              <Button v-else @click="subscribeDialog()">立即开通</Button>
            </div>
          </div>
          <div class="service-explain">
            <div class="title">服务说明</div>
            <div class="border"></div>
            <div class="img service-detail-imgs" v-html="service.content" style="text-align: center"></div>
          </div>
        </Col>
        <Col :span="6" class="service-detail-right">
          <div class="contact">
            <div class="customer">
              <p class="title">在线客服</p>
              <p class="img">
              <span><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=149151419&site=qq&menu=yes"><img
                border="0" src="http://wpa.qq.com/pa?p=2:149151419:51" alt="点击这里给我发消息"
                title="点击这里给我发消息"/></a></span><span class="text">EasyAPI工程师</span>
              </p>
            </div>
            <div class="time">
              <p>服务时间</p>
              <p style="margin-top: 12px;">9:00-21:00</p>
            </div>
            <div class="email">
              <p>联系邮箱</p>
              <p style="margin-top: 12px;color: #3774d3">leida#easyapi.com</p>
            </div>
            <div class="phone" style="margin-top: 18px;">
              <p>联系电话</p>
              <p style="margin-top: 12px;">136-5617-1020</p>
            </div>
          </div>
          <div class="scene">
            <div class="title">场景化服务</div>
            <div class="scene-con">
              <div class="img">
                <a href="https://shop.easyapi.com"><img src="https://qiniu.easyapi.com/market/right/shop.png" alt="微商城"></a>
              </div>
              <div class="con">
                <p>微商城</p>
                <p>API商城一种全新的商城开发形式</p>
              </div>
            </div>
            <div class="scene-con">
              <div class="img">
                <a href="https://ad.easyapi.com"><img src="https://qiniu.easyapi.com/market/right/ad.png" alt="广告管家"></a>
              </div>
              <div class="con">
                <p>广告管家</p>
                <p>独立第三方一站式广告管理系统</p>
              </div>
            </div>
            <div class="scene-con">
              <div class="img">
                <a href="https://withdraw.easyapi.com"><img src="https://qiniu.easyapi.com/market/right/withdraw.png" alt="快速提现"></a>
              </div>
              <div class="con">
                <p>快速提现</p>
                <p>3小时即可让自己的产品拥有提现模块功能</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <Modal
      title="开通服务"
      v-model="subscribe"
      @on-ok="subscribeService">
      <p v-if="service.type===1" style="text-align: center;font-size: 14px">确定开通此服务吗？</p>
      <p v-if="service.type===2" style="text-align: center;font-size: 14px">开通即送100次免费体验次数，确定开通此服务吗？</p>
      <p v-if="service.type===3" style="text-align: center;font-size: 14px">开通即送7天免费体验期，确定开通此服务吗？</p>
    </Modal>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import axios from '~/plugins/axios'
  import Cookies from 'js-cookie'

  export default {
    name: 'service-detail',
    head() {
      return {
        title: this.service.name + ' - EasyAPI服务市场',
        meta: [
          {charset: 'utf-8'},
          {name: 'viewport', content: 'width=device-width, initial-scale=1'},
          {hid: 'description', name: 'description', content: '服务市场详情'},
          {hid: 'keyswords', name: 'keyswords', content: '服务市场详情'}
        ]
      }
    },
    components: {
      Header,
      Footer
    },
    data() {
      return {
        subscribe: false,
        service: '',
        clicked: 0,
        servicePriceList: [],
        isIfBuy: false
      };
    },
    async asyncData({params, error}) {
      let [res1, res2] = await Promise.all([
        axios.get(`/api/service/${params.id}`, {
          headers: {'Authorization': 'Bearer ' + Cookies.get("authenticationToken")}
        }),
        axios.get(`https://api2.easyapi.com/console/servicePrice?serviceId=${params.id}`, {
          headers: {'Authorization': 'Bearer ' + Cookies.get("authenticationToken")}
        })
      ])
      if (res2.data.code !== 0) {
      }
      console.log(res1.data.content,'res1.data.content  接口打印')
      Cookies.set('objService',JSON.stringify(res1.data.content) )

      return {
        service: res1.data.content,
        servicePriceList: res2.data.content
      }
    },
    created() {
      if(Cookies.get('objService')) {
          this.service =JSON.parse( Cookies.get('objService')) ;
          console.log(this.service,'this.service')
      }
    },
    mounted() {

    },
    methods: {
      use(url, hasConsole, serviceId) {
        if (hasConsole === true) {
          window.location.href = 'https://' + url + '.easyapi.com/console/'
        } else {
          this.$router.push({path: "https://service.easyapi.com/Statistics", query: {serviceId: serviceId}})
        }
      },
      homepage(url) {
        window.location.href = 'https://' + url + '.easyapi.com/'
      },
      changeItem(index) {
        this.clicked = index;
      },
      subscribeDialog() {
        this.subscribe = true
      },
      subscribeService() {
        axios({
          headers: {
            'Authorization': 'Bearer ' + Cookies.get("authenticationToken")
          },
          method: 'post',
          url: '/console/team/service/' + this.$route.params.id + '/subscribe',
        }).then(res => {
          this.$Message.success(res.data.message);
        }).catch(error => {
          if (error.response.data.code === -9) {
            this.$Message.warning("请先登录");
            window.location.href = "https://account.easyapi.com/login";
          } else {
            this.$Message.warning(error.response.data.message);
          }
        });
      },
    },
  }
</script>

<style lang="stylus">
  .service-detail-con {
    .service-detail-left {
      padding-right 100px;

      .service-detail-left-title {
        border-bottom 1px solid #f4f4f4;

        .col-left {
          .img {
            float left;

            img {
              width 100px;
              height: 100px;
            }
          }

          .con {
            float left;
            margin-left 20px;

            .con-title {
              font-size 20px;
              color #333;
            }

            .con-button {
              margin-top 10px;
              margin-bottom 10px;
              font-size 14px;

              span {
                a {
                  padding 1px 3px;
                }
              }

              span:first-of-type {
                a {
                  color: #1ac1d6;
                  border: solid 1px #1ac1d6;
                }
              }

              span:last-of-type {
                a {
                  color: #27d61a;
                  border: solid 1px #27d61a;
                }
              }
            }

            .con-con {
              color: #999;
            }
          }
        }

        .col-right {
          padding-left 20px;

          p {
            Button {
              width: 100%;
              height: 34px;
              color: #18c1d6;
              border: 1px solid #18c1d6;
              border-radius 0;
            }
          }

          p:last-of-type {
            margin-top 10px;
          }
        }
      }

      .combo {
        margin-top 20px;

        .combo-con {
          Button {
            min-width 80px;
            height 40px;
            border-radius 0;
            margin-left 10px;
            font-size 14px;
          }

          .active {
            background-color: #1ac1d6;
            color #fff;
            border none;
          }
        }

        .price {
          margin-top 30px;
          margin-bottom 35px;
        }

        .con-btn {
          Button {
            width: 140px;
            height: 40px;
            background-color: #1ac1d6;
            border-radius 0;
            color: #fff;
            font-size 14px;
          }
        }
      }

      .service-explain {
        margin-top 60px;

        .title {
          padding-bottom 15px;
          text-align center;
          font-size: 16px;
          color: #1ac1d6;
          border-bottom 2px solid #1ac1d6;
          width 100px;
        }

        .border {
          border-bottom 1px solid #f4f4f4;
          margin-bottom 20px;
        }

        .img {
          width 100%;
          min-height height 288px;
        }
        .service-detail-imgs > div {
          display flex
          flex-direction column
          align-items center
        }
      }
    }

    .service-detail-right {
      .contact {
        background #f5f6f7;
        padding 20px;
        font-size 14px;

        .customer {
          padding-bottom 27px;
          border-bottom 1px solid #ddd;

          .title {
            margin-bottom 18px;
            font-size 18px;
          }

          .img {
            .text {
              margin-left 10px;
              font-size 14px;
            }
          }
        }
      }

      .scene {
        padding 28px 29px 29px 30px;
        margin-top 15px;
        background #f5f6f7;

        .title {
          font-size: 24px;
          color: #333333;
          margin-bottom 20px;
        }

        .scene-con {
          img {
            width 100%;
          }

          .con {
            margin-top 20px;
            margin-bottom 29px;

            p:first-of-type {
              margin-bottom 14px;
              font-size 18px;
              color #333;
            }

            p:last-of-type {
              margin-bottom 14px;
              font-size 14px;
              color #666;
            }
          }

          .con:last-of-type {
            margin-bottom 0;
          }
        }

        .scene-con:last-of-type {
          .con {
            margin-bottom 0;

            p:last-of-type {
              margin-bottom 0;
            }
          }
        }
      }
    }
  }
</style>

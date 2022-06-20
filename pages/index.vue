<template>
  <div>
    <Header></Header>
    <div class='main'>
      <div class='service-market'>
        <div class='service-market-left'>
          <div class='service-title'>
            <h4>服务市场分类</h4>
          </div>
          <el-row class='row'>
            <el-col :span='8' class='col'>
              <a class='col-fl'>生活常用</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>天气预报</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>条码查询</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>即时通讯</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>短信服务</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>语音服务</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>充值缴费</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>加油卡充值</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>话费流量</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>开发服务</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>内容管理</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>广告管家</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>医疗健康</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>常见疾病</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>生活常用</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>金融征信</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>企业开票信息</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>生活常用</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>电商购物</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>生活常用</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>生活常用</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>基础数据</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>省市区数据</a>
            </el-col>
            <el-col :span='8' class='col'>
              <a class='col-fl'>生活常用</a>
            </el-col>
          </el-row>
        </div>
        <div class='service-market-right'>
          <a href='https://www.easyapi.com' target='_blank'>
            <img src='https://qiniu.easyapi.com/market/ad/easyapi.png' alt />
          </a>
        </div>
      </div>

      <div class='recommend-service'>
        <div class='recommend-service-title'>
          <span class='border'></span>
          <span>推荐服务</span>
        </div>
        <div class='recommend-service-con'>
          <div class='col' v-for='(item, index) in recommendServiceList' :key='index'>
            <nuxt-link :to="{ name: 'service-id', params: { id: item.serviceId } }">
              <p class='img'>
                <img v-bind:src='item.img' alt />
              </p>
              <p class='text'>{{ item.name }}</p>
              <p class='price' v-if='item.type === 1'>免费</p>
              <p class='price' v-if='item.type === 2'>
                ￥{{ item.unitPrice }}/次
              </p>
              <p class='price' v-if='item.type === 3'>
                ￥{{ item.unitPrice }}/月
              </p>
              <p class='price' v-if='item.type === 4'>按需</p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!--最新更新-->
      <div class='newest-update'>
        <div class='newest-update-title'>
          <span class='border'></span>
          <span>最新更新</span>
        </div>
        <el-row class='newest-update-con-top'>
          <el-col :span='18' class='newest-update-con-left'>
            <el-row class='row'>
              <el-col :span='6' class='col' v-for='(item, index) in newestServiceList' :key='item.serviceId'>
                <nuxt-link v-if='index < 8' :to="{ name: 'service-id', params: { id: item.serviceId } }">
                  <p class='img'>
                    <img v-bind:src='item.img' alt />
                  </p>
                  <p class='text'>{{ item.name }}</p>
                </nuxt-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span='6' class='newest-update-con-right'>
            <el-row class='row'>
              <el-col :span='20'>
                <span class='more-state'>更多动态</span>
              </el-col>
              <el-col :span='4'>
                <a href='https://www.easyapi.com/post/' target='_blank' class='more'>更多</a>
              </el-col>
            </el-row>
            <div class='row-con' v-for='(item, index) in list' :key='index'>
              <div>
                <span class='circle'></span>
                <span class='circle-con'>
                  <a :href="'https://www.easyapi.com/post/'+item.articleId" target='_blank'>{{ item.title }}</a>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class='newest-update-con-bottom'>
          <span class='scenarioServices'>
            <nuxt-link to='/scene'>场景化服务</nuxt-link>
          </span>
          <span class='paymentAlbum'>
            <nuxt-link to='/jiaofei'>缴费专辑</nuxt-link>
          </span>
          <span class='financialAlbum'>
            <nuxt-link to='/finance'>金融专辑</nuxt-link>
          </span>
          <span class='clickInvoice'>
            <a target='_blank' href='https://fapiao.easyapi.com'>电子发票</a>
          </span>
        </div>
      </div>

      <div class='join-market'>
        <div class='join-market-title'>
          <span class='border'></span>
          <span>加入市场</span>
        </div>
        <el-row class='join-market-con'>
          <el-col :span='6' class='col'>
            <el-row>
              <el-col :span='8'>
                <img src='https://qiniu.easyapi.com/market/index/ic_time.png' alt />
              </el-col>
              <el-col :span='16' style='padding: 30px 0'>
                <p class='text'>提升开发效率</p>
                <p class='join-market-text'>提供统一风格接口服务</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span='6' class='col'>
            <el-row>
              <el-col :span='8'>
                <img src='https://qiniu.easyapi.com/market/index/ic_money.png' alt />
              </el-col>
              <el-col :span='16' style='padding: 30px 0'>
                <p class='text'>服务转化收益</p>
                <p class='join-market-text'>把您的服务共享出来</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span='6' class='col'>
            <el-row>
              <el-col :span='8'>
                <img src='https://qiniu.easyapi.com/market/index/ic_earth.png' alt />
              </el-col>
              <el-col :span='16' style='padding: 30px 0'>
                <p class='text'>繁荣数据生态</p>
                <p class='join-market-text'>喂养数据，制造生态</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span='6' class='col'>
            <el-row>
              <el-col :span='8'>
                <img src='https://qiniu.easyapi.com/market/index/ic_feedback.png' alt />
              </el-col>
              <el-col :span='16' style='padding: 30px 0'>
                <p class='text'>让世界拥抱API</p>
                <p class='join-market-text'>让一切服务通过API相连</p>
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
import Index from './index.js'

export default Index
</script>

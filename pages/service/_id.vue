<template>
  <div>
    <Header></Header>
    <div class="main">
      <el-row class="service-detail-con">
        <el-col :span="18" class="service-detail-left">
          <el-row class="service-detail-left-title" v-if="service">
            <el-col :span="20" class="col-left">
              <div class="img">
                <img v-bind:src="service.img" alt />
              </div>
              <div class="con">
                <p class="con-title">{{ service.name }}</p>
                <p class="con-button">
                  <span v-if="service.category === 1">
                    <a herf>接口服务</a>
                  </span>
                  <span v-if="service.category === 2">
                    <a herf>场景服务</a>
                  </span>
                  <span v-if="service.category === 3">
                    <a herf>数据服务</a>
                  </span>
                  <span v-if="service.state === 0">
                    <a herf>未开通</a>
                  </span>
                  <span v-if="service.state === 1">
                    <a herf>正常</a>
                  </span>
                  <span v-if="service.state === -1">
                    <a herf>异常</a>
                  </span>
                </p>
                <p class="con-con">
                  <span>{{ service.serviceType.name }}</span>
                  |
                  <span>{{ service.sales }}次接入</span>
                </p>
              </div>
            </el-col>
            <el-col :span="4" class="col-right">
              <p v-if="service.hasConsole === true">
                <el-button class="width-80" size="small" plain @click="homepage(service.url)">进入官网</el-button>
              </p>
              <p>
                <el-button class="width-80" @click="gotoPage(service.url)" size="small" plain>API文档</el-button>
              </p>
            </el-col>
          </el-row>
          <div class="combo">
            <div class="combo-con" v-if="service.type === 2">
              <span class="mg-rt-10">套餐:</span>
              <el-button :class="[clicked === index ? 'active' : '']" v-for="(item, index) in servicePriceList" :key="index" @click="changeItem(index)">
                {{ item.times }}次
              </el-button>
            </div>
            <div class="combo-con" v-if="service.type === 3">
              <span class="mg-rt-10">套餐:</span>
              <el-button :class="[clicked === index ? 'active' : '']" v-for="(item, index) in servicePriceList" :key="index" @click="changeItem(index)">
                {{ item.month }}个月
              </el-button>
            </div>
            <div class="price">
              <p v-if="service.type === 2 && servicePriceList[clicked]">
                <span>价格：</span>
                <span>{{ servicePriceList[clicked].price }}</span>
                <span>元</span>
                <span>（约{{ servicePriceList[clicked].price / servicePriceList[clicked].times }}元/次）</span>
              </p>
              <p v-if="service.type === 3 && servicePriceList[clicked]">
                <span>价格：</span>
                <span>{{ servicePriceList[clicked].price }}</span>
                <span>元</span>
                <span>（约{{ parseInt(servicePriceList[clicked].price / servicePriceList[clicked].month) }}元/月）</span>
              </p>
            </div>
            <div class="con-btn">
              <el-button type="primary" v-if="service && service.ifBuy" @click="use(service.url, service.hasConsole, service.serviceId)">立即使用</el-button>
              <el-button type="primary" v-else @click="subscribeDialog">立即开通</el-button>
            </div>
          </div>
          <div class="service-explain">
            <div class="title">服务说明</div>
            <div class="border"></div>
            <div class="img service-detail-imgs" v-html="service.content" style="text-align: center"></div>
          </div>
        </el-col>
        <el-col :span="6" class="service-detail-right">
          <div class="contact">
            <div class="customer">
              <p class="title">在线客服</p>
              <div class="img flex-r">
                <a target="_blank" class="flex-c" href="https://wpa.qq.com/msgrd?v=3&uin=149151419&site=qq&menu=yes">
                  <img border="0" src="https://wpa.qq.com/pa?p=2:149151419:51" alt="点击这里给我发消息" title="点击这里给我发消息" />
                </a>
                <span class="text">EasyAPI工程师</span>
              </div>
            </div>
            <div class="time">
              <p>服务时间</p>
              <p style="margin-top: 12px">9:00-21:00</p>
            </div>
            <div class="email">
              <p>联系邮箱</p>
              <p style="margin-top: 12px; color: #3774d3">leida#easyapi.com</p>
            </div>
            <div class="phone" style="margin-top: 18px">
              <p>联系电话</p>
              <p style="margin-top: 12px">136-5617-1020</p>
            </div>
          </div>
          <div class="scene">
            <div class="title">场景化服务</div>
            <div class="scene-con">
              <div class="img">
                <a href="https://shop.easyapi.com">
                  <img src="https://qiniu.easyapi.com/market/right/shop.png" alt="微商城" />
                </a>
              </div>
              <div class="con">
                <p>微商城</p>
                <p>API商城一种全新的商城开发形式</p>
              </div>
            </div>
            <div class="scene-con">
              <div class="img">
                <a href="https://withdraw.easyapi.com">
                  <img src="https://qiniu.easyapi.com/market/right/withdraw.png" alt="快速提现" />
                </a>
              </div>
              <div class="con">
                <p>快速提现</p>
                <p>3小时即可让自己的产品拥有提现模块功能</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="开通服务" :visible.sync="subscribe" width="400px">
      <el-dialog width="30%" :visible.sync="establish" title="温馨提示" append-to-body>
        <p style="text-align: center; font-size: 14px">
          {{ message }}
        </p>
        <div slot="footer">
          <el-button @click="establish = false" v-if="buttonContent === '前 往'">取 消</el-button>
          <el-button type="primary" @click="jump">
            {{ buttonContent }}
          </el-button>
        </div>
      </el-dialog>
      <p v-if="service.type === 2" style="text-align: center; font-size: 14px">开通即送100次免费体验次数，确定开通此服务吗？</p>
      <p v-if="service.type === 3" style="text-align: center; font-size: 14px">开通即送7天免费体验期，确定开通此服务吗？</p>
      <p v-if="service.type === 4" style="text-align: center; font-size: 14px">确定开通此服务吗？请保持团队账户余额充足。</p>
      <p v-else style="text-align: center; font-size: 14px">确定开通此服务吗？</p>
      <div slot="footer">
        <el-button type="primary" @click="subscribeService">确 定</el-button>
      </div>
    </el-dialog>
    <Footer></Footer>
  </div>
</template>

<script>
import Detail from './_id.js'

export default Detail
</script>

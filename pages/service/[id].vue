<script setup lang="ts">
import './[id].scss'
import { ElMessage } from 'element-plus'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { service } from '@/api/service'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const route = useRoute()
// const { proxy: $vm } = getCurrentInstance()

const data = reactive({
  establish: false,
  subscribe: false,
  message: '暂无团队信息，请前往创建团队才能开通服务。',
  buttonContent: '前 往',
  service: '',
  clicked: 0,
  servicePriceList: [],
  size: 'medium',
})

function onCreated() {}
onCreated()

onMounted(() => {
  getServiceInfo()
})

function getScreenWidth(val) {
  if (val)
    data.size = 'small'
  else
    data.size = 'medium '
}

function use(url, hasConsole, serviceId) {
  if (hasConsole === true)
    window.location.href = `https://${url}.easyapi.com/console/`
  else
    window.location.href = `https://team.easyapi.com/stat?serviceId=${serviceId}`
}

function homepage(url) {
  window.location.href = `https://${url}.easyapi.com/`
}

function gotoPage(url) {
  window.location.href = url
}

function jump() {
  if (data.buttonContent === '前 往') {
    window.open(`https://team.easyapi.com/create-team?from=https://market.easyapi.com/service/${route.params.id}`, '_blank')
    data.message = '团队创建成功了吗？'
    data.buttonContent = '刷 新'
  } else {
    location.reload()
  }
}

function changeItem(index) {
  data.clicked = index
}

function subscribeDialog() {
  data.subscribe = true
}

function getServiceInfo() {
  service.getServiceInfo(route.params.id).then((res) => {
    data.service = res.content
  })
}

function subscribeService() {
  service.subscribeService(route.params.id)
    .then((res) => {
      /* Warn: Unknown source: $message */
      ElMessage.success(res.message)
      data.subscribe = false
      if (res.code === 1)
        getServiceInfo()
    })
    .catch((error) => {
      if (error.response.data.code === -9)
        window.location.href = `https://account.easyapi.com/login?from=https://market.easyapi.com/service/${route.params.id}`
      else if (error.response.data.code === -8)
        data.establish = true
    })
}
</script>

<template>
  <div>
    <Header @getScreenWidth="getScreenWidth" />
    <div class="main">
      <div class="service-detail-con">
        <div class="service-detail-left">
          <div v-if="service" class="service-detail-left-title">
            <div class="title-left">
              <div class="img">
                <img :src="data.service.img" alt>
              </div>
              <div class="con">
                <p class="con-title">
                  <!--                  {{ data.service.name }} -->
                </p>
                <p class="con-button">
                  <span v-if="data.service.category === 1" class="category">
                    <a herf>接口服务</a>
                  </span>
                  <span v-if="data.service.category === 2" class="category">
                    <a herf>场景服务</a>
                  </span>
                  <span v-if="data.service.category === 3" class="category">
                    <a herf>数据服务</a>
                  </span>
                  <span v-if="data.service.state === 0">
                    <a herf>未开通</a>
                  </span>
                  <span v-if="data.service.state === 1">
                    <a herf>正常</a>
                  </span>
                  <span v-if="data.service.state === -1">
                    <a herf>异常</a>
                  </span>
                </p>
                <p class="con-con">
                  <!-- <span>{{ data.service.serviceType.name }}</span> -->
                  |
                  <span>{{ data.service.sales }}次接入</span>
                </p>
              </div>
            </div>
            <div class="col-right">
              <p v-if="data.service.hasConsole === true">
                <el-button class="width-80" size="small" plain @click="homepage(data.service.url)">
                  进入官网
                </el-button>
              </p>
              <p>
                <el-button class="width-80" size="small" plain @click="gotoPage(data.service.url)">
                  API文档
                </el-button>
              </p>
            </div>
          </div>
          <div class="combo">
            <div v-if="data.service.type === 2" class="combo-con">
              <span class="mg-rt-10">套餐:</span>
              <div>
                <el-button v-for="(item, index) in servicePriceList" :key="index" :size="size" :class="[clicked === index ? 'active' : '']" @click="changeItem(index)">
                  {{ item.times }}次
                </el-button>
              </div>
            </div>
            <div v-if="data.service.type === 3" class="combo-con">
              <span class="mg-rt-10">套餐:</span>
              <el-button v-for="(item, index) in servicePriceList" :key="index" :size="size" :class="[clicked === index ? 'active' : '']" @click="changeItem(index)">
                {{ item.month }}个月
              </el-button>
            </div>
            <div class="price">
              <p v-if="data.service.type === 2 && data.servicePriceList[clicked]">
                <span>价格：</span>
                <span>{{ data.servicePriceList[clicked].price }}</span>
                <span>元</span>
                <span>（约{{ data.servicePriceList[clicked].price / data.servicePriceList[clicked].times }}元/次）</span>
              </p>
              <p v-if="data.service.type === 3 && data.servicePriceList[clicked]">
                <span>价格：</span>
                <span>{{ data.servicePriceList[clicked].price }}</span>
                <span>元</span>
                <span>（约{{ parseInt(data.servicePriceList[clicked].price / data.servicePriceList[clicked].month) }}元/月）</span>
              </p>
            </div>
            <div class="con-btn">
              <el-button v-if="service && service.ifBuy" :size="size" type="primary" @click="use(data.service.url, data.service.hasConsole, data.service.serviceId)">
                立即使用
              </el-button>
              <el-button v-else :size="size" type="primary" @click="subscribeDialog">
                立即开通
              </el-button>
            </div>
          </div>
          <div class="service-explain">
            <div class="title">
              服务说明
            </div>
            <div class="border" />
            <div class="img service-detail-imgs" style="text-align: center" v-html="data.service.content" />
          </div>
        </div>
        <div class="service-detail-right">
          <div class="contact">
            <div class="customer">
              <p class="title">
                在线客服
              </p>
              <div class="img flex-r">
                <a target="_blank" class="flex-c" href="https://wpa.qq.com/msgrd?v=3&uin=149151419&site=qq&menu=yes">
                  <img border="0" src="https://wpa.qq.com/pa?p=2:149151419:51" alt="点击这里给我发消息" title="点击这里给我发消息">
                </a>
                <span class="text">EasyAPI工程师</span>
              </div>
            </div>
            <div class="time">
              <p>服务时间</p>
              <p style="margin-top: 12px">
                9:00-21:00
              </p>
            </div>
            <div class="email">
              <p>联系邮箱</p>
              <p style="margin-top: 12px; color: #3774d3">
                leida#easyapi.com
              </p>
            </div>
            <div class="phone" style="margin-top: 18px">
              <p>联系电话</p>
              <p style="margin-top: 12px">
                136-5617-1020
              </p>
            </div>
          </div>
          <div class="scene">
            <div class="title">
              场景化服务
            </div>
            <div class="scene-con">
              <div class="img">
                <a href="https://shop.easyapi.com">
                  <img src="https://qiniu.easyapi.com/market/right/shop.png" alt="微商城">
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
                  <img src="https://qiniu.easyapi.com/market/right/withdraw.png" alt="快速提现">
                </a>
              </div>
              <div class="con">
                <p>快速提现</p>
                <p>3小时即可让自己的产品拥有提现模块功能</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model:visible="data.subscribe" title="开通服务" width="400px">
      <el-dialog v-model:visible="data.establish" width="30%" title="温馨提示" append-to-body>
        <p style="text-align: center; font-size: 14px">
          {{ data.message }}
        </p>
        <template #footer>
          <el-button v-if="data.buttonContent === '前 往'" @click="establish = false">
            取 消
          </el-button>
          <el-button type="primary" @click="jump">
            {{ data.buttonContent }}
          </el-button>
        </template>
      </el-dialog>
      <p v-if="data.service.type === 2" style="text-align: center; font-size: 14px">
        开通即送100次免费体验次数，确定开通此服务吗？
      </p>
      <p v-if="data.service.type === 3" style="text-align: center; font-size: 14px">
        开通即送7天免费体验期，确定开通此服务吗？
      </p>
      <p v-if="data.service.type === 4" style="text-align: center; font-size: 14px">
        确定开通此服务吗？请保持团队账户余额充足。
      </p>
      <p v-else style="text-align: center; font-size: 14px">
        确定开通此服务吗？
      </p>
      <template #footer>
        <el-button type="primary" @click="subscribeService">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <Footer />
  </div>
</template>
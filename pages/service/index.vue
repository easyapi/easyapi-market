<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { service } from '@/api/service'

const route = useRoute()
const router = useRouter()
const store = useStore()

const data = reactive({
  loading: false,
  isNoData: false,
  serviceList: [],
  layout: 'total, sizes, prev, pager, next, jumper',
  serviceTypeList: [],
  pageSize: 10, // 每页显示条数
  current: 1, // 当前的页数
  total: 0, // 记录总条数
})

const query = reactive({
  name: '' as any,
  serviceType: '全部' as any,
  payType: '全部' as any,
  sort: '1' as any,
})

watch(
  () => route.query,
  () => {
    getRouteQuery()
    getServiceList()
  }
)

function getRouteQuery() {
  query.name = route.query.name ? route.query.name : ''
  query.serviceType = route.query.serviceType ? route.query.serviceType : '全部'
  query.payType = route.query.payType ? route.query.payType : '全部'
  query.sort = route.query.sort ? route.query.sort : '1'
}

onMounted(() => {
  getRouteQuery()
  getServiceTypeList()
  getServiceList()
})

function getScreenWidth(val: any) {
  if (val < 500) data.layout = 'total,prev, pager, next'
  else data.layout = 'total, sizes, prev, pager, next, jumper'
}

function getServiceTypeList() {
  service.getServiceTypeList({}).then((res: any) => {
    data.serviceTypeList = res.content
  })
}

function getServiceList() {
  data.loading = true
  const params = {}
  if (query.name) params.name = query.name
  if (query.serviceType !== '全部') params.serviceTypeId = query.serviceType
  if (query.payType !== '全部') params.type = query.payType
  if (query.sort !== '全部')
    params.sort = query.sort === '1' ? 'addTime,desc' : 'sales,desc'
  params.size = data.pageSize
  params.page = data.current - 1
  service
    .getServiceList(params)
    .then((res) => {
      data.loading = false
      if (res.code === 1) {
        data.isNoData = false
        data.serviceList = res.content
        data.total = res.totalElements
      } else {
        data.isNoData = true
        data.serviceList = []
        data.total = 0
      }
    })
    .catch((error) => {
      data.loading = false
      console.error(error)
    })
}

function handleSizeChange(val: number) {
  data.pageSize = val
  getServiceList()
}

function handleCurrentChange(val: number) {
  data.current = val
  getServiceList()
}

function chargeServiceType(serviceType: any) {
  query.serviceType = serviceType
  router.replace({
    path: '/service',
    query: {
      name: route.query.name,
      serviceType,
      payType: route.query.payType,
      sort: route.query.sort,
    },
  })
}

function chargePayType(payType: any) {
  query.payType = payType
  router.replace({
    path: '/service',
    query: {
      name: route.query.name,
      serviceType: route.query.serviceType,
      payType,
      sort: route.query.sort,
    },
  })
}

function styleSwitch(sort: any) {
  query.sort = sort
  router.replace({
    path: '/service',
    query: {
      name: route.query.name,
      serviceType: route.query.serviceType,
      payType: route.query.payType,
      sort,
    },
  })
}

useHead(() => {
  return {
    title: 'API接口',
    meta: [
      { name: 'description', content: '服务市场API接口' },
      { name: 'keyword', content: '服务市场API接口' },
    ],
  }
})
</script>

<template>
  <div>
    <Header :callback="getServiceList" @getScreenWidth="getScreenWidth" />
    <div class="main">
      <div class="search-list">
        <div class="row">
          <div class="col-left">商品分类：</div>
          <div class="col-right">
            <div class="flex flex-wrap">
              <div>
                <a
                  class="col-right-con ml-4"
                  :class="{ active: query.serviceType === '全部' }"
                  @click="chargeServiceType('全部')"
                  >全部</a
                >
              </div>
              <div
                v-for="(item, index) in data.serviceTypeList"
                :key="index"
                class="ml-4"
              >
                <a
                  class="col-right-con"
                  :class="{
                    active: query.serviceType == item.serviceTypeId,
                  }"
                  @click="chargeServiceType(item.serviceTypeId)"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-left">付费类型：</div>
          <div class="col-right">
            <div class="flex flex-wrap">
              <div>
                <a
                  class="col-right-con ml-4"
                  :class="{ active: query.payType === '全部' }"
                  @click="chargePayType('全部')"
                  >全部</a
                >
              </div>
              <div class="ml-4">
                <a
                  class="col-right-con"
                  :class="{ active: query.payType === '1' }"
                  @click="chargePayType('1')"
                  >免费</a
                >
              </div>
              <div class="ml-4">
                <a
                  class="col-right-con"
                  :class="{ active: query.payType === '2' }"
                  @click="chargePayType('2')"
                  >收费</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-left" style="font-weight: 700">排序方式：</div>
          <div class="col-right">
            <div class="flex flex-wrap">
              <div>
                <a
                  class="col-right-con"
                  :class="{ tqActive: query.sort === '1' }"
                  @click="styleSwitch('1')"
                >
                  热门
                  <img
                    v-if="query.sort === '1'"
                    src="../../assets/images/arrow-down-blue.png"
                    alt="暂无数据"
                  />
                  <img
                    v-else
                    src="../../assets/images/arrow-down-gray.png"
                    alt="暂无数据"
                  />
                </a>
              </div>
              <div>
                <a
                  class="col-right-con"
                  :class="{ tqActive: query.sort === '2' }"
                  @click="styleSwitch('2')"
                >
                  最新
                  <img
                    v-if="query.sort === '2'"
                    src="../../assets/images/arrow-down-blue.png"
                    alt="暂无数据"
                  />
                  <img
                    v-else
                    src="../../assets/images/arrow-down-gray.png"
                    alt="暂无数据"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-loading="data.loading" class="recommend-service">
        <div class="recommend-service-con">
          <div
            v-for="(item, index) in data.serviceList"
            :key="index"
            class="col"
          >
            <nuxt-link :to="`/service/${item.serviceId}`">
              <p class="img">
                <img :src="item.img" alt />
              </p>
              <p class="text">
                {{ item.name }}
              </p>
              <p v-if="item.type === 1" class="price">免费</p>
              <p v-if="item.type === 2" class="price">
                ￥{{ item.unitPrice }}次
              </p>
              <p v-if="item.type === 3" class="price">
                ￥{{ item.unitPrice }}月
              </p>
              <p v-if="item.type === 4" class="price">按需</p>
            </nuxt-link>
          </div>
          <div v-if="data.isNoData" class="nodata">
            <img src="https://qiniu.easyapi.com/market/empty.png" alt />
            <p>暂无服务</p>
            <p>
              如果您有优质的提供商，欢迎给我们推荐
              <a href="leida@easyapi.com" class="text-no-data"
                >leida@easyapi.com</a
              >
            </p>
          </div>
        </div>
      </div>
      <div v-if="!data.isNoData" class="pagination">
        <client-only>
          <el-pagination
            background
            :layout="data.layout"
            :page-sizes="[10, 15, 30]"
            :page-size="data.pageSize"
            :current-page="data.current"
            :total="data.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </client-only>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import 'pages/service/index.scss';
@import 'pages/index.scss';
.el-pagination {
  justify-content: center !important;
}
</style>

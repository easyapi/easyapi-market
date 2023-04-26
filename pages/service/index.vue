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
  name: '',
  serviceTypeId: '全部',
  type: '全部',
  sort: '1',
  isNoData: false,
  serviceList: [],
  layout: 'total, sizes, prev, pager, next, jumper',

  serviceTypeList: [],
  pageSize: 10, // 每页显示条数
  current: 1, // 当前的页数
  total: 0, // 记录总条数
})

// watch(() => store.state.serviceName, (v, oldv) => {
//   data.name = store.state.serviceName
// })

watch(() => route.params, () => {
  getServiceList()
})

onMounted(() => {
  const name = route.query.name
  const type = route.query.type
  const payType = route.query.payType
  const sort = route.query.sort

  if (name)
    data.name = name as String

  if (type)
    data.serviceTypeId = type as String

  if (payType)
    data.type = payType as String

  if (sort)
    data.sort = sort as String
  getServiceTypeList()
  getServiceList()
})

function getScreenWidth(val) {
  if (val < 500)
    data.layout = 'total,prev, pager, next'
  else
    data.layout = 'total, sizes, prev, pager, next, jumper'
}

function getServiceTypeList() {
  service.getServiceTypeList({}).then((res: any) => {
    data.serviceTypeList = res.content
  })
}

function getServiceList() {
  data.loading = true
  const params = {}
  if (data.name)
    params.name = data.name

  if (data.serviceTypeId !== '全部')
    params.serviceTypeId = data.serviceTypeId

  if (data.type !== '全部') {
    if (data.type === '1')
      params.type = '1'
    else if (data.type === '2')
      params.type = '2'
  }
  if (data.sort !== '全部') {
    if (data.sort === '1')
      params.sort = 'addTime,desc'
    else if (data.sort === '2')
      params.sort = 'sales,desc'
  }
  params.size = data.pageSize
  params.page = data.current - 1
  service.getServiceList(params)
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

function getService(id) {
  data.serviceTypeId = id
  const name = route.query.name
  const payType = route.query.payType
  const sort = route.query.sort
  router.replace({
    path: '/service',
    query: {
      name,
      type: data.serviceTypeId,
      payType,
      sort,
    },
  })
}

function charge(t) {
  data.type = t
  const name = route.query.name
  const type = route.query.type
  const sort = route.query.sort
  router.replace({
    path: '/service',
    query: {
      name,
      type,
      payType: t,
      sort,
    },
  })
}

function styleSwitch(t) {
  data.sort = t
  const name = route.query.name
  const type = route.query.type
  const payType = route.query.payType
  router.replace({
    path: '/service',
    query: {
      name,
      type,
      payType,
      sort: t,
    },
  })
}
</script>

<template>
  <div>
    <Header :callback="getServiceList" @getScreenWidth="getScreenWidth" />
    <div class="main">
      <div class="search-list">
        <div class="row">
          <div class="col-left">
            商品分类：
          </div>
          <div class="col-right">
            <div class="flex flex-wrap">
              <div>
                <a class="col-right-con ml-4" :class="{ active: data.serviceTypeId === '全部' }" @click="getService('全部')">全部</a>
              </div>
              <div v-for="(item, index) in data.serviceTypeList" :key="index" class="ml-4">
                <a class="col-right-con" :class="{ active: data.serviceTypeId === item.serviceTypeId }" @click="getService(item.serviceTypeId)">{{ item.name }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-left">
            付费类型：
          </div>
          <div class="col-right">
            <div class="flex flex-wrap">
              <div>
                <a class="col-right-con ml-4" :class="{ active: data.type === '全部' }" @click="charge('全部')">全部</a>
              </div>
              <div class="ml-4">
                <a class="col-right-con" :class="{ active: data.type === '1' }" @click="charge('1')">免费</a>
              </div>
              <div class="ml-4">
                <a class="col-right-con" :class="{ active: data.type === '2' }" @click="charge('2')">收费</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-left" style="font-weight: 700">
            排序方式：
          </div>
          <div class="col-right">
            <div class="flex flex-wrap">
              <div>
                <a class="col-right-con" :class="{ tqActive: data.sort === '1' }" @click="styleSwitch('1')">
                  热门
                  <img v-if="data.sort === '1'" src="../../assets/images/arrow-down-blue.png" alt="暂无数据">
                  <img v-else src="../../assets/images/arrow-down-gray.png" alt="暂无数据">
                </a>
              </div>
              <div>
                <a class="col-right-con" :class="{ tqActive: data.sort === '2' }" @click="styleSwitch('2')">
                  最新
                  <img v-if="data.sort === '2'" src="../../assets/images/arrow-down-blue.png" alt="暂无数据">
                  <img v-else src="../../assets/images/arrow-down-gray.png" alt="暂无数据">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-loading="data.loading" class="recommend-service">
        <div class="recommend-service-con">
          <div v-for="(item, index) in data.serviceList" :key="index" class="col">
            <nuxt-link :to="`/service/${item.serviceId}`">
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
                ￥{{ item.unitPrice }}次
              </p>
              <p v-if="item.type === 3" class="price">
                ￥{{ item.unitPrice }}月
              </p>
              <p v-if="item.type === 4" class="price">
                按需
              </p>
            </nuxt-link>
          </div>
          <div v-if="data.isNoData" class="nodata">
            <img src="https://qiniu.easyapi.com/market/empty.png" alt>
            <p>暂无服务</p>
            <p>
              如果您有优质的提供商，欢迎给我们推荐
              <a href="leida@easyapi.com" class="text-no-data">leida@easyapi.com</a>
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
@import "pages/service/index.scss";
@import "pages/index.scss";
.el-pagination{
  justify-content: center !important;
}
</style>

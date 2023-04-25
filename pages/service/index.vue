<script>
import Index from './index.js'

export default Index
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
                <a class="col-right-con ml-4" :class="{ active: serviceTypeId === '全部' }" @click="getService('全部')">全部</a>
              </div>
              <div v-for="(item, index) in serviceTypeList" :key="index" class="ml-4">
                <a class="col-right-con" :class="{ active: serviceTypeId == item.serviceTypeId }" @click="getService(item.serviceTypeId)">{{ item.name }}</a>
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
                <a class="col-right-con ml-4" :class="{ active: type === '全部' }" @click="charge('全部')">全部</a>
              </div>
              <div class="ml-4">
                <a class="col-right-con" :class="{ active: type === '1' }" @click="charge('1')">免费</a>
              </div>
              <div class="ml-4">
                <a class="col-right-con" :class="{ active: type === '2' }" @click="charge('2')">收费</a>
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
                <a class="col-right-con" :class="{ tqActive: sort === '1' }" @click="styleSwitch('1')">
                  热门
                  <img v-if="sort === '1'" src="../../assets/images/arrow-down-blue.png" alt="暂无数据">
                  <img v-else src="../../assets/images/arrow-down-gray.png" alt="暂无数据">
                </a>
              </div>
              <div>
                <a class="col-right-con" :class="{ tqActive: sort === '2' }" @click="styleSwitch('2')">
                  最新
                  <img v-if="sort === '2'" src="../../assets/images/arrow-down-blue.png" alt="暂无数据">
                  <img v-else src="../../assets/images/arrow-down-gray.png" alt="暂无数据">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-loading="loading" class="recommend-service">
        <div class="recommend-service-con">
          <div v-for="(item, index) in serviceList" :key="index" class="col">
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
          <div v-if="isNoData" class="nodata">
            <img src="https://qiniu.easyapi.com/market/empty.png" alt>
            <p>暂无服务</p>
            <p>
              如果您有优质的提供商，欢迎给我们推荐
              <a href="leida@easyapi.com" class="text-no-data">leida@easyapi.com</a>
            </p>
          </div>
        </div>
      </div>
      <div v-if="!isNoData" class="pagination">
        <el-pagination
          background
          :layout="layout"
          :page-sizes="[10, 15, 30]"
          :page-size="pageSize"
          :current-page="current"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

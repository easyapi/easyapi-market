<template>
  <div>
    <Header v-bind:callback='getServiceList'></Header>
    <div class='main'>
      <div class='search-list'>
        <el-row class='row'>
          <el-col :span='2' class='col-left'>商品分类：</el-col>
          <el-col :span='22' class='col-right'>
            <el-row>
              <el-col :span='2'>
                <a
                  class='col-right-con'
                  :class="{active:serviceTypeId==='全部'}"
                  @click="getService('全部')"
                >全部</a>
              </el-col>
              <el-col :span='2' v-for='(item, index) in serviceTypeList' :key='index'>
                <a
                  class='col-right-con'
                  :class='{active:serviceTypeId==item.serviceTypeId}'
                  @click='getService(item.serviceTypeId,)'
                >{{ item.name }}</a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class='row'>
          <el-col :span='2' class='col-left'>付费类型：</el-col>
          <el-col :span='21' class='col-right'>
            <el-row>
              <el-col :span='2'>
                <a class='col-right-con' :class="{active:type==='全部'}" @click="charge('全部')">全部</a>
              </el-col>
              <el-col :span='2'>
                <a class='col-right-con' :class="{active:type==='1'}" @click="charge('1')">免费</a>
              </el-col>
              <el-col :span='2'>
                <a class='col-right-con' :class="{active:type==='2'}" @click="charge('2')">收费</a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class='row'>
          <el-col :span='2' class='col-left' style='font-weight:700;'>排序方式：</el-col>
          <el-col :span='21' class='col-right'>
            <el-row>
              <el-col :span='2'>
                <a class='col-right-con' :class="{tqActive:sort==='1'}" @click="styleSwitch('1')">
                  热门
                  <img src='../../assets/images/arrow-down-blue.png' alt='暂无数据' v-if="sort==='1'" />
                  <img src='../../assets/images/arrow-down-gray.png' alt='暂无数据' v-else />
                </a>
              </el-col>
              <el-col :span='2'>
                <a class='col-right-con' :class="{tqActive:sort==='2'}" @click="styleSwitch('2')">
                  最新
                  <img src='../../assets/images/arrow-down-blue.png' alt='暂无数据' v-if="sort==='2'" />
                  <img src='../../assets/images/arrow-down-gray.png' alt='暂无数据' v-else />
                </a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-loading='loading' class='recommend-service'>
        <div class='recommend-service-con'>
          <div class='col' v-for='(item, index) in serviceList' :key='index'>
            <nuxt-link :to="'/service/'+item.serviceId">
              <p class='img'>
                <img v-bind:src='item.img' alt />
              </p>
              <p class='text'>{{ item.name }}</p>
              <p class='price' v-if='item.type===1'>免费</p>
              <p class='price' v-if='item.type===2'>￥{{ item.unitPrice }}次</p>
              <p class='price' v-if='item.type===3'>￥{{ item.unitPrice }}月</p>
              <p class='price' v-if='item.type===4'>按需</p>
            </nuxt-link>
          </div>
          <div class='nodata' v-if='isNoData'>
            <img src='https://qiniu.easyapi.com/market/empty.png' alt />
            <p>暂无服务</p>
            <p>
              如果您有优质的提供商，欢迎给我们推荐
              <a href='leida@easyapi.com' class='text-no-data'>leida@easyapi.com</a>
            </p>
          </div>
        </div>
      </div>
      <div class='pagination' v-if='!isNoData'>
        <el-pagination
          background
          layout='total, sizes, prev, pager, next, jumper'
          :page-sizes='[10, 15, 30]'
          :page-size='pageSize'
          :current-page='current'
          :total='total'
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'
        ></el-pagination>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>

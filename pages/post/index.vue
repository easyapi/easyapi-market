<template>
  <div>
    <Header></Header>
    <div class="container">
      <div v-for="item of list" :key="item.articleId">
        <ListItem v-bind:list="item"></ListItem>
      </div>
      <Loading v-bind:method="getArticleList.bind(this)" v-bind:totalPages="totalPages" v-if="totalPages"></Loading>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import ListItem from '~/components/layout/listItem'
  import Loading from '~/components/layout/loading'
  import axios from '~/plugins/axios'

  export default {
    name: 'post',
    head () {
      return {
        title: '市场动态 - EasyAPI服务市场',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '市场动态' },
          { hid: 'keyword', name: 'keyword', content: '市场动态' }
        ]
      }
    },
    components: {
      Header,
      Footer,
      ListItem,
      Loading
    },
    data () {
      return {
        subscribe: false,
        serviceDetailList: [],
        clicked: 0,
        frequency: '',
        list: [],
        totalPages: 0,
        getArticleList: function (page = 0) {
          return axios
            .get(`https://api2.easyapi.com/api/articles?appKey=ja4fkcz35kfqywi7&appSecret=k1v8c637vr4swgr8&page=${page}&size=10`)
            .then(res => {
              this.list = this.list.length > 0 ? this.list.concat(res.data.content) : res.data.content
              this.totalPages = res.data.totalPages
            })
        }
      }
    },
    methods: {},
    created () {
      this.params = this.$route.query.params
    },
    mounted () {
      this.getArticleList()
    }
  }
</script>

<style lang="scss">

</style>

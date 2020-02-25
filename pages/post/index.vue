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
  import { getArticleList } from '../../api/article'
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import ListItem from '~/components/layout/listItem'
  import Loading from '~/components/layout/loading'

  export default {
    name: 'post',
    head () {
      return {
        title: '市场动态 - EasyAPI服务市场',
        meta: [
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
        list: [],
        totalPages: 0,
        getArticleList: function (page = 0) {
          return getArticleList({ page: page }).then(res => {
            this.list = this.list.length > 0 ? this.list.concat(res.data.content) : res.data.content
            this.totalPages = res.data.totalPages
          })
        }
      }
    },
    methods: {},
    created () {
    },
    mounted () {
      this.getArticleList()
    }
  }
</script>

<style lang="scss" scoped>

</style>

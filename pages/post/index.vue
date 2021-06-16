<template>
  <div>
    <Header></Header>
    <div class="container">
      <div v-if="!noData">
        <div v-for="item of list" :key="item.articleId">
          <ListItem v-bind:list="item"></ListItem>
        </div>
      </div>
      <div v-else class="no-data">
        <img src="../../assets/images/no-data.png" alt=""/>
      </div>
      <div class="loading" v-if="loading">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>加载中......</div>
      </div>
      <div class="noMoreData" v-if="noMoreData">
        <div>没有更多数据了...</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import { getArticleList } from '../../api/article'
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import ListItem from '~/components/layout/listItem'

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
      ListItem
    },
    data () {
      return {
        list: [],
        loading: false,
        noData: false,
        noMoreData: false,
        pagination: {
          size: 15,
          page: 0,
          totalPages: 0
        }
      }
    },
    methods: {
      getPageList () {
        if (this.pagination.page < this.pagination.totalPages - 1) {
          this.pagination.page = this.pagination.page + 1
          this.getArticleList()
        }
        if (this.pagination.page === this.pagination.totalPages - 1) {
          this.noMoreData = true
        }
      },
      getArticleList () {
        this.loading = true
        let params = {
          size: this.pagination.size,
          page: this.pagination.page
        }
        getArticleList(params).then((res) => {
          if (res.data.code === 1) {
            this.list = this.list.concat(res.data.content)
            this.pagination.totalPages = res.data.totalPages
            this.loading = false
          } else {
            this.noData = true
            this.loading = false
          }
        })
      },
      lazyLoading () {
        // 滚动到底部，再加载的处理事件
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        let clientHeight = document.documentElement.clientHeight
        let scrollHeight = document.documentElement.scrollHeight
        if (scrollHeight - clientHeight - scrollTop <= 150) {
          // 滚动到底部，逻辑代码
          //事件处理
          this.getPageList()
        }
      }
    },
    created () {
    },
    mounted () {
      window.addEventListener('scroll', this.lazyLoading)
      this.getArticleList()

    }
  }
</script>

<style lang="scss" scoped>
  .loading {
    text-align: center;
    color: #2d8cf0;
  }

  .noMoreData {
    text-align: center;
    color: #2d8cf0;
  }

  .no-data {
    margin: 400px auto;
    text-align: center;
  }
</style>

<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class='detail-wrapper'>
        <div class='detail-title'>
          <span>{{result && result.title}}</span>
          <label class="time">{{result && result.updateTime.split(' ')[0]}}</label>
        </div>
        <div class='detail-content' v-html='result && result.content'>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/header'
  import Footer from '~/components/footer'
  import axios from '~/plugins/axios'
  export default {
    name: 'post-detail',
    head () {
      return {
        title: this.result && this.result.title + ' - EasyAPI服务市场',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '服务市场详情' },
          { hid: 'keyword', name: 'keyword', content: '服务市场详情' }
        ]
      }
    },
    components: {
      Header,
      Footer
    },
    data () {
      return {
        subscribe: false,
        serviceDetailList: [],
        clicked: 0,
        frequency: '',
        result: null
      }
    },
    methods: {
      getArticle () {
        return axios.get(`https://api2.easyapi.com/api/article/${this.$route.params.id}?appKey=ja4fkcz35kfqywi7&appSecret=k1v8c637vr4swgr8`)
          .then(res => {
            this.result = res.data.content
          })
      }
    },
    created () {
    },
    mounted () {
      this.getArticle()
    }
  }
</script>

<style lang="scss" scoped>
  .detail-wrapper {
    padding: 0 58px;
    border: 1px solid #ddd;
    font-size: 14px;
    line-height: 24px;
    color: #333;
  }

  .detail-title {
    padding-bottom: 30px;
    font-size: 14px;
    color: #a9a9a9;
    text-align: center;
    padding-top: 32px;
    border-bottom: 1px solid #ddd;
  }

  .detail-title span {
    display: block;
    color: #333;
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
  }

  .time {
    margin-top: 5px;
    display: block;

  }

  .detail-content {
    padding-top: 30px;
  }

  .detail-con-inner {
    margin-bottom: 30px;
    font-size: 14px;
    line-height: 24px;
    color: #333;
  }

  .detail-con-inner span {

  }

  .detail-con-inner div {
    margin-top: 35px;
    text-align: center;
  }

  .detail-wrapper p {
    margin-bottom: 10px;
  }

  .detail-wrapper img {
    display: block;
    max-width: 100%;
    margin: 20px auto;
    padding: 5px;
    border: 1px solid #ddd;
  }
</style>

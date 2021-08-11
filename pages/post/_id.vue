<template>
  <div>
    <Header></Header>
    <div class='container'>
      <div class='detail-wrapper'>
        <div class='detail-title'>
          <span>{{ article.title }}</span>
          <label class='time'>{{ article.updateTime.split(' ')[0] }}</label>
        </div>
        <div class='detail-content' v-html='article.content'>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { getArticle } from '../../api/article'
import Header from '~/components/header'
import Footer from '~/components/footer'
import { getServiceList } from '../../api/service'

export default {
  name: 'post-detail',
  head() {
    return {
      title: this.article.title + ' - EasyAPI服务市场',
      meta: [
        { hid: 'description', name: 'description', content: this.article.title },
        { hid: 'keyword', name: 'keyword', content: '文章详情' }
      ]
    }
  },
  components: {
    Header,
    Footer
  },
  data() {
    return {
      article: null
    }
  },
  async asyncData(context) {
    let [res] = await Promise.all([
      getArticle(context.route.params.id, context)
    ])
    return {
      article: res.data.content
    }
  }
}
</script>

<style lang='scss' scoped>
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

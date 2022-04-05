<template>
  <a @click='jump(list.articleId)'>
    <div class='list-item'>
      <div class='list-item-left' v-show='list.img'>
        <img :src='list.img' alt=''/>
      </div>
      <div class='list-item-right'>
        <div>
          <span>{{ list.title }}</span>
          <p>{{ list.articleCategory.description }}</p>
        </div>
        <label>发布时间：{{ list.updateTime }}</label>
      </div>
    </div>
  </a>
</template>

<style scoped>
a {
  display: inline-block;
  width: 100%;
}

.list-item {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  padding: 25px;
  border: 1px solid #ddd;
  justify-content: space-between;
}

.list-item:hover {
  translate: 0.5s;
  box-shadow: 0 0 8px #e3e4e6;
}

.list-item-left {
  margin-right: 20px;
}

.list-item-right {
  display: flex;
  height: 140px;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 5;
}

.list-item-left img {
  display: block;
  width: 230px;
  height: 140px;
}

.list-item-right span {
  font-size: 18px;
  color: #000;
}

.list-item-right p {
  width: 100%;
  height: 40px;
  margin: 20px 0 0;
  font-size: 14px;
  line-height: 20px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.list-item-right label {
  font-size: 12px;
  color: #999;
}
</style>

<script>
export default {
  props: ['list'],
  methods: {
    jump(articleId) {
      this.$router.push(`/post/${articleId}`)
    }
  }
}
</script>

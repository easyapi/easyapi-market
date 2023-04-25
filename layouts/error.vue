<script>
export default {
  layout: 'simple',
  props: ['error'],
  head() {
    return {
      title: '错误 - EasyAPI服务平台',
      meta: [
        { hid: 'description', name: 'description', content: '错误' },
        { hid: 'keyword', name: 'keyword', content: '错误' },
      ],
    }
  },
}
</script>

<template>
  <div class="main">
    <div v-if="error.statusCode === 403" class="error mg-t-72">
      <div class="error-content">
        <div>
          <p class="title">
            权限不足
          </p>
          <p class="subtitle">
            你无权访问当前的页面
          </p>
        </div>
        <img src="https://qiniu.easyapi.com/photo/girl32.jpg" alt="">
      </div>
    </div>
    <div v-if="error.statusCode === 404" class="error mg-t-72">
      <div class="error-card">
        <div class="error-title">
          404!
          <span>你访问的页面不存在</span>
        </div>
        <img src="https://qiniu.easyapi.com/404.gif" alt="">
        <div class="error-back">
          <el-button type="primary">
            <a class="back-home" href="/">返回首页</a>
          </el-button>
        </div>
      </div>
    </div>
    <div v-else class="error mg-t-72">
      <div class="content">
        <div>
          <p class="title">
            错误信息
          </p>
          <p class="subtitle">
            您访问了错误的信息
          </p>
        </div>
        <img src="https://qiniu.easyapi.com/photo/girl32.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.error-card {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .error-title {
    font-size: 36px;
    font-weight: 600;

    span {
      font-size: 24px;
      font-weight: 500;
    }
  }

  img {
    margin-top: 10px;
    width: 400px;
    height: 300px;
  }

  .error-back {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;

    .el-button {
      width: 100px;
    }

    .back-home {
      color: #ffffff;
    }
  }
}
</style>

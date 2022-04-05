<template>
  <div class="footer">
    <p>
      <a href="https://www.easyapi.com/info/about">关于我们</a>
      <a href="https://www.easyapi.com/info/together">合作伙伴</a>
      <a href="https://www.easyapi.com/info/contact">联系我们</a>
      <a href="https://www.easyapi.com/info/donate">支持我们</a>
      <a href="https://www.easyapi.com/post/">平台动态</a>
    </p>
    <p>Copyright © 2015～2021 帮趣团队</p>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped lang="scss">
  .footer {
    text-align: center;
    background: #fafafa;
    color: #777;
    margin: 20px 0 0 0;
    padding: 70px 0 50px 0;
    font-size: 12px;
  }

  .footer p {
    margin-bottom: 10px;
  }

  .footer a {
    color: #777;
    padding: 0 20px;
  }
</style>

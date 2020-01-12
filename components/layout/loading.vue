<template>
  <div id='LoadWrap' class='loading-wrapper'>
    <img src='../../assets/images/loading.png' v-show='(this.page < this.totalPages-1)'/>
    <span>{{this.totalPages && (this.page < this.totalPages-1) ? '正在加载...' : '已经到底了！！！'}}</span>
  </div>
</template>

<script>
  export default {
    props: ['method', 'totalPages'],
    data () {
      return {
        page: 0,
      }
    },
    methods: {
      scroll () {
        window.addEventListener('scroll', () => {
          if (this.page >= this.totalPages - 1) {
            return
          }

          let topDistance = document.getElementById('LoadWrap').getBoundingClientRect().top
          if (topDistance < 730) {
            this.page++
            this.method(this.page)
          }
        }, false)
      }
    },
    mounted () {
      this.scroll()
    }
  }
</script>

<style scoped>
  .loading-wrapper {
    display: flex;
    line-height: 80px;
    text-align: center;
    color: #333;
    font-size: 0;
    align-items: center;
    justify-content: center;
  }

  .loading-wrapper span {
    display: block;
    margin-left: 10px;
    font-size: 20px;
  }
</style>

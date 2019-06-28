<template>
  <div>
    <ul class="pagination">
      <!-- <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current)"> « </a></li> -->
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1,'aTag')"> 首页 </a></li>
      <li v-for="(p,index) in grouplist" :class="{'active': current == p.val-1}" :key="index">

        <a href="javascript:;" @click="setCurrent(p.val,p.ele)"> {{ p.text }} </a>
      </li>
      <!-- <li ><a>  {{this.total}}</a></li> -->
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page,'aTag')"> 尾页 </a></li>
      <!-- <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"> »</a></li> -->

    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        current: this.currentPage
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 0
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5
          return v % 2 === 1 ? v : v + 1
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display)
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({ text: this.page - len, val: this.page - len, ele: 'aTag' })
          }

          return temp
        }
        while (len--) {
          temp.push(this.page - len)
        }

        var idx = temp.indexOf(center);
        (idx < count) && (center = center + count - idx);
        (this.current > this.page - count) && (center = this.page - count)
        temp = temp.splice(center - count - 1, this.pagegroup)
        do {
          var t = temp.shift()
          list.push({
            text: t,
            val: t
          })
        } while (temp.length)
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({ text: '...', val: list[0].val - 1 });
          (this.current < this.page - count) && list.push({ text: '...', val: list[list.length - 1].val + 1 })
        }
        return list
      }
    },
    methods: {
      setCurrent: function (idx, ele) {

        if (ele) {
          this.pageClick(idx)
        }

        this.current = idx - 1
        this.$emit('pagechange', this.current)
      },

      pageClick (idx) {
        this.$router.push(`/service?page=${idx}`)
      },

      initSelectPage () {
        let { query: { page } } = this.$route

        if (!page) {
          return this.setCurrent(1)
        }

        this.setCurrent(page)
      }
    },
    mounted () {
      this.initSelectPage()
      console.log(this.$route, 'I am route')
    }
  }
</script>
<style lang="scss">
  .pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    /*width: 100%;*/
    height: 50px;
    li {
      list-style :none;
      float: left;
      height: 34px;
      border-radius: 5px;
      margin: 3px;
      color: white;
      &:hover {
        background: rgb(32, 181, 203);
        a {
          color: #fff;
        }
      }
      a {
        display: block;
        width: 34px;
        height: 34px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        border-radius: 5px;
        text-decoration: none;
        border: 1px solid #ddd;
      }

    }
    .active {
      background: rgb(32, 181, 203);

      a {
        color: #fff;
      }

    }
  }

</style>

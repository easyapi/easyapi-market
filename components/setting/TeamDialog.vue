<template>
  <div class="current-team-info" :class="{active:showTeamInfo}">
    <h2 class="current-team-name lrPading-20">当前团队</h2>
    <div class="clear current-team-content lrPading-20">
      <!-- <span > -->
      <img class="lf teams-img" :src='teamImg+"!icon.jpg"' alt="" v-if="teamImg">
      <!-- </span> -->
      <div class="lf teams-img-r">
        <p>{{teamName}}</p>
        <div class="team-btn">
          <a class="ea-btn" href="https://www.easyapi.com/team/member/">成员</a>
          <a class="ea-btn" href="https://www.easyapi.com/team/">账户</a>
          <a class="ea-btn" href="https://www.easyapi.com/team/order/">订单</a>
        </div>
      </div>
    </div>
    <div class="change-team-box">
      <h2 class="lrPading-20">切换团队：</h2>
      <div class="ea-team-list-box lrPading-20">
        <a class="ea-team-item" v-for="(item,index) in teamList" v-bind:key="index" @click="tabTeamFn(item.team.id)">
          <img :src="item.team.img + '!icon.jpg'" alt="" v-if="item.team.img">
          <span>{{item.team.name}}</span>
        </a>
      </div>
    </div>
    <div class="create-team">
      <el-button type="primary" size="small" @click="jumpPage">创建新团队</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    components: {},
    props: {
      showTeamDialog: {
        type: Boolean,
        default: false
      },
      teamImg: String,
      teamName: String,
      teamList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        showTeamInfo: this.showTeamDialog,

      }
    },
    //计算属性
    computed: {},
    watch: {
      showTeamDialog: function (v) {
        return this.showTeamInfo = v
      }
    },
    created() {

    },
    mounted() {

    },
    //keep-alive 组件激活时调用
    activated() {
    },
    //keep-alive 组件停用时调用。
    deactivated() {
    },
    //方法
    methods: {
      tabTeamFn(e) {
        this.$emit('on-selectTeam', e);
      },
      jumpPage() {
        this.$emit('on-creadTeam');
      }
    }
  }
</script>
<style  lang="scss" scoped>
  .current-team-info {
    position: absolute;
    padding: 0 20px;
    top: 60px;
    right: 75px;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px #ddd;
    border: 1px solid #eee;
    border-top: none;
    width: 410px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    display: none;
    z-index: 9999;



    .current-team-name {
      height: 60px;
      line-height: 60px;
      font-weight: bold;
      border-bottom: 1px solid #eaeaea;
      font-size :18px;
    }

    .current-team-content {
      border-bottom: 1px solid #eaeaea;
      height: 110px;
      padding: 10px 0;

      .teams-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-top: (10 / 2) px;
      }

      .teams-img-r {
        display: inline-block;
        height: 99px;
        vertical-align: top;
        padding-left: 20px;

        & > p {
          color: #333;
          height: 39px;
          line-height: 39px;
          font-size: 1rem;
        }

        .team-btn {
          height: 60px;
          line-height: 60px;

          .ea-btn {
            padding: 6px 15px;
            border: 1px solid #ddd;
            color: #333;
            border-radius: 5px;
            box-sizing: content-box;
            margin-right: 5px;
            font-weight: normal;
            font-size: 14px;
            line-height: normal;
          }
        }
      }
    }

    .change-team-box {
      border-bottom: 1px solid #eaeaea;

      & > h2 {
        height: 60px;
        line-height: 60px;
        font-weight: bold;
        font-size: 18px;
      }

      .ea-team-list-box {
        /* 父元素设置弹性布局 */
        display: flex;
        /* 主轴方向 */
        /* column 列上下 */
        flex-direction: row;
        /* 是否换行 */
        flex-wrap: wrap;
        /* 在主轴对齐方式 */
        justify-content: flex-start;

        .ea-team-item {
          display: inline-block;
          width: 50%;
          color: #333;
          font-size: 1rem;
          font-weight: normal;
          height: 40px;
          line-height: 40px;

          & > img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            vertical-align: middle;
            margin:  0;
          }

          & > span {
            vertical-align: middle;
          }
        }
      }
    }

    .create-team {
      text-align: center;
    }
  }
  .current-team-info.active {
    display: block;
  }
</style>

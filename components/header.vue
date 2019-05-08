<template>
  <div class="header">
    <ul class="header-con-left">
      <li class="header-logo">
        <nuxt-link :to="{name:'index'}" class="logo">
          <img src="https://qiniu.easyapi.com/market/logo.png" alt="" width="100">
        </nuxt-link>
        <span class="circle"></span>
      </li>
      <nuxt-link :to="{name:'index'}">
        <li class="header-market" style="margin-left:10px;">API市场</li>
      </nuxt-link>
      <nuxt-link :to="{name:'index'}">
        <li class="index">首页</li>
      </nuxt-link>
      <nuxt-link :to="{name:'service'}">
        <li class="header-port">API接口</li>
      </nuxt-link>
      <nuxt-link :to="{name:'scene'}">
        <li class="header-scenarized-service">场景化服务</li>
      </nuxt-link>
    </ul>
    <ul class="header-con-right">
      <li class="header-login">
        <div class="userAvatar ea-Dropdown">
          <a v-if="photo">
            <img id="showPersonage" :src="photo+'!icon.jpg'" alt="" v-if="photo">
          </a>
        </div>
        <div :class="{active:isActive}" class="ea-DropdownMenu">
          <a href="https://account.easyapi.com/notification/">我的通知</a>
          <a href="https://account.easyapi.com/setting/data">个人设置</a>
          <a @click="quitLogin()" href="https://account.easyapi.com/logout">退出</a>
        </div>
      </li>
      <li class="current-team-box">
        <a id="showTeamInfo" :class="{active:showTeamInfo}">
          <span class="team-icon"></span>
        </a>
        <div class="current-team-info" :class="{active:showTeamInfo}">
          <h2 class="current-team-name lrPading-20">当前团队</h2>
          <div class="clear current-team-content lrPading-20">
            <!-- <span > -->
              <img class="lf teamsServeImg" :src='teamImg+"!icon.jpg"' alt=""  v-if="teamImg">
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
              <a class="ea-team-item" v-for="(item,index) in teamList.content" v-bind:key="index" @click="tabTeamFn(item.team.id)">
                  <img :src="item.team.img + '!icon.jpg'" alt="" v-if="item.team.img">
                <span>{{item.team.name}}</span>
              </a>
            </div>
          </div>
          <div class="create-team">
            <Button type="info" class="ea-info-btn" @click="jupmPage()">创建新团队</Button>
          </div>
        </div>
      </li>
      <li class="header-service-center"><a href="https://service.easyapi.com">服务中心</a></li>
      <li class="header-search">
        <Input icon="ios-search" placeholder="搜索服务" class="search" v-model="name" @keyup.enter.native="search"></Input>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getServiceList, getServiceTypeList, getMyTeam} from '~/api/api'
  import axios from '~/plugins/axios'

  export default {
    name: "Header",
    layout: '',
    props: ['callback'],
    data() {
      return {
        serviceTypeList: [],
        serviceList: [],
        name: '',
        isActive: false,
        showTeamInfo: false,
      };
    },
    computed: {
      ...mapGetters([
        'photo',
        'team',
        'teamName',
        'teamImg',
        'teamList'
      ])
    },
    methods: {
      search() {
        if (!this.name) {
          return
        }
        let _this = this
        _this.$router.push({path: "/service", query: {name: this.name}})

        setTimeout(() => {
           _this.callback && _this.callback(null, this.name)
        }, 0);
      },

      //退出登录
      quitLogin() {
        this.$store.dispatch('Logout');
        window.location.href = "https://www.easyapi.com/user/login";
      },

      jupmPage() {
        window.location.href = "https://www.easyapi.com/launch"
      },
      //切换团队
      tabTeamFn(id) {
        console.log(id)
        this.$store.dispatch('switchoverTeam', id);
      },


    },
    created: function () {
    },
    mounted() {
      //获取用户信息
      this.$store.dispatch('GetUserInfo');
      //获取团队列表
      this.$store.dispatch('getTeamList');

      this.name = this.$route.query.name;

      let body = document.querySelector('body');
      body.addEventListener('click', (e) => {
        if (e.target.id === 'showTeamInfo' || e.target.className === 'team-icon') {
          this.isActive = false;
          this.showTeamInfo = !this.showTeamInfo
        } else if (e.target.id === 'showPersonage') {
          this.isActive = !this.isActive;
          this.showTeamInfo = false;
        } else {
          this.showTeamInfo = false;
          this.isActive = false;
        }
      }, false)
    }
  }
</script>

<style scoped lang="stylus">
  .ea-DropdownMenu
    position absolute
    top 50px
    right 0
    z-index 100
    border 1px solid #eee
    border-top none
    box-shadow 0px 1px 3px #ddd;
    background-color #fff
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    width 100px
    display none
    &.active
      display block
    a
      display block
      line-height 26px
      height inherit
      padding-left 15px
      color #777
      font-weight normal
      &:hover
        background-color #1ac1d6
        color: #fff

  a {
    color: #fff;
  }

  .circle {
    display inline-block
    background white
    width 6px
    height 6px
    border-radius 50%
    margin-bottom 13px
  }

  .header-market {
    font-size 16px
    padding-right 20px
    border-right 1px solid #0bacc0
  }

  .bg-color {
    background #00adc2
  }

  .header {
    font-weight 700
    font-size: 14px;
    height: 60px;
    line-height 60px
    width 100%;
    background: #18c1d6;
    overflow hidden
    margin-bottom 30px;
    .header-con-left {
      height: 100%;
      width 50%;
      float left;
      li {
        height 100%;
        float left;
        list-style none;
        margin-left 30px;
        img {
          padding-top 18px
        }
      }
    }
    .header-service-center {
      border-left 1px solid #0bacc0
      padding-left 20px
      box-sizing border-box
    }
    #showTeamInfo {
      border-left 1px solid #0bacc0
      border-right 1px solid #0bacc0
    }
    .header-con-right {
      height 100%
      width 50%;
      float right;

      li {
        height 100%
        list-style none;
        margin-left 20px;
        float right;
        img {
          width 35px
          height 35px
          margin 12.5px 20px 0px 0px
          border-radius 50%
          cursor pointer
        }
      }
      .header-search {
        padding-top 2px
        .search {
          margin-top -5px;
          width 200px;
        }
      }
    }
  }

  .header .header-con-left li:nth-child(1) {
    // margin-left 10px
  }
</style>
<style scoped lang="stylus">
  .current-team-box {
    & > a {
      position relative
      height: 60px;
      display: inline-block;
      padding: 12.5px 20px
      &.active {
        background-color: #19B7CB;
      }

      &:hover {
        background-color: #19B7CB;
      }

      .team-icon {
        display: inline-block;
        width: 35px;
        height: 35px;
        background: url('../assets/images/team-icon.png') no-repeat;
        background-size: cover;
      }
    }
  }

  .current-team-info {
    position: absolute;
    padding: 0 20px;
    top: 52px;
    right: 85px;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px #ddd;
    border: 1px solid #eee;
    border-top: none;
    width: 410px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    display: none;

    &.active {
      display: block;
    }

    .current-team-name {
      height: 60px;
      line-height: 60px;
      font-weight: bold;
      border-bottom: 1px solid #eaeaea;
      font-size 18px;
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
        font-size 18px
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
            margin 0px
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
</style>


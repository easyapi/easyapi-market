<template>
  <div class="header flex-r">
    <ul class="header-con-left flex-r">
      <div class="header-logo flex-r">
        <nuxt-link :to="{name:'index'}" class="logo flex-r">
          <img src="https://qiniu.easyapi.com/market/logo.png" alt width="100"/>
        </nuxt-link>
        <span class="circle"></span>
      </div>
      <li class="header-market">
        <nuxt-link :to="{name:'index'}">API市场</nuxt-link>
      </li>
      <li class="item-menu mg-lf-20">
        <nuxt-link :to="{name:'index'}">首页</nuxt-link>
      </li>
      <li class="item-menu">
        <nuxt-link :to="{name:'service'}">API接口</nuxt-link>
      </li>
      <li class="item-menu">
        <nuxt-link :to="{name:'scene'}">场景化服务</nuxt-link>
      </li>
    </ul>
    <ul class="header-con-right flex-r">
      <li class="header-search">
        <el-input
          size="small"
          placeholder="搜索服务"
          class="search"
          v-model="name"
          @keyup.enter.native="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </li>
      <li class="item-menu header-service-center">
        <a href="https://service.easyapi.com">服务中心</a>
      </li>
      <li class="item-menu current-team-box" v-show="token">
        <a id="showTeamInfo" class="flex-r" :class="{active:showTeamInfo}">
          <span class="team-icon"></span>
        </a>
        <TeamDialog
          @on-creadTeam="jumpPage"
          @on-selectTeam="changeTeam"
          :showTeamDialog="showTeamInfo"
          :teamImg="teamImg"
          :teamName="teamName"
          :teamList="teamList.content"
        ></TeamDialog>
      </li>
      <li class="item-menu header-login" v-show="token">
        <div class="userAvatar ea-Dropdown">
          <a class="flex-r">
            <img id="showPersonage" :src="photo+'!icon.jpg'" alt v-show="photo"/>
          </a>
        </div>
        <div :class="{active:isActive}" class="ea-DropdownMenu">
          <a href="https://account.easyapi.com/notification/">我的通知</a>
          <a href="https://account.easyapi.com/user/edit">个人设置</a>
          <a @click="quitLogin()" href="https://account.easyapi.com/logout">退出</a>
        </div>
      </li>
      <li class="item-menu header-login" v-show="!token">
        <a href="https://account.easyapi.com/login" class="flex-r">登录</a>
      </li>
      <li class="item-menu header-login" v-show="!token">
        <a href="https://account.easyapi.com/signup" class="flex-r">注册</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TeamDialog from './setting/TeamDialog'
  import Cookies from 'js-cookie'

  export default {
    name: 'Header',
    layout: '',
    props: ['callback'],
    components: {
      TeamDialog
    },
    data () {
      return {
        token: Cookies.get('authenticationToken'),
        serviceTypeList: [],
        serviceList: [],
        name: '',
        isActive: false,
        showTeamInfo: false
      }
    },
    computed: {
      ...mapGetters(['photo', 'team', 'teamName', 'teamImg', 'teamList'])
    },
    methods: {
      search () {
        let _this = this
        this.$store.commit('SET_SERVICE_NAME', this.name)
        let obj = {}
        let name = this.name
        let type = this.$route.query.type
        let payType = this.$route.query.payType
        let sort = this.$route.query.sort
        if (name) {
          obj.name = name
        }
        if (type) {
          obj.serviceTypeId = type
        }
        if (payType) {
          obj.type = payType
        }
        if (sort) {
          obj.sort = sort
        }
        _this.$router.push({ path: '/service', query: obj })
      },

      //退出登录
      quitLogin () {
        this.$store.dispatch('Logout')
        window.location.href = 'https://www.easyapi.com/user/login'
      },

      jumpPage () {
        window.location.href = 'https://www.easyapi.com/launch'
      },
      //切换团队
      changeTeam (id) {
        this.$store.dispatch('changeTeam', id)
      }
    },
    created: function () {
    },
    mounted () {
      if (Cookies.get('authenticationToken')) {
        //获取用户信息
        this.$store.dispatch('GetUserInfo')
      }
      if (Cookies.get('authenticationToken')) {
        //获取团队列表
        this.$store.dispatch('getTeamList')
      }
      this.name = this.$store.state.serviceName

      let body = document.querySelector('body')
      body.addEventListener(
        'click',
        e => {
          if (
            e.target.id === 'showTeamInfo' ||
            e.target.className === 'team-icon'
          ) {
            this.isActive = false
            this.showTeamInfo = !this.showTeamInfo
          } else if (e.target.id === 'showPersonage') {
            this.isActive = !this.isActive
            this.showTeamInfo = false
          } else {
            this.showTeamInfo = false
            this.isActive = false
          }
        },
        false
      )
    }
  }
</script>

<style scoped lang="scss">
  .header {
    font-weight: 700;
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    background: #18c1d6;
    margin-bottom: 30px;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 30px;

    a {
      color: #fff;
    }

    .header-con-left {
      li {
        height: 100%;
        list-style: none;

        a {
          height: 60px;
        }
      }

      .header-logo {
        align-items: center;

        a.logo {
          align-items: center;
        }

        .circle {
          display: inline-block;
          background: white;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
      }

      .header-market {
        font-size: 16px;
        margin-left: 10px;
        padding-right: 30px;
        border-right: 1px solid #0bacc0;
      }

      .item-menu {
        a {
          padding: 0 20px;
        }
      }
    }

    .header-con-right {
      height: 60px;
      align-items: center;

      li {
        height: 100%;
        list-style: none;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
        }
      }

      .header-search {
        padding: 0 20px;

        .search {
          width: 200px;
        }
      }

      .item-menu {
        border-left: 1px solid #0bacc0;

        a {
          padding: 0 20px;
        }
      }

      .current-team-box {
        & > a {
          position: relative;
          height: 60px;
          padding-top: 12.5px;
          display: inline-block;

          &.active {
            background-color: #19b7cb;
          }

          &:hover {
            background-color: #19b7cb;
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

      .header-login {
        & > .ea-Dropdown > a {
          height: 60px;
          padding-top: 12.5px;
        }

        position: relative;
      }
    }
  }

  .ea-DropdownMenu {
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 100;
    border: 1px solid #eee;
    border-top: none;
    box-shadow: 0px 1px 3px #ddd;
    background-color: #fff;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 100px;
    display: none;

    &.active {
      display: block;
    }

    a {
      display: block;
      line-height: 26px;
      height: inherit;
      padding-left: 15px;
      color: #777;
      font-weight: normal;

      &:hover {
        background-color: #1ac1d6;
        color: #fff;
      }
    }
  }
</style>



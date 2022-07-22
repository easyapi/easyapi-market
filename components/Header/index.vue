<template>
  <div v-if="ifShow" class="header flex-r">
    <ul class="header-con-left flex-r">
      <div class="header-logo flex-r">
        <nuxt-link :to="{ name: 'index' }" class="logo flex-r">
          <img src="https://qiniu.easyapi.com/market/logo.svg" alt />
        </nuxt-link>
        <span class="circle"></span>
      </div>
      <li class="header-market">
        <nuxt-link :to="{ name: 'index' }">API市场</nuxt-link>
      </li>
      <li class="item-menu mg-lf-20">
        <nuxt-link :to="{ name: 'index' }">首页</nuxt-link>
      </li>
      <li class="item-menu">
        <nuxt-link :to="{ name: 'service' }">API接口</nuxt-link>
      </li>
      <li class="item-menu">
        <nuxt-link :to="{ name: 'scene' }">场景化服务</nuxt-link>
      </li>
    </ul>
    <ul class="header-con-right flex-r">
      <li class="header-search">
        <el-input size="small" placeholder="搜索服务" class="search" v-model="name" @keyup.enter.native="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </li>
      <li class="item-menu current-team-box" v-show="token">
        <a @click.stop="showTeamInfo = !showTeamInfo" class="flex-r" :class="{ active: showTeamInfo }">
          {{ teamName }}
          <i v-if="showTeamInfo" class="team-icon icon-arrow-top iconfont"></i>
          <i v-else class="icon-xiangxiajiantou iconfont"></i>
        </a>
        <div ref="showTeamInfo">
          <TeamDialog
            @on-createTeam="jumpPage"
            @on-changeTeam="changeTeam"
            :showTeamDialog="showTeamInfo"
            :teamImg="teamImg"
            :teamName="teamName"
            :teamList="teamList.content"></TeamDialog>
        </div>
      </li>
      <li class="item-menu header-service-center">
        <a href="https://team.easyapi.com/service/">服务中心</a>
      </li>
      <li class="item-menu header-login" v-show="token">
        <div class="userAvatar ea-Dropdown">
          <a class="flex-r">
            <img id="showPersonage" :src="photo + '!icon.jpg'" alt v-if="photo" />
          </a>
        </div>
        <div :class="{ active: isActive }" class="ea-DropdownMenu">
          <a href="https://team.easyapi.com/notification/">我的通知</a>
          <a href="https://team.easyapi.com/user/edit">个人设置</a>
          <a @click="quitLogin()" href="https://account.easyapi.com/logout">退出</a>
        </div>
      </li>
      <li class="item-menu header-login" v-show="!token">
        <a href="https://account.easyapi.com/login?from=https://market.easyapi.com" class="flex-r">登录</a>
      </li>
      <li class="item-menu header-login" v-show="!token">
        <a href="https://account.easyapi.com/signup?from=https://market.easyapi.com" class="flex-r">注册</a>
      </li>
    </ul>
  </div>
  <div v-else class="header">
    <div class="content header-con-left">
      <div class="flex justify-between items-center">
        <div class="header-logo flex-r">
          <nuxt-link :to="{ name: 'index' }" class="logo flex-r">
            <img src="https://qiniu.easyapi.com/market/logo.svg" alt />
          </nuxt-link>
          <span class="circle"></span>
          <nuxt-link class="mg-lf-10" :to="{ name: 'index' }">API市场</nuxt-link>
        </div>
        <div class="icon w-14 flex justify-between">
          <i class="el-icon-user" @click="showNav('person')"></i>
          <i class="el-icon-s-fold" @click="showNav('menu')"></i>
        </div>
      </div>
    </div>
    <div class="menu" v-if="ifNavShow">
      <el-col v-if="type === 'menu'" :span="24">
        <el-menu :default-active="this.$router.path" class="el-menu-vertical-demo" router>
          <div class="float-right mr-10">
            <el-button type="text" icon="el-icon-close" @click="closeMenu">关 闭</el-button>
          </div>
          <div class="clear-both"></div>
          <el-menu-item index="/info/price">
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/info/price">
            <span slot="title">API接口</span>
          </el-menu-item>
          <el-menu-item index="/info/price">
            <span slot="title">场景化服务</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col v-if="type === 'person'" :span="24">
        <el-menu class="el-menu-vertical-demo">
          <div class="float-right mr-10">
            <el-button type="text" icon="el-icon-close" @click="closeMenu">关 闭</el-button>
          </div>
          <div class="clear-both"></div>
          <el-menu-item @click="jumpSign">
            <span slot="title">服务中心</span>
          </el-menu-item>
          <el-menu-item @click="jumpSign">
            <span slot="title">注册</span>
          </el-menu-item>
          <el-menu-item @click="jumpLogin">
            <span slot="title">登录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div v-if="ifNavShow" class="popContainer"></div>
  </div>
</template>

<script>
import '../../assets/iconfont/icon-arrow.css'
import { mapGetters } from 'vuex'
import TeamDialog from '../EaTeam'
import Cookies from 'js-cookie'

export default {
  name: 'Header',
  layout: '',
  props: ['callback'],
  components: {
    TeamDialog
  },
  data() {
    return {
      screenWidth: null,
      token: Cookies.get('authenticationToken'),
      name: '',
      isActive: false,
      showTeamInfo: false,
      ifShow: true,
      ifNavShow: false,
      type: ''
    }
  },
  computed: {
    ...mapGetters(['photo', 'team', 'teamName', 'teamImg', 'teamList'])
  },
  watch: {
    $route() {
      this.ifNavShow = false
    },
    screenWidth: {
      handler: function (val, oldVal) {
        console.log(val)
        this.ifShow = val >= 1024
      },
      immediate: true
    }
  },
  methods: {
    showNav(val) {
      this.type = val
      this.ifNavShow = !this.ifNavShow
    },
    closeMenu() {
      this.ifNavShow = false
    },
    /**
     *
     */
    search() {
      let that = this
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
      that.$router.push({ path: '/service', query: obj })
    },

    /**
     * 退出登录
     */
    quitLogin() {
      this.$store.dispatch('logout')
      window.location.href = 'https://account.easyapi.com/login?from=https://market.easyapi.com'
    },
    jumpPage() {
      window.location.href = 'https://team.easyapi.com/new?from=https://market.easyapi.com'
    },
    /**
     * 切换团队
     * @param id 团队ID
     */
    changeTeam(id) {
      this.$store.dispatch('changeTeam', id)
    }
  },
  created: function () {},
  mounted() {
    if (Cookies.get('authenticationToken')) {
      //获取用户信息
      this.$store.dispatch('getUser')
    }
    if (Cookies.get('authenticationToken')) {
      //获取团队列表
      this.$store.dispatch('getTeamList')
    }
    this.name = this.$store.state.serviceName

    let that = this
    document.addEventListener('click', function (e) {
      that.showTeamInfo = !!that.$refs.showTeamInfo.contains(e.target)
      if (e.target.id === 'showPersonage') {
        that.isActive = !that.isActive
      } else {
        that.isActive = false
      }
    })
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      //屏幕尺寸变化就重新赋值
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  font-weight: 700;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  background: #00b2c8;
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

      img {
        margin: 2px 10px 0 0;
        width: 100px;
      }

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
      position: relative;

      & > a {
        position: relative;
        height: 60px;
        display: inline-block;

        &.active {
          background-color: #19b7cb;
        }

        &:hover {
          background-color: #19b7cb;
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
      background-color: #00b2c8;
      color: #fff;
    }
  }
}

.menu {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
}

@media screen and (min-width: 800px) and (max-width: 1024px) {
  .content {
    width: 600px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 300px) and (max-width: 800px) {
  .content {
    width: 90%;
    margin: 0 auto;
  }
}
</style>

<style lang="scss">
.el-menu {
  z-index: 50;
  width: 100%;
}

.el-icon-user {
  color: #ffffff;
}

.el-icon-s-fold {
  color: #ffffff;
}

.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 40;
}
</style>

<script>
import '../../assets/iconfont/icon-arrow.css'
import { Close, Fold, Search, User } from '@element-plus/icons-vue'
import TeamDialog from '../EaTeam'
import { userStore } from '@/store/user'
import { teamStore } from '@/store/team'
import { getToken } from '~/utils/token'

export default {
  components: {
    Close,
    Fold,
    Search,
    User,
    TeamDialog,
  },
  props: ['callback'],
  data() {
    return {
      screenWidth: null,
      token: getToken(),
      name: '',
      isActive: false,
      showTeamInfo: false,
      ifShow: true,
      ifNavShow: false,
      type: '',
      userStore: userStore(),
      teamStore: teamStore(),
    }
  },
  watch: {
    $route() {
      this.ifNavShow = false
    },
    screenWidth: {
      handler(val, oldVal) {
        this.ifShow = val >= 1080
        this.$emit('getScreenWidth', val)
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.token) {
      // 获取用户信息和团队列表
      userStore().getUser()
      teamStore().getTeamList()
    }
    this.name = userStore().serviceName

    document.addEventListener('click', (e) => {
      this.showTeamInfo = !this.$refs.showTeamInfo
      if (e.target.id === 'showPersonage')
        this.isActive = !this.isActive
      else
        this.isActive = false
    })
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      // 屏幕尺寸变化就重新赋值
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
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
      userStore().serviceName = this.name
      const obj = {}
      const name = this.name
      const type = this.$route.query.type
      const payType = this.$route.query.payType
      const sort = this.$route.query.sort
      if (name)
        obj.name = name

      if (type)
        obj.serviceTypeId = type

      if (payType)
        obj.type = payType

      if (sort)
        obj.sort = sort

      this.$router.push({ path: '/service', query: obj })
    },

    /**
     * 退出登录
     */
    quitLogin() {
      userStore().logout()
      window.location.href = 'https://account.easyapi.com/login?from=https://market.easyapi.com'
    },
    jumpPage() {
      window.location.href = 'https://team.easyapi.com/create-team?from=https://market.easyapi.com'
    },
    /**
       * 切换团队
       * @param id 团队ID
       */
    changeTeam(id) {
      teamStore().changeTeam(id)
    },
  },
}
</script>

<template>
  <div v-if="ifShow" class="header flex-r">
    <ul class="header-con-left flex-r">
      <div class="header-logo flex-r">
        <nuxt-link :to="{ name: 'index' }" class="logo flex-r">
          <img src="https://qiniu.easyapi.com/market/logo.svg" alt>
        </nuxt-link>
        <span class="circle" />
      </div>
      <li class="header-market">
        <nuxt-link :to="{ name: 'index' }">
          API市场
        </nuxt-link>
      </li>
      <li class="item-menu ml-10">
        <nuxt-link :to="{ name: 'index' }">
          首页
        </nuxt-link>
      </li>
      <li class="item-menu">
        <nuxt-link :to="{ name: 'service' }">
          API接口
        </nuxt-link>
      </li>
      <li class="item-menu">
        <nuxt-link :to="{ name: 'scene' }">
          场景化服务
        </nuxt-link>
      </li>
    </ul>
    <ul class="header-con-right flex-r">
      <li class="header-search">
        <el-input v-model="name" placeholder="搜索服务" class="search" @keyup.enter="search">
          <template #prefix>
            <el-icon class="el-input__icon el-icon-search">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </li>
      <li v-show="token" class="item-menu current-team-box">
        <a class="flex" :class="{ active: showTeamInfo }" @click.stop="showTeamInfo = !showTeamInfo">
          <div>{{ userStore.team.name }}</div>
          <svg-icon v-if="showTeamInfo" name="upArrow" class="svg-icon" />
          <svg-icon v-else name="downArrow" class="svg-icon" />
        </a>
        <div>
          <TeamDialog
            ref="showTeamInfo"
            :show-team-dialog="showTeamInfo"
            :team-img="userStore.team.img"
            :team-name="userStore.team.name"
            :team-list="teamStore.teamList"
            @on-createTeam="jumpPage"
            @on-changeTeam="changeTeam"
          />
        </div>
      </li>
      <li class="item-menu header-service-center">
        <a href="https://team.easyapi.com/service/">服务中心</a>
      </li>
      <li v-show="token" class="item-menu header-login">
        <div class="userAvatar ea-Dropdown">
          <a class="flex-r">
            <img v-if="userStore.photo" id="showPersonage" :src="`${userStore.photo}!icon.jpg`" alt>
          </a>
        </div>
        <div :class="{ active: isActive }" class="ea-DropdownMenu">
          <a href="https://team.easyapi.com/notification/">我的通知</a>
          <a href="https://team.easyapi.com/user/edit">个人设置</a>
          <a href="https://account.easyapi.com/logout" @click="quitLogin()">退出</a>
        </div>
      </li>
      <li v-show="!token" class="item-menu header-login">
        <a href="https://account.easyapi.com/login?from=https://market.easyapi.com" class="flex-r">登录</a>
      </li>
      <li v-show="!token" class="item-menu header-login">
        <a href="https://account.easyapi.com/signup?from=https://market.easyapi.com" class="flex-r">注册</a>
      </li>
    </ul>
  </div>
  <div v-else class="header">
    <div class="content header-con-left">
      <div class="flex justify-between items-center">
        <div class="header-logo flex-r">
          <nuxt-link :to="{ name: 'index' }" class="logo flex-r">
            <img src="https://qiniu.easyapi.com/market/logo.svg" alt>
          </nuxt-link>
          <span class="circle" />
          <nuxt-link class="ml-8" :to="{ name: 'index' }">
            API市场
          </nuxt-link>
        </div>
        <div class="icon w-14 flex justify-between">
          <el-icon class="el-icon-user" @click="showNav('person')">
            <User />
          </el-icon>
          <el-icon class="el-icon-s-fold" @click="showNav('menu')">
            <Fold />
          </el-icon>
        </div>
      </div>
    </div>
    <div v-if="ifNavShow" class="menu">
      <el-col v-if="type === 'menu'" :span="24">
        <el-menu :default-active="$router.path" class="el-menu-vertical-demo" router>
          <div class="float-right mr-10">
            <el-button type="text" @click="closeMenu">
              <el-icon><Close /></el-icon>
              关 闭
            </el-button>
          </div>
          <div class="clear-both" />
          <el-menu-item index="/home">
            <template #title>
              <span>首页</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/service">
            <template #title>
              <span>API接口</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/scene">
            <template #title>
              <span>场景化服务</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col v-if="type === 'person'" :span="24">
        <el-menu class="el-menu-vertical-demo">
          <div class="float-right mr-10">
            <el-button type="text" @click="closeMenu">
              <el-icon><Close /></el-icon>
              关 闭
            </el-button>
          </div>
          <div class="clear-both" />
          <el-menu-item>
            <template #title>
              <a href="https://team.easyapi.com/service/" class="menu-item-text w-full">服务中心</a>
            </template>
          </el-menu-item>
          <el-menu-item>
            <template #title>
              <a href="https://account.easyapi.com/signup?from=https://market.easyapi.com" class="menu-item-text w-full">注册</a>
            </template>
          </el-menu-item>
          <el-menu-item>
            <template #title>
              <a href="https://account.easyapi.com/login?from=https://market.easyapi.com" class="menu-item-text w-full">登录</a>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div v-if="ifNavShow" class="popContainer" />
  </div>
</template>

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

        a{
          display: flex;
          align-items: center;
        }
        .svg-icon{
          width: 16px;
          height: 16px;
          margin-left: 8px;
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
    top: 0;
    left: 0;
  }

  @media screen and (min-width: 800px) and (max-width: 1080px) {
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

  .menu-item-text {
    color: #333333 !important;
  }

  .el-icon-user {
    color: #ffffff !important;
    cursor: pointer;
  }

  .el-icon-s-fold {
    color: #ffffff !important;
    cursor: pointer;
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

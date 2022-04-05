<template>
  <div class="current-team-info" :class="{ active: showTeamInfo }">
    <div class="clear current-team-content lrPading-20">
      <img
        class="lf teams-img"
        :src="teamImg + '!icon.jpg'"
        alt=""
        v-if="teamImg"
      />
      <div class="lf teams-img-r">
        <p>{{ teamName }}</p>
        <div class="team-btn">
          <a class="ea-btn" href="https://team.easyapi.com/account">账户</a>
          <a class="ea-btn" href="https://team.easyapi.com/members">成员</a>
          <a class="ea-btn" href="https://team.easyapi.com/orders">订单</a>
        </div>
      </div>
    </div>
    <div class="change-team-box">
      <h2 class="lrPading-20">
        切换团队：
        <el-button type="primary" size="small" @click="createTeam">
          创建新团队
        </el-button>
      </h2>
      <div class="ea-team-list-box lrPading-20">
        <a
          class="ea-team-item"
          v-for="(item, index) in teamList"
          v-bind:key="index"
          @click="changeTeam(item.team.id)"
        >
          <img
            :src="item.team.img + '!icon.jpg'"
            alt=""
            v-show="item.team.img"
          />
          <span>{{ item.team.name }}</span>
        </a>
      </div>
    </div>
    <div class="create-team"></div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    showTeamDialog: {
      type: Boolean,
      default: false,
    },
    teamImg: String,
    teamName: String,
    teamList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      showTeamInfo: this.showTeamDialog,
    }
  },
  watch: {
    showTeamDialog: function (v) {
      return (this.showTeamInfo = v)
    },
  },
  methods: {
    changeTeam(e) {
      this.$emit('on-changeTeam', e)
      location.reload()
    },
    createTeam() {
      this.$emit('on-createTeam')
    },
  },
}
</script>
<style lang="scss" scoped>
.current-team-info {
  max-height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  padding: 0 20px;
  top: 60px;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 3px #ddd;
  border: 1px solid #eee;
  border-top: none;
  width: 410px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  display: none;
  z-index: 9999;

  .lrPading-20 {
    padding: 0 20px;
  }

  .current-team-content {
    border-bottom: 1px solid #eaeaea;
    height: 110px;
    padding: 10px 0;
    display: flex;

    .teams-img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-top: 5px;
    }

    .teams-img-r {
      display: inline-block;
      height: 99px;
      vertical-align: top;
      padding-left: 20px;

      & > p {
        color: #333;
        height: auto;
        line-height: 16px;
        font-size: 16px;
        padding-top: 10px;
      }

      .team-btn {
        height: 50px;
        line-height: 50px;
        margin-top: 10px;

        .ea-btn {
          line-height: 0;
          padding: 14px 15px;
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
    .el-button {
      background: #2db7f5;
    }

    & > h2 {
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      font-size: 16px;
    }

    .ea-team-list-box {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;

      .ea-team-item {
        width: 50%;
        color: #333;
        font-size: 14px;
        font-weight: normal;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;

        & > img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          vertical-align: middle;
          margin: 0;
        }

        & > span {
          display: inline-block;
          width: calc(100% - 28px);
          padding: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
    }
  }
}

.current-team-info.active {
  display: block;
}
</style>

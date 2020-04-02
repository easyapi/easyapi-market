import { getUserTeamList, changeTeam } from '@/api/account'

const team = {
  state: {
    currentTeam: '',
    teamName: '',
    teamAvatar: '',
    teamList: ''
  },

  mutations: {
    SET_CURRENTTEAM: (state, currentTeam) => {
      state.currentTeam = currentTeam
    },
    SET_TTEAMNAME: (state, teamName) => {
      state.teamName = teamName
    },
    SET_TTEAMAVATAR: (state, teamAvatar) => {
      state.teamAvatar = teamAvatar
    },
    SET_TEAMLIST: (state, teamList) => {
      state.teamList = teamList
    }
  },

  actions: {
    getTeamList ({ commit }) {
      getUserTeamList().then(res => {
        commit('SET_TEAMLIST', res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    // 切换团队
    changeTeam ({ dispatch, commit, state }, id) {
      changeTeam(id).then(res => {
        if (res.data.code === 1) {
          dispatch('GetUserInfo')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

export default team

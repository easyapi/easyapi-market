import { getUserTeamList, changeTeam } from '@/api/account'

const team = {
  state: {
    currentTeam: '',
    teamName: '',
    teamAvatar: '',
    teamList: '',
  },

  mutations: {
    SET_CURRENT_TEAM: (state, currentTeam) => {
      state.currentTeam = currentTeam
    },
    SET_TTEAM_NAME: (state, teamName) => {
      state.teamName = teamName
    },
    SET_TTEAM_AVATAR: (state, teamAvatar) => {
      state.teamAvatar = teamAvatar
    },
    SET_TEAM_LIST: (state, teamList) => {
      state.teamList = teamList
    },
  },

  actions: {
    getTeamList({ commit }) {
      getUserTeamList(this)
        .then((res) => {
          commit('SET_TEAM_LIST', res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 切换团队
    changeTeam({ dispatch, commit, state }, id) {
      changeTeam(id, this)
        .then((res) => {
          if (res.data.code === 1) {
            dispatch('getUser')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}

export default team

import Cookies from 'js-cookie'
import axios from '@/plugins/axios'
import {UserInFo} from '@/api/api'
const user = {
  state: {
    userId: '',
    username: '',
    nickname: '',
    photo: '',
    mobile: '',
    email: '',
    team: '',
    teamName:'',
    teamImg:'',
    userTeam: '',
    token: Cookies.get('authenticationToken')

  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_TEAM: (state, team) => {
      state.team = team
    },
    SET_TEAMNAME: (state, teamName) => {
      state.teamName = teamName
    },
    SET_TEAMIMG: (state, teamImg) => {
      state.teamImg = teamImg
    },
    SET_USERTEAM: (state, userTeam) => {
      state.userTeam = userTeam
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {

    },
    // 获取用户信息
    GetUserInfo({commit, state}) {
      axios({
        method: 'get',
        url: UserInFo,
      }).then(res => {
        let userInfoData = res.data
        commit('SET_USERID', userInfoData.id)
        commit('SET_USERNAME', userInfoData.username)
        commit('SET_NICKNAME', userInfoData.nickname)
        commit('SET_PHOTO', userInfoData.photo)
        commit('SET_MOBILE', userInfoData.mobile)
        commit('SET_EMAIL', userInfoData.email)
        commit('SET_TEAM', userInfoData.team)
        commit('SET_TEAMNAME', userInfoData.team.name)
        commit('SET_TEAMIMG', userInfoData.team.img || '')
        commit('SET_USERTEAM', userInfoData.userTeam)
      }).catch(error => {
        console.log(error.response)
      });
    },
    // 登出
    Logout({commit, state}) {
      Cookies.remove('authenticationToken');
    },
  }
}

export default user

const getters = {
  username: state => state.user.username,
  nickname: state => state.user.nickname,
  photo: state => state.user.photo,
  team: state => state.user.team,
  teamName: state => state.user.teamName,
  teamImg: state => state.user.teamImg,
  userTeam: state => state.user.userTeam,
  token: state => state.user.token,
  teamList: state => state.team.teamList
}
export default getters

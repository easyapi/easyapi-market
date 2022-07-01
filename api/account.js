/**
 * 获取用户信息
 *
 * @see https://www.easyai.com
 */
export const getUser = context => {
  return context.$axios.get(`${process.env.accountUrl}/account`)
}

/**
 * 获取用户团队列表
 *
 * @see https://www.easyai.com
 */

export const getUserTeamList = context => {
  return context.$axios.get(`${process.env.accountUrl}/user/teams`)
}

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (teamId, context) => {
  return context.$axios.put(`${process.env.accountUrl}/team/${teamId}/change`)
}

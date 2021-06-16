import { accountUrl } from './api'

/**
 * 获取用户信息
 *
 * @see https://www.easyai.com
 */
export const getUser = (context) => context.$axios.get(`${accountUrl}/api/account`)

/**
 * 获取用户团队列表
 *
 * @see https://www.easyai.com
 */

export const getUserTeamList = (context) => context.$axios.get(`${accountUrl}/api/user/teams`)

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (teamId,context) => {
  return context.$axios.put(`${accountUrl}/api/team/${teamId}/change`)
}

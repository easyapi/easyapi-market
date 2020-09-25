import axios from 'axios'
import Cookies from 'js-cookie'

import { baseUrl } from './api'

/**
 * 获取用户信息
 *
 * @see https://www.easyai.com
 */
export const getUser = () => axios.get(`${baseUrl}/api/account`, {
  headers: {
    Authorization: 'Bearer ' + Cookies.get('authenticationToken')
  }
})

/**
 * 获取用户团队列表
 *
 * @see https://www.easyai.com
 */

export const getUserTeamList = () => axios.get(`${baseUrl}/api/user/teams`, {
  headers: {
    Authorization: 'Bearer ' + Cookies.get('authenticationToken')
  }
})

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (teamId) => {
  return axios.put(`${baseUrl}/api/team/${teamId}/change`, null, { headers: { 'Authorization': 'Bearer ' + Cookies.get('authenticationToken') } })
}

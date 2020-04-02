import axios from 'axios'

import {baseUrl} from "./api";

/**
 * 获取用户信息
 *
 * @see https://www.easyai.com
 */
export const getUser = () => axios.get(`${baseUrl}/api/account`)

/**
 * 获取用户团队列表
 *
 * @see https://www.easyai.com
 */

export const getUserTeamList = () => axios.get(`${baseUrl}/api/user/teams`)

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (id) => axios.post(`${baseUrl}/api/changeTeam/${id}`)


import http from '~/api/request'

export const account = {
  /**
   * 获取用户信息
   *
   * @see https://www.easyapi.com
   */
  getUser() {
    return http.get(`${useRuntimeConfig().public.serviceUrl}/account`, {}, {})
  },

  /**
   * 获取用户团队列表
   *
   * @see https://www.easyai.com
   */
  getUserTeamList() {
    return http.get(`${useRuntimeConfig().public.serviceUrl}/user/teams`)
  },

  /**
   * 切换团队
   *
   * @see https://www.easyai.com
   */
  changeTeam(teamId: any) {
    return http.put(`${useRuntimeConfig().public.serviceUrl}/team/${teamId}/change`)
  },
}

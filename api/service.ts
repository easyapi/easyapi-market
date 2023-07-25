import http from './request'

export const service = {

  /**
   * 获取服务列表
   */
  getServiceList(params: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/api/services`, params, {})
  },

  /**
   * 获取服务类型
   */
  getServiceTypeList(params: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/api/service/types`, params, {})
  },

  /**
   * 获取服务类型
   */
  getServiceInfo(id: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/api/service/${id}`, {}, {})
  },

  /**
   * 开通服务
   */
  subscribeService(serviceId: any): Promise<ApiResponse> {
    return http.post(`${useRuntimeConfig().public.baseUrl}/console/team/service/${serviceId}/subscribe`, {}, {})
  },

  /**
   * ....
   */
  getServicePrices(params: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}/console/service-prices`, params, {})
  },

  /**
   * ....
   */
  getService(id: any): Promise<ApiResponse> {
    return http.get(`${useRuntimeConfig().public.baseUrl}api/service/${id}`, {}, {})
  },

}

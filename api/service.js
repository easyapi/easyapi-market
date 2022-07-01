/**
 * 获取服务列表
 */
export const getServiceList = (params, context) => {
  return context.$axios.get(`${process.env.baseUrl}/api/services`, {
    params: {
      ...params
    }
  })
}

/**
 * 获取服务类型
 */
export const getServiceTypeList = context => {
  return context.$axios.get(`${process.env.baseUrl}/api/service/types`)
}

/**
 * 获取服务详情
 */
export const getServiceInfo = (id, context) => {
  return context.$axios.get(`${process.env.baseUrl}/api/service/${id}`)
}

/**
 * 开通服务
 */
export const subscribeService = (serviceId, context) => {
  return context.$axios.post(`${process.env.baseUrl}/console/team/service/${serviceId}/subscribe`, null)
}

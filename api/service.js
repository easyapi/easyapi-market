import axios from 'axios'
import Cookies from 'js-cookie'

import { serviceUrl } from './api'

/**
 * 获取服务列表
 */
export const getServiceList = params => axios.get(`${serviceUrl}/api/services`, {
  params: {
    ...params
  }
})

/**
 * 获取服务类型
 */
export const getServiceTypeList = () => axios.get(`${serviceUrl}/api/service/types`)

/**
 * 获取服务详情
 */
 export const getServiceInfo = (id) => axios.get(`${serviceUrl}/api/service/${id}`)


/**
 * 开通服务
 */
export const subscribeService = (serviceId) => {
  axios.post(`${serviceUrl}/console/team/service/${serviceId}/subscribe`, null, {
    headers: {
      Authorization: 'Bearer ' + Cookies.get('authenticationToken')
    }
  })
}

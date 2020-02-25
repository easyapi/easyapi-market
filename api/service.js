import axios from 'axios'

/**
 * 获取服务列表
 */
export const getServiceList = params => axios.get(`https://api2.easyapi.com/api/services`, {
  params: {
    ...params
  }
})

/**
 * 获取服务类型
 */
export const getServiceTypeList = () => axios.get(`https://api2.easyapi.com/api/service/types`)

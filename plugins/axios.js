import axios from 'axios'
import Cookies from 'js-cookie'
// request header
axios.defaults.baseURL = 'https://api2.easyapi.com'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  let token = Cookies.get('authenticationToken')
  console.log(config.url)
  if (token) {
    config.headers.Authorization = 'Bearer ' + Cookies.get('authenticationToken')
  }
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default axios

import axios from 'axios'
import Cookies from 'js-cookie'
// request header
axios.defaults.baseURL = 'https://api2.easyapi.com'
// axios.defaults.headers.post['encryptDisable'] = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // Cookies.set('authenticationToken','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6d2pAYmFuZ3F1LmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE1NjQyOTgwNDh9.4QS4G0Genz3qYZWSrWkXY9ocjFcANqlWTWxXduaAyT6Ah_9RcYwcNi_-HTZZRY8pf5as8Eduga6Zfi3DhEI-rA')
  let token = Cookies.get('authenticationToken')
  if (token) {
    // 全局加Token
    config.headers.Authorization = 'Bearer ' + Cookies.get('authenticationToken')
  }

  return config
}, function (error) {
  // 对请求错误做些什么
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

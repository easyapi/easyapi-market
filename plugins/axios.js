import axios from 'axios'
import Cookies from 'js-cookie'
// request header
axios.defaults.baseURL = 'https://api2.easyapi.com';
// axios.defaults.headers.post['encryptDisable'] = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  Cookies.set('authenticationToken','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoeWZAYmFuZ3F1LmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE1NjI0MTgzOTN9.M64dJH7n4wrMgqpv4ABgGeAjnM-3eeijl_NNBa4GeHXRqnkuY8z2ErW30Cm6TZCgg07CXJWwNCsoJDm6FdX6hA')
  // 全局加Token
  config.headers.Authorization = "Bearer " + Cookies.get('authenticationToken');
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);

});

export default axios

import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://api2.easyapi.com'

axios.interceptors.request.use(function (config) {
  if (Cookies.get('authenticationToken')) {
    config.headers.Authorization = 'Bearer ' + Cookies.get('authenticationToken')
  }
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)

})

export default axios

import Cookies from 'js-cookie'

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (Cookies.get('authenticationToken')) {
      config.headers.Authorization = 'Bearer ' + Cookies.get('authenticationToken')
    }
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      if (error.response.code === -9) {
        // redirect('/400')
      }
    }
  })
}

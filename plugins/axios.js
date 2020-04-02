import Cookies from 'js-cookie'

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if (Cookies.get('authenticationToken')) {
      // config.headers.Authorization = 'Bearer ' + Cookies.get('authenticationToken')
      config.headers.Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzU0NTM5MDUyN0BiYW5ncXUuY29tIiwiYXV0aCI6IiIsImV4cCI6MTU4NjU3MTc0MX0.5yLHA2v0oyOjQ1jnMO3Jyb9lspIOn0zQmh3S-dUg0cVIv-SFfjV1LJyRwu8FLMFwFt_wRsZKKHNoj1D0psgcVQ'

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

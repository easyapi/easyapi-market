module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '{{ name }}',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { type: 'text/javascript', charset: 'utf-8' }
    ]
  },
  css: [
    '@/assets/css/common.css',
    '@/assets/scss/element-variables.scss'
  ],
  plugins: ['@/plugins/element-ui', '@/plugins/axios'],
  /*
  ** Customize the progress bar color
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
  loading: {
    color: '#3B8070'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    },
    maxChunkSize: 300000, // 单个包最大尺寸
    extractCSS: true // 单独提取CSS
  },
  server: {
    port: 8888, // default: 3000
  }
}

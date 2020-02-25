import axios from 'axios'

/**
 * 获取文章列表
 */
export const getArticleList = (params) => axios.get(`https://api2.easyapi.com/api/articles`, {
  params: {
    ...params,
    appKey: 'ja4fkcz35kfqywi7',
    appSecret: 'k1v8c637vr4swgr8'
  }
})

/**
 * 获取文章详情
 */
export const getArticle = (id) => axios.get(`https://api2.easyapi.com/api/article/${id}`, {
  params: {
    appKey: 'ja4fkcz35kfqywi7',
    appSecret: 'k1v8c637vr4swgr8'
  }
})

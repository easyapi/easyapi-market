import http from '~/api/request'

export const article = {

  /**
   * 获取文章列表
   */
  getArticleList(params: any) {
    return http.get(`${useRuntimeConfig().public.baseUrl}/articles`, {
      ...params,
      appKey: 'ja4fkcz35kfqywi7',
      appSecret: 'k1v8c637vr4swgr8',
    })
  },

  /**
   * 获取文章详情
   *
   * @see http://www.easyapi.com/market/get/article
   */
  getArticle(id: number) {
    return http.get(`${useRuntimeConfig().public.baseUrl}/article/${id}`, {
      appKey: 'ja4fkcz35kfqywi7',
      appSecret: 'k1v8c637vr4swgr8',
    })
  },
}

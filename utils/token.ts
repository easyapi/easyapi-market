import { useCookie } from '#app/composables/cookie'

const key = 'authenticationToken'

/**
 * 获取token
 */
export function getToken() {
  return useCookie(key).value
}

/**
 * 移除token
 */
export function removeToken() {
  useCookie(key).value = null
  useCookie(key, { path: '/', domain: '.easyapi.com' }).value = null
}

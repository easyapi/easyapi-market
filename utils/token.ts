import { useCookies } from '@vueuse/integrations/useCookies'

const key = 'authenticationToken'
const cookies = useCookies()

/**
 * 获取token
 */
export function getToken() {
  return cookies.get(key)
}

/**
 * 移除token
 */
export function removeToken() {
  cookies.remove(key)
  cookies.remove(key, { path: '/', domain: '.easyapi.com' })
}

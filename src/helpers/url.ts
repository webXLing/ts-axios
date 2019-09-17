/*
 * @Author: web_XL
 * @Date: 2019-09-16 21:51:11
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-09-17 17:13:49
 */
import { isDate, isObject, isPlainObject } from './utils'
// 拼接url

function encode(val: string): string {
  // 对于字符 @、: 、$、, 、、[、]，我们是允许出现在 url 中的，不希望被 encode。
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const buildUrl = function(url: string, params?: any): string {
  if (!params) return url

  // 在params 不为空的情况下 遍历params 将对应的key value 放入数组 然后通过join方法拼接到url中
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === null || typeof value === 'undefined') {
      return // forEach是无法通过return 或者break 结束循环的
    }

    // 此处 只是为了将 数组情况和 非数组情况兼容
    let values = []
    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else {
      values = [value]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let lizedParams = parts.join('&')
  if (lizedParams) {
    const index = url.indexOf('#')
    if (index !== -1) {
      // 丢弃 url 中的哈希标记
      url = url.slice(0, index)
    }
    // 保留 url 中已存在的参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + lizedParams
  }
  return url
}

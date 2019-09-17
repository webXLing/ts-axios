/*
 * @Author: web_XL
 * @Date: 2019-09-17 17:40:10
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-09-17 22:10:01
 */
// 请求头 配置
import { isPlainObject } from './utils'
const normalizeName = function(headers: any, name: string) {
  if (!headers) return

  Object.keys(headers).forEach(key => {
    console.log(key, key.toUpperCase())
    console.log(name, name.toUpperCase())

    if (key !== name && key.toUpperCase() === name.toUpperCase()) {
      headers[name] = headers[key]
      delete headers[key]
    }
  })
}

// 如果 data 是一个对象  那么 就默认给他设置Content-Type = application/json;chaset=utf-8
export const processHeaders = function(headers: any, data: any): any {
  // 兼容 'content-type' 和 'Content-Type'
  normalizeName(headers, 'Content-Type')
  if (isPlainObject(data) && headers && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return headers
}

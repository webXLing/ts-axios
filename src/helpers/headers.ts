/*
 * @Author: web_XL
 * @Date: 2019-09-17 17:40:10
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-09-18 16:36:43
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

// 由于 xhr 返回的响应头是一个字符串 每一行 以 \r\n 结尾
// 转化为 json

// "date: Wed, 18 Sep 2019 08:23:27 GMT
// etag: W/"d-talgBZSHcQOay+ud5zDrtp+2VNk"
// connection: keep-alive
// x-powered-by: Express
// content-length: 13
// content-type: application/json; charset=utf-8
// "
export const parseHeaders = function(headers: string): object {
  let res = Object.create(null)
  if (!headers) {
    return res
  }
  console.log()

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    if (!key) return
    if (val) {
      val = val.trim()
    }
    res[key] = val
  })
  return res
}

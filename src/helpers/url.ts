// /*
//  * @Author: web_XL
//  * @Date: 2019-09-16 21:51:11
//  * @Last Modified by: web_XL
//  * @Last Modified time: 2019-09-16 22:32:38
//  */
import { isArray } from 'util'
import { isDate, isObject } from './utils'
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
      } else if (isObject(val)) {
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
// import { isDate, isObject } from './utils'

// function encode(val: string): string {
//   return encodeURIComponent(val)
//     .replace(/%40/g, '@')
//     .replace(/%3A/gi, ':')
//     .replace(/%24/g, '$')
//     .replace(/%2C/gi, ',')
//     .replace(/%20/g, '+')
//     .replace(/%5B/gi, '[')
//     .replace(/%5D/gi, ']')
// }

// export function buildUrl(url: string, params?: any) {
//   if (!params) {
//     return url
//   }

//   const parts: string[] = []

//   Object.keys(params).forEach((key) => {
//     let val = params[key]
//     if (val === null || typeof val === 'undefined') {
//       return
//     }
//     let values: string[]
//     if (Array.isArray(val)) {
//       values = val
//       key += '[]'
//     } else {
//       values = [val]
//     }
//     values.forEach((val) => {
//       if (isDate(val)) {
//         val = val.toISOString()
//       } else if (isObject(val)) {
//         val = JSON.stringify(val)
//       }
//       parts.push(`${encode(key)}=${encode(val)}`)
//     })
//   })

//   let serializedParams = parts.join('&')

//   if (serializedParams) {
//     const markIndex = url.indexOf('#')
//     if (markIndex !== -1) {
//       url = url.slice(0, markIndex)
//     }

//     url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
//   }

//   return url
// }

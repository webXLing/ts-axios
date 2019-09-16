/*
 * @Author: web_XL
 * @Date: 2019-09-16 22:07:43
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-09-16 22:19:06
 */
const toString = Object.prototype.toString // 缓存变量
export function isDate(val: any): val is Date {
  // 谓词保护
  return toString.call(val) === '[object Date]'
}

// 是否为object
export function isObject(val: any): val is Object {
  // 排除null typeof null === 'object'
  return val !== null && typeof val === 'object'
}

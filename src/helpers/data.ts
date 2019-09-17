/*
 * @Author: web_XL
 * @Date: 2019-09-17 17:10:36
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-09-17 17:13:04
 */
import { isPlainObject } from './utils'

// 对 request 中的 data 做一层转换
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    data = JSON.stringify(data)
  }
  return data
}

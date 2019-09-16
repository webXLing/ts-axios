/*
 * @Author: web_XL
 * @Date: 2019-08-20 21:20:00
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-08-20 21:37:10
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): void {
  xhr(config)
}
export default axios
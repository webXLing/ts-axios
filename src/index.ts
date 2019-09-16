/*
 * @Author: web_XL
 * @Date: 2019-08-20 21:20:00
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-09-16 22:55:25
 */
import { AxiosRequestConfig } from './types'
import { buildUrl } from './helpers/url'

import xhr from './xhr'
function axios(config: AxiosRequestConfig): void {
  processConfig(config) //处理 config

  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config) // 处理url
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}
export default axios

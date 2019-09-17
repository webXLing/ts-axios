/*
 * @Author: web_XL
 * @Date: 2019-08-20 21:20:00
 * @Last Modified by: web_XL
 * @Last Modified time: 2019-09-17 21:55:12
 */
import { AxiosRequestConfig } from './types'
import { buildUrl } from './helpers/url'
import { processHeaders } from './helpers/headers'
import { transformRequest } from './helpers/data'

import xhr from './xhr'
function axios(config: AxiosRequestConfig): void {
  processConfig(config) //处理 config

  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config) // 处理url
  // 若data 为对象 设置Content-Type = application/json;chaset=utf-8
  config.headers = transformHeaders(config)

  config.data = transformRequestData(config) // 处理data
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
export default axios

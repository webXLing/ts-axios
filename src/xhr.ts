import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { headers, data = null, url, method = 'get', responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toLocaleUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      const responseHeaders = request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      console.log('request', request)

      const response: AxiosResponse = {
        data: responseData, // 服务端返回的数据
        status: request.status, // HTTP 状态码
        statusText: request.statusText, // 状态消息
        headers: parseHeaders(responseHeaders), //响应头
        config, // 请求配置对象
        request //请求的 XMLHttpRequest 对象实例
      }
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`request failed with status code ${response.status}`))
      }
    }

    //请求超时 错误处理
    request.ontimeout = function handelTimeout() {
      reject(new Error(`Timeout ${timeOut}`))
    }

    // 请求错误监听
    request.onerror = function handleError(err) {
      throw new Error('Network Error')
    }

    // 如果data为空 那么就不需要去设置content-type
    Object.keys(headers).forEach(val => {
      if (data === null && val.toLowerCase() === 'content-type') {
        delete headers[val]
      } else {
        request.setRequestHeader(val, headers[val])
      }
    })
    request.send(data)
  })
}

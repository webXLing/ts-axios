import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { headers, data = null, url, method = 'get' } = config
  const request = new XMLHttpRequest()

  request.open(method.toLocaleUpperCase(), url, true)

  // 如果data为空 那么就不需要去设置content-type

  Object.keys(headers).forEach(val => {
    if (data === null && val.toLowerCase() === 'content-type') {
      delete headers[val]
    } else {
      request.setRequestHeader(val, headers[val])
    }
  })
  request.send(data)
}

import { AxiosRequestConfig, AxiosResponse } from './../types'
export class AxiosError extends Error {
  config: AxiosRequestConfig //请求对象配置
  isAxiosError: boolean
  code?: string | null // 错误代码
  request?: any // 请求对象
  response?: AxiosResponse // 响应对象
  constructor(
    mssage: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(mssage)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError) //修改—__proto__
  }
}

export function catchError(
  mssage: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(mssage, config, code, request, response)
}

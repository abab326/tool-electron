export type CommonResult<T = any> = {
  success: boolean
  data?: T
  message?: string = '请求成功'
}

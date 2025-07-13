import { CommonResult } from '@/types/common'

export type LoginParams = { username: string; password: string }
export type LoginResult = CommonResult<{ token: string }>

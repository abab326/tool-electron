import { LoginParams, LoginResult } from '@/types/auth'

/**
 * 登录
 * @param event
 * @param credentials
 * @returns
 */
const login = async (event: Electron.Event, credentials: LoginParams): Promise<LoginResult> => {
  console.log('login', credentials)
  const { username, password } = credentials
  if (username === 'admin' && password === 'admin') {
    return {
      success: true,
      data: { token: 'generated-token' }
    }
  }
  return Promise.reject(new Error('用户名或密码错误'))
}

/**
 * 登出
 * @returns
 */
const logout = async (): Promise<void> => {
  return Promise.resolve()
}

const register = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('login', login)
  ipcMain.handle('logout', logout)
}

export default register

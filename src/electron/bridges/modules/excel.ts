import * as ExcelJS from 'exceljs'
import { resolve } from 'node:path'

/**
 * 使用 exceljs 解析 excel 文件
 * @param filePath - 要解析的 excel 文件路径
 * @returns Promise 对象，解析成功后返回解析后的数据
 */
async function parseExcelFile(event: Electron.Event, filePath: string) {
  return new Promise(async (resolve, reject) => {
    console.log('解析文件路径:', filePath)
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheets: Record<string, any[]> = {}

    workbook.eachSheet((worksheet) => {
      const sheetData: any[] = []

      worksheet.eachRow((row) => {
        const rowData: any[] = []
        row.eachCell((cell) => {
          console.log('cell.col:', cell.col)
          rowData.push(cell.value)
        })
        sheetData.push(rowData)
      })
      worksheets[worksheet.name] = sheetData
    })
    console.log('解析结果:', worksheets)
    resolve(worksheets)
  })
}

const register = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('parseExcelFile', parseExcelFile)
}

export default register

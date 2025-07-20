import * as ExcelJS from 'exceljs'
import * as XLSX from 'xlsx'
import fs from 'fs'

/**
 * 使用 exceljs 解析 excel 文件
 * @param filePath - 要解析的 excel 文件路径
 * @returns Promise 对象，解析成功后返回解析后的数据
 */
async function parseExcelFile(event: Electron.Event, filePath: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`文件不存在: ${filePath}`)
      }

      console.log('解析文件路径:', filePath)

      const data = fs.readFileSync(filePath)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      // 打印第4行所有列的数
      const range = XLSX.utils.decode_range(firstSheet['!ref']!)
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = firstSheet[XLSX.utils.encode_cell({ r: 3, c: col })]
        console.log('第4行第', col, '列的值:', cell?.v)
      }
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
        header: 2,
        range: 2,
        defval: ''
      })
      resolve(jsonData)
    } catch (error) {
      console.error('解析Excel文件出错:', error)
      reject(error)
    }
    // const workbook = new ExcelJS.Workbook()
    // await workbook.xlsx.readFile(filePath)
    // const worksheets: Record<string, any[]> = {}

    // workbook.eachSheet((worksheet) => {
    //   const sheetData: any[] = []

    //   worksheet.eachRow((row) => {
    //     const rowData: any[] = []
    //     row.eachCell((cell) => {
    //       console.log('cell.col:', cell.col)
    //       rowData.push(cell.value)
    //     })
    //     sheetData.push(rowData)
    //   })
    //   worksheets[worksheet.name] = sheetData
    // })
    // console.log('解析结果:', worksheets)
    // resolve(worksheets)
  })
}

const register = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('parseExcelFile', parseExcelFile)
}

export default register

import * as ExcelJS from 'exceljs';

/**
 * 使用 exceljs 解析 excel 文件
 * @param filePath - 要解析的 excel 文件路径
 * @returns Promise 对象，解析成功后返回解析后的数据
 */
async function parseExcelFile(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheets: Record<string, any[]> = {};

    workbook.eachSheet((worksheet) => {
        const sheetData: any[] = [];
       
        worksheet.eachRow((row) => {
            const rowData: any[] = [];
            row.eachCell((cell) => {
                rowData.push(cell.value);
            });
            sheetData.push(rowData);
        });
        worksheets[worksheet.name] = sheetData;
    });

    return worksheets;
}

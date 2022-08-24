const excel = require('xlsx')

//excel to json
const exJson = (value) => {
    const productFile = excel.read(value.buffer)

    let data = []

    const sheetList = productFile.SheetNames

    for (let i = 0; i < sheetList.length; i++){
        const jsonSheet = excel.utils.sheet_to_json(
            productFile.Sheets[productFile.SheetNames[i]]
        )
        jsonSheet.forEach((res) => {
            data.push(res)
        })
    }
    return data
}

//json to excel
async function jsonToExcel(jsonData) {
    let updated = excel.utils.book_new()
    const write = excel.utils.json_to_sheet(jsonData)

    excel.utils.book_append_sheet(updated, write, "product_list.xlsx")
    await excel.writeFile(updated, './product_list.xlsx')
    return true
}

module.exports = {jsonToExcel,exJson}
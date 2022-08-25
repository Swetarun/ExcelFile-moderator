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

        //adding the response from jsonSheet
        jsonSheet.forEach((res) => {
            data.push(res)
        })
    }
    return data
}

//json to excel
const jsonToExcel = async (jsonData) => {

    //creating new book
    let updated = excel.utils.book_new()

    //adding data from json to sheet of new book
    const write = excel.utils.json_to_sheet(jsonData)

    //adding the sheet to the book
    excel.utils.book_append_sheet(updated, write, "product_list.xlsx")
    await excel.writeFile(updated, './product_list.xlsx')
    return true
}

module.exports = {jsonToExcel,exJson}
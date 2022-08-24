const {getProduct} = require('../axios/axios')
const {jsonToExcel,exJson} = require('../Excel/excelToDo')

const products = async (req, res) => {
    try {
        let data = req.files
        let excelSheet = exJson(data[0])

        for (let i of excelSheet) {
            //api call for product price
            const axiosResponse = await getProduct(i.product_code)
            if (!axiosResponse) {
                res.send({msg: `The ${i.product_code} is not there`})
            }

            //error handling
            if (axiosResponse.status == false) {
                return res.status(400).send({status:false, msg: "unable to fetch"})
 
            }
            
            i["price"] = axiosResponse.data.price
        }
        //conversion from json to excel
        await jsonToExcel(excelSheet)

        return res.download("product_list.xlsx")
    }
    catch (e) {
        return res.status(500).send({status: false, message: e.message})
    }
}

module.exports = { products}
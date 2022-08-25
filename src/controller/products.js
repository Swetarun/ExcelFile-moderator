const {getProduct} = require('../axios/axios')
const {jsonToExcel,exJson} = require('../Excel/excelToDo')

const products = async (req, res) => {
    try {
        let data = req.files

        //calling function to convert from excel to json form
        let excelSheet = exJson(data[0])

        for (let i of excelSheet) {
            //api call for product price
            const axiosResponse = await getProduct(i.product_code)

            //checking for single product whether its present or not
            if (!axiosResponse) {
                res.send({msg: `The ${i.product_code} is not there`})
            }

            //error handling
            if (axiosResponse.status == false) {
                return res.status(400).send({status:false, msg: "unable to fetch"})
            }
            
            //adding the prices
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
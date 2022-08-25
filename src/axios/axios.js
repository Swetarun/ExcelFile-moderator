const axios = require('axios')

let getProduct = async (product_code) => {
    try {
       //url for axios call
        let url = `https://api.storerestapi.com/products/${product_code}`

        //accepting only json format
        let headers = {
            "Accept" : "application/json"
        }
        //using get method
        let result = await axios.get(url, { headers })
        
        //success
        return {
            status: true,
            data: result.data.data
        }
    }
    catch (e) {
        return ({status: false, message: e.message})
    }
}

module.exports = {getProduct}
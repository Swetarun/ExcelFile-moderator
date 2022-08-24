const axios = require('axios')

let getProduct = async (product_id) => {
    try {
       
        let url = `https://api.storerestapi.com/products/${product_id}`
        let headers = {
            "Accept" : "application/json"
        }
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
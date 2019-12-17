const {updateStock, getProduct} = require('../Models/product')
const transModel = require('../Models/transaction')
const form = require('../Helpers/form')
const {sellTransactionUid} = require('../Helpers/functions')


module.exports = {
    createNewSell: async (req, res) => {
        const {transactionDetail} = req.body
        const orders= transactionDetail.map(item => {
            return {id: item.productId,
                qty: item.productQty}
            })
            // check product if it is available in database and the quantity not more than available
        for (let i=0; i<orders.length; i++) {
            const orderDB = await getProduct(request= undefined, reqId= orders[i].id)
            if (orderDB.length === 0) {
                return form.error(res, 400, `Product with id ${orders[i].id} is not found`) 
            }
            if (orders[i].qty > orderDB[0].product_stock) {
                return form.error(res, 400, `Quantity of order is exceeding the available stock`)
            }
        }
        transModel
        .createNewSell(req, sellTransactionUid())
        .then (response => {
            let logger = []
            orders.forEach(async ({id,qty})  => {
                await updateStock(request= undefined, dbProduct=undefined, reqId= id, type="reduce", orderQty=qty)
                .then(response => {
                    logger.push({response, id, isSuccess:true})
                    // console.log(logger, 'logger1')
                })
                .catch(err => {
                    console.log("err", err)
                    logger.push({response: err,id, isSuccess:false})
                })
            })
            if (logger.includes(log => !log.isSuccess)) {
                form.error(res, 400, 'Error handling update stock')
            }else {
                form.success2(res, 200, response, req.body, "trans", "create");
            }
        })
        .catch (err => {
            if (err.code == "ER_DUP_ENTRY") this.createNewSell(req, res);
            else form.error(res, 400, 'Error handling new transaction')
        })
    }
}
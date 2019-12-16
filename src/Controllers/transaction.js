const {updateStock, getProduct} = require('../Models/product')
const transModel = require('../Models/transaction')
const form = require('../Helpers/form')
const {transactionUid} = require('../Helpers/functions')

module.exports = {
    createNewTransaction: async (req, res) => {
        const {transactionDetail} = req.body
        const orders= transactionDetail.map(item => {
            return {id: item.productId,
                qty: item.productQty}
            })
            // check product if it is available in database and the quantity not more than available
        await orders.forEach(async ({id}) => {
            await getProduct(request= undefined, reqId= id)
            .then( product => {
                console.log("dithen1")
                return form.prodForm(product)
            })
            .then( product => {
                if (product.length === 0) {
                    return form.error(res, 400, `Product with id ${id} is not found`) 
                }
                if (transactionDetail.productQty > product[0].stock) {
                    return form.error(res, 400, `Quantity of order is exceeding the available stock`)
                }
            })
            .catch (err => {
                console.log(err, 'err')
                form.error(res, 400, 'Error handling checking product')
            })
        });
        // for (let i=0; i<orders.length; i++) {
        //     console.log('order', orders[i])
        // // orders.forEach(({id, qty}) => {
        //     const orderDB = await getProduct(request= undefined, reqId= orders[i].id)
        //     console.log("then")
        //     if (orderDB.length === 0) {
        //         return form.error(res, 400, `Product with id ${orders[i].id} is not found`) 
        //     }
        //     if (orders[i].qty > orderDB[0].product_stock) {
        //         return form.error(res, 400, `Quantity of order is exceeding the available stock`)
        //     }
        // // });
        // }
        console.log('antara trans')
        
        transModel
        .createNewTransaction(req, transactionUid())
            .then (response => {
                let logger = []
                productId.forEach(async ({id,qty})  => {
                    await updateStock({reqId: id, type:"reduce", orderQty:qty})
                    .then(response => {
                        logger.push({response, id, isSuccess:true})
                    })
                    .catch(err => {
                        logger.push({response,id, isSuccess:false})
                    })
                })
                if (logger.includes(log => !log.isSuccess)) {
                    form.error(res, 400, 'Error handling update stock')
                }else form.success2(res, 200, response, req.body, "trans", "create");
            })
            .catch (err => {
                console.log(req, "dierror rwq")
                form.error(res, 400, 'Error handling new transaction')
            })
    }
}
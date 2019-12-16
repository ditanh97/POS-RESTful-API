const connection = require('../Configs/connect')

module.exports = {
    createNewTransaction: (req, transactionUid) => {
        return new Promise ((resolve, reject) => {
            console.log(req.body, 'bodyd')
            const {cashierId, totalPrice, transactionDetail} = req.body
            let sql_query = 'INSERT INTO transactions SET id_cashier=?, id_order_transaction=?, total_price=?'
            let sql_detail_query = 'INSERT INTO products_transactions (id_order_transaction, id_product, product_quantity, subtotal_price) VALUES ? '
            connection.query(sql_query,
                [cashierId, transactionUid, totalPrice],
                (err, response) => {
                    if(!err) {
                        //ini kan query nya async
                        const values = transactionDetail.map(item => [transactionUid, item.productId, item.productQty, item.subTotal]);
                        connection.query(sql_detail_query,
                            [values],
                            (err, response) => {
                                if(!err){
                                    resolve(response)
                                }
                                else {
                                    reject(err);
                                }
                            })
                        
                    } else {
                        reject(err)
                    }
                })
        })
    },
}



  
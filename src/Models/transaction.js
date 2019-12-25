const connection = require('../Configs/connect')

module.exports = {
    createNewSell: (req, sellTransactionUid) => {
        return new Promise ((resolve, reject) => {
            console.log(req.body, 'bodyd')
            const {cashierId, totalPrice, transactionDetail} = req.body
            let sql_query = 'INSERT INTO transactions SET id_cashier=?, id_order_transaction=?, total_price=?'
            let sql_detail_query = 'INSERT INTO products_transactions (id_order_transaction, id_product, product_quantity, subtotal_price) VALUES ? '
            connection.query(sql_query,
                [cashierId, sellTransactionUid, totalPrice],
                (err, response) => {
                    if(!err) {
                        //ini kan query nya async
                        const values = transactionDetail.map(item => [sellTransactionUid, item.productId, item.productQty, item.subTotal]);
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
    getRecentSellByCashierId: (req) => {
        const cashierId = req.body.cashierId;
        return new Promise((resolve, reject) => {
            console.log(cashierId, 'idcashier')
            let query1 = 'SELECT * FROM transactions WHERE date_added = (SELECT max(date_added) FROM transactions WHERE id_cashier = ?)'
            let query2 = 'SELECT * FROM products_transactions WHERE id_order_transaction = ?'
            connection.query(query1, [cashierId],
                (err, response) => {
                    if (!err) {
                        const orderId = response[0].id_order_transaction
                        connection.query(query2,
                            [orderId],
                            (err, response) => {
                                if(!err){
                                    resolve(response)
                                }
                                else {
                                    reject(err);
                                }
                            })
                    }
                    else reject(err);
                })
        });
    }
}


  
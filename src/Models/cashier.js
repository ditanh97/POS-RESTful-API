const connection = require('../Configs/connect');

module.exports = {
    registerCashier: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query('INSERT cashiers SET username=?, email=?, password=?',[data.username, data.email, data.password], (err, response) =>{
                if (!err) {
                    resolve (response)
                }else { 
                    reject (err)
                }
            })
        })
    },
    loginCashier: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM cashiers WHERE username =?', data.username, (err, response) => {
                if (!err) {
                    resolve (response)
                }else {
                    reject (err)
                }
            })
        })
    },
    registerCheck: (data) => {
        return new Promise((resolve, reject) =>{
            connection.query('SELECT * FROM cashiers WHERE username=? OR email=?',[data.username, data.email], (err, response) =>{
                if (!err) {
                    resolve (response)
                }else {
                    reject (err)
                }
            })
        })
    },
}


'use strict';
const jwt = require('jsonwebtoken');


function generateToken(payload,expire, callback){
    jwt.sign(payload, 'secret',{expiresIn: expire}, (err,token) => {
        if(err){
            return callback(err, null);
        }
        return callback(null, token);
    })
}


function sellTransactionUid() {
    const date = new Date ()
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear() -2000;
    let randi = Math.floor(Math.random() * 9900);
   
    return parseInt(`${year}${month}${day}${randi}`)
  }


  module.exports = {generateToken, sellTransactionUid}
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

module.exports = generateToken;
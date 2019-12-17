//reference code: https://github.com/irsyaadbp/Point-Of-Sales-API/blob/new/src/Controllers/order.js
const express = require('express');
const Router = express.Router();
const verify = require('../Middleware/verifyToken');
const transController = require('../Controllers/transaction');

Router.post('/', verify, transController.createNewSell);

module.exports = Router;
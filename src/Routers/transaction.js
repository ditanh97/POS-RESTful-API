const express = require('express');
const Router = express.Router();
const verify = require('../Middleware/verifyToken');
const transController = require('../Controllers/transaction');

Router.post('/', transController.createNewTransaction);

module.exports = Router;
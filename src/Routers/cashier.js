// Route for /
const express = require('express')
const cashierController = require('../Controllers/cashier')
const Router = express.Router()


Router
  .get('/', (req, res) => {
    res.json({
      message: "Welcome to Cashier Panel",
      login: "If you already have an account, please login",
      register: "Register your account in order to use this Panel"
    })
  })
  .post('/register', cashierController.registerCashier)
  .post('/login', cashierController.loginCashier)

module.exports = Router
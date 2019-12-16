const express = require ('express');
const product = require ('./product');
const category = require ('./category');
const cashier = require ('./cashier');
const transaction = require ('./transaction');

const Router = express.Router ();
/* Middleware route */
Router.use('/', cashier); //route for homepage, register, and login
Router.use ('/products', product);
Router.use ('/categories', category);
Router.use('/transaction', transaction);

module.exports = Router;

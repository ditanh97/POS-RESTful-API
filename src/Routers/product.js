const express = require ('express');
const Router = express.Router ();
const verify = require('../Middleware/verifyToken');
const prodController = require ('../Controllers/product');

/*=============================================*/
// const cors = require('cors');

// const configurationOptions = {
// 	methods: ['GET', 'PUT', 'POST'],  //method that allowed
// 	origin:  'localhost:3000' // ('*') for all access
// }

/*=============================================*/


/*==========================================================================================*/
/*CORS*/
// Router.get ('/', cors(configurationOptions), prodController.getProducts);
// Router.get ('/:id', cors(configurationOptions), prodController.getProduct); 
// Router.post ('/', cors(configurationOptions), prodController.postProduct);
// Router.put('/:id', cors(configurationOptions), prodController.updateProduct);//patch
// Router.delete ('/:id', cors(configurationOptions), prodController.deleteProduct);
// Router.get('sort/:order', cors(configurationOptions), prodController.orderProduct);
// Router.get('/search/:keyword', cors(configurationOptions), prodController.searchProduct);
// Router.patch('/stock/:stock', cors(configurationOptions), prodController.updateStock);

/*==========================================================================================*/

Router.get ('/', verify, prodController.getProducts);
Router.get ('/show/:id', verify, prodController.getProduct);
Router.get('/sort', verify, prodController.sortProduct);
Router.get('/search', verify, prodController.searchProduct);
Router.get('/page', verify, prodController.pagingProducts);

Router.post ('/', verify, prodController.postProduct);

//update
Router.put('/:id', verify, prodController.updateProduct);
Router.put('/stock/:id', verify, prodController.updateStock);

Router.delete ('/:id', verify, prodController.deleteProduct);


module.exports = Router;






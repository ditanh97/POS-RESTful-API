const express = require ('express');
const Router = express.Router ();
const verify = require('../Middleware/verifyToken');
const catController = require ('../Controllers/category');

Router.get ('/', verify, catController.getCategories);
Router.post ('/upload', catController.postCategoryWithImage);
Router.post ('/', verify, catController.postCategory);
Router.get ('/:id', verify, catController.getCategory);
Router.put ('/:id', verify, catController.updateCategory);
Router.delete ('/:id', verify, catController.deleteCategory);
module.exports = Router;








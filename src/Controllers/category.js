const catModel = require('../Models/category');
const form = require ('../Helpers/form');
module.exports = {
  getCategories: (req, res) => {
    catModel
      .getCategories ()
      .then (response => {
        form.success(res, 200, response, "cat");
      })
      .catch (error => {
        form.error(res, 400, err);
      });
  },
  postCategory: (req, res) => {
    catModel
      .postCategory (req)
      .then (([response, result]) => {
        form.success2(res, 200, response, result, "cat", "insert");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  getCategory: (req, res) => {
    catModel
      .getCategory (req)
      .then (response => {
        form.success(res, 200, response, "cat");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  updateCategory: (req, res) => {
    catModel
      .getCategory (req)
      .then (response => {
        return form.catForm(response)
      })
      .then ( (dbProduct) => {
          catModel.updateCategory(req, dbProduct).then ( ([response,result]) => {
          // console.log(result)
          form.success2(res, 200, response, result, "cat", "update")
          
        }) 
        .catch (err =>{
          console.log(err, 'err')
          form.error(res, 400, err);
        })
      })
      .catch (err => {
        console.log(err, 'err2')
        form.error(res, 400, err);
      });
  },
  deleteCategory: (req, res) => {
    catModel
      .deleteCategory (req)
      .then ( ([response, result]) => {
        form.success2(res, 200, response, result, "cat", "delete");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
};







const prodModel = require ('../Models/product');
const form = require ('../Helpers/form');
module.exports = {
  getProducts: (req, res) => {
    prodModel
      .getProducts ()
      .then (response => {
        form.success (res, 200, response, "prod");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  postProduct: (req, res) => {
    prodModel
      .postProduct (req)
      .then (([response,result]) => {
        form.success2(res, 200, response, result, "prod", "insert");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  getProduct: (req, res) => {
    prodModel
      .getProduct (req)
      .then (response => {
        form.success (res, 200, response, "prod");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  updateProduct: (req, res) => {
    prodModel
      .getProduct (req)
      .then (response => {
        return form.prodForm(response);
      })
      .then (dbProduct => {
        prodModel.updateProduct(req, dbProduct).then (([response,result]) => {
          // console.log('result',result)
          form.success2(res, 200, response, result, "prod", "update");
          
        })
        .catch (err =>{
          console.log(err,'err')
          form.error(res, 400, err);
        })
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  deleteProduct: (req, res) => {
    prodModel
      .deleteProduct (req)
      .then (([response,result]) => {
        form.success2(res, 200, response, result, "prod", "delete");
        })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  searchProduct: (req, res) => {
    console.log(req.query);
    prodModel
      .searchProduct (req)
      .then (response => {
        form.success (res, 200, response, "prod");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  sortProduct: (req, res) => {
    prodModel
      .sortProduct (req)
      .then (response => {
        form.success (res, 200, response, "prod");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  pagingProducts: (req, res) => {
    prodModel
      .pagingProducts (req)
      .then (response => {
        form.success (res, 200, response, "prod");
      })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
  updateStock: (req, res) => {
    prodModel
      .getProduct (req)
      .then (response => {
        return form.prodForm(response);
      })
      .then (dbProduct => {
        console.log(dbProduct)
        prodModel.updateStock(req, dbProduct).then (response => {
          form.success2(res, 200, response, req.body, "stock", "update");
        })
        .catch (err => {
          form.error(res, 400, err);
        });
        })
      .catch (err => {
        form.error(res, 400, err);
      });
  },
};








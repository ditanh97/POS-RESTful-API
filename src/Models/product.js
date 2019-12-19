const connection = require ('../Configs/connect');
const { getMaxPage } = require('../Helpers/feature');
const { searchProduct } = require('../Helpers/feature');
const { sorting } = require('../Helpers/feature');

const joinTable = `SELECT products.id, products.id_category, products.product_name, products.product_description, products.product_image, products.product_price, products.product_stock, products.date_added, products.date_updated, categories.product_category FROM products, categories WHERE products.id_category = categories.id `

module.exports = {
  getProducts: (req, page) => {
    let sql = joinTable;
    let query = searchProduct(req, sql);
    sql = sorting(req, query.sql);
    const paging = `${sql} LIMIT ? OFFSET ?`;

    return new Promise ((resolve, reject) => {
        getMaxPage(page, query.search, "products", "product_name")
        .then (maxPage => {
            const infoPage = {
                currentPage: page.page,
                totalAllProduct: maxPage.total,
                maxPage: maxPage.maxPage
            };
            connection.query(paging,
                query.search == null ? [page.limit, page.offset] : ['%' + query.search + '%', page.limit, page.offset],
                (err, response) => {
                    if (!err) {
                        resolve ({
                            infoPage,
                            response
                        });
                    }
                    else {
                        reject (err);
                    }
                }
            );
        }).catch(err => {
            reject(err)
        });
    });
},
  postProduct: req => {
    return new Promise ((resolve, reject) => {
      const body = req.body;
      const result = { 
        name: body.name, 
        description: body.description,
        image: body.image,
        category: body.category,
        category_name: body.category_name,
        price: body.price,
        stock: body.stock}
      let sql_query = 'INSERT INTO products SET product_name=?, product_description=?, product_image=?, id_category=?, product_price=?, product_stock=?'
      connection.query (sql_query,
        [body.name, body.description, body.image, body.category, body.price, body.stock],
        (err, response) => {
          if (!err) {
            resolve (([response, result]));
          } else {
            reject (err);
          }
        }
      );
    });
  },
  getProduct: (request, reqId = undefined) => {
    return new Promise((resolve, reject) =>{
      const id = request === undefined? reqId : request.params.id;
      connection.query ('SELECT products.id, id_category, product_name, product_description, product_image, product_price, product_stock, date_added, date_updated, categories.product_category  FROM products JOIN categories ON (products.id_category = categories.id) WHERE products.id=?',
        [id], 
        (err, response) => {
          if(!err) {
            resolve (response);
          } else {
            reject(err);
          }
        })
    })
  },
  updateProduct: (req, dbProduct) => {
    return new Promise((resolve, reject) =>{
      const db = dbProduct[0];
      const id = req.params.id;
      let body = req.body;
      let name = body.name? body.name : db.name; 
      let description = body.description? body.description : db.description;
      let image = body.image? body.image: db.image;
      let category = body.category? body.category: db.category;
      let price = body.price? body.price: db.price;
      let stock = body.stock? body.stock: db.stock;
      let category_name = body.category_name? body.category_name: db.category_name;
      if (stock < 0 || price < 0) {
        return reject("Price or stocks can not be negative.");
        }
      const result = {id: parseInt(id), name,description, image, category, price, stock, category_name}
      let sql_query = 'UPDATE products SET product_name=?, product_description=?, product_image=?, id_category=?, product_price=?, product_stock=? WHERE id=?'
      connection.query(sql_query,
        [name, description, image, category, price, stock, id],
        (err, response) => {
          if(!err) {
            resolve (([response, result]));
          } else {
            reject(err);
          }
        })
    })
  },
  deleteProduct: (req) =>{
    return new Promise((resolve, reject) =>{
      let id = req.params.id;
      const result = {id: parseInt(id)}
      connection.query('DELETE FROM products WHERE id=?',
        [id],
        (err,response)=>{
          if(!err){
            resolve(([response, result]));
          }else{
            reject(err);
          }
        })
    })
  },
  searchProduct: req => {
    return new Promise((resolve, reject) =>{
      let key = req.query.name;
      connection.query (`SELECT * FROM products WHERE product_name LIKE '%${key}%'`,
        (err, response) => {
          if(!err) {
            resolve (response);
          } else {
            reject(err);
          }
        })
    })
  },
  sortProduct: req => {
    return new Promise((resolve, reject) =>{
      let keyword = req.query.by;
      let order = req.query.order;
      keyword = (keyword == "name") ? "product_name" : (keyword == "category") ? "id_category" : (keyword == "date") ? "date_updated" : reject("order not allowed");
      console.log(`ordernya nya adalah: ${keyword}`);
      connection.query (`SELECT * FROM products ORDER BY ${keyword} ${order}`,
        (err, response) => {
          if(!err) {
            resolve (response);
          } else {
            reject(err);
          }
        })
    })
  },
  pagingProducts: req => {
    const limit = parseInt(req.query.lim);
    const page = parseInt(req.query.p);
    const startIndex = (page - 1) * limit; //array is a zero index
    return new Promise ((resolve, reject) => {
      connection.query ('SELECT * FROM products LIMIT ? OFFSET ?',
        [limit, startIndex], 
        (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },
  updateStock: (request, dbProduct, reqId=undefined, type=undefined, orderQty=undefined) => {
    return new Promise((resolve, reject) =>{
      let id = request !== undefined? request.params.id : reqId;
      let qty = request !== undefined ? request.body.qty : orderQty;
      let typeStock = request !== undefined? request.body.type : type;
      let sign = "+";
      if (typeStock == "reduce") {
        sign = "-";
         if (dbProduct !== undefined) {
          const stock = dbProduct[0]["stock"];
           if (stock - qty < 0) {
              return reject("Can not update the stock. Stock reduce above limits.");
            } 
          }
      }
      connection.query(`UPDATE products SET product_stock = product_stock ${sign} ${qty} WHERE id = ${id}`,
        (err, response) => {
          if(!err) {
            console.log(response);
            resolve (response);
          } else {
            reject(err);
          }
        })
    })
  },
};



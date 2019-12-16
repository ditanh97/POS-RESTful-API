const connection = require ('../Configs/connect');
module.exports = {
  getProducts: () => {
    return new Promise ((resolve, reject) => {
      connection.query ('SELECT products.id, id_category, product_name, product_description, product_image, product_price, product_stock, date_added, date_updated, categories.product_category  FROM products JOIN categories ON (products.id_category = categories.id)', (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
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
      //disini user bisa saja cuman update nama, makaperlu dicek apakah defined atau undefined, pakai ternary, dan ambil dbase
      let name = body.name? body.name : db.name; 
      let description = body.description? body.description : db.description;
      let image = body.image? body.image: db.image;
      let category = body.category? body.category: db.category;
      let price = body.price? body.price: db.price;
      let stock = body.stock? body.stock: db.stock;
      if (stock < 0 || price < 0) {
        return reject("Price or stocks can not be negative.");
        }
      const result = {id: parseInt(id), name,description, image, category, price, stock}
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
  updateStock: (req, dbProduct, reqId, type, orderQty) => {
    return new Promise((resolve, reject) =>{
      let body = req.body;
      let id = req.params.id || reqId;
      let qty = body.qty || orderQty;
      let typeStock = body.type || type;
      const stock = dbProduct[0]["stock"];
      let sign = "+";
      if (typeStock == "reduce") {
        sign = "-";
        if (stock - qty < 0) {
          return reject("Can not update the stock. Stock reduce above limits.");
        }
      }
      const result = {id: parseInt(id), stock: stock}
      connection.query(`UPDATE products SET product_stock = product_stock ${sign} ${qty} WHERE id = ${id}`,
        (err, response) => {
          if(!err) {
            console.log(response);
            resolve (([response, result]));
          } else {
            reject(err);
          }
        })
    })
  },
};



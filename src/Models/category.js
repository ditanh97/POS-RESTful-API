const connection = require ('../Configs/connect');
module.exports = {
  getCategories: () => {
    return new Promise ((resolve, reject) => {
      connection.query ('SELECT * FROM categories', (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },
  postCategory: req => {
    return new Promise ((resolve, reject) => {
      const body = req.body;
      const result = {category: body.category, image: body.image}
      connection.query ('INSERT INTO categories SET product_category=?, image_category=?',
        [body.category, body.image],
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
  getCategory: req => {
    return new Promise((resolve, reject) =>{
      const id = req.params.id;
      console.log(`id = ${id}`);
      connection.query ('SELECT * FROM categories WHERE id=?',
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
  updateCategory: (req, dbProduct) => {
    return new Promise((resolve, reject) =>{
      const db = dbProduct[0];
      const id = req.params.id;
      let body = req.body;
      let category = body.category? body.category : db.category;
      let image = body.image? body.image: db.image;
      const result = {id: parseInt(id), category, image}

      let sql_query = 'UPDATE categories SET product_category=?, image_category=? WHERE id=?'
      connection.query(sql_query,
        [category, image, id],
        (err, response) => {
          if(!err) {
            console.log(response, 'response')
            resolve (([response,result]));
          } else {
            
            reject(err);
          }
        })
    })
  },
  deleteCategory: (req) =>{
    return new Promise((resolve, reject) =>{
      const id = req.params.id;
      const result = {id: parseInt(id)}
      connection.query('DELETE FROM categories WHERE id=?',
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
};






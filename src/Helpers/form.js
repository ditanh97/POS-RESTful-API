module.exports = {
  success: function(res, status, result, type){
    if (result.length == 0) {
      result = "No available data can be displayed"
    }else {
      result = (type === "prod")? this.prodForm(result) : this.catForm(result)
      
    }
    let form = {
      status,
      result,
    };
    res.json (form);
  },
  success2: function(res, status, response, result, type, action) {
    let data = (type === "prod")? "product" : (type === "cat") ? "category": "trans" ? "orders" : "stock";
    let msg
    if (response["affectedRows"] > 0)  msg = `Successfully ${action} the ${data}` 
    else {
      msg = `No data in ${data}, ${action} can't be implemented!`
      return this.error(res, 400, msg)
    }
    let form = {
      message: msg,
      status,
      response,
      result,
     
    };
    res.json (form);
  },
  success3: function (res, status, infoPage,result, type){
    if (result.length == 0) {
      result = "No available data can be displayed"
    }else {
      result = (type === "prod")? this.prodForm(result) : this.catForm(result)
      
    }
    let form = {
      status,
      infoPage,
      result,
    };
    res.json (form);
  },
  error: function(res, status, err){
    let form = {
      status,
      result: err,
    };
    res.status(status);
    res.json (form);
  },
  prodForm: function(result) {
      return result.map(item => {
        return {
          id: item.id,
          name: item.product_name,
          description: item.product_description,
          image: item.product_image,
          category: item.id_category,
          category_name: item.product_category,
          price: item.product_price,
          stock: item.product_stock,
          date_add: item.date_added,
          date_update: item.date_updated
        };
      })
    },
    catForm: function(result) {
      return result.map(item => {
        return {
          id: item.id,
          category: item.product_category,
          image: item.image_category,
        };
      })
    },
};







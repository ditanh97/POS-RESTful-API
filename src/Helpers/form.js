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
  prodForm: function(result) {
    return result.map(item => {
      return {
        id: item.id,
        name: item.product_name,
        description: item.product_description,
        image: item.product_image,
        category: item.id_category,
        price: item.product_price,
        stock: item.product_stock,
        date_add: item.date_added,
        date_update: item.date_updated
      };
    })
  },
  catForm: function(result) {
    console.log('dsdsds')
    return result.map(item => {
      return {
        id: item.id,
        category: item.product_category,
        image: item.image_category,
      };
    })
  },
  success2: function(res, status, response, result, type, action) {
    // console.log(type, 'tipe')
    // console.log(action, 'action')
    let data = (type === "prod")? "product" : (type === "cat") ? "category": "stock";
    let msg = (response["affectedRows"] > 0) ? `Successfully ${action} the ${data}` : `No data in ${data}, ${action} can't be implemented!`;
    let form = {
      message: msg,
      status,
      response,
      result,
     
    };
    res.json (form);
  },
  error: function(res, status, err){
    let form = {
      status,
      result: err,
    };
    res.json (form);
  },
};







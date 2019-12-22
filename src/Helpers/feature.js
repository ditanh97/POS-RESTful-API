'use-strict';
/**
 * reference codes:  
 * https://github.com/aldoignatachandra/RESTful_API_Point_of_Sales_APP/blob/master/src/Helpers/feature.js
 * */

const connection = require('../Configs/connect');

module.exports.pagination = req => {

    const limit = Number(req.query.limit) || 1000;
    const page =  Number(req.query.page) || 1;
    const offset = limit * (page - 1);
    return {
        limit,
        offset,
        page
    };
}

module.exports.getMaxPage = (page, keyword, table, field) => {
    return new Promise((resolve, reject) => {
        if(keyword != null) table += ` WHERE ${field} LIKE ?`
        connection.query(`SELECT COUNT(*) as total FROM ${table}`, ['%' + keyword + '%'], (err, result) => {
            if (!err) {
                const maxPage = Math.ceil(result[0].total / page.limit);

                if(maxPage >= page.page){
                    resolve({
                        total: result[0].total,
                        maxPage
                    });
                }else{
                    reject(`Only ${maxPage} pages available`);
                }
            }
            else reject(err);
        });
    });
}

//Search Product By
module.exports.searchProduct = (req, sql) => {
    const search = req.query.search;

    if (search != null) {
        sql += ` AND products.product_name LIKE ? `;
    } else {
        sql
    }

    return {
        sql,
        search
    };
}

//Filter Product By Category
module.exports.filterByCategory = (req, sql) => {
    let catId = req.query.catId;
    if (catId !=  null) {
        sql += ` AND products.id_category = ? `
    } else {
        sql
    }
    return {
        sql,
        catId
    }
}
//Sort Product By
module.exports.sorting = (req, sql) => {
    let orderBy = req.query.order;
    let sortBy = req.query.sort;

    if (orderBy == 'name') {
        sql += `ORDER BY products.product_name `;
    } else if (orderBy == 'category') {
        sql += `ORDER BY categories.product_category `;
    } else if (orderBy == 'updated') {
        sql += `ORDER BY products.date_updated `;
    } else {
        sql += `ORDER BY products.id `;
    }

    if (orderBy != null) {
        if (sortBy == 'ASC' || sortBy == null) {
            sql += 'ASC';
        } else if (sortBy == 'DESC') {
            sql += 'DESC';
        }
    }
    return sql
}
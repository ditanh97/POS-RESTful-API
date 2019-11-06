<h1 align="center">Point of Sale RESTful API</h1>

# Overview

## Introduction

Point of Sale API is an API that allow the users to read products and categories information data from database. Point of Sale API also allow users to create, update and delete a product and its category information into/from database.

There're some features included in the API which allow users to programmatically sort the products (based on name, category, or date updated), order or unorder a product, search a product and fetch a certain number of products from database.

This documentation outlines the point of sale API functionality.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-v2.17.1-blue)](https://www.npmjs.com/search?q=mysql)[![Body Parser](https://img.shields.io/badge/Body--Parser-v1.19.0-lightgrey)](https://www.npmjs.com/package/body-parser)[![CORS](https://img.shields.io/badge/CORS-v2.8.5-yellowgreen)](https://www.npmjs.com/package/cors)
## Requirements

1. <a href="https://nodejs.org/en/">Node Js</a>
2. <a href="https://expressjs.com/">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)


## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:3000/product)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
SERVER_PORT = 3000

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'sale'
```

## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **sale** :

```
CREATE DATABASE sale;
```

Create Table named **products** :

```
CREATE TABLE products (
    id INT AUTO INCREMENT PRIMARY KEY,
    id_category INT(10),
    product_name VARCHAR(100),
    product_description TEXT,
    product_image VARCHAR(255),
    product_price INT(200)
    product_stock INT(10)
    date_added TIMESTAMP,
    date_updated TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
    FOREIGN KEY (id) REFERENCE categories(id),
);
```

Create Table named **categories** :

```
CREATE TABLE categories (
    id INT AUTO INCREMENT PRIMARY KEY,
    product_category VARCHAR(200)
);
```

## Endpoints


#### **CRUD Product Endpoint**
* **Read All Products**
  - **Request** : **`GET /products`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 2,
            "name": "Tumbler",
            "description": "Bottle for drink, easy to bring, stainless steel material",
            "image": "tumbler.jpg",
            "category": 1,
            "price": 30000,
            "stock": 290,
            "date_add": "2019-10-16T06:21:24.000Z",
            "date_update": "2019-10-20T15:35:21.000Z"
        },
        {
            "id": 3,
            "name": "Totebag",
            "description": "canvas material",
            "image": "totebag.jpg",
            "category": 9,
            "price": 25000,
            "stock": 50,
            "date_add": "2019-10-16T06:22:34.000Z",
            "date_update": "2019-10-18T17:10:18.000Z"
        },
        {
            "id": 4,
            "name": "Stainless steel straw",
            "description": "Reusable straw",
            "image": "ssteeraw.jpg",
            "category": 1,
            "price": 11000,
            "stock": 30,
            "date_add": "2019-10-16T08:46:14.000Z",
            "date_update": "2019-10-16T08:46:14.000Z"
        },
        {
            "id": 6,
            "name": "Dice",
            "description": "cubical gambling, reusable plastic",
            "image": "dadu.jpg",
            "category": 3,
            "price": 14400,
            "stock": 40,
            "date_add": "2019-10-16T04:50:23.000Z",
            "date_update": "2019-10-18T17:12:35.000Z"
        },
        {
            "id": 7,
            "name": "Bell",
            "description": "made of scrap iron",
            "image": "bel.jpg",
            "category": 4,
            "price": 15000,
            "stock": 150,
            "date_add": "2019-10-17T11:16:35.000Z",
            "date_update": "2019-10-18T17:10:50.000Z"
        },
        {
            "id": 8,
            "name": "Jacket",
            "description": "jeans material",
            "image": "jacket.jpg",
            "category": 9,
            "price": 200000,
            "stock": 25,
            "date_add": "2019-10-18T07:21:58.000Z",
            "date_update": "2019-10-18T17:11:53.000Z"
        },
        {
            "id": 19,
            "name": "Almond",
            "description": "Crunchy nut, price is based on 1 ons basis",
            "image": "almond.jpg",
            "category": 7,
            "price": 3500,
            "stock": 900,
            "date_add": "2019-10-20T12:47:19.000Z",
            "date_update": "2019-10-20T12:47:19.000Z"
        },
        {
            "id": 21,
            "name": "Cashew",
            "description": "Crunchy nut, price is based on 1 ons basis",
            "image": "cashew.jpg",
            "category": 7,
            "price": 2500,
            "stock": 23,
            "date_add": "2019-10-20T12:49:54.000Z",
            "date_update": "2019-10-20T15:45:17.000Z"
        }
    ]
}
```
* **Read a product**
  - **Request** : **`GET /products/show/:id`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 2,
            "name": "Tumbler",
            "description": "Bottle for drink, easy to bring, stainless steel material",
            "image": "tumbler.jpg",
            "category": 1,
            "price": 30000,
            "stock": 290,
            "date_add": "2019-10-16T06:21:24.000Z",
            "date_update": "2019-10-20T15:35:21.000Z"
        }
    ]
}
```
* **Create a product** 
  - **Request** : **`POST /products`**
  - **Response** :
```
{
    "message": "Successfully insert the product",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 23,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
* **Update a product**
  - **Request** : **`PUT /products/:id`**
  - **Response** :
```
{
    "message": "Successfully update the product",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
* **Delete a product**
  - **Request** : **`DELETE /product/:id`**
  - **Response** : 
```
{
    "message": "Successfully delete the product",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

#### CRUD Category Endpoint
* **Read All Categories**
  - **Request** : **`GET /categories`**
  - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 2,
            "category": "Accessories"
        },
        {
            "id": 7,
            "category": "Bulk Groceries"
        },
        {
            "id": 4,
            "category": "Electronics"
        },
        {
            "id": 9,
            "category": "Outfits"
        },
        {
            "id": 3,
            "category": "Toys"
        },
        {
            "id": 1,
            "category": "Utensils"
        }
    ]
}
```
* **Create a category** 
  - **Request** : **`POST /categories`**
  - **Response** :
```
{
    "message": "Successfully insert the category",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 29,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
* **Update a Category**
  - **Request** : **`PUT /categories/:id`**
  - **Response** :
```
{
    "message": "Successfully update the category",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```
* **Delete a Category** 
  - **Request** : **`DELETE /categories/:id`**
  - **Response** :
```
{
    "message": "Successfully delete the category",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```

#### Add/Reduce Product Quantity Endpoint

  - **Request** : **`PUT /products/stock/:id`**
    * Request.body: 
    ```
    {
    "type" : <"add"/"reduce">,
    "qty": <qty_value>
    }
    ```
  - **Response** :
```
{
    "message": "Successfully update the stock",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
```


  - **Response if reduce below the Stock** : 
```
{
    "status": 400,
    "result": "Can not update the stock. Stock reduce above limits."
}
```
#### Search Product by Name Endpoint
- **Request** : **`GET /products/search?name=value`**
 - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 2,
            "name": "Tumbler",
            "description": "Bottle for drink, easy to bring, stainless steel material",
            "image": "tumbler.jpg",
            "category": 1,
            "price": 30000,
            "stock": 190,
            "date_add": "2019-10-16T06:21:24.000Z",
            "date_update": "2019-10-20T16:12:26.000Z"
        }
    ]
}
```
#### Sort Product by Name, Category, and Recent Updated Endpoint
- **Request** : **`GET /products/sort?by=value1&order=value2`**
    (value1: "name", "category", "date")
    (value2: "asc", "desc")
 - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 2,
            "name": "Tumbler",
            "description": "Bottle for drink, easy to bring, stainless steel material",
            "image": "tumbler.jpg",
            "category": 1,
            "price": 30000,
            "stock": 190,
            "date_add": "2019-10-16T06:21:24.000Z",
            "date_update": "2019-10-20T16:12:26.000Z"
        },
        {
            "id": 3,
            "name": "Totebag",
            "description": "canvas material",
            "image": "totebag.jpg",
            "category": 9,
            "price": 25000,
            "stock": 50,
            "date_add": "2019-10-16T06:22:34.000Z",
            "date_update": "2019-10-18T17:10:18.000Z"
        },
        {
            "id": 4,
            "name": "Stainless steel straw",
            "description": "Reusable straw",
            "image": "ssteeraw.jpg",
            "category": 1,
            "price": 11000,
            "stock": 30,
            "date_add": "2019-10-16T08:46:14.000Z",
            "date_update": "2019-10-16T08:46:14.000Z"
        },
        {
            "id": 8,
            "name": "Jacket",
            "description": "jeans material",
            "image": "jacket.jpg",
            "category": 9,
            "price": 200000,
            "stock": 25,
            "date_add": "2019-10-18T07:21:58.000Z",
            "date_update": "2019-10-18T17:11:53.000Z"
        },
        {
            "id": 23,
            "name": "Hazelnut",
            "description": "Crunchy nut, price is based on 1 ons basis",
            "image": "almond.jpg",
            "category": 7,
            "price": 2500,
            "stock": 900,
            "date_add": "2019-10-20T16:04:15.000Z",
            "date_update": "2019-10-20T16:04:15.000Z"
        },
        {
            "id": 6,
            "name": "Dice",
            "description": "cubical gambling, reusable plastic",
            "image": "dadu.jpg",
            "category": 3,
            "price": 14400,
            "stock": 40,
            "date_add": "2019-10-16T04:50:23.000Z",
            "date_update": "2019-10-18T17:12:35.000Z"
        },
        {
            "id": 21,
            "name": "Cashew",
            "description": "Crunchy nut, price is based on 1 ons basis",
            "image": "cashew.jpg",
            "category": 7,
            "price": 2500,
            "stock": 23,
            "date_add": "2019-10-20T12:49:54.000Z",
            "date_update": "2019-10-20T15:45:17.000Z"
        },
        {
            "id": 7,
            "name": "Bell",
            "description": "made of scrap iron",
            "image": "bel.jpg",
            "category": 4,
            "price": 15000,
            "stock": 150,
            "date_add": "2019-10-17T11:16:35.000Z",
            "date_update": "2019-10-18T17:10:50.000Z"
        },
        {
            "id": 19,
            "name": "Almond",
            "description": "Crunchy nut, price is based on 1 ons basis",
            "image": "almond.jpg",
            "category": 7,
            "price": 3500,
            "stock": 900,
            "date_add": "2019-10-20T12:47:19.000Z",
            "date_update": "2019-10-20T12:47:19.000Z"
        }
    ]
}
```

#### Pagination Endpoint
- **Request** : **`GET /products/page?p=page&lim=limit`**
 - **Response** :
```
{
    "status": 200,
    "result": [
        {
            "id": 6,
            "name": "Dice",
            "description": "cubical gambling, reusable plastic",
            "image": "dadu.jpg",
            "category": 3,
            "price": 14400,
            "stock": 40,
            "date_add": "2019-10-16T04:50:23.000Z",
            "date_update": "2019-10-18T17:12:35.000Z"
        },
        {
            "id": 7,
            "name": "Bell",
            "description": "made of scrap iron",
            "image": "bel.jpg",
            "category": 4,
            "price": 15000,
            "stock": 150,
            "date_add": "2019-10-17T11:16:35.000Z",
            "date_update": "2019-10-18T17:10:50.000Z"
        },
        {
            "id": 8,
            "name": "Jacket",
            "description": "jeans material",
            "image": "jacket.jpg",
            "category": 9,
            "price": 200000,
            "stock": 25,
            "date_add": "2019-10-18T07:21:58.000Z",
            "date_update": "2019-10-18T17:11:53.000Z"
        }
    ]
}
```

### Support

For API support, please email ditanurhalimah@gmail.com
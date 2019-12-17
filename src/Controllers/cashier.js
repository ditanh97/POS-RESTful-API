require('dotenv').config();
const cashierModel = require('../Models/cashier');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
    registerValidation,
    loginValidation
  } = require('../Middleware/validation');

  module.exports = {
      registerCashier: (req, res) => {
          //A.1 validate register data
          const {
              error
          } = registerValidation(req.body)
          if (error){
              console.log(error)
              return res.send({
                  status: 400,
                  message: error.details[0].message
              })
          }

          //A.2 hash the password
          const salt = bcrypt.genSaltSync(10)
          const hashedPassword = bcrypt.hashSync(req.body.password, salt)

          //A.3 if register data valid, proceed to insert user data to database
          const data = {
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword
          }

          //A.4 check username or email already exist
          cashierModel.registerCheck(data)
          .then(response =>{
              if (response.length === 0){
                  //A.4.1 Register the user
                  return cashierModel.registerCashier(data)
                  .then(response => res.json({
                      status: 200,
                      message: 'The cashier is successfully registered',
                      cashier: {
                          username: req.body.username,
                          email: req.body.email,
                          password: hashedPassword
                      }
                  }))
                  .catch(err => console.log(err))
              }
              else {
                  //A.5 respond if username or email exist
                  return res.status(400).send({
                      status: 400,
                      message: 'Username or email already registered'
                  })
              }
          })

      },
      loginCashier: (req,res) => {
          //B.1 Validate login data
          const {error} = loginValidation(req.body)
          if (error) {
              console.log(error);
              return res.status(400).send({
                  status: 400,
                  message: error.details[0].message
              })
          }
          const data = {
              username: req.body.username,
              password: req.body.password
          }

          //B.2 LOGIN USER
          cashierModel.loginCashier(data)
          .then (response => {
              //B.2.1 check hashed password
              const validPassword = bcrypt.compareSync(req.body.password, response[0].password)
              if (!validPassword) {
                  return res.send({
                      status: 400,
                      message: 'Wrong password!'
                  })
              }

              //B.2.2 Create and assign token
              const token = jwt.sign({
                  id: response[0].id,
                  username: response[0].username
              }, process.env.TOKEN_SECRET)
              res.send({
                  status: 200,
                  message: 'Login successfully!',
                  username: response[0].username,
                  id: response[0].id_cashier,
                  token
              })
          })
          .catch(err => res.send({
              status: 400,
              message: 'Username does not exist'
          }))
      }
  }


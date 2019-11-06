// Validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object( {
      username: Joi.string().min(4).max(16).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(8).max(16).required()
    })
    return schema.validate({username: data.username, email: data.email, password: data.password});
  }
  

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(16).required(),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(8).max(16).required()
  })
  return schema.validate({username: data.username, email: data.email, password: data.password});
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
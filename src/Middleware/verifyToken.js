require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  // console.log(req.headers)
  if (!token) return res.sendStatus(401)

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.cashier = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}



const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

function createToken(req, res, next) {
  const result = req.value.body
  const cert = fs.readFileSync(path.resolve(__dirname, '../jwt/jwt.pem'))
  const token = jwt.sign({
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email
  }, cert, {
      algorithm: 'RS256',
      expiresIn: '1h'
  })
  result.token = token
  res.status(200).json({
    success: true,
    message: '登录成功',
    data: result
  })
}

function verifyToken(req, res, next) {
  console.log('req.headers', req.headers)
  let token = req.headers.authorization
  let cert = fs.readFileSync(path.resolve(__dirname, '../jwt/jwt_pub.pem'))
  try {
    const decoded = jwt.verify(token, cert);
    return true
  } catch (e) {
    return false
  }
}

module.exports = { createToken, verifyToken }
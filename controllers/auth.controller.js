const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const User = require('../models/User.model')

module.exports.create = (req, res, next) => {
  const newUser = req.body

  if (req.file) {
    newUser.image = req.file.path
  }
//test
  User.create(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
}

  module.exports.login = (req, res, next) => {
    // Take password and email to validate
    const { email, password } = req.body

    console.log('entro')
  
    const throwException = () => next(createError(401, 'Incorrect credentials'))
  
    if (!email || !password) {
      return throwException()
    }
  
    // Find user by email
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          throwException()
        } else {
          // Compare password
          return user.checkPassword(password)
            .then(match => {
              if (!match) {
                throwException()
              } else {
                // Login
                res.json({
                  access_token: jwt.sign(
                    {
                      id: user.id
                    },
                    // jwt secret
                    process.env.JWT_SECRET || 'changeme',
                    {
                      expiresIn: '1h'
                    }
                  )
                })
              }
            })
        }
      })
      .catch(next)

}
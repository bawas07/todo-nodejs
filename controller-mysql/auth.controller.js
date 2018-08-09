const jwt = require('jsonwebtoken')
const {secret} = require('../config/jwt.config')
const { validationResult } = require('express-validator/check')

exports.checkAuth = function(req, res, next){
    const token = req.headers.authorization
    if (!token) {
        res.json({
            status:'failed',
            error:'no token provided'
        })
    }
    jwt.verify(token, secret, function(err, decode){
        if(err){
            console.log(err)
            res.json({
                status:'failed',
                error:'wrong token/token expired1'
            })
        }
        req.user = decode
        console.log("decode :",decode)
        if(decode){
            next()
        }else{
            res.json({
                status:'failed',
                error:'wrong token/token expired2'
            })
        }
    })
}

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
    }else{
        next()
    }
}
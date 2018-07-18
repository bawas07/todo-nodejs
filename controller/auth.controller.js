const jwt = require('jsonwebtoken')
const secret = require('../config/jwt.config')
const { validationResult } = require('express-validator/check')

exports.checkAuth = function(req, res, next){
    const token = req.header.authorization
    if (!token) {
        res.json({
            status:'failed',
            error:"no token provided"
        })
    }
    jwt.verify(token, secret, function(err, decode){
        if(err){
            res.json({
                status:'failed',
                error:"wrong token/token expired"
            })
        }
        req.user = decode
        if(decode){
            next()
        }else{
            res.json({
                status:'failed',
                error:"wrong token/token expired"
            })
        }
    })
}

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
    }else{
        next()
    }
}
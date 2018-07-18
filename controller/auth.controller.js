const jwt = require('jsonwebtoken')
const secret = require('../config/jwt.config')

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
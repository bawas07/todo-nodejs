const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const { secret } = require('../config/jwt.config')
const { body } = require('express-validator/check')
const mongoose = require('mongoose')

exports.logregValidator = [
    body('username')
        .isLength({min:0, max:10})
        .withMessage('Username must not more than 100 character')
        .isString()
        .withMessage('Username must be string'),
    body('password')
        .isLength({min:0, max:20})
        .withMessage('password must not more than 20 character')
        .isString()
        .withMessage('password must be string')
]

exports.login = async function(req, res){
    const { username, password } = req.body
    try{
        const user = await User.findOne({username: username})
        if(!user){
            throw new Error('User not found')
        }
        const check = await bcrypt.compare(password, user.password) 
        if (!check){
            throw new Error('Password is incorrect')
        }
        const token = jwt.sign({
            username:user.username,
            _id:user._id
        },
        secret,
        {
            expiresIn:'2h'
        }
        ) 
        res.status(200).json({
            status:'success',
            data:{
                token:token
            }
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            error:err.message
        })
    }
    
}

exports.register = async function(req, res){
    const { username, password } = req.body
    try{
        const checkUser = await User.findOne({username:username})
        if (checkUser){
            throw new Error('Username has been used')
        }
        const user = User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: password
        })
        await user.save()
        res.status(200).json({
            status:'success',
            data:{
                username:username,
                password:password
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'failed',
            error:err.message
        })
    }
    
}
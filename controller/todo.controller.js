const mongoose = require('mongoose')

const Todo = require('../models/todo.model')
// const User = require('../models/user.model')

const { body } = require('express-validator/check')

exports.todoValidator = [
    body('name')
        .isLength({min:0, max:500})
        .withMessage('name must not more than 500 character')
        .isString()
        .withMessage('name must be string'),
    body('priority')
        .isNumeric()
        .withMessage('priority must be integer'),
    body('location')
        .isString()
        .withMessage('location must be string')
        .isLength({min:0, max:273})
        .withMessage('location must be string')
]

exports.postTodo = async function(req, res){
    try{
        const { name, priority, location } = req.body
        const time_start = new Date(Date())
        const user_id = req.user.id
        const is_done = false

        const todo = Todo({
            _id: new mongoose.Types.ObjectId(),
            name,
            priority,
            location,
            time_start,
            is_done,
            user_id
        })
        await todo.save()
        res.status(200).json({
            status:'success',
            data:{
                name,
                priority,
                location,
                time_start,
                is_done,
                user_id
            }
        })
    }catch(err){
        res.json({
            status: 'failed',
            error:err
        })
    }
    
}
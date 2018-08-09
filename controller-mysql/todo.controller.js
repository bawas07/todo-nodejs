const mongoose = require('mongoose')

const { Todo } = require('../database/models')
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
        console.log(req.user)
        const todo = Todo.build({
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
                user_id,
                name,
                priority,
                location,
                time_start,
                is_done
            }
        })
    }catch(err){
        res.json({
            status: 'failed',
            error:err.message
        })
    }
    
}

function compare(a,b) {
    if (a.priority < b.priority)
        return -1
    if (a.priority > b.priority)
        return 1
    return 0
}

function backCompare(a,b) {
    if (a.priority < b.priority)
        return 1
    if (a.priority > b.priority)
        return -1
    return 0
}

exports.getTodo = async function(req, res){
    try{
        const id = req.user.id
        const todo = await Todo.findAll({
            where:{
                user_id:id
            }
        })
        console.log("todo:", todo)
        const { view } = req.query
        if(view=='ascending'){
            todo.sort(compare)
        }else if(view == 'descending'){
            todo.sort(backCompare)
        }
        res.json({
            status:'success',
            data:{
                todo
            }
        })
        
    }catch(err){
        console.log(err)
        res.json({
            status:'failed',
            error:err.message
        })
    }
}

exports.deleteTodo = async function(req, res){
    try{
        const id = Number(req.params.id)
        const todo = await Todo.destroy({
            where:{
                id:id
            }
        })
        if(!todo){
            throw new Error('todo item not found')
        }
        res.status(200).json({status: 'removed',data: todo})
    }catch(err){
        console.log(err)
        res.json({
            status: 'failed',
            error:err.message
        })
    }
}

exports.editTodo = async function(req, res){
    try{
        const id = req.params.id
        const { name, priority, location } = req.body
        const todo = await Todo.findOne({
            where:{
                id:id
            }
        })
        todo.name = name
        todo.priority = priority
        todo.location = location
        const newTodo = await todo.save()
        res.status(200).json({
            status:'success',
            data:newTodo
        })
    }catch(err){
        console.log(err)
        res.json({
            status: 'failed',
            error:err.message
        })
    }
}

exports.updateTodo = async function(req, res){
    try{
        const id = req.params.id
        const { is_done } = req.body
        const todo = await Todo.findOne({
            where:{
                id:id
            }
        })
        todo.is_done = is_done
        const newTodo = await todo.save()
        res.status(200).json({
            status:'success',
            data:newTodo
        })
    }catch(err){
        console.log(err)
        res.json({
            status:'failed',
            error:err.message
        })
    }
}
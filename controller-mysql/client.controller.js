// const User = require('../models/user.model')
// const Todo = require('../models/todo.model')
const {User, Todo} = require('../database/models')

exports.getTodoDone = async function(req, res){
    try{
        const user = await User.findAll()
        const todo = await Todo.findAll({
            where:{
                is_done:true
            }
        })
        res.json({
            status:'success',
            data:{
                user,
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
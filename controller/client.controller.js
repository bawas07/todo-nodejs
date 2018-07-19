const User = require('../models/user.model')
const Todo = require('../models/todo.model')

exports.getTodoDone = async function(req, res){
    try{
        const user = await User.find({})
        const todo = await Todo.find({is_done:true})
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
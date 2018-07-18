const mongoose = require('mongoose')

const todo = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {type: mongoose.Schema.ObjectId, ref: 'User'},
    name: {type:String, required:true},
    priority:{type:Number, required:true},
    location:{type:String},
    time_start:{type:Date},
    is_done:{type:Boolean, required:true}
})

module.exports = mongoose.model('Todo', todo)
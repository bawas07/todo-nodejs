const mongoose = require('mongoose')

const user = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, require: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true}
})

module.exports = mongoose.model('User', user)
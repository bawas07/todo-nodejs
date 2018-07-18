
const User = require('./user.model');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { url } = require('../config/database.config')
mongoose.connect(url, {useNewUrlParser:true})

bcrypt.hash('123', 10, function(err, hash){
    if (err) {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
    const user = User({
        _id: new mongoose.Types.ObjectId(),
        username: 'user1',
        password: hash
    })
    user.save(function(err) {
        if (err)  {
            console.log(err)};
      
        console.log('User created')
        console.log('username = user1')
        console.log('pass = 123')
      })
})

bcrypt.hash('123', 10, function(err, hash){
    if (err) {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
    const user = User({
        _id: new mongoose.Types.ObjectId(),
        username: 'user2',
        password: hash
    })
    user.save(function(err) {
        if (err)  {
            console.log(err)};
      
        console.log('User created')
        console.log('username = user2')
        console.log('pass = 123')
      })
})
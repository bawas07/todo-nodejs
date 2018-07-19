var express = require('express')
var router = express.Router()
const { checkAuth, checkValidation } = require('../controller/auth.controller')
const { todoValidator, postTodo, getTodo, deleteTodo, editTodo, updateTodo } = require('../controller/todo.controller')

/* GET users listing. */
router.get('/', function(req, res,) {
    res.send('respond with a resource')
})

router.post('/todo', checkAuth, todoValidator, checkValidation, postTodo )

router.get('/todo', checkAuth, getTodo )

router.delete('/todo/:id', checkAuth, deleteTodo)

router.put('/todo/:id', checkAuth, todoValidator, checkValidation, editTodo)

router.patch('/todo/:id', checkAuth, updateTodo)

module.exports = router

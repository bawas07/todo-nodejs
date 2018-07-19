var express = require('express')
var router = express.Router()
const { checkAuth, checkValidation } = require('../controller/auth.controller')
const { todoValidator, postTodo, getTodo, deleteTodo } = require('../controller/todo.controller')

/* GET users listing. */
router.get('/', function(req, res,) {
    res.send('respond with a resource')
})

router.post('/todo', checkAuth, todoValidator, checkValidation, postTodo )

router.get('/todo', checkAuth, getTodo )

router.delete('/todo/:id', checkAuth, deleteTodo)

module.exports = router

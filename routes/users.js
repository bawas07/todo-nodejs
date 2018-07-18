var express = require('express')
var router = express.Router()
const { checkAuth, checkValidation } = require('../controller/auth.controller')
const { todoValidator, postTodo } = require('../controller/todo.controller')

/* GET users listing. */
router.get('/', function(req, res,) {
    res.send('respond with a resource')
})

router.post('/todo', checkAuth, todoValidator, checkValidation, postTodo )

module.exports = router

var express = require('express')
var router = express.Router()
const { checkAuth, checkValidation } = require('../controller/auth.controller')
const { todoValidator, postTodo, getTodo, deleteTodo, editTodo, updateTodo } = require('../controller/todo.controller')

/* POST name, priority, and location to save it to database */
router.post('/todo', checkAuth, todoValidator, checkValidation, postTodo )

/* GET all todo list that belongs to user, 
it also can take query view = ascending || descending to sort it based on priority*/
router.get('/todo', checkAuth, getTodo )

/* DELETE a todo item based on it's id */
router.delete('/todo/:id', checkAuth, deleteTodo)

/* PUT a todo item and save it to database */
router.put('/todo/:id', checkAuth, todoValidator, checkValidation, editTodo)

/* PATCH a todo item to change is_done value */
router.patch('/todo/:id', checkAuth, updateTodo)

module.exports = router

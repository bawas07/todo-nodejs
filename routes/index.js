var express = require('express')
var router = express.Router()
const { login, logregValidator, register } = require('../controller/logreg.controller')
const { checkValidation } = require('../controller/auth.controller')

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' })
})

router.post('/login', logregValidator, checkValidation, login)

router.post('/register', logregValidator, checkValidation, register)

module.exports = router

var express = require('express')
var router = express.Router()
const { login, logregValidator, register } = require('../controller/logreg.controller')
const { checkValidation } = require('../controller/auth.controller')
const { getTodoDone } = require('../controller/client.controller')

/* GET home page. */
router.get('/', getTodoDone)

router.post('/login', logregValidator, checkValidation, login)

router.post('/register', logregValidator, checkValidation, register)

module.exports = router

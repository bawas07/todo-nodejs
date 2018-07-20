var express = require('express')
var router = express.Router()
const { login, logregValidator, register } = require('../controller/logreg.controller')
const { checkValidation } = require('../controller/auth.controller')
const { getTodoDone } = require('../controller/client.controller')

/* GET all finished todo items */
router.get('/', getTodoDone)

/* POST username and password, get a jtw as response */
router.post('/login', logregValidator, checkValidation, login)

/* POST username and password and save it to database */
router.post('/register', logregValidator, checkValidation, register)

module.exports = router

var express = require('express');
var router = express.Router();
const { login, logregValidation, register } = require('../controller/logreg.controller')
const { checkValidation } = require('../controller/auth.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', logregValidation, checkValidation, login)

router.post('/register', logregValidation, register)

module.exports = router;

var express = require('express');
var router = express.Router();
const { login, register } = require('../controller/logreg.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login)

router.post('/register', register)

module.exports = router;

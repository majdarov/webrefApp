var express = require('express');
var router = express.Router();
var options = require('../public/javascripts/options.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  options.page = 'main_ulli.ejs';
  options.tblName = '';
  /* options.url = ['/users', 'pages/UlLi.html'];
  options.urltitle = ['Users', 'UlLi.html']; */
  res.render('pages/index', options);
});

module.exports = router;

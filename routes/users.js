var express = require('express');
var router = express.Router();
var options = require('../public/javascripts/options.json');
var dbUsers = require('../public/javascripts/connectDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
 
  options.page = 'main_users.ejs';
  options.tblName = 'Users Table';
  options.url = ['pages/UlLi.html'];
  options.urltitle = ['UlLi.html'];
  // let strSQL = 'SELECT * FROM users'
  options.users = dbUsers.getUsers;
  
  res.render('pages/index', options);
  
});

module.exports = router;

var router = require('express').Router();
var options = require('../public/javascripts/options.json');
var dbUsers = require('../database/db_actions');

/* router.use((req, res, next) => {
  console.log('Start router.use');
  dbUsers.getUsers(options);
  next();
}) */

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Start callback');
  options.page = 'main_users.ejs';
  options.tblName = 'Users Table';
  options.url = ['pages/UlLi.html'];
  options.urltitle = ['UlLi.html'];
  let result = dbUsers.getUsers(options);
  setTimeout(() => {
    console.log('getUsers end ' + options.users.length);
    res.render('pages/index', options)
  }, 100);
})

router.post('/', function(req, res, next) {
  let user = req.body;
  // console.log(user.id + ':' + user.method);
  
  if (user.method === 'delete') {
    let result = dbUsers.delUser(user.id);
    if (!result) {
      res.send('nodel')
    } else {
      res.send ('ok');
    }
  }
})

module.exports = router;

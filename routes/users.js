var router = require('express').Router();
var options = require('../public/javascripts/options.json');
var dbUsers = require('../database/db_actions');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  options.page = 'main_users.ejs';
  options.tblName = 'Users Table';
  options.url = ['pages/UlLi.html'];
  options.urltitle = ['UlLi.html'];
  await dbUsers.getUsers(options)
  .then(result => {
    console.log('getUsers end ' + options.users.length);
    res.render('pages/index', options);
  })
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

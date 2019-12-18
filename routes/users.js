var router = require('express').Router();
var options = require('../public/javascripts/options.json');
var dbUsers = require('../database/db_actions');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // console.log(req.headers);
  options.page = 'main_users.ejs';
  options.tblName = 'Users Table';
  let _users = await dbUsers.getUsers(options);
  res.render('pages/index', options);
  
})

router.post('/', async function(req, res, next) {
  let user = req.body;
  console.log(user);
  
  if (user.method === 'delete') {
    let result = await dbUsers.delUser(user.id);
    if (!result) {
      res.send('nodel')
    } else {
      res.send ('ok');
    }
  } else if (user.method === 'adduser') { 
      let result = await dbUsers.addUser(user);
      if (!result) {
        res.send('ErrAdd!');
      }
      res.send ('user added');
  } else {
    res.send('else');
  }

})

module.exports = router;

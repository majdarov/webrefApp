var router = require('express').Router();
var options = require('../public/javascripts/options.json');
var dbUsers = require('../database/db_actions');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  try {
    options.page = 'main_users.ejs';
    options.tblName = 'Users Table';
    options.users = await dbUsers.getUsers()
    .then(res.render('pages/index', await options));
  } catch(e) {
      console.error(e.message);  
  }

})

router.post('/', async function(req, res, next) {
  let user = req.body;
  console.log(user);
  
  try {
    if (user.method === 'delete') { /*DELETE User*/
      let result = await dbUsers.delUser(user.id);
      if (!result) {
        res.send('nodel')
      } else {
        res.send ('ok');
      }
    } else if (user.method === 'adduser') { /* ADD User */
        let result = await dbUsers.addUser(user);
        if (!result) {
          res.send('ErrAdd!');
        }
        res.send ('ok');
    } else {
      res.send('else');
    }
  } catch(e) {
    console.error(e.message);
  }

})

module.exports = router;

var router = require('express').Router();
var options = require('../public/javascripts/options.json');
var db = require('../database/db_actions');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  try {
    with (options) {
      page = 'main_users.ejs';
      elems.header = ['button_add_user.ejs'];
      elems.forms =['form_add_user.ejs'];
      scripts = ['javascripts/handlers_users.js'];
      styles = ['users.css']
    }
    await db.getUsersP(options);
    res.render('pages/index', options);
  } catch(e) {
      console.error(e.message);  
  }
})

router.post('/', async function(req, res, next) {
  let user = req.body;
  console.log(user);
  
  try {
    if (user.method === 'delete') { /*DELETE User*/
      let result = await db.delUser(user.id);
      if (!result) {
        res.send('nodel')
      } else {
        res.send ('ok');
      }
    } else if (user.method === 'adduser') { /* ADD User */
        let result = await db.addUser(user);
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

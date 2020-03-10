var express = require('express');
var router = express.Router();
var options = require('../public/javascripts/options.json');
var db = require('../database/db_actions');
var cors = require('cors');

router.options('*', cors());
/* GET home page. */
router.get('/', cors(), async function(req, res) {
  
  try {
    if (req.headers.get == 'groups') {
      let groups = await db.getGroup();
      // console.log(res.getHeaders());
      res.send(groups);
    } else if (req.headers.get == 'commodities') {  
        let commodities = await db.getCommodity(req.headers.parentid);
        res.send(commodities);
    } else {
        with (options) {
          page = 'commodity.ejs';
          tblName = 'Commodity';
          elems.header = [];
          elems.forms = [];
          scripts = ['javascripts/handlers_commodity.js'];
          styles = ['commodity.css'];
        }
        res.render('pages/index', options);
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;

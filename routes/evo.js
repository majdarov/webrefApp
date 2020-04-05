var express = require('express');
var router = express.Router();
var options = require('../public/javascripts/options.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    options.page = 'evo.ejs';
    options.tblName = '';
    options.elems.header = [];
    options.elems.forms = [];
    options.scripts = ['javascripts/fetchEvo.js'];
    options.styles = ['ulli.css']
    res.render('pages/index', options);
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;

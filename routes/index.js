var express = require('express');
var router = express.Router();
var options = require('../public/javascripts/options.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    options.page = 'main_index.ejs';
    options.tblName = '';
    options.elems.header = [];
    options.elems.forms = [];
    options.scripts = [];
    options.styles = [];
    res.render('pages/index', options);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

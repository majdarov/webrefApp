var express = require("express");
var router = express.Router();
var options = require("../public/javascripts/options.json");
var db = require("../database/db_actions");
var cors = require("cors");
var updateCommoditiesFromEvo = require("../evotor/updateCommoditiesFromEvo");

router.options("*", cors());
/* GET home page. */
router.get("/", cors(), async function(req, res) {
  try {
    if (req.headers.get == "groups") {
      let groups = await db.getGroup();
      res.send(groups);
    } else if (req.headers.get == "commodities") {
      let commodities = await db.getCommodity(req.headers.parentid);
      res.send(commodities);
    } else if (req.headers.get == "update") {
      let commodities = await updateCommoditiesFromEvo();
      res.send({ ok: true });
    } else {
      with (options) {
        page = "commodity.ejs";
        tblName = "Commodity";
        elems.header = [];
        elems.forms = [];
        scripts = ["javascripts/handlers_commodity.js"];
        styles = ["commodity.css"];
      }
      res.render("pages/index", options);
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;

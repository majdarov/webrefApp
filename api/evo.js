const express = require("express");
const router = express.Router();
const options = require("../public/javascripts/options.json");
const db = require("../database/db_actions");
const initDb = require("./db/initial_db");
const { createConfig, getConfig, setStore, addStoreInConfig } = require("./db/db_actions");
const { createRequest, fetchEvo } = require("./db/evo_fetch");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let arrSql = createConfig();
    await initDb(arrSql)
      // .then((resolve) => console.log(resolve))
      .catch((e) => console.log(e.message));
    options.page = "evo.ejs";
    options.tblName = "";
    options.elems.header = [];
    options.elems.forms = [];
    options.scripts = [];
    options.styles = [];
    res.render("pages/index", options);
  } catch (e) {
    console.error(e.message);
  }
});
router.get("/groups", async function (req, res) {
  let groups = await db.getGroup();
  let data = {};
  data.count = groups.length;
  data.items = groups;
  res.json(data);
});
router.get("/commodities/:id", async function (req, res) {
  try {
    let products;
    if (req.params.id === "all") {
      products = await db.getCommodity(req.params.id);
    } else {
      products = await db.getCommodityId(req.params.id);
    }
    let data = {};
    data.count = products.length;
    data.items = products;
    res.json(data);
  } catch (e) {
    res.send(e.message);
  }
});
router.get("/commodities/p/:parentId", async function (req, res) {
  let products = await db.getCommodity(req.params.parentId);
  let data = {};
  data.count = products.length;
  data.items = products;
  res.json(data);
});
router.get("/config", async function (req, res) {
  let config = await initDb([getConfig]);
  res.json(config);
});

router.get("/config/:update-:storeId", async function (req, res) {
  // console.log(`params:`);
  // console.log(req.params);
  let params = Object.assign({}, req.params);
  if (req.params.update === "stores") {
    if (req.params.storeId === "all") {
      let request = await createRequest({ type: "store_v2" });
      let result = await fetchEvo(request);
      let strSQL = setStore(result.items);
      result = await initDb(strSQL);
      res.send(result);
    } else {
      let result = await initDb(addStoreInConfig(req.params.storeId));
      res.send(result);
    }
  } else {
    res.send(params);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const options = require("../public/javascripts/options.json");
const db = require("../database/db_actions");
const initDb = require("./db/initial_db");
const {
  createConfig,
  getConfig,
  getDoks,
  setStore,
  addStoreInConfig,
} = require("./db/db_actions");
const { createRequest, fetchEvo } = require("./db/evo_fetch");
const v1 = require("./v1/evo");
const v2 = require("./v2/evo");
var cors = require("cors");

router.options("*", cors());

router.get("/", (req, res) => {
  res.redirect("/api/docs_new");
});
router.get("/docs", async function (req, res) {
  try {
    let config = await initDb([getConfig]);
    if (!config.items.length) {
      let arrSql = createConfig();
      await initDb(arrSql).catch((e) => console.log(e.message));
    }
    options.page = "evo.ejs";
    options.tblName = "";
    options.elems.header = [];
    options.elems.forms = [];
    options.scripts = [];
    options.styles = ["api.css"];
    res.render("pages/index", options);
  } catch (e) {
    console.error(e.message);
  }
});
router.get("/docs_new", async function (req, res) {
  try {
    let config = await initDb([getConfig]);
    if (!config.items.length) {
      let arrSql = createConfig();
      await initDb(arrSql).catch((e) => console.log(e.message));
    }
    let result = await initDb(getDoks);
    let doks = [];
    result.items.forEach((item) => {
      if (!doks.length || !doks.find((dok) => dok.dl === item.dl)) {
        doks.push({ dl: item.dl, dts: { [item.dt]: item.dd } });
      } else {
        let el = doks.find((dok) => dok.dl === item.dl);
        el.dts[item.dt] = item.dd;
      }
    });
    options.page = "api_doks.ejs";
    options.tblName = "";
    options.elems.header = [];
    options.elems.forms = [];
    options.scripts = [];
    options.styles = ["api.css"];
    options.doks = doks;
    res.render("pages/index", options);
  } catch (e) {
    console.error(e.message);
  }
});
router.get("/config/:update?/:storeId?", async function (req, res) {
  if (req.params.update === "stores") {
    if (!req.params.storeId) {
      let request = await createRequest({ type: "store_v2" });
      let result = await fetchEvo(request);
      let strSQL = setStore(result.items);
      await initDb(strSQL);
      res.send(result);
    } else {
      let result = await initDb(addStoreInConfig(req.params.storeId));
      res.send(result);
    }
  } else {
    let config = await initDb([getConfig]);
    res.json(config);
  }
});
router.use("/v1", cors(), v1);
router.use("/v2", cors(), v2);

module.exports = router;

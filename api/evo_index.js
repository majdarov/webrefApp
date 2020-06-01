const express = require("express");
const router = express.Router();
const options = require("../public/javascripts/options.json");
const db = require("../database/db_actions");
const initDb = require("./db/initial_db");
const { createConfig, getConfig, setStore, addStoreInConfig } = require("./db/db_actions");
const { createRequest, fetchEvo } = require("./db/evo_fetch");
const v1 = require("./v1/evo");
const v2 = require("./v2/evo");

router.get("/", (req,res) => {
  res.redirect("/api/docs");
});
router.get("/docs", async function (req, res) {
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
router.get("/config/:update?/:storeId?", async function (req, res) {
  // console.log(req.params);
  // let params = Object.assign({}, req.params);
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
router.use("/v1", v1);
router.use("/v2", v2);

module.exports = router;

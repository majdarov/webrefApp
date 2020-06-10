const express = require("express");
const router = express.Router();
const options = require("../../public/javascripts/options.json");
const initDb = require("../db/initial_db");
const db = require("../db/db_actions");
const { createRequest, fetchEvo } = require("../db/evo_fetch");

/* GET home page. */
router.get("/", (req, res) => {
  res.json({ api_version: 2 });
});
router.get("/groups/:value?", async function (req, res) {
  if (!req.params.value) {
    let request = await createRequest({ type: "groups_v2" });
    let result = await fetchEvo(request);
    result.items.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
    res.send(result);
  } else {
    let request = await createRequest({
      type: "groups_v2",
      value: req.params.value,
    });
    let result = await fetchEvo(request);
    res.send(result);
  }
});
router.get("/products/:value?/:pid?", async function (req, res) {
  if (!req.params.value) {
    let result = await initDb([db.getProducts]);
    res.send(result);
  } else if (req.params.value === "update") {
    let request = await createRequest({ type: "products_v2" });
    let response = await fetchEvo(request);
    let arrSQL = db.productsUpdate(response.items);
    let result = await initDb(arrSQL);
    res.send(result);
  } else if (req.params.value === "p") {
    let result = await initDb([db.getProducts], req.params.pid);
    res.send(result);
  } else {
    let request = await createRequest({
      type: "products_v2",
      value: req.params.value,
    });
    let result = await fetchEvo(request);
    res.send(result);
  }
});
router.get("/documents/:value?", async function (req, res) {
  if (!req.params.value) {
    res.json({ db: "documents" });
  } else if (req.params.value === "update") {
    try {
      let request = await createRequest({ type: "documents_v2" });
      let result = await fetchEvo(request);
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    try {
      let request = await createRequest({
        type: "documents_v2",
        value: req.params.value,
      });
      let result = await fetchEvo(request);
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  }
});

module.exports = router;

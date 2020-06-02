const express = require("express");
const router = express.Router();
const options = require("../../public/javascripts/options.json");
const db = require("../../database/db_actions");
const initDb = require("../db/initial_db");
const {
  createConfig,
  getConfig,
  setStore,
  addStoreInConfig,
} = require("../db/db_actions");
const { createRequest, fetchEvo } = require("../db/evo_fetch");

/* GET home page. */
router.get("/", (req, res) => {
  res.json({ api_version: 2 });
});
router.get("/groups/:value?", async function (req, res) {
  if (!req.params.value) {
    let request = await createRequest({ type: "groups_v2" });
    let result = await fetchEvo(request);
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
router.get("/products/:value?", async function (req, res) {
  if (!req.params.value) {
    res.json({ db: "products" });
  } else if (req.params.value === "update") {
    let request = await createRequest({ type: "products_v2" });
    let result = await fetchEvo(request);
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

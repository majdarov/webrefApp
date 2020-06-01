const express = require("express");
const router = express.Router();
const options = require("../../public/javascripts/options.json");
const db = require("../../database/db_actions");
const initDb = require("../db/initial_db");
const { createConfig, getConfig, setStore, addStoreInConfig } = require("../db/db_actions");
const { createRequest, fetchEvo } = require("../db/evo_fetch");

/* GET home page. */
router.get("/", (req,res) => {
  res.json({"api_version": 1});
});
router.get("/groups", async function (req, res) {
  let groups = await db.getGroup();
  let data = {};
  data.count = groups.length;
  data.items = groups;
  res.json(data);
});
router.get("/commodities/:id?", async function (req, res) {
  try {
    let products;
    if (!req.params.id) {
      products = await db.getCommodity("all");
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

module.exports = router;

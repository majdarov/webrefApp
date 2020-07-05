const express = require('express');
const router = express.Router();
const options = require('../../public/javascripts/options.json');
const initDb = require('../db/initial_db');
const db = require('../db/db_actions');
const { createRequest, fetchEvo } = require('../db/evo_fetch');
const Group = require('../models/groups');
const { Op } = require('sequelize');
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ api_version: 2 });
});
router.get('/seq/:destroy?', async (req, res) => {
  if (req.params.destroy === 'remove') {
    await Group.destroy({
      where: {
        name: {
          [Op.like]: ['%test%'],
        },
      },
    });
    let groups = await Group.findAll();
    res.json(groups);
  } else {
    // let group = await Group.create({
    //   name: 'testGroup',
    // });
    let group = { name: 'newTestGroup' };
    let response = await fetch('http://localhost:5000/api/v2/groups', {
      method: 'post',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(group),
    });
    let json = await response.json();
    res.send(json);
  }
});
router
  .get('/groups/:value?', async function (req, res) {
    if (!req.params.value) {
      let groups = await Group.findAll();
      res.json(groups);
    } else if (req.params.value === 'update') {
      let request = await createRequest({ type: 'groups_v2' });
      let result = await fetchEvo(request);
      await Group.sync({ force: true });
      let groups = await Group.bulkCreate(result.items);
      res.json(groups);
    } else {
      let group = await Group.findByPk(req.params.value);
      if (group === null) {
        res.json({ error: 'Primary Key not found' });
      } else {
        res.json(group);
      }
    }
  })
  .post('/groups', async function (req, res) {
    await Group.create(req.body);
    let groups = await Group.findAll();
    res.json(groups);
  });
router.get('/products/:value?/:pid?', async function (req, res) {
  // console.log(req.query);
  if (!req.params.value) {
    let query = Object.entries(req.query).length ? req.query : null;
    let result = await initDb([db.getProductsWithQuery], query);
    result.query = req.query;
    res.send(result);
  } else if (req.params.value === 'update') {
    let request = await createRequest({ type: 'products_v2' });
    let response = await fetchEvo(request); // Get Products from Evotor API
    let arrSQL = db.productsUpdate(response.items); //Make SQL for update local storage (SQLite)
    let result = await initDb(arrSQL); //Updated local storage
    res.send(result);
  } else if (req.params.value === 'p') {
    let result = await initDb([db.getProducts], req.params.pid);
    res.send(result);
  } else {
    let request = await createRequest({
      type: 'products_v2',
      value: req.params.value,
    });
    let result = await fetchEvo(request);
    res.send(result);
  }
});
router.get('/documents/:value?', async function (req, res) {
  if (!req.params.value) {
    res.json({ db: 'documents' });
  } else if (req.params.value === 'update') {
    try {
      let request = await createRequest({ type: 'documents_v2' });
      let result = await fetchEvo(request);
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    try {
      let request = await createRequest({
        type: 'documents_v2',
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

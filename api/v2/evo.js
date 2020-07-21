const express = require('express');
const router = express.Router();
const options = require('../../public/javascripts/options.json');
const initDb = require('../db/initial_db');
const db = require('../db/db_actions');
const { createRequest, fetchEvo } = require('../db/evo_fetch');
const Group = require('../models/group');
const Product = require('../models/product');
const { Op } = require('sequelize');
// const fetch = require('node-fetch');
const ProductEvo = require('../models/productEvo');
const Barcode = require('../models/barcode');
const { default: fetch } = require('node-fetch');
const parseQuery = require('../models/parse_query');
require('../models/relations');

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ api_version: 2 });
});
router.get('/seq/:destroy?', async (req, res) => {
  if (!req.params.destroy) {
    if (!req.query) {
      res.send('no query!');
    }
    let query = parseQuery(req.query);
    console.log(query);
    let result = {};
    result.items = await Product.findAll({ where: query });
    result.query = req.query;
    res.send(result);
  }
  if (req.params.destroy === 'remove') {
    await Group.destroy({
      where: {
        name: {
          [Op.like]: [`%${req.query.name}%`],
        },
      },
    });
    let groups = await Group.findAll();
    res.json(groups);
  } else if (req.params.destroy === 'create') {
    let group = { name: req.query.name };
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
      let where = parseQuery(req.query);
      let { count, rows } = await Group.findAndCountAll({where});
      let groups = {count, items: rows, query: req.query};
      res.json(groups);
    } else if (req.params.value === 'update') {
      let request = await createRequest({ type: 'groups_v2' });
      let result = await fetchEvo(request);
      await Group.sync({ force: true });
      let groups = await Group.bulkCreate(result.items);
      res.json(groups);
    } else {
      let group = await Group.findByPk(req.params.value);
      if (group !== null) {
        res.json(group);
      } else {
        res.json({ error: 'Primary Key not found' });
      }
    }
  })
  .post('/groups', async function (req, res) {
    let group = await Group.create(req.body);
    // let groups = await Group.findAll();
    res.json(group);
  });
router.get('/products/:value?/:pid?', async function (req, res) {
  if (!req.params.value) {
    // let result = await initDb([db.getProductsWithQuery], query);
    let where = parseQuery(req.query);
    let { count, rows } = await Product.findAndCountAll({
      where,
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ['barcode'],
      },
    });
    let result = { count, items: rows, query: req.query };
    res.send(result);
  } else if (req.params.value === 'update') {
    let request = await createRequest({ type: 'products_v2' });
    let response = await fetchEvo(request); // Get Product from Evotor API

    let barcodes = [];
    response.items.forEach((item) => {
      if (item.barcodes?.length) {
        item.barcodes.forEach((barcode) => {
          barcodes.push({ id: item.id, barcode: barcode });
        });
      }
    });
    await ProductEvo.sync({ force: true });
    await Barcode.sync({ force: true });
    await ProductEvo.bulkCreate(response.items);
    await Barcode.bulkCreate(barcodes);
    let products = await ProductEvo.findAndCountAll({
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ['barcode'],
      },
    });
    res.send(products);
  } else if (req.params.value === 'barcode') {
    // let result = await initDb([db.getProducts], req.params.pid);
    let whereP; // Generate Query string
    if (+req.params.pid === 0 || req.params.pid === 'null') {
      whereP = { barcode: { [Op.is]: null } };
    } else {
      whereP = { barcode: req.params.pid };
    }
    let result = {};
    result.items = await Product.findAll({
      include: {
        model: Barcode,
        // as: 'barcodes',
        attributes: ['barcode'],
        where: whereP,
      },
    });
    res.send(result);
  } else {   // Find by Primary Key
    // let request = await createRequest({
    //   type: 'products_v2',
    //   value: req.params.value,
    // });
    // let result = await fetchEvo(request);
    let product = await Product.findByPk(req.params.value);
    let barcodes = await Barcode.findAll({ where: { id: req.params.value } });
    barcodes = barcodes.map((item) => {
      return item.barcode;
    });
    if (product === null) {
      res.json({ error: 'Primary key not found!' });
    } else {
      product.setBarcodes(barcodes);
      res.json(product);
    }
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

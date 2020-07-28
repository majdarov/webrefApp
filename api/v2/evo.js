const express = require('express');
const router = express.Router();
const { createRequest, fetchEvo } = require('./api_evotor');
const Group = require('../models/group');
const Product = require('../models/product');
const { Op } = require('sequelize');
const { default: fetch } = require('node-fetch');
const parseQuery = require('../models/parse_query');
const { getGroups, postGroup } = require('./groups');
const { getProducts } = require('./products');
const { getConfig } = require('./config');
require('../models/relations');

/* GET home page. */
router.get('/', async (req, res) => {
    res.json({ api_version: 2 });
});

router.get('/request/:action?', async (req, res) => {
  let request = '';
  let body = [];
  if (req.query) {
    body = req.query.body;
  }
  if (req.params.action) {
    request = await createRequest({ type: req.params.action, body });
  }
  res.json({ api_version: 2, request, query: req.query });
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

router.get('/config', getConfig);

router.get('/groups/:value?', getGroups).post('/groups', postGroup);

router.get('/products/:value?/:pid?', getProducts);

// router.get('/documents/:value?', async function (req, res) {
//   if (!req.params.value) {
//     res.json({ db: 'documents' });
//   } else if (req.params.value === 'update') {
//     try {
//       let request = await createRequest({ type: 'documents_v2' });
//       let result = await fetchEvo(request);
//       res.send(result);
//     } catch (err) {
//       res.send(err.message);
//     }
//   } else {
//     try {
//       let request = await createRequest({
//         type: 'documents_v2',
//         value: req.params.value,
//       });
//       let result = await fetchEvo(request);
//       res.send(result);
//     } catch (err) {
//       res.send(err.message);
//     }
//   }
// });

module.exports = router;

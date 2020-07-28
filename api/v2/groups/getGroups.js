const parseQuery = require("../../models/parse_query");
const Group = require("../../models/group");
const { createRequest, fetchEvo } = require("../api_evotor");

module.exports = async function (req, res) {
    if (!req.params.value) {
      let where = parseQuery(req.query);
      let { count, rows } = await Group.findAndCountAll({
        where,
        order: [['createdAt', 'ASC']]
      });
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
  };

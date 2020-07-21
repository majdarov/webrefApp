const { Op } = require('sequelize');

function parseQuery(q) {
    if (q === null) return null;
    let where = {};
    for (let key in q) {
        switch (key) {
            case 'eq':
                where[Op.eq] = validateQkey(key, q[key]);
                break;
            case 'ne':
                where[Op.ne] = validateQkey(key, q[key]);
                break;
            case 'or':
                where[Op.or] = validateQkey(key, q[key]);
                break;
            case 'and':
                where[Op.and] = validateQkey(key, q[key]);
                break;
            case 'is':
                where[Op.is] = validateQkey(key, q[key]);
                break;
            case 'not':
                where[Op.not] = validateQkey(key, q[key]);
                break;
            case 'gt':
                where[Op.gt] = validateQkey(key, q[key]);
                break;
            case 'gte':
                where[Op.gte] = validateQkey(key, q[key]);
                break;
            case 'lt':
                where[Op.lt] = validateQkey(key, q[key]);
                break;
            case 'lte':
                where[Op.lte] = validateQkey(key, q[key]);
                break;
            case 'between':
                where[Op.between] = validateQkey(key, q[key]);
                break;
            case 'not_between':
                where[Op.notBetween] = validateQkey(key, q[key]);
                break;
            case 'substr':
            case 'like':
                where[Op.substring] = validateQkey(key, q[key]);
                break;
            // case 'like':
            //     where[Op.like] = validateQkey(key, q[key]);
            //     break;
            default:
                where[key] = validateQkey(key, q[key]);
                break;
        }
    }
    return where;
}

function validateQkey(key, qKey) {
    if (qKey === 'null') return null;
    if (key === 'parent_id' && qKey === '0') return null;
    return Array.isArray(qKey) ? 
    qKey : (typeof qKey === 'object') ?
        parseQuery(qKey) :
        qKey
}

module.exports = parseQuery;

// let query = {
//     paren_code: {
//         is: 'null'
//     },
//     price: ['10', '20'],
//     cost_price: {
//         lt: '50'
//     }
// };
// console.log(parseQuery(query))
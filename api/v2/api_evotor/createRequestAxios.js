const Config = require('../../models/config');
const api_v2 = require('./api_v2_axios.json');

async function createRequest(action) {
  //Getting config => appToken & storeUUID
  let config = await Config.findAll();

  let app = config.find((item) => item.config_name === 'app_token');
  api_v2.headers['X-Authorization'] = app.config_value;

  let store = config.find((item) => item.config_name === 'store_id');
  action.storeUuid = store.config_value;

  api_v2.params = action.cursor ? { cursor: action.cursor } : null;

  let request = selectOption(action);

  return { ...request, action: action.type };
}

function selectOption(action) {
  let url, method, body, headers;

  switch (action.type) {
    case 'store_v2':
      url = 'stores';
      return { ...api_v2, method: 'GET', url };

    case 'bulks_v1':
      if (action.value) {
        url = 'bulks/' + action.value;
      } else {
        url = 'bulks';
      }
      return { ...api_v2, method: 'GET', url };

    /* Получить товар по ID или все товары */
    case 'products_v2':
      method = 'GET';
      if (action.value) {
        url = 'stores/' + action.storeUuid + '/products/' + action.value;
        action.value = '';
      } else {
        url = 'stores/' + action.storeUuid + '/products';
      }
      return { ...api_v2, method, url };
    /*-------------------------------------*/

    /* Получить группу по ID или список групп */
    case 'groups_v2':
      method = 'GET';
      if (action.value) {
        url = 'stores/' + action.storeUuid + '/product-groups/' + action.value;
        action.value = '';
      } else {
        url = 'stores/' + action.storeUuid + '/product-groups';
      }
      return { ...api_v2, method, url };
    /*--------------------------------------*/

    /* Получить документы (за пред. месяц, продажа) */
    case 'documents_v2':
      method = 'GET';
      if (action.value) {
        url = 'stores/' + action.storeUuid + '/documents/' + action.value;
      } else {
        url = 'stores/' + action.storeUuid + '/documents';
        if (!api_v2.cursor) {
          let date = new Date();
          date.setMonth(date.getMonth() - 1);
          url += `?since=${date.getTime()}&type=SELL`;
        }
      }
      return { ...api_v2, method, url };
    /*----------------------------------------------*/

    case 'put_product_v2':
      method = 'PUT';
      url = 'store/' + action.storeUuid + '/products/' + action.body.product.id;
      body = JSON.stringify(action.body);
      return { ...api_v2, method, url, body };

    case 'put_array_products_v2':
      if (!action.body?.length) {
        return {};
      }
      method = 'PUT';
      headers = {
        ...api_v2.headers,
        'Content-Type': 'application/vnd.evotor.v2+bulk+json',
      };
      url = 'store/' + action.storeUuid + '/products';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, url, body };

    case 'put_array_groups_v2':
      method = 'PUT';
      headers = {...api_v2.headers, 'Content-Type': 'application/vnd.evotor.v2+bulk+json'};
      url = 'store/' + action.storeUuid + '/product-groups';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, url, body };
    default:
      break;
  }
}

module.exports = createRequest;

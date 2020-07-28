const Config = require('../../models/config');
const api_v2 = require('./api_v2.json');

async function createRequest(action) {
  //Getting config => appToken & storeUUID
  let config = await Config.findAll();

  let app = config.find((item) => item.config_name === 'app_token');
  api_v2.headers['X-Authorization'] = app.config_value;

  let store = config.find((item) => item.config_name === 'store_id');
  action.storeUuid = store.config_value;

  if (action.cursor) {
    api_v2.cursor = action.cursor;
  }

  let request = selectOption(action);

  api_v2.cursor = '';
  return { ...request, action: action.type };
}

function selectOption(action) {
  let path, method, body, headers, storeUuid;

  switch (action.type) {
    case 'store_v2':
      path = 'stores';
      return { ...api_v2, method: 'GET', path };

    case 'bulks_v1':
      if (action.value) {
        path = 'bulks/' + action.value;
      } else {
        path = 'bulks';
      }
      return { ...api_v2, method: 'GET', path };

    /* Получить товар по ID или все товары */
    case 'products_v2':
      method = 'GET';
      if (action.value) {
        path = 'stores/' + action.storeUuid + '/products/' + action.value;
        action.value = '';
      } else {
        path = 'stores/' + action.storeUuid + '/products';
      }
      return { ...api_v2, method, path };
    /*-------------------------------------*/

    /* Получить группу по ID или список групп */
    case 'groups_v2':
      method = 'GET';
      if (action.value) {
        path = 'stores/' + action.storeUuid + '/product-groups/' + action.value;
        action.value = '';
      } else {
        path = 'stores/' + action.storeUuid + '/product-groups';
      }
      return { ...api_v2, method, path };
    /*--------------------------------------*/

    /* Получить документы (за пред. месяц, продажа) */
    case 'documents_v2':
      method = 'GET';
      if (action.value) {
        path = 'stores/' + action.storeUuid + '/documents/' + action.value;
      } else {
        path = 'stores/' + action.storeUuid + '/documents';
        if (!api_v2.cursor) {
          let date = new Date();
          date.setMonth(date.getMonth() - 1);
          path += `?since=${date.getTime()}&type=SELL`;
        }
      }
      return { ...api_v2, method, path };
    /*----------------------------------------------*/

    case 'put_product_v2':
      method = 'PUT';
      path =
        'store/' + action.storeUuid + '/products/' + action.body.product.id;
      body = JSON.stringify(action.body);
      return { ...api_v2, method, path, body };

    case 'put_array_products_v2':
      if (!action.body?.length) {
        return {};
      }
      method = 'PUT';
      headers = {
        ...api_v2.headers,
        'Content-Type': 'application/vnd.evotor.v2+bulk+json',
      };
      path = 'store/' + action.storeUuid + '/products';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, path, body };

    case 'put_array_groups_v2':
      method = 'PUT';
      headers = Object.assign({}, api_v2.headers, {
        'Content-Type': 'application/vnd.evotor.v2+bulk+json',
      });
      path = 'store/' + action.storeUuid + '/product-groups';
      body = JSON.stringify(action.body);
      return { ...api_v2, method, headers, path, body };
    default:
      break;
  }
}

module.exports = createRequest;

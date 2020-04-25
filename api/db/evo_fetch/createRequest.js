const initDb = require("../initial_db");
const { getConfig } = require("../db_actions");

async function createRequest(action) {
  let path, method, body, headers;
  let storeUuid, appToken;

  let api_v2 = {
    server: "https://api.evotor.ru/",
    path: "", //stores/20180608-EEA0-408D-807D-6AB73272E383/
    headers: {
      Accept: "application/vnd.evotor.v2+json",
      "Content-Type": "application/vnd.evotor.v2+json",
      "X-Authorization": "", //6ef2370f-ed79-43b7-8a7c-f7b83175fef2
    },
    cursor: "",
  };
  //Getting appToken
  let response = await initDb(getConfig);
  let result = response.items.find((item) => item["config_name"] === "app_token");
  appToken = result["config_value"];
  api_v2.headers["X-Authorization"] = appToken;

  let request = selectOption(action);

  function selectOption(action) {
    switch (action.type) {
      case "store_v2":
        path = "stores";
        return Object.assign({}, api_v2, {
          method: "GET",
          path: path,
        });
      case "bulks_v1":
        if (action.value) {
          path = "bulks/" + action.value;
        } else {
          path = "bulks";
        }
        return Object.assign({}, api_v2, {
          method: "GET",
          path: path,
        });
      case "products_v2":
        method = "GET";
        if (action.value) {
          path = "store/" + storeUuid + "/products/" + action.value;
          action.value = "";
        } else {
          path = "store/" + storeUuid + "/products";
        }
        return Object.assign({}, api_v2, {
          method: method,
          path: path,
        });
      case "groups_v2":
        method = "GET";
        if (action.value) {
          path = "store/" + storeUuid + "/product-groups/" + action.value;
          action.value = "";
        } else {
          path = "store/" + storeUuid + "/product-groups";
        }
        return Object.assign({}, api_v2, {
          method: method,
          path: path,
        });
      case "documents_v2":
        method = "GET";
        path = "store/" + storeUuid + "/documents";
        return Object.assign({}, api_v2, {
          method: method,
          path: path,
        });
      case "put_product_v2":
        method = "PUT";
        path = "store/" + storeUuid + "/products/" + action.product.id;
        body = JSON.stringify(action.product);
        return Object.assign({}, api_v2, {
          method: method,
          path: path,
          body: body,
        });
      case "put_array_product_v2":
        if (!action.products.length) {
          return {};
        }
        method = "PUT";
        headers = Object.assign({}, api_v2.headers, {
          "Content-Type": "application/vnd.evotor.v2+bulk+json",
        });
        path = "store/" + storeUuid + +"/products";
        body = JSON.stringify(action.products);
        return Object.assign({}, api_v2, {
          method: method,
          headers: headers,
          path: path,
          body: body,
        });
      case "put_array_groups_v2":
        method = "PUT";
        headers = Object.assign({}, api_v2.headers, {
          "Content-Type": "application/vnd.evotor.v2+bulk+json",
        });
        path = "store/" + storeUuid + "/product-groups";
        body = JSON.stringify(action.groups);
        return Object.assign({}, api_v2, {
          method: method,
          headers: headers,
          path: path,
          body: body,
        });
      default:
        break;
    }
  }

  return request;
}

module.exports = createRequest;

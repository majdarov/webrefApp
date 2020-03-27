const fetch = require('node-fetch');

module.exports = async function updateCommoditiesFromEvo() {
  
  let response = await fetch("https://api.evotor.ru/api/v1/inventories/stores/20180608-EEA0-408D-807D-6AB73272E383/products", {
    method: "GET",
    headers: { 
        "Accept": "application/vnd.evotor.v2+json",
        "Content-Type": "application/vnd.evotor.v2+json",
        "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2"
     }
  });
  let commodities = await response.json();
  
  return commodities;
}

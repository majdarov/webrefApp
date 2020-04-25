const fetch = require('node-fetch');

module.exports = async function fetchEvo({server, path, method, headers, cursor}) {
  
  let response = await fetch(server + path, {
    method,
    headers,
    cursor
  });
  let result = await response.json();
  
  return result;
}

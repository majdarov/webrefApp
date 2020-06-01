const fetch = require("node-fetch");
const createRequest = require("./createRequest");

module.exports = async function fetchEvo({
  server,
  path,
  method,
  headers,
  body,
  cursor
}) {

    if (cursor) {
      path += `?cursor=${cursor}`;
    }
    let response = await fetch(server + path, {
      method,
      headers,
      body,
    });

    let result = await response.json();

    if (result.paging &&  result.paging.next_cursor) {
      let request = await createRequest({
        type: "products_v2",
        cursor: result.paging.next_cursor,
      });
      let resp = await fetchEvo(request);
      result.items = result.items.concat(resp.items);
    }
    // console.log(`---result.items.length = ${result.items.length}---`);
    result.paging = {};

    return result;
};

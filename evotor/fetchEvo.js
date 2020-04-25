const api_v2 = {
  server: "https://api.evotor.ru/",
  path: "stores/20180608-EEA0-408D-807D-6AB73272E383/",
  headers: {
    Accept: "application/vnd.evotor.v2+json",
    "Content-Type": "application/vnd.evotor.v2+json",
    "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2",
  },
};

async function getStoreEvo({ server, headers, path, method, body }) {
  let stores;
  let groups = [];
  // console.log(path);
  let response = await fetch(server + path, {
    method,
    headers,
    body
  });
  let result = await response.json();
  // https://api.evotor.ru/stores/20180608-EEA0-408D-807D-6AB73272E383/documents?cursor=string
  console.log(result);
  return result;
}

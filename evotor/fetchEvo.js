async function getStoreEvo() {
  let stores;
  let groups = [];
  let response = await fetch("https://api.evotor.ru/api/v1/inventories/stores/20180608-EEA0-408D-807D-6AB73272E383/products", {
    method: "GET",
    headers: { 
        "Accept": "application/vnd.evotor.v2+json",
        "Content-Type": "application/vnd.evotor.v2+json",
        "X-Authorization": "6ef2370f-ed79-43b7-8a7c-f7b83175fef2"
     }
  });
  stores = await response.json();
  // console.log(stores);
  stores.forEach(item => {
      if (!item.group) return;
      groups.push(item);
  });

  console.log(groups);
}

getStoreEvo();

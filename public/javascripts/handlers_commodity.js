/* (async function() {
  let groups = await require("./database/db_actions").getGroup();
  console.log(groups[1]);
})(); */

modHTML();
/************************
 *  Make Tree of Groups *
 ************************/
async function modHTML() {
  /* let response = await fetch("/commodity", {
    method: "GET",
    headers: { get: "groups" }
  }); */
  let response = await fetch('/api/v1/groups');
  let json = await response.json();
  groups = json.items;
  groups.forEach(group => makeGroup(group, "rootTree"));

  let containerUl = $("#tree");
  treeMark(containerUl);
}

function makeGroup(group, rootLi) {
  let parentLi;
  try {
    parentLi = document.getElementById(group.parentCode);
    if (!parentLi) {
      parentLi = document.getElementById(rootLi);
    }
  } catch (e) {
    console.error(e);
  }
  let ul;
  if (!parentLi.children.length) {
    ul = document.createElement("ul");
    if (rootLi === "rootList") {
      ul.id = "ullist";
    }
    parentLi.append(ul);
  }

  let li = document.createElement("li");
  li.id = group.UUID;
  li.innerHTML = group.name;
  if (rootLi === "rootList") {
    li.className = "list-group-item";
  }
  parentLi.children[0].append(li);

  return;
}

function treeMark(containerUl) {
  if (!containerUl) return;

  let arr = $("li", containerUl);
  arr.each((index, item) => {
    let n = $("li", item).length;
    let span = document.createElement("span");
    item.prepend(span);
    span.append(span.nextSibling);

    if (n > 0) {
      let span2 = document.createElement("span");
      span2.classList.add("badge", "badge-primary");
      span2.innerText = n;
      span.append(span2);
    }
  });

  containerUl.dblclick(function(event) {
    if (event.target.tagName !== "SPAN") return;

    if ($(event.target).next() === null) return;

    if (event.isTrigger) {
      target = $(event.target).closest("ul");
      $(target).show();
      return;
    }

    target = $(event.target).next();
    $(target).toggle();
  });

  containerUl.click(handler);
}

function handler(e) {
  let elem = e.target;

  if (elem.tagName !== "SPAN") return;

  if (!e.ctrlKey) {
    $(".selected").each((index, item) => {
      $(item).toggleClass("selected");
    });
  }
  $(elem).toggleClass("selected");

  let parentId = elem.closest("LI").id;
  getCommodity(parentId);
  if (parentId === "rootTree") return;
  if (e.isTrigger) {
    $(elem).dblclick();
  }
  return;
}

/*
 *  Get Commodity
 */
async function getCommodity(pId) {
  /* let response = await fetch("/commodity", {
    method: "GET",
    headers: {
      get: "commodities",
      parentId: pId
    }
  }); */
  let response = await fetch(`/api/v1/commodities/p/${pId}`);

  let json = await response.json();
  let commodities = json.items;

  let list = $("#list");
  $(list).html(
    '<li id="rootList" class="list-group-item list-group-item-primary">Root</li>'
  );
  if (!commodities[0].parentCode) $("#rootList").toggleClass("disabled");

  //Add commodity into tree
  commodities.forEach(commodity => {
    commodity.UUID = "_" + commodity.UUID;
    commodity.parentCode = "_" + commodity.parentCode;
    let li = document.createElement("li");
    li.id = commodity.UUID;
    $(li).addClass("list-group-item");
    if (commodity.g) {
      $(li).data("group", 1);
      $(li).addClass("list-group-item-info");
      $(li).html(commodity.name);
      list.append(li);
    } else {
      $(li).data("price", commodity.price);
      $(li).data("quantity", commodity.quantity);
      $(li).data("group", 0);
      $(li).html(
        commodity.name +
          " | " +
          commodity.price / 100 +
          " руб." +
          " | " +
          commodity.quantity / 1000
      );
      list.append(li);
    }
  });

  $("#list").off("click");
  $(list).on("click", event => {
    if (event.target.disabled) return;

    if (event.target.id === "rootList") {
      $("#rootTree > span").click();
      return;
    }

    if ($(event.target).data("group") === 1) {
      let gId = event.target.id.slice(1);
      $(`#${gId} > span`).click();
    } else {
      if (!event.ctrlKey) {
        $(".active", list).each((index, item) => {
          $(item).toggleClass("active");
        });
      }
      $(event.target).toggleClass("active");
    }
  });

  return;
}

modHTML();
// let groups = require('./database/db_actions').getGroup();
// console.log(groups[1]);
/*
*  Make Tree of Groups
*/
async function modHTML() {
  let response = await fetch('/commodity', {
      method: 'GET',
      headers: {get: 'groups'}
  });
  let groups = await response.json();
  groups.forEach(group => makeGroup(group, 'rootTree'));
  
  let containerUl = $('#tree');
  treeMark(containerUl);
}

function makeGroup(group, rootLi)   {
  
  let parentLi;
  try {
    parentLi = document.getElementById(group.parentCode);
    if (!parentLi) {
      parentLi = document.getElementById(rootLi);
    }
  } catch { 
    console.error(e);
  }
  let ul;
  if (!parentLi.children.length ) {
    ul = document.createElement('ul')
    if (rootLi === 'rootList') {
      ul.id = 'ullist';
    }
    parentLi.append(ul);
  }
  
  let li = document.createElement('li');
  li.id = group.UUID;
  li.innerHTML = group.name;
  if (rootLi === 'rootList') {
    li.className = 'list-group-item';
  }
  parentLi.children[0].append(li);

  return;
}

function treeMark(containerUl) {
    if (!containerUl) return;
    
    let arr = $('li', containerUl);
    arr.each((index, item) => {
    
      let n = $('li', item).length;
      let span = document.createElement('span');
      item.prepend(span);
      span.append(span.nextSibling);

      if (n > 0) {
        let span2 = document.createElement('span');
        span2.classList.add('badge','badge-primary');
        span2.innerText = n;
        span.append(span2);
      }
    });

    containerUl.dblclick(function (event) {
      
      if (event.target.tagName !== 'SPAN') return;
        
      let isTrusted = event.originalEvent.isTrusted;
      
      if (isTrusted) {
        if ($(event.target).next() === null) return;
        var target = $(event.target).next();
      } else {
          target = event.target.closest('ul');
          target.hidden = false;
      }

      $(target).toggle();
      
    }) 

    containerUl.click(handler);
}

function handler(e) {
  
  let elem = e.target;
  
  if (elem.tagName !== 'SPAN') return;
    
  if (!e.ctrlKey) {
    $('.selected').each((index, item) => {
      $(item).toggleClass('selected');
    });
  }
  $(elem).toggleClass('selected');
    
  if (!e.originalEvent.isTrusted) return;
    
  let parentId = elem.closest('LI').id;
  getCommodity(parentId);
  return;
}

/*
*  Get Commodity
*/
async function getCommodity(pId) {
  
  let response = await fetch('/commodity', {
    method: 'GET',
    headers: {
      get: 'commodities',
      parentId: pId
    }
  });
  let commodities = await response.json();
  
  let list = $('#list');
  $(list).html('<li id="rootList" class="list-group-item list-group-item-primary">Root</li>');
  if (!commodities[0].parentCode) $('#rootList').toggleClass('disabled');
  
  commodities.forEach(commodity => {
    commodity.UUID = '_' + commodity.UUID;
    commodity.parentCode = '_' + commodity.parentCode;
    let li = document.createElement('li');
    li.id = commodity.UUID;
    $(li).addClass('list-group-item');
    if (commodity.g) {
      $(li).data('group', 1);
      $(li).addClass('list-group-item-info');
      $(li).html(commodity.name);
      list.append(li);
    } else {
      $(li).data('price', commodity.price);
      $(li).data('quantity', commodity.quantity);
      $(li).data('group', 0);
      $(li).html(commodity.name + ' | ' + commodity.price/100 + ' руб.' + ' | ' + commodity.quantity/1000);
      list.append(li);
    }
   });
   
   $(list).on('click', event => {
    
    if ( event.target.disabled ) return;
    
    if (event.target.id === 'rootList') { 
      getCommodity('rootTree');
      return;  
    }
    
    if ( $(event.target).data('group') === 1 ) {
      getCommodity(event.target.id.slice(1));
      return;
    } else {
      if (!event.ctrlKey) {
        $('.active', list).each((index, item) => {
          $(item).toggleClass('active');
        });
      }
      $(event.target).toggleClass('active');
    }
   
   });

   return;
}
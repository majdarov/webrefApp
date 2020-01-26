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
  let containerUl = document.getElementById('tree');
  treeMark(containerUl);
  let event = new Event('click', {bubbles: true});
  rootTree.querySelector('SPAN').dispatchEvent(event);
}

function makeGroup(group, rootLi)   {
    
  if (!group.parentCode) {
    group.parentCode = rootLi;
  }
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
    let arr = containerUl.querySelectorAll('li');
    arr.forEach((item) => {
    
        let n = item.querySelectorAll('li').length;
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

    containerUl.addEventListener('click', function (event) {
        if (event.target.tagName != 'SPAN') return;
        
        if (event.isTrusted) {
          if (event.target.nextSibling === null) return;
          var target = event.target.nextSibling;
        } else {
          target = event.target.closest('ul');
          target.hidden = false;

          return;
        }
        target.hidden = !target.hidden;
    })
        
    containerUl.addEventListener('click', handler);
}

function handler(e) {
  
  let elem = e.target;
	if (elem.tagName == 'SPAN') {
		if (!e.ctrlKey) {
			document.querySelectorAll('.selected').forEach((elem) => {
			elem.classList.toggle('selected');
			});
		}
    elem.classList.toggle('selected');
    if (!e.isTrusted) return;
    let parentId = elem.closest('LI').id;
    getCommodity(parentId);
		return;
  }
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
  
  let list = document.getElementById('list');
  list.innerHTML = '<li id="rootList" class="list-group-item list-group-item-primary">Root</li>';
  if (!commodities[0].parentCode) rootList.classList.toggle('disabled');
  
  commodities.forEach(commodity => {
    commodity.UUID = 'l' + commodity.UUID;
    commodity.parentCode = 'l' + commodity.parentCode;
    let li = document.createElement('li');
    li.id = commodity.UUID;
    li.className = 'list-group-item'
    if (commodity.g) {
      li.dataset.group = 1;
      li.classList.add('list-group-item-info');
      li.innerHTML = commodity.name;
      list.append(li);
    } else {
      li.setAttribute('data-price', commodity.price);
      li.setAttribute('data-quantity', commodity.quantity);
      li.dataset.group = 0;
      li.innerHTML = commodity.name + ' | ' + commodity.price/100 + ' руб.' + ' | ' + commodity.quantity/1000;
      list.append(li);
    }
   });
   
   list.addEventListener('click', event => {
    let e = new Event('click', {bubbles: true});
    
    if (event.target.id == 'rootList') {
      if (event.target.classList.disabled) return;
      getCommodity('rootTree');      
      // rootTree.firstElementChild.dispatchEvent(e);
    } else  if (event.target.dataset.group == '1') {
      getCommodity(event.target.id.slice(1));
      // document.getElementById(event.target.id.slice(1)).firstElementChild.dispatchEvent(e);
    } else {
      if (!event.ctrlKey) {
        list.querySelectorAll('.active').forEach(item => {
          item.classList.toggle('active');
        })
      }
      event.target.classList.toggle('active');
    }
   
   });

   return;
}
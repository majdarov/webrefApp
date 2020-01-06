function treeMark() {
    let arr = tree.querySelectorAll('li');
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

    let ul = document.getElementById('tree');
    ul.addEventListener('click', function (event) {
        if (event.target.tagName != 'SPAN') return;
        if (event.target.nextSibling == null) return;
        let target = event.target.nextSibling;
        target.hidden = !target.hidden;
    })
        
    tree.addEventListener('click', handler);
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
    let parentId = elem.closest('LI').id;
    getCommodity(parentId);
		return;
	} else return;
}

async function modHTML() {
    let response = await fetch('/commodity', {
        method: 'GET',
        headers: {get: 'groups'}
    });
    
    let groups = await response.json();
    
    groups.forEach(group => {
      if (!group.parentCode) {
        group.parentCode = 'root';
      }
      let parentLi = document.getElementById(group.parentCode);
      
      if (!parentLi.children.length) {
        parentLi.append(document.createElement('ul'));
      }
      let li = document.createElement('li');
      li.id = group.code;
      li.innerHTML = group.name;
      parentLi.children[0].append(li);
    });
    treeMark();
    let event = new Event('click', {bubbles: true});
    root.querySelector('SPAN').dispatchEvent(event);
    return;
}

modHTML();

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
  list.innerHTML = 'LIST';
  commodities.forEach(commodity => {
    let li = document.createElement('li');
    li.id = commodity.UUID;
    li.setAttribute('data-price', commodity.price);
    li.setAttribute('data-quantity', commodity.quantity);
    li.innerHTML = commodity.name + ' | ' + commodity.price/100 + ' руб.' + ' | ' + commodity.quantity/1000;
    list.append(li);
   })
}
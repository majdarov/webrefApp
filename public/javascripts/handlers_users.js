let del = document.querySelectorAll('.del');
del.forEach( item => item.addEventListener('click', delUser));
addUser.addEventListener('submit', fAddUser);

async function delUser(e) {
    let tr = e.target.closest('tr');
    // console.log('Deleting element ' + tr.tagName + ' id: ' + tr.id);
    // debugger;
    if (!confirm ('Delete this User?')) {
        console.log('cansel deletig');
        return;
    }
    let fBody = {
        id: tr.id,
        method: 'delete'
    }
    let response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(fBody)
    })
    let result = await response.text();
    if ( result != 'ok') {
        alert(result);
        return;
    }
    await fetch('/users');
    location.reload([true]);   
}

async function fAddUser(e) {
    e.preventDefault();
    let reqBody = new FormData(addUser);
    let fBody = {};
    reqBody.set('method', 'adduser');
    for(let [name, value] of reqBody) {
        fBody[name] = value;
        console.log(`${name} = ${value}`); 
    }
    let response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(fBody)
    });
    let result =  await response.text();
    if (result = 'ok') {
        await fetch('/users');
        location.reload([true]);
    }
}
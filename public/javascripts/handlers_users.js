let del = document.querySelectorAll('.del');
del.forEach( item => item.addEventListener('click', delUser));

function delUser(e) {
    let tr = e.target.closest('tr');
    console.log('Deleting element ' + tr.tagName + ' id: ' + tr.id);
    
    if (!confirm ('Delete this User?')) {
        console.log('cansel deletig');
        return;
    }
    let fBody = {
        id: tr.id,
        method: 'delete'
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(fBody)
    })
    .then(response => response.text())
    .then(result => {
        if ( result != 'ok') {
            alert(result);
        }
        tr.remove();
        alert('Delete OK!' + ' : ' + result);
    })   
}


addUser.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e.target);
    
    let reqBody = new FormData(addUser);
    let fBody = {};
    reqBody.set('method', 'adduser');
    
    for(let [name, value] of reqBody) {
        fBody[name] = value;
        console.log(`${name} = ${value}`); // key1=value1, потом key2=value2
    }
    // flipFlop.setAttribute('aria-hidden', true);


    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(fBody)
    })
    .then(response => response.text())
    .then(result =>  alert(result));
})
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
        alert('Delete OK!' + ' : ' + result);
        tr.remove();
    })   
}
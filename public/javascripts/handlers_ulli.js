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

function handler(e) {
	let elem = e.target;
	if (elem.tagName == 'SPAN') {
		if (!e.ctrlKey) {
			document.querySelectorAll('.selected').forEach((elem) => {
			elem.classList.toggle('selected');
			});
		}
		elem.classList.toggle('selected');
		return;
	} else return;
}

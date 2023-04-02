

let deleteBtn = document.querySelectorAll('.delete-btn')
let updateBtn = document.querySelectorAll('.update-btn')
let updateRecord = document.getElementById('update-record')
let formUpdate = document.getElementById('update-form');


deleteBtn.forEach(btn => {
    btn.addEventListener('click', e => {
		const result=window.confirm("Sure to delete the record?");
		if(result==true){
			fetch('/books/delete', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: e.target.dataset.id })
			})
			.then(res => res.json())
			.then(data => {
				if (data.deleted) {
					e.target.parentElement.parentElement.remove()
					alert("Deleted successfully")

				}
			})
		}
		else{
			e.preventDefault()
		}
    	
    })
})

updateBtn.forEach(btn => {
    btn.addEventListener('click', e => {
    	window.location = `/books/update/${e.target.dataset.id}`;

    })
})	
  


formUpdate.addEventListener('submit', e => {
    e.preventDefault()

    let formData = new FormData(formUpdate)

    fetch(`/books/update/${e.target.dataset.id}`, {
    	method: 'PUT',
    	headers: {
    		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({ data: Object.fromEntries(formData)})
    })
	
    .then(res => res.json())
    .then(data => {
    	console.log(data);

    })
})

 
  function getValue(elemId){
	return document.getElementById(elemId).value
  }
  function get(elemId){
	return document.getElementById(elemId)
  }
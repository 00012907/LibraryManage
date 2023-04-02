
let formAdd = document.getElementById('add-form');

formAdd.addEventListener("submit", (e) => {
	e.preventDefault();

	fetch(`/books/create`,{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			title:getValue('title'),
			author:getValue('author'),
			year:getValue('year'),
			module:getValue('module')
		})
	})
		.then(res=>res.json())
		.then(data=>{
			if(data.status===200){
				window.location='/books'
			}else{
				data.errors.forEach(err=>{
					get(`${err.param}-error`).classList.add('alert'),
					get(`${err.param}-error`).textContent=err.msg
				})
			}
		})
  });
  
 
  function getValue(elemId){
	return document.getElementById(elemId).value
  }
  function get(elemId){
	return document.getElementById(elemId)
  }
'use strict';
class Pagination{
	buildPagination(size,actual,totalItens){

		var totalPages = Math.ceil(totalItens/size);
		var newUl = document.createElement('ul');

		for(var i= 0 ; i< totalPages ; i++){
			var newLi = document.createElement('li');
			newUl.appendChild(newLi);

			if(actual==(i+1)){
				newLi.classList.add('active');
				newLi.innerHTML= i+1;
			}else{
				newLi.innerHTML = i+1;
				newLi.onclick = window.pageChange;
			}
		}
		var pagination = document.getElementById('pagination');
		var newP = document.createElement('p');
		if(totalItens<=(size*actual))
			newP.innerHTML =  `Iten ${totalItens} of ${totalItens}`;
		else
			newP.innerHTML =  `Iten ${size*actual} of ${totalItens}`;
		pagination.appendChild(newP);
		pagination.appendChild(newUl);


	}
	clean(){
		var pagination = document.getElementById('pagination');
		pagination.innerHTML = '';
	}
};


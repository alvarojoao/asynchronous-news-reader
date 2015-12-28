'use strict';
class Load{
	buildLoad(evt){
		if (evt.lengthComputable) {
	        var percentComplete = evt.loaded / evt.total;

			var list = document.getElementById('list');

	        var load = list.querySelector('.load');
	        if(!load){
				var newDivDisabled = document.createElement('div');
				newDivDisabled.classList.add('parentDisable');

				var newDiv = document.createElement('div');
				newDiv.classList.add('load');
				newDiv.classList.add('orange');
				
				var newSpan = document.createElement('span');
				newSpan.classList.add('percent');
				newDiv.appendChild(newSpan);
				newSpan.style.width = percentComplete*100+'%';

				list.appendChild(newDivDisabled);
				list.appendChild(newDiv);
	        }else{
	        	var percent = load.querySelector('.percent');
	        	percent.style.width = percentComplete*100+'%';
	        }

	      }
	}
	clean(){
		var list = document.getElementById('list');
		list.innerHTML = '';
	}
};


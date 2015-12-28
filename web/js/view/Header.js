'use strict';
class Header{
	fillFields(datesPublishedUniques,objectSearch,size){
		document.querySelector('#search-field').value = objectSearch.text;
		document.querySelector('#showRelated').checked = objectSearch.showRelated;
		document.querySelector('#size [value="' + size + '"]').selected = true;


		var publishedDateDOM = document.getElementById('publishedDate');
		publishedDateDOM.innerHTML = '';
		var option = document.createElement('option');
		option.text = 'No date';
		option.value= '';
		option.selected =true;
		publishedDateDOM.add(option);

		datesPublishedUniques.forEach(function(dateObject){
			var option = document.createElement('option');
			option.text = dateObject;
			option.value= dateObject;
			if(objectSearch.publishedDate==dateObject)
				option.selected =true;

			publishedDateDOM.add(option);
		});

	}
	
	clean(){
		document.getElementById('search-field').value='';
		document.getElementById('showRelated').checked = false
		document.getElementById('publishedDate').selectedIndex  = 1;
	}
};


'use strict';

let controllerStory =  function(response){
	var stories =  [];

	stories = JSON.parse(response).results;
	
	let story = new Story();
	let pagination = new Pagination();
	let header = new Header();

	let vm = window;
	vm.objectSearch = {};
	vm.objectSearch.text = getParameterByName('text')||'';
	vm.objectSearch.publishedDate = getParameterByName('publishedDate')|| '';
	vm.objectSearch.showRelated = (getParameterByName('showRelated')==='true')||true;
	vm.pagination = {};
	vm.pagination.size = getParameterByName('size')||8;
	vm.pagination.actualpage = getParameterByName('page')||1;
	vm.pagination.totalItens = stories.length;

	
	vm.open  = function open(event){
		event.currentTarget.parentElement.parentElement.querySelector('.box').classList.toggle('open-box')
	};
	vm.search  = function search(element,event){
		if (event.which !== 0) {
			vm.objectSearch.text = element.value;
			vm.pagination.actualpage = 1;
			if(element.value||element.value!==''){
				buildListandPagination(element.value);
			}
		}

	};
	vm.dateStart  = function dateStart(element){
		vm.objectSearch.dateStart = element.value;
		if(element.value||element.value!==''){
			buildListandPagination(element.value);
		}
	};

	vm.dateEnd  = function dateEnd(element){
		vm.objectSearch.dateEnd = element.value;
		if(element.value||element.value!==''){
			buildListandPagination(element.value);
		}
	};
	vm.removeFilter  = function removeFilter(){
		vm.objectSearch = {};
		vm.objectSearch.text = '';
		vm.objectSearch.showRelated = true;
		vm.pagination.size = getParameterByName('size')||8;
		vm.pagination.actualpage = getParameterByName('page')||1;
		cleanFields();
        activate();
	};

	vm.publishedDateFilter = function publishedDateFilter(element) { 
		vm.objectSearch.publishedDate = element.value;
		vm.pagination.actualpage = 1;
		activate();
	};

	vm.pageChange = function pageChange(element) { 
		vm.pagination.actualpage = parseInt(element.target.innerHTML);
		activate();
	};


	vm.showRelated = function showRelated(element){
		vm.objectSearch.showRelated = element.checked;
		var divRelatedBox = document.getElementsByClassName('related-box');
		for(var i=0;i<divRelatedBox.length;i++){
			divRelatedBox[i].classList.toggle('hide');
		}
	};

	vm.showNumberItens = function showNumberItens(element){
		vm.pagination.size = element.value;
		vm.pagination.actualpage = 1;
		activate();
	};

	function cleanFields() {
		header.clean();
	};

	function activate(){
		fillFields();
		buildListandPagination();
	};

	function fillFields(){
		var datesPublishedUniques = getAvailableDates();
		header.fillFields(datesPublishedUniques,vm.objectSearch,vm.pagination.size);

	};

	vm.getAvailableDates = function getAvailableDates(){
		var datesPublishedUniques = [];
		if(stories&&stories.length>0){
			stories.forEach(function(object){
				var date = new Date(object.publishedDate);
				var dateString = dateFormatMMDDYYYY(date);
				if(datesPublishedUniques.indexOf(dateString)==-1){
					datesPublishedUniques.push(dateString);
				}
			});
		}

		return datesPublishedUniques;
	};
	function buildListandPagination(term){
        var storiesSearch =  stories.filter(customFilter);
		story.clean();
        story.list(storiesSearch,vm.pagination.size,vm.pagination.actualpage,vm.objectSearch.showRelated,term);
        pagination.clean();
		pagination.buildPagination(vm.pagination.size,vm.pagination.actualpage,storiesSearch.length);
	};

	vm.customFilter = function customFilter(object){
		var dateObject = new Date(object.publishedDate);
		var dateString = dateFormatMMDDYYYY(dateObject);
		
		var text = vm.objectSearch.text;
		var dateSelected = vm.objectSearch.publishedDate;
		if(!dateSelected||dateString == dateSelected)
		if(!text||((object.titleNoFormatting.toLowerCase().indexOf(text.toLowerCase())>-1)
			    ||(object.content.toLowerCase().indexOf(text.toLowerCase())>-1))) {
			return object
		}
			
	};
	function dateFormatMMDDYYYY(dateObject){
		var dateString = dateObject.getMonth()+1+'/'+dateObject.getDate()+'/'+dateObject.getFullYear();

		return dateString;
	};

	activate();

};
let load = new Load();
loadJSON('data/data.json',controllerStory,load.buildLoad);

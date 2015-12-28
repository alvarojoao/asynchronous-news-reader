'use strict';
class Story{
	list(stories,size_,page_,showRelated,term){
		var size = parseInt(size_)||undefined;
		var page = parseInt(page_)||1;
		if(stories.length>0){

			loadJSON('templates/articlebox.template.html',function(storyStringTemplate){
				loadJSON('templates/relatedbox.template.html',function(relatedStringTemplate){
					if(size){
						stories = stories.slice((page - 1) * size, page * size );
					}
					stories.forEach(function(story){
						var divString = eval('`'+storyStringTemplate+'`');

						var newDivStory = document.createElement('div');
						newDivStory.innerHTML = divString;

						newDivStory.querySelector('.title').onclick  =  open;
						if(story.relatedStories&&story.relatedStories.length>0){
							story.relatedStories.forEach(function(related){
								var divString = eval('`'+relatedStringTemplate+'`');
								var newDivRelated = document.createElement('div');
								newDivRelated.innerHTML = divString;
								newDivStory.querySelector('.relatedStories').appendChild(newDivRelated);

							});
						}else{
							var noRelated = document.createElement('p');
							noRelated.innerHTML = 'No Related stories';
							newDivStory.querySelector('.relatedStories').appendChild(noRelated);

						}
						if(!showRelated){
							newDivStory.querySelector('.related-box').classList.add('hide');
						}
						var list = document.getElementById('list');
						list.appendChild(newDivStory);
					});

				});
			});

		}else{
			loadJSON('templates/articlebox.noresult.template.html',function(response){
				var divString = eval('`'+response+'`');
				var newDiv = document.createElement('div');
				newDiv.innerHTML = divString;
				var list = document.getElementById('list');
				list.appendChild(newDiv);
			});
		}
	}
	
	clean(){
		var list = document.getElementById('list');
		list.innerHTML = '';
	}
};


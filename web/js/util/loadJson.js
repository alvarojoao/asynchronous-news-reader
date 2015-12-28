'use strict';


function loadJSON(url,callback,progress) {   
    
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType('application/json');
    xobj.open('GET', url, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
          }
    };
    xobj.addEventListener('progress', progress, false);
    xobj.send(null);  
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
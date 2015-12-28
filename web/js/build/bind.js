function loadjscssfile(filename, filetype,callbackLoaded){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.onload  = callbackLoaded;
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
};
var filesadded="" //list of files already added

function checkloadjscssfile(filename, filetype,loaded){
    if (filesadded.indexOf("["+filename+"]")==-1){
        loadjscssfile(filename, filetype,loaded)
        filesadded+="["+filename+"]" //List of files added in the form "[filename1],[filename2],etc"
    }
    else
        console.log("file already added!");
};
function required(){

    checkloadjscssfile("js/util/loadJson.js", "js",function(){
        console.log("load loadJson");
    checkloadjscssfile("js/view/Header.js", "js",function(){
        console.log("load Header");
    checkloadjscssfile("js/view/Load.js", "js",function(){
        console.log("load Load");
    checkloadjscssfile("js/view/Pagination.js", "js",function(){
        console.log("load Pagination");
    checkloadjscssfile("js/view/Story.js", "js",function(){
        console.log("load Story");
    checkloadjscssfile("js/controller/Story.js", "js",function(){
        console.log("load controller Story ");
    checkloadjscssfile("js/test/unit-test.js", "js",function(){
        console.log("load test");
    });
    });
    });
    });
    });
    });
    });


};

required();


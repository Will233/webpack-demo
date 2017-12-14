function initWebtrends(obj){
	dcsGetId();
	dcsCollect();
}

function dcsGetId(){
	if (typeof(_tag) != "undefined") {
     _tag.dcsid="dcs5w0txb10000wocrvqy1nqm_6n1p";
     _tag.dcsGetId();
    }
}

function dcsCollect(){
	 if (typeof(_tag) != "undefined") {
        _tag.DCSext.platform="weimendian";
        if(document.readyState!="complete"){
        document.onreadystatechange = function(){
            if(document.readyState=="complete") _tag.dcsCollect()
            }
        }
        else _tag.dcsCollect()
    }
}
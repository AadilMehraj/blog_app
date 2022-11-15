const { Module } = require("module");

exports.shortDesc = function(desc){

    
    if(desc.length >110)
    { 
        return desc.slice(0,110)+ "...";
    }
    return desc
}

exports.postDate = function(){
    let date = new Date();

    let day =  date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return ("" + day+"/"+month+"/"+ year);
}
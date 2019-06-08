var fs = require('fs');
var output = true;
var library = require('./library.js')['lib'];

var valJSONObject = function(rule, jsonObj){

    let rulesOnKeys = Object.keys(rule);
    //console.log(rulesOnKeys);

    let rlen = rulesOnKeys.length;
    if(rlen == 0){ throw new Error ("No rule is defined");}

    for(var i = 0; i < rlen; i++){

    let tempKey = rulesOnKeys[i];
    let actualtempKey = jsonObj[tempKey];
    let ruleObj = rule[rulesOnKeys[i]];
    let ruleProperties = Object.keys(ruleObj);

    //console.log(tempKey, actualtempKey,ruleObj);

        if(ruleProperties.length > 0){
            for(var j=0; j< ruleProperties.length; j++){
                let ruleFunc = ruleProperties[j];

                if(ruleObj.hasOwnProperty(ruleFunc)){
                    output = library[ruleFunc].call(null, ruleObj, actualtempKey);
                }
            }
        }
    }
    return output;
}

var fileRead = function(){

    fs.readFile('./demoObj.json', function(err, fdata){
        if(err){ return err;}
        
        let fileData = JSON.parse(fdata);
        //console.log(fileData);

        console.log(valJSONObject(fileData.rule, fileData.objValue));
    })
}

fileRead();
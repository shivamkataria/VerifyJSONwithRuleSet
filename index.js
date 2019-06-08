var fs = require('fs');
var assert = require('assert');

var checkType = function(expectedType, keyType){

    //console.log(expectedType, keyType);
    if(expectedType != keyType){
        return false;
    }
    return true;
}

var checkNullValue = function(key){
    
    if(key === null && typeof key === "object"){
        return true;
    }
    return false;
}

var checkNull = function(expectedType, key){
    
    let keyVal = checkNullValue(key);

    if(expectedType === keyVal){
        return true;
    }
    return false;
}

var checkEnum =function(enumArr, key){

    if(enumArr.length == 0){throw new Error("Expected Enum Values");}
    if(enumArr.indexOf(key)>-1){
        return true;
    }
    return false;
}

var valJSONObject = function(rule, jsonObj){

var output = true;

    let rulesOnKeys = Object.keys(rule);
    //console.log(rulesOnKeys);

    let rlen = rulesOnKeys.length;
    if(rlen == 0){ throw new Error ("No rule is defined");}

    for(var i = 0; i < rlen; i++){

    let tempKey = rulesOnKeys[i];
    let actualtempKey = jsonObj[tempKey];
    let ruleObj = rule[rulesOnKeys[i]];

    //console.log(tempKey, actualtempKey,ruleObj);

        if(ruleObj.hasOwnProperty('type')){
            output = checkType(ruleObj['type'], typeof(actualtempKey));
        }

        if(ruleObj.hasOwnProperty('canBenull')){
            output = checkNull(ruleObj['canBenull'], actualtempKey);
        }

        if(ruleObj.hasOwnProperty('enum')){
            output = checkEnum(ruleObj['enum'], actualtempKey);
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
var lib={};

lib['type'] = function(obj, key){

    let keyType = typeof(key);
    let expectedType = obj['type'];

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

lib['canBenull'] = function(obj, key){
    
    let expectedType = obj['canBenull'];
    let keyVal = checkNullValue(key);

    if(expectedType === keyVal){
        return true;
    }
    return false;
}

lib['enum'] =function(obj, key){

    let enumArr = obj['enum'];

    if(enumArr.length == 0){throw new Error("Expected Enum Values");}
    if(enumArr.indexOf(key) > -1){
        return true;
    }
    return false;
}

exports.lib = lib;
exports.selectRandomFromArray = function(arr){
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
};

exports.selectRandomEnum = function(enumObj){
    let enums = Object.keys(enumObj);
    // console.log('enums keys: ', enums);
    let enumIndex = Math.floor(Math.random() * enums.length);
    return enumObj[enums[enumIndex]];
};
const characterModule = require('../models/character');

let attackUser = function(userId, otherUserId){
    let char = characterModule.AllCharacters[userId];
    let opp = characterModule.AllCharacters[otherUserId];
    return char.attack(opp);
};

exports.attackUser = attackUser;
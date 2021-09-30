const characterModule = require('../models/character');

let attackUser = function(userId, otherUserId){
    let char = characterModule.AllCharacters[userId];
    let opp = characterModule.AllCharacters[otherUserId];
    opp.hp -= char.weapon.damagePerAttack;
    return userId + ' has hit ' + otherUserId + ' for ' + char.weapon.damagePerAttack + ' damage. ' + otherUserId + ' has ' + opp.hp + ' hp left!';
};

exports.attackUser = attackUser;
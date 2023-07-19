const characterModule = require('../models/character');

let attackUser = function(userId, userIdMentionString, otherUserId, otherUserIdMentionString){
    let char = characterModule.AllCharacters[userId];
    let opp = characterModule.AllCharacters[otherUserId];
    return char.attack(opp, userIdMentionString, otherUserIdMentionString);
};
exports.attackUser = attackUser;
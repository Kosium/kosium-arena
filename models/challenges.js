const charModules = require('../models/character');

let challengedOpponents = {
    //key is userId, val is userId of who you challenged
};

let initUserPositions = function(userId, otherUserId){
    charModules.AllCharacters[userId].xPos = -2;
    charModules.AllCharacters[otherUserId].xPos = 2;
    charModules.AllCharacters[userId].hp = 100;
    charModules.AllCharacters[otherUserId].hp = 100;
}

exports.challengeOpponent = function(userId, otherUserId){
    challengedOpponents[userId] = otherUserId;
    if (challengedOpponents.hasOwnProperty(otherUserId)){
        initUserPositions(userId, otherUserId);
        return userId + ' is at x position: ' + charModules.AllCharacters[userId].xPos + ' meters and ' + otherUserId + ' is at x position: ' + charModules.AllCharacters[otherUserId].xPos + ' meters. ' + 'NOW FIGHT!';
    }
    else {
        return otherUserId + ' has been challenged! They must challeng you back to begin the match.';
    }
};

exports.userIsInFight = function(userId){
    if (!challengedOpponents.hasOwnProperty(userId)){
        return false;
    }
    let otherUserId = challengedOpponents[userId];
    return challengedOpponents[otherUserId] == userId;
};

exports.usersAreFighting = function(userId, otherUserId){
    let userIdHasChallenged = false;
    let otherUserIdHasChallenged = false;
    if (challengedOpponents.hasOwnProperty(userId) && challengedOpponents[userId] == otherUserId){
        userIdHasChallenged = true;
    }
    if (challengedOpponents.hasOwnProperty(otherUserId) && challengedOpponents[otherUserId] == userId){
        otherUserIdHasChallenged = true;
    }
    return userIdHasChallenged && otherUserIdHasChallenged;
};

exports.endFight = function(userId){
    let otherUserId = challengedOpponents[userId];
    delete challengedOpponents[userId];
    delete challengedOpponents[otherUserId];
};
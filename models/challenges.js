const charModules = require('../models/character');

let challengedOpponents = {
    //key is userId, val is userId of who you challenged
};

let initUser = function(userId){
    charModules.AllCharacters[userId].xPos = charModules.position.MIDDLE;
    charModules.AllCharacters[userId].hp = 100;
    charModules.AllCharacters[userId].buffs = [];
};

exports.challengeOpponent = function(userId, userIdMentionString, otherUserId, otherUserIdMentionString){
    challengedOpponents[userId] = otherUserId;
    if (challengedOpponents.hasOwnProperty(otherUserId)){
        initUser(userId);
        initUser(otherUserId);
        let userIndexGoesFirst = Math.floor(Math.random() * 2);
        if (userIndexGoesFirst){
            charModules.AllCharacters[otherUserId].myTurn = true;
        }
        else {
            charModules.AllCharacters[userId].myTurn = true;
        }
        return userIdMentionString + ' is at x position: ' + charModules.AllCharacters[userId].xPos + ' meters and ' + otherUserIdMentionString + ' is at x position: ' + charModules.AllCharacters[otherUserId].xPos + ' meters. ' + 'NOW FIGHT!';
    }
    else {
        return otherUserId + ' has been challenged! They must challenge you back to begin the match.';
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
    charModules.AllCharacters[userId].removeBuffs();
    charModules.AllCharacters[otherUserId].removeBuffs();
    delete challengedOpponents[userId];
    delete challengedOpponents[otherUserId];
};
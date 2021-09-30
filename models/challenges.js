

let challengedOpponents = {
    //key is userId, val is userId of who you challenged
};


exports.challengeOpponent = function(userId, otherUserId){
    challengedOpponents[userId] = otherUserId;
    if (challengedOpponents.hasOwnProperty(otherUserId)){
        return 'FIGHT!';
    }
    else {
        return otherUserId + ' has been challenged! They must challeng you back to begin the match.';
    }
}

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
}
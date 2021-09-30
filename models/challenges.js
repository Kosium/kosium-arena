

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
var chai = require('chai');
var expect = chai.expect;
const randomCharModule = require('../commands/randomcharacter');
const challengeModule = require('../commands/challenge');
const moveUpModule = require('../commands/moveup');
const attackModule = require('../commands/attack');
const abilityOneModule = require('../commands/abilityOne');
const abilityTwoModule = require('../commands/abilityTwo');
const abilityThreeModule = require('../commands/abilityThree');
const surrenderModule = require('../commands/surrender');

let userObj = {
    username: 'userId',
    discriminator: '4621',
    toString: function(){
        return 'userObjectString';
    }
};

let otherUserObj = {
    username: 'otherUserId',
    discriminator: '1234',
    toString: function(){
        return 'otherUserObjectString';
    }
};

let anotherUserObj = {
    username: 'anotherUserId',
    discriminator: '3334',
    toString: function(){
        return 'anotherUserObjectString';
    }
};

let interaction = function(user, otherUser, channelId = 1){ 
    return {
        user: user,
        channelId: channelId,
        options: {
            get: function(string){
                return {
                    user: otherUser
                }
            }
        },
        reply: function(msg){
            console.log(msg);
        }
    }
};

describe('Battle Test', function() {
    before(function(done){
        done();
    });

    after(function(done){
        done();
    });

    it('create two characters and fight', async function() {
        let userInteraction = interaction(userObj, otherUserObj);
        let otherUserInteraction = interaction(otherUserObj, userObj);
        await randomCharModule.execute(userInteraction);
        await randomCharModule.execute(otherUserInteraction);
        console.log('characters created');
        await challengeModule.execute(userInteraction);
        await challengeModule.execute(otherUserInteraction);
        await moveUpModule.execute(userInteraction);
        await moveUpModule.execute(otherUserInteraction);

        await abilityOneModule.execute(userInteraction);
        await abilityOneModule.execute(otherUserInteraction);
        await attackModule.execute(userInteraction);
        await attackModule.execute(otherUserInteraction);
        await abilityTwoModule.execute(userInteraction);
        await abilityTwoModule.execute(otherUserInteraction);
        await attackModule.execute(userInteraction);
        await attackModule.execute(otherUserInteraction);
        await attackModule.execute(userInteraction);
        await attackModule.execute(otherUserInteraction);
        await abilityThreeModule.execute(userInteraction);
        await abilityThreeModule.execute(otherUserInteraction);

        for (let i = 0; i < 9; ++i){
            console.log('ROUND: ', i);
            await attackModule.execute(userInteraction);
            await attackModule.execute(otherUserInteraction);
        }
    });

    it('shouldnt let you cast ability two two turns in a row', async function() {
        let userInteraction = interaction(userObj, otherUserObj);
        let otherUserInteraction = interaction(otherUserObj, userObj);
        await randomCharModule.execute(userInteraction);
        await randomCharModule.execute(otherUserInteraction);
        console.log('characters created');
        await challengeModule.execute(userInteraction);
        await challengeModule.execute(otherUserInteraction);
        await moveUpModule.execute(userInteraction);
        await moveUpModule.execute(otherUserInteraction);

        await abilityTwoModule.execute(userInteraction);
        await attackModule.execute(otherUserInteraction);
        await abilityTwoModule.execute(userInteraction);
        await attackModule.execute(otherUserInteraction);

        await surrenderModule.execute(userInteraction);
    });

    it('should let a user fight two opponents at the same time in different channels', async function() {
        let userInteraction = interaction(userObj, otherUserObj);
        let otherUserInteraction = interaction(otherUserObj, userObj);
        let user2Interaction = interaction(userObj, anotherUserObj, 2);
        let otherUser2Interaction = interaction(anotherUserObj, userObj, 2);
        await randomCharModule.execute(userInteraction);
        await randomCharModule.execute(otherUserInteraction);
        await randomCharModule.execute(user2Interaction);
        await randomCharModule.execute(otherUser2Interaction);
        console.log('characters created');
        await challengeModule.execute(userInteraction);
        await challengeModule.execute(otherUserInteraction);
        await challengeModule.execute(user2Interaction);
        await challengeModule.execute(otherUser2Interaction);
        await moveUpModule.execute(userInteraction);
        await moveUpModule.execute(otherUserInteraction);
        await moveUpModule.execute(user2Interaction);
        await moveUpModule.execute(otherUser2Interaction);
        
        await attackModule.execute(userInteraction);
        await attackModule.execute(user2Interaction);
        await attackModule.execute(otherUserInteraction);
        await attackModule.execute(otherUser2Interaction);
    });
});
var chai = require('chai');
var expect = chai.expect;
const randomCharModule = require('../commands/randomcharacter');
const challengeModule = require('../commands/challenge');
const moveUpModule = require('../commands/moveup');
const attackModule = require('../commands/attack');
const abilityOneModule = require('../commands/abilityOne');
const abilityTwoModule = require('../commands/abilityTwo');
const abilityThreeModule = require('../commands/abilityThree');

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

let interaction = function(user, otherUser){ 
    return {
        user: user,
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
        await abilityTwoModule.execute(userInteraction);
        await abilityTwoModule.execute(otherUserInteraction);
        await abilityThreeModule.execute(userInteraction);
        await abilityThreeModule.execute(otherUserInteraction);

        for (let i = 0; i < 20; ++i){
            console.log(i);
            await attackModule.execute(userInteraction);
            await attackModule.execute(otherUserInteraction);
        }
    });
});
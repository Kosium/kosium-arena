const buff = require('./buff');
const CombatClass = require('./CombatClass');

let NinjaData = {
    name: "Ninja",
    abilityOneCooldown: 10,
    abilityTwoCooldown: 8,
	abilityTwoCharge: -1, // Added for mystic ability two (-1 means there is no charge)
    abilityThreeCooldown: 10,
    abilityOneDescription: "EVADE: +50% dodge chance for two turns.",
    abilityTwoDescription: "SHADOW BACKSTAB: Disappear for 1 turn preventing the enemy from hitting. Attack on your next turn for 300% damage!",
    abilityThreeDescription: "LAST STAND: Increase health by 50 for 4 turns.",
    abilityOne: function(char){
        let dodgeBuff = new buff({
            uniqueName: 'NinjaAbilityOneDodge',
            property: 'dodge',
            turns: 2,
            buffValue: 50,
            char: char
        });
        char.addBuff(dodgeBuff);
        dodgeBuff.applyBuff();
    },
    abilityTwo: function(char){
        let dodgeBuff = new buff({
            uniqueName: 'NinjaAbilityTwoDodge',
            property: 'dodge',
            turns: 1,
            buffValue: 100,
            char: char
        });
        let dmgBuff = new buff({
            uniqueName: 'NinjaAbilityTwoDmgMult',
            property: 'dmgMultiplier',
            //delay: 1, //commented out bc it already takes effect the turn after
            turns: 1,
            buffValue: 2,
            char: char
        });
        char.addBuff(dodgeBuff);
        char.addBuff(dmgBuff);
        dodgeBuff.applyBuff();
    },
    abilityThree: function(char){
        let hpBuff = new buff({
            uniqueName: 'NinjaAbilityThree',
            property: 'hp',
            turns: 4,
            buffValue: 50,
            char: char
        });
        char.addBuff(hpBuff);
        hpBuff.applyBuff();
    }
};

module.exports = function(character){
    NinjaData.character = character;
    return new CombatClass(NinjaData);
};

// let Ninja = function(character){
//     this.name = "Ninja";
//     this.update = character.update.bind(character);
//     this.char = character;
//     this.abilityOneCooldown = 10;
//     this.abilityOneCooldownLeft = 0;
//     this.abilityTwoCooldown = 8;
//     this.abilityTwoCooldownLeft = 0;
//     this.abilityThreeCooldown = 10;
//     this.abilityThreeCooldownLeft = 0;


//     this.toJSON = function(){
//         return "Ninja";
//     }

//     this.updateComponentState = function(){
//         if (this.abilityOneCooldownLeft > 0){
//             --this.abilityOneCooldownLeft;
//         }
//         if (this.abilityTwoCooldownLeft > 0){
//             --this.abilityTwoCooldownLeft;
//         }
//         if (this.abilityThreeCooldownLeft > 0){
//             --this.abilityThreeCooldownLeft;
//         }
//     };

//     this.abilityOne = function(otherUserId, otherUserIdMentionString){
//         if (this.abilityOneCooldownLeft > 0){
//             return {
//                 success: false, 
//                 result: "Ability One still cooling down for another: " + this.abilityOneCooldownLeft + " turns."
//             };
//         }
//         this.abilityOneCooldownLeft = this.abilityOneCooldown;
//         let dodgeBuff = new buff({
//             uniqueName: 'NinjaAbilityOneDodge',
//             property: 'dodge',
//             turns: 2,
//             buffValue: 50,
//             char: this.char
//         });
//         console.log('dodgeBUFF: ', dodgeBuff);
//         this.update();
//         this.char.addBuff(dodgeBuff);
//         dodgeBuff.applyBuff();
//         return {
//             success: true, 
//             result: "EVADE: +50% dodge chance for two turns."
//         };
//     };
//     this.abilityOneInfo = function(){
//         return "EVADE: +50% dodge chance for two turns."
//     };

//     this.abilityTwo = function(otherUserId, otherUserIdMentionString){
//         if (this.abilityTwoCooldownLeft > 0){
//             return {
//                 success: false,
//                 result: "Ability Two still cooling down for another: " + this.abilityTwoCooldownLeft + " turns."
//             };
//         }
//         this.abilityTwoCooldownLeft = this.abilityTwoCooldown;
//         let dodgeBuff = new buff({
//             uniqueName: 'NinjaAbilityTwoDodge',
//             property: 'dodge',
//             turns: 1,
//             buffValue: 100,
//             char: this.char
//         });
//         let dmgBuff = new buff({
//             uniqueName: 'NinjaAbilityTwoDmgMult',
//             property: 'dmgMultiplier',
//             delay: 1,
//             turns: 1,
//             buffValue: 2,
//             char: this.char
//         });
//         this.update();
//         this.char.addBuff(dodgeBuff);
//         this.char.addBuff(dmgBuff);
//         dodgeBuff.applyBuff();
//         return {
//             success: true,
//             result: "SHADOW BACKSTAB: Disappear for 1 turn causing the enemy attack to miss. Reappear behind the enemy and backstab them dealing 300% damage!"
//         };
//     };
//     this.abilityTwoInfo = function(){
//         return "SHADOW BACKSTAB: Disappear for 1 turn causing the enemy attack to miss. Reappear behind the enemy and backstab them dealing 300% damage!";
//     };

//     this.abilityThree = function(){
//         if (this.abilityThreeCooldownLeft > 0){
//             return {
//                 success: false,
//                 result: "Ability Three still cooling down for another: " + this.abilityThreeCooldownLeft + " turns."
//             };
//         }
//         this.abilityThreeCooldownLeft = this.abilityThreeCooldown;
//         let hpBuff = new buff({
//             uniqueName: 'NinjaAbilityThree',
//             property: 'hp',
//             turns: 4,
//             buffValue: 50,
//             char: this.char
//         });
//         this.update();
//         this.char.addBuff(hpBuff);
//         hpBuff.applyBuff();
//         this.update();
//         return {
//             success: true,
//             result: "LAST STAND: Increase health by 50 for 4 turns."
//         };
//     };
//     this.abilityThreeInfo = function(){
//         return "LAST STAND: Increase health by 50 for 4 turns.";
//     };
// }

// module.exports = Ninja;
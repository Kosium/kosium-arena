const weaponFactories = require('./weaponFactoryData');
const randModule = require('../helpers/selectRandom');
const { runInThisContext } = require('vm');
const challengeModule = require('../models/challenges');
const Ninja = require('./Ninja');
const buff = require('./buff');

exports.AllCharacters = {
    //key is userId val is character data
}

exports.position = {
    CLOSE: 0,
    MIDDLE: 1,
    FAR: 2
}

exports.createNewCharacter = function(userId){
    let char = new character(userId);
    exports.AllCharacters[userId] = char;
    return char;
}

class character {
    constructor(userId){
        this.userId = userId;
        this.xPos = exports.position.MIDDLE;
        this.agility = Math.ceil(Math.random() * 200) / 100;
        let statsLeft = 3 - this.agility;
        this.strength = Math.ceil(Math.random() * Math.min(200, statsLeft * 100)) / 100;
        statsLeft -= this.strength;
        this.stamina = Math.ceil(Math.random() * Math.min(200, statsLeft * 100)) / 100;
        this.hp = 100 + 25 * this.stamina;
        this.dodge = 5 + 22.5 * this.agility;
        this.dmgMultiplier = 1 + this.strength / 2;
        let classKeys = Object.keys(classComponents);
        let randomClassIndex = 0; //Math.floor(Math.random() * classKeys.length);
        this.weapon = randModule.selectRandomEnum(weaponFactories.WEAPONFACTORIES).createWeapon();
        this.buffs = [];
        this.myTurn = false;
        this.class = new classComponents[classKeys[randomClassIndex]](this);
    }

    updateBuffs() {
        for(let i = 0; i < this.buffs.length; ++i){
            if (this.buffs[i].updateBuff()){
                this.buffs.splice(i, 1);
                --i;
            }
        }
    }

    update() {
        this.myTurn = !this.myTurn;
        this.updateBuffs();
        this.class.updateComponentState();
    }

    // this.lastAttackTime = Date.now() - 100000;

    moveUp(distanceInMeters) {
        this.xPos -= distanceInMeters;
        if (this.xPos < exports.position.CLOSE){
            this.xPos = exports.position.CLOSE;
        }
        this.update();
        return this.xPos;
    }

    moveBack(distanceInMeters){
        this.xPos += distanceInMeters;
        if (this.xPos > exports.position.FAR){
            this.xPos = exports.position.FAR;
        }
        this.update();
        return this.xPos;
    }

    round(num){
        return Math.round(num * 100) / 100;
    }

    attack(opp, userIdMentionString, otherUserIdMentionString){
        // let timeSinceLastAttack = Date.now() - this.lastAttackTime;
        // if (timeSinceLastAttack <= this.weapon.timeToAttackInMs){
        //     let timeLeftInMs = this.weapon.timeToAttackInMs - timeSinceLastAttack;
        //     return this.userId + ' cannot attack for another ' + timeLeftInMs + ' ms';
        // }
        let dist = this.xPos + opp.xPos - 1;
        if (dist > this.weapon.maxRange){
            return otherUserIdMentionString + ' is out of range!';
        }
        let attackDodged = Math.random() * 100 < opp.dodge;
        if (attackDodged){
            this.update();
            return userIdMentionString + " has DODGED " + otherUserIdMentionString + "'s attack!";
        }
        let dmgDone = this.weapon.baseDPS * 5 * this.dmgMultiplier;
        opp.hp -= dmgDone;
        // this.lastAttackTime = Date.now();
        let returnString = '';
        if (opp.hp > 0){
            returnString = userIdMentionString + ' has hit ' + otherUserIdMentionString + ' for ' + this.round(dmgDone) + ' damage. ' + otherUserIdMentionString + ' has ' + this.round(opp.hp) + ' hp left!';
        }
        else {
            challengeModule.endFight(this.userId);
            returnString = userIdMentionString + ' HAS DEFEATED ' + otherUserIdMentionString;
        }
        this.update();
        return returnString;
    }
};

let classComponents = {
    NINJA: Ninja,
    SOLDIER: 'Soldier',
    MYSTIC: 'Mystic'
};

// exports.character = character;
exports.classes = classComponents;

exports.characterExists = function(userId){
    return exports.AllCharacters.hasOwnProperty(userId);
}
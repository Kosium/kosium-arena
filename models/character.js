const weaponFactories = require('./weaponFactoryData');
const randModule = require('../helpers/selectRandom');
const { runInThisContext } = require('vm');
const challengeModule = require('../models/challenges');

exports.AllCharacters = {
    //key is userId val is character data
}

exports.createNewCharacter = function(userId){
    let char = new character(userId);
    exports.AllCharacters[userId] = char;
    return char;
}

let character = function(userId){
    this.userId = userId;
    this.xPos = 0;
    this.hp = 100;
    this.agility = Math.ceil(Math.random() * 200) / 100;
    this.strength = Math.ceil(Math.random() * 200) / 100;
    this.stamina = Math.ceil(Math.random() * 200) / 100;
    let classKeys = Object.keys(classes);
    this.class = classes[classKeys[Math.floor(Math.random() * classKeys.length)]];
    this.weapon = randModule.selectRandomEnum(weaponFactories.WEAPONFACTORIES).createWeapon();
    this.lastAttackTime = Date.now() - 100000;

    this.moveLeft = function(distanceInMeters){
        this.xPos -= distanceInMeters;
        if (this.xPos < 0){
            this.xPos = 0;
        }
        return this.xPos;
    }
    this.moveRight = function(distanceInMeters){
        this.xPos += distanceInMeters;
        if (this.xPos > 100){
            this.xPos = 100;
        }
        return this.xPos;
    }

    this.attack = function(opp){
        let timeSinceLastAttack = Date.now() - this.lastAttackTime;
        if (timeSinceLastAttack <= this.weapon.timeToAttackInMs){
            let timeLeftInMs = this.weapon.timeToAttackInMs - timeSinceLastAttack;
            return this.userId + ' cannot attack for another ' + timeLeftInMs + ' ms';
        }
        let dist = Math.abs(this.xPos - opp.xPos);
        if (dist > this.weapon.maxRange){
            return opp.userId + ' is out of range!';
        }
        opp.hp -= this.weapon.damagePerAttack;
        this.lastAttackTime = Date.now();
        if (opp.hp > 0){
            return this.userId + ' has hit ' + opp.userId + ' for ' + this.weapon.damagePerAttack + ' damage. ' + opp.userId + ' has ' + opp.hp + ' hp left!';
        }
        else {
            challengeModule.endFight(this.userId);
            return this.userId + ' HAS DEFEATED ' + opp.userId;
        }
    }
};

let classes = {
    NINJA: 'Ninja',
    SOLDIER: 'Soldier',
    MYSTIC: 'Mystic'
};

// exports.character = character;
exports.classes = classes;

exports.characterExists = function(userId){
    return exports.AllCharacters.hasOwnProperty(userId);
}
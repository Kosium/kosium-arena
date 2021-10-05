const weaponFactories = require('./weaponFactoryData');
const randModule = require('../helpers/selectRandom');
const { runInThisContext } = require('vm');
const challengeModule = require('../models/challenges');
const Ninja = require('./Ninja');

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

exports.buff = function({property, turns, delay = -1, valueMultiplier = -1, buffValue}){
    this.property = property;
    this.originalValue = originalValue;
    this.valueMultiplier = valueMultiplier;
    this.turns = turns;
    this.delay = delay;
    this.buffValue = buffValue;

    this.applyBuff = function(char){
        char[this.property] = valueMultiplier < 0 ? this.buffValue : valueMultiplier * char[this.property];
    }

    this.removeBuff = function(char){
        char[this.property] = this.originalValue;
    }
};

let character = function(userId){
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
    let classKeys = Object.keys(classes);
    this.class = classes[classKeys[Math.floor(Math.random() * classKeys.length)]](this, this.update);
    this.weapon = randModule.selectRandomEnum(weaponFactories.WEAPONFACTORIES).createWeapon();
    // this.lastAttackTime = Date.now() - 100000;
    this.myTurn = false;
    this.buffs = [];

    this.update = function(){
        this.myTurn = !this.myTurn;
        this.updateBuffs();
    };

    this.updateBuffs = function(){
        for(let i = 0; i < this.buffs.length; ++i){
            if (this.buffs[i].delay >= 0){
                -this.buffs[i].delay;
                continue;
            }
            --this.buffs[i].turns;
            if (this.buffs[i].turns <= 0){
                this[this.buffs[i].property] = this.buffs[i].originalValue;
            }
        }
    };

    this.moveUp = function(distanceInMeters){
        this.xPos -= distanceInMeters;
        if (this.xPos < 0){
            this.xPos = 0;
        }
        this.update();
        return this.xPos;
    };

    this.moveBack = function(distanceInMeters){
        this.xPos += distanceInMeters;
        if (this.xPos > 100){
            this.xPos = 100;
        }
        this.update();
        return this.xPos;
    };

    this.attack = function(opp){
        // let timeSinceLastAttack = Date.now() - this.lastAttackTime;
        // if (timeSinceLastAttack <= this.weapon.timeToAttackInMs){
        //     let timeLeftInMs = this.weapon.timeToAttackInMs - timeSinceLastAttack;
        //     return this.userId + ' cannot attack for another ' + timeLeftInMs + ' ms';
        // }
        let dist = this.xPos + opp.xPos - 1;
        if (dist > this.weapon.maxRange){
            return opp.userId + ' is out of range!';
        }
        opp.hp -= this.weapon.baseDPS * 5 * this.dmgMultiplier;
        // this.lastAttackTime = Date.now();
        let returnString = '';
        if (opp.hp > 0){
            returnString = this.userId + ' has hit ' + opp.userId + ' for ' + this.weapon.damagePerAttack + ' damage. ' + opp.userId + ' has ' + opp.hp + ' hp left!';
        }
        else {
            challengeModule.endFight(this.userId);
            returnString = this.userId + ' HAS DEFEATED ' + opp.userId;
        }
        this.update();
        return returnString;
    };
};

let classComponents = {
    NINJA: Ninja,
    SOLDIER: 'Soldier',
    MYSTIC: 'Mystic'
};

// exports.character = character;
exports.classes = classes;

exports.characterExists = function(userId){
    return exports.AllCharacters.hasOwnProperty(userId);
}
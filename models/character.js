const weaponFactories = require('./weaponFactoryData');
const randModule = require('../helpers/selectRandom');
const { runInThisContext } = require('vm');
const challengeModule = require('../models/challenges');
const Ninja = require('./Ninja');
const Soldier = require('./Soldier');
const buff = require('./buff');
const weaponModule = require('./weapon');

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
        this.strength = Math.ceil(Math.random() * 200) / 100;
        this.stamina = Math.ceil(Math.random() * 200) / 100;
        let statSum = this.agility + this.stamina + this.strength;
        this.agility = this.agility / statSum * 3;
        this.strength = this.strength / statSum * 3;
        this.stamina = this.stamina / statSum * 3;
        this.hp = 100 + 50 * this.stamina;
        this.dodge = 5 + 22.5 * this.agility;
        this.dmgMultiplier = 1 + this.strength / 2;
        this.dmgReduction = 1;
        let classKeys = Object.keys(classComponents);
        let randomClassIndex = Math.floor(Math.random() * classKeys.length);
        this.weapon = randModule.selectRandomEnum(weaponFactories.WEAPONFACTORIES).createWeapon();
        this.buffsMap = {}; //key is buff uniqueName and value is buff
        this.myTurn = false;
        this.class = new classComponents[classKeys[randomClassIndex]](this);
    }

    damageTypeDebuffsCount(){
        let numDmgTypeDebuffs = 0;
        Object.keys(this.buffsMap).forEach(elementKey => {
            let element = this.buffsMap[elementKey];
            if (element.isDamageEffect){
                ++numDmgTypeDebuffs;
            }
        });
        return numDmgTypeDebuffs;
    }

    addBuff(buffToAdd){
        let map = buffToAdd.char.buffsMap;
        if (map.hasOwnProperty(buffToAdd.uniqueName)){
            map[buffToAdd.uniqueName].turns = buffToAdd.turns;
            return; 
        }
        map[buffToAdd.uniqueName] = buffToAdd;
    }

    removeBuffs(){
        let buffKeys = Object.keys(this.buffsMap);
        for (let i = 0; i < buffKeys.length; ++i){
            this.buffsMap[buffKeys[i]].removeBuff();
        }
        this.buffsMap = {};
    }

    updateBuffs() {
        let buffKeys = Object.keys(this.buffsMap);
        for(let i = 0; i < buffKeys.length; ++i){
            let buffKey_i = buffKeys[i];
            let buff_i = this.buffsMap[buffKey_i];
            // console.log('buffKey: ', buffKey_i, ' buff_i ', buff_i);
            if (buff_i != undefined && buff_i.updateBuff()){
                delete this.buffsMap[buffKeys[i]];
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

    applyWeaponEffect(opp){
        let weaponHasEffect = this.weapon.weaponBuffParams != null;
        if (!weaponHasEffect){
            return '';
        }

        this.weapon.weaponBuffParams.char = opp;
        let weaponDebuff = new buff(this.weapon.weaponBuffParams);
        opp.addBuff(weaponDebuff);
        return weaponModule.weaponEffectDisplayString(weaponDebuff);
    }

    attack(opp, userIdMentionString, otherUserIdMentionString){
        // let timeSinceLastAttack = Date.now() - this.lastAttackTime;
        // if (timeSinceLastAttack <= this.weapon.timeToAttackInMs){
        //     let timeLeftInMs = this.weapon.timeToAttackInMs - timeSinceLastAttack;
        //     return this.userId + ' cannot attack for another ' + timeLeftInMs + ' ms';
        // }
        let dist = this.xPos + opp.xPos - 1;
        if (dist > this.weapon.maxRange){
            return {
                success: false,
                result: otherUserIdMentionString + ' is out of range!'
            };
        }
        let attackDodged = Math.random() * 100 < opp.dodge;
        if (attackDodged){
            this.update();
            return {
                success: true,
                result: otherUserIdMentionString + " has DODGED " + userIdMentionString + "'s attack!"
            };
        }
        let dmgDone = this.weapon.baseDmg * this.dmgMultiplier / opp.dmgReduction;
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
        let weaponEffectString = this.applyWeaponEffect(opp);
        this.update();
        return {
            success: true,
            result: returnString + (weaponEffectString != '' ? ' Weapon Effect: ' + weaponEffectString : '')
        };
    }
};

let classComponents = {
    NINJA: Ninja,
    SOLDIER: Soldier
    // MYSTIC: 'Mystic'
};

// exports.character = character;
exports.classes = classComponents;

exports.characterExists = function(userId){
    return exports.AllCharacters.hasOwnProperty(userId);
}
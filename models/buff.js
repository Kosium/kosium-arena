const weaponTraitsModule = require('./weaponTraits');

module.exports = function({uniqueName, property, turns, delay = -1, buffValue, char, applyEveryTurn = false, isDamageEffect = false, dmgEffectType = 'PHYSICAL'}){
    this.uniqueName = uniqueName;
    this.property = property;
    this.turns = turns; 
    this.delay = delay;
    delay > -1 ? ++this.delay : ++this.turns; //because update is called after buff is applied at first
    // console.log('turns: ', this.turns);
    this.buffValue = buffValue;
    this.char = char;
    this.applied = false;
    this.applyEveryTurn = applyEveryTurn;
    this.isDamageEffect = isDamageEffect;
    this.dmgEffectType = dmgEffectType;

    this.updateBuff = function(){
        if (this.delay > 1){
            --this.delay;
            return false;
        }
        if (this.applyEveryTurn || !this.applied){
            this.applyBuff();
            return;
        }
        --this.turns;
        if (this.turns <= 0){
            this.removeBuff();
            return true;
        }
        return false;
    }

    this.applyBuff = function(){
        if (this.applied && !this.applyEveryTurn){
            return;
        }
        this.char[this.property] += this.buffValue;
        this.applied = true;
    }

    this.removeBuff = function(){
        if (this.applyEveryTurn){
            return;
        }
        this.char[this.property] -= this.buffValue;
    }
};
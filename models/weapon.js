const weaponTraitsModule = require('./weaponTraits');

exports.Weapon = function(name, mass, damageType, rangeMax){
    this.name = name;
    this.mass = mass;
    this.damageType = damageType;
    this.rangeMax = rangeMax;
    this.baseDmg = 10;
    // this.baseDPS = 2;

    // this.timeToAttackInMs = this.mass / 4 + 1000;
    // this.attacksPerSecond = 1 / this.timeToAttackInMs * 1000;
    // this.damagePerAttack = this.baseDPS / this.attacksPerSecond;

    this.weaponBuffParams = null;

    addDamageEffect(this);

    this.toJSON = function(){
        let displayObj = {
            name: this.name,
            baseDamage: this.baseDmg,
            maxRange: this.rangeMax,
            damageType: weaponTraitsModule.DAMAGETYPE[this.damageType]
        }
        return JSON.stringify(displayObj);
    }
};

let addFireEffect = function(weapon){
    weapon.weaponBuffParams = {
        uniqueName: 'WeaponFire',
        property: 'hp', 
        turns: 3, 
        delay: -1,
        buffValue: -1 * weapon.baseDmg / 2,
        // char, add this when creating the buff
        applyEveryTurn: true,
        isDamageEffect: true,
        dmgEffectType: 'FIRE'
    }
};

let addPhysicalEffect = function(weapon){
    weapon.baseDmg *= 1.5;
};

let addEffect = {
    PHYSICAL: addPhysicalEffect,
    FIRE: addFireEffect
};

let addDamageEffect = function(weapon){
    addEffect[weapon.damageType](weapon);
};

let fireDisplayString = function(weaponBuff){
    return weaponBuff.char.userId + ' is on FIRE and will burn for ' + weaponBuff.buffValue + ' damage for ' + weaponBuff.turns + ' turns.';
};

let effectDisplayString = {
    FIRE: fireDisplayString
};

exports.weaponEffectDisplayString = function(weaponBuff){
    if (weaponBuff.isDamageEffect){
        return effectDisplayString[weaponBuff.dmgEffectType](weaponBuff)
    }
    return '';
};
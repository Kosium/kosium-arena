const buff = require('./buff');
const CombatClass = require('./CombatClass');

let MysticData = {
    name: "Mystic",
    abilityOneCooldown: 10,
    abilityTwoCooldown: 8,
	abilityTwoCharge: 1,
    abilityThreeCooldown: 10,
    abilityOneDescription: "PHASE SHIFT: Disappear for one turn causing all attacks to miss.",
    abilityTwoDescription: "DARK MATTER BLAST \nRequires 2 charges before dealing 600% base dmg on turn 3!",
    abilityThreeDescription: "TRANSMUTE WEAPON: Changes the damage type of your weapon.",
    abilityOne: function(char){
        let dodgeBuff = new buff({
            uniqueName: 'MysticAbilityOneDodge',
            property: 'dodge',
            turns: 1,
            buffValue: 100,
            char: char
        });
        char.addBuff(dodgeBuff);
        dodgeBuff.applyBuff();
    },
    abilityTwo: function(char){
        let dmgBuff = new buff({
            uniqueName: 'MysticAbilityTwoDmgMult',
            property: 'dmgMultiplier',
            //delay: 1, //commented out bc it already takes effect the turn after
            turns: 1,
            buffValue: 5,
            char: char
        });
        char.addBuff(dmgBuff);
    },
    abilityThree: function(char){
        char.changeWeaponType();
    }
};

module.exports = function(character){
    MysticData.character = character;
    return new CombatClass(MysticData);
};
const buff = require('./buff');
const CombatClass = require('./CombatClass');

let SoldierData = {
    name: "Soldier",
    abilityOneCooldown: 10,
    abilityTwoCooldown: 8,
	abilityTwoCharge: -1, // Added for mystic ability two (-1 means there is no charge)
    abilityThreeCooldown: 10,
    abilityOneDescription: "DAMAGE UP: Increase damage by 40% for 2 turns.",
    abilityTwoDescription: "ARMOR UP: Reduce incoming damage by 50% for 2 turns",
    abilityThreeDescription: "ADAPT: Increase damage by 50% for every damage type currently applied for 3 turns. (This effect is increased for each damage type debuff.)",
    abilityOneClass: function(char){
        let dmgBuff = new buff({
            uniqueName: 'SoldierAbilityOneDamage',
            property: 'dmgMultiplier',
            turns: 2,
            buffValue: 0.4,
            char: char
        });
        char.addBuff(dmgBuff);
        // dmgBuff.applyBuff();
    },
    abilityTwoClass: function(char){
        let armorBuff = new buff({
            uniqueName: 'SoldierAbilityTwoArmor',
            property: 'dmgReduction',
            turns: 2,
            buffValue: 1,
            char: char
        });
        char.addBuff(armorBuff);
        // armorBuff.applyBuff();
    },
    abilityThreeClass: function(char){
        let numDebuffs = char.damageTypeDebuffsCount();
        let adaptBuff = new buff({
            uniqueName: 'SoldierAbilityThreeAdapt',
            property: 'dmgMultiplier',
            turns: 3,
            buffValue: 0.5 * numDebuffs,
            char: char
        });
        char.addBuff(adaptBuff);
        // adaptBuff.applyBuff();
    }
};

module.exports = function(character){
    SoldierData.character = character;
    return new CombatClass(SoldierData);
};
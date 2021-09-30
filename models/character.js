const weaponFactories = require('./weaponFactoryData');
const randModule = require('../helpers/selectRandom');

let character = function(){
    this.agility = Math.ceil(Math.random() * 200) / 100;
    this.strength = Math.ceil(Math.random() * 200) / 100;
    this.stamina = Math.ceil(Math.random() * 200) / 100;
    let classKeys = Object.keys(classes);
    this.class = classes[classKeys[Math.floor(Math.random() * classKeys.length)]];
    this.weapon = randModule.selectRandomEnum(weaponFactories.WEAPONFACTORIES).createWeapon();
};

let classes = {
    NINJA: 'Ninja',
    SOLDIER: 'Soldier',
    MYSTIC: 'Mystic'
};

exports.character = character;
exports.classes = classes;
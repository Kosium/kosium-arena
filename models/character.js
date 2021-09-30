const weaponFactories = require('./weaponFactoryData');
const randModule = require('../helpers/selectRandom');

exports.AllCharacters = {
    //key is userId val is character data
}

exports.createNewCharacter = function(userId){
    let char = new character();
    exports.AllCharacters[userId] = char;
    return char;
}

let character = function(){
    this.hp = 100;
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

// exports.character = character;
exports.classes = classes;

exports.characterExists = function(userId){
    return AllCharacters.hasOwnProperty(userId);
}
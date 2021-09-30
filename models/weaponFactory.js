const weaponTraits = require('./weaponTraits');
const weaponModule = require('./weapon');
const randModule = require('../helpers/selectRandom');

let WeaponFactory = function(name, volumeMin, volumeMax, rangeMax){//, damageType){
    this.name = name;
    this.volumeMin = volumeMin;
    this.volumeMax = volumeMax;
    this.rangeMax = rangeMax;
    // this.damageType = DAMAGETYPE;

    this.createWeapon = function(){
        let density = randModule.selectRandomEnum(weaponTraits.MATERIAL).density;
        console.log('density: ', density);
        let mass = (Math.ceil(Math.random() * (volumeMax - volumeMin)) + volumeMin) * density;
        console.log('volmin ', volumeMin, ' vol max ', volumeMax, 'mass: ', mass);

        let damageType = randModule.selectRandomEnum(weaponTraits.DAMAGETYPE);

        let personality = randModule.selectRandomFromArray(weaponTraits.personality);
        let cosmetic = randModule.selectRandomFromArray(weaponTraits.cosmeticAlteration);

        return new weaponModule.Weapon(
            personality + ' ' + cosmetic + ' ' + name,
            mass,
            damageType
        );
    }
};

module.exports = WeaponFactory;
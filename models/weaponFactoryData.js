const WeaponFactory = require('./weaponFactory');

let WEAPONFACTORIES = {
    // 'Staff',
    // 'Wand',
    ONEHANDEDSWORD: new WeaponFactory('One Handed Sword', 10000, 20000, 3),
    TWOHANDEDSWORD:  new WeaponFactory('Two Handed Sword', 20000, 30000, 5),
    // 'Longbow',
    // 'Dagger',
    // 'Crossbow',
    // 'Spear',
    // 'Pole Arm',
    // 'One Handed Axe',
    // 'Two Handed Axe',
    // 'Katana',
    // 'Short Sword',
    // 'Whip',
    // 'Throwing Knife',
    // 'Sling',
    // 'Jitte Sai',
    // 'Boomerang',
    // 'Broad Sword',
    // 'Scythe',
    // 'Scimitar',
    // 'Kunai',
    // 'Chakram',
    // 'Nunchaku',
    // 'Club',
    // 'Claws',
    // 'Brass Knuckles',
    // 'Trident',
    // 'Flail',
    // SHURIKEN: 'Shuriken'
};

console.log('weapon factories: ', WEAPONFACTORIES);

exports.WEAPONFACTORIES = WEAPONFACTORIES;
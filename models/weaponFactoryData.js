const WeaponFactory = require('./weaponFactory');

let WEAPONFACTORIES = {
    // 'Staff',
    WAND: new WeaponFactory('Wand', 1000, 2000, 24),
    ONEHANDEDSWORD: new WeaponFactory('One Handed Sword', 10000, 20000, 3),
    TWOHANDEDSWORD:  new WeaponFactory('Two Handed Sword', 20000, 30000, 5),
    // 'Longbow',
    // 'Dagger',
    CROSSBOW: new WeaponFactory('Crossbow', 1000, 5000, 20),
    // 'Spear',
    // 'Pole Arm',
    // 'One Handed Axe',
    // 'Two Handed Axe',
    KATANA: new WeaponFactory('Katana', 5000, 10000, 7),
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
    SHURIKEN: new WeaponFactory('Shuriken', 100, 500, 30)
};

// console.log('weapon factories: ', WEAPONFACTORIES);

exports.WEAPONFACTORIES = WEAPONFACTORIES;
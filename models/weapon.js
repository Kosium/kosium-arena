exports.Weapon = function(name, mass, damageType, rangeMax){
    this.name = name;
    this.mass = mass;
    this.damageType = damageType;
    this.rangeMax = rangeMax;
    this.baseDPS = 4;

    this.timeToAttackInMs = this.mass / 4 + 1000;
    this.attacksPerSecond = 1 / this.timeToAttackInMs * 1000;
    this.damagePerAttack = this.baseDPS / this.attacksPerSecond;
};
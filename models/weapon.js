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

    this.toJSON = function(){
        let displayObj = {
            name: this.name,
            baseDamage: this.baseDmg,
            maxRange: this.rangeMax
        }
        return JSON.stringify(displayObj);
    }
};
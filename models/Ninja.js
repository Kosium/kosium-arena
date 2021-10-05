const { buff } = require("./character");

let Ninja = function(character, updateFxn){
    this.name = "Ninja";
    this.update = updateFxn;
    this.char = character;
    this.abilityOne = function(){
        let dodgeBuff = new buff('dodge', this.char.dodge, 2);
        this.char.buffs.push(dodgeBuff);
        this.char.dodge += 50;
        this.update();
    }
    this.abilityOneInfo = function(){
        //
    }
    this.abilityTwo = function(){
        let dodgeBuff = new buff('dodge', this.char.dodge, 1);
        let dmgBuff = new buff('dodge', this.char.dodge, 1, 2);
        this.update();
    }
    this.abilityTwoInfo = function(){
        //
    }
    this.abilityThree = function(){
        //
        this.update();
    }
    this.abilityThreeInfo = function(){
        //
    }
}

module.exports = Ninja;
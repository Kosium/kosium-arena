const buff = require('./buff');

let Ninja = function(character){
    this.name = "Ninja";
    this.update = character.update.bind(character);
    this.char = character;
    this.abilityOneCooldown = 10;
    this.abilityOneCooldownLeft = 0;

    this.toJSON = function(){
        return "Ninja";
    }

    this.updateComponentState = function(){
        if (this.abilityOneCooldownLeft > 0){
            --this.abilityOneCooldownLeft;
        }
    };

    this.abilityOne = function(){
        if (this.abilityOneCooldownLeft > 0){
            return "Ability still cooling down for another: ", this.abilityOneCooldownLeft, " turns.";
        }
        let dodgeBuff = new buff({
            property: 'dodge',
            turns: 2,
            buffValue: 50,
            char: this.char
        });
        this.char.buffs.push(dodgeBuff);
        dodgeBuff.applyBuff();
        this.update();
        return "EVADE, they have a +50% dodge chance for two turns.";
    };
    this.abilityOneInfo = function(){
        return "EVADE: "
    };

    this.abilityTwo = function(){
        // let dodgeBuff = new buff('dodge', this.char.dodge, 1);
        // let dmgBuff = new buff('dodge', this.char.dodge, 1, 2);
        this.update();
    };
    this.abilityTwoInfo = function(){
        return "ability two";
    };

    this.abilityThree = function(){
        //
        this.update();
    };
    this.abilityThreeInfo = function(){
        return "ability three";
    };
}

module.exports = Ninja;
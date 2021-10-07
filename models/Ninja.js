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

    this.abilityOne = function(otherUserId, otherUserIdMentionString){
        if (this.abilityOneCooldownLeft > 0){
            return "Ability still cooling down for another: ", this.abilityOneCooldownLeft, " turns.";
        }
        this.abilityOneCooldownLeft = this.abilityOneCooldown;
        let dodgeBuff = new buff({
            property: 'dodge',
            turns: 2,
            buffValue: 50,
            char: this.char
        });
        this.update();
        this.char.buffs.push(dodgeBuff);
        dodgeBuff.applyBuff();
        return "EVADE: +50% dodge chance for two turns.";
    };
    this.abilityOneInfo = function(){
        return "EVADE: +50% dodge chance for two turns."
    };

    this.abilityTwo = function(otherUserId, otherUserIdMentionString){
        let dodgeBuff = new buff({
            property: 'dodge',
            turns: 1,
            buffValue: 100,
            char: this.char
        });
        let dmgBuff = new buff({
            property: 'dmgMultiplier',
            delay: 1,
            turns: 1,
            buffValue: 2,
            char: this.char
        });
        this.update();
        this.char.buffs.push(dodgeBuff);
        this.char.buffs.push(dmgBuff);
        dodgeBuff.applyBuff();
        return "SHADOW BACKSTAB: Disappear for 1 turn causing the enemy attack to miss. Reappear behind the enemy and backstab them dealing 300% damage!"
    };
    this.abilityTwoInfo = function(){
        return "SHADOW BACKSTAB: Disappear for 1 turn causing the enemy attack to miss. Reappear behind the enemy and backstab them dealing 300% damage!";
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

module.exports = function({
    name,
    character,
    abilityOneCooldown,
    abilityTwoCooldown,
    abilityThreeCooldown,
    abilityOneDescription,
    abilityTwoDescription,
    abilityThreeDescription,
    abilityOneClass,
    abilityTwoClass,
    abilityThreeClass
}){
    this.name = name;
    this.update = character.update.bind(character);
    this.char = character;
    this.abilityOneCooldown = abilityOneCooldown;
    this.abilityOneCooldownLeft = 0;
    this.abilityTwoCooldown = abilityTwoCooldown;
    this.abilityTwoCooldownLeft = 0;
    this.abilityThreeCooldown = abilityThreeCooldown;
    this.abilityThreeCooldownLeft = 0;
    this.abilityOneDescription = abilityOneDescription;
    this.abilityTwoDescription = abilityTwoDescription;
    this.abilityOneDescription = abilityThreeDescription;
    this.abilityOneClass = abilityOneClass;
    this.abilityTwoClass = abilityTwoClass;
    this.abilityThreeClass = abilityThreeClass;


    this.toJSON = function(){
        return this.name;
    }

    this.updateComponentState = function(){
        if (this.abilityOneCooldownLeft > 0){
            --this.abilityOneCooldownLeft;
        }
        if (this.abilityTwoCooldownLeft > 0){
            --this.abilityTwoCooldownLeft;
        }
        if (this.abilityThreeCooldownLeft > 0){
            --this.abilityThreeCooldownLeft;
        }
    };

    this.abilityOne = function(otherUserId, otherUserIdMentionString){
        if (this.abilityOneCooldownLeft > 0){
            return {
                success: false, 
                result: "Ability One still cooling down for another: " + this.abilityOneCooldownLeft + " turns."
            };
        }
        this.abilityOneCooldownLeft = this.abilityOneCooldown;
        this.abilityOneClass(this.char);
        this.update();
        return {
            success: true, 
            result: abilityOneDescription
        };
    };
    this.abilityOneInfo = function(){
        return abilityOneDescription
    };

    this.abilityTwo = function(otherUserId, otherUserIdMentionString){
        if (this.abilityTwoCooldownLeft > 0){
            return {
                success: false,
                result: "Ability Two still cooling down for another: " + this.abilityTwoCooldownLeft + " turns."
            };
        }
        this.abilityTwoCooldownLeft = this.abilityTwoCooldown;
        this.abilityTwoClass(this.char);
        this.update();
        return {
            success: true,
            result: abilityTwoDescription
        };
    };
    this.abilityTwoInfo = function(){
        return abilityTwoDescription;
    };

    this.abilityThree = function(){
        if (this.abilityThreeCooldownLeft > 0){
            return {
                success: false,
                result: "Ability Three still cooling down for another: " + this.abilityThreeCooldownLeft + " turns."
            };
        }
        this.abilityThreeCooldownLeft = this.abilityThreeCooldown;
        this.abilityThreeClass(this.char);
        this.update();
        return {
            success: true,
            result: abilityThreeDescription
        };
    };
    this.abilityThreeInfo = function(){
        return abilityThreeDescription;
    };
}
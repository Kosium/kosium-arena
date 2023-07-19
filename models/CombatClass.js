
module.exports = function({
    name,
    character,
    abilityOneCooldown,
    abilityTwoCooldown,
	abilityTwoCharge, // Added for mystic ability two
    abilityThreeCooldown,
    abilityOneDescription,
    abilityTwoDescription,
    abilityThreeDescription,
    abilityOne, //changed from abilityOneClass
    abilityTwo, //changed from abilityTwoClass
    abilityThree //changed from abilityThreeClass
}){
    this.name = name;
    this.update = character.update.bind(character);
    this.char = character;
    this.abilityOneCooldown = abilityOneCooldown;
    this.abilityOneCooldownLeft = 0;
    this.abilityTwoCooldown = abilityTwoCooldown;
    this.abilityTwoCooldownLeft = 0;
	this.abilityTwoCharge = abilityTwoCharge // Added for mystic ability two
    this.abilityThreeCooldown = abilityThreeCooldown;
    this.abilityThreeCooldownLeft = 0;
    this.abilityOneDescription = abilityOneDescription;
    this.abilityTwoDescription = abilityTwoDescription;
    this.abilityOneDescription = abilityThreeDescription;
    this.abilityOneClass = abilityOne; //changed from abilityOneClass
    this.abilityTwoClass = abilityTwo; //changed from abilityTwoClass
    this.abilityThreeClass = abilityThree; //changed from abilityThreeClass


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
		if (this.abilityTwoCharge <= 0){ // Added for mystic ability two
			this.abilityTwoCooldownLeft = this.abilityTwoCooldown;
			this.abilityTwoClass(this.char);
			this.update();
			if (this.abilityTwoCharge == 0){
				this.abilityTwoCharge = abilityTwoCharge; // reset charge time
				return {
					success: true,
					result: abilityTwoDescription + "\n FULLY CHARGED! \n[Use \"\/Attack\" to unleash this ability!]"
				};
			}
			return {
				success: true,
				result: abilityTwoDescription
			};
		}
		/*****************************
		* Added for mystic ability two
		******************************/
		--this.abilityTwoCharge;
		return {
			success: true,
			result: abilityTwoDescription + "\n[Use \"\/AbilityTwo\" to charge]" + " \n(Charges Needed: " + (1 + this.abilityTwoCharge) + ")"
		}
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
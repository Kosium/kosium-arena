module.exports = function({property, turns, delay = -1, buffValue, char}){
    this.property = property;
    this.turns = turns;
    this.delay = delay;
    this.buffValue = buffValue;
    this.char = char;
    this.applied = false;

    this.updateBuff = function(){
        console.log('updating turns left: ', this.turns);
        console.log('updating delay left: ', this.delay);
        if (this.delay > 1){
            --this.delay;
            return false;
        }
        if (!this.applied){
            this.applyBuff();
            return;
        }
        --this.turns;
        if (this.turns <= 0){
            this.removeBuff();
            return true;
        }
        return false;
    }

    this.applyBuff = function(){
        if (this.applied){
            return;
        }
        console.log('applying buff ' + this.buffValue + ' to ', this.property);
        console.log(this.char[this.property]);
        this.char[this.property] += this.buffValue;
        console.log(this.char[this.property]);
        this.applied = true;
    }

    this.removeBuff = function(){
        this.char[this.property] -= this.buffValue;
    }
};
module.exports = function({property, turns, delay = -1, buffValue, char}){
    this.property = property;
    this.turns = turns;
    this.delay = delay;
    this.buffValue = buffValue;
    this.char = char;
    this.applied = false;

    this.updateBuff = function(){
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
        this.char[this.property] += this.buffValue;
        this.applied = true;
    }

    this.removeBuff = function(){
        this.char[this.property] -= this.buffValue;
    }
};
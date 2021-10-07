module.exports = function({property, turns, delay = -1, buffValue, char}){
    this.property = property;
    this.turns = turns;
    this.delay = delay;
    this.buffValue = buffValue;
    this.char = char;

    this.updateBuff = function(){
        if (this.delay >= 0){
            --this.delay;
            return false;
        }
        --this.turns;
        if (this.turns <= 0){
            this.removeBuff();
            return true;
        }
        return false;
    }

    this.applyBuff = function(){
        this.char[this.property] += this.buffValue;
    }

    this.removeBuff = function(){
        this.char[this.property] -= this.buffValue;
    }
};
function VEffectArray(array) {
	this.effecten = array;
	this.startValue = 0;
	this.finished = false;
}

VEffectArray.prototype.Update = function() {
	this.effecten[this.startValue].Update();
	if(this.effecten[this.startValue].getFinished()) {
		if(this.startValue < (Object.keys(this.effecten).length-1) ) {
			this.startValue++;
			this.effecten[this.startValue].Init();
		} else {
			this.finished = true;
		}
	}
};

VEffectArray.prototype.getFinished = function() {
	return this.finished;
};
VEffectArray.prototype.Init = function() {
	for(var i=0; i< this.effecten.length; i++) {
		this.effecten[i].Init();
	}
};
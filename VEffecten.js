function VEffecten() {
	this.effecten = new Array();
	this.startValue = 0;
	this.finished = false;
	for(var i=0; i < arguments.length; i++) {
		this.effecten.push(arguments[i]);
	}
}

VEffecten.prototype.Update = function() {
	this.effecten[this.startValue].Update();
	if(this.effecten[this.startValue].getFinished()) {
		if(this.startValue < (this.effecten.length-1) ) {
			this.startValue++;
			this.effecten[this.startValue].Init();
		} else {
			this.finished = true;
		}
	}
};

VEffecten.prototype.getFinished = function() {
	return this.finished;
};
VEffecten.prototype.Init = function() {
	for(var i=0; i< this.effecten.length; i++) {
		this.effecten[i].Init();
	}
};
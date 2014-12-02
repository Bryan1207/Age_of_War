function VEffect(object, property, targetValue, effectTime, timerStart) {
	this.object = object;
	this.endTimer = effectTime;
	this.timer = 0;
	this.propertyToChange = property;
	this.startValue = this.object[this.propertyToChange];
	this.targetValue = targetValue;
	this.timerStart = timerStart;
	this.huidigeTijd = 0;
	this.startTime = Date.now();
	this.finished = false;
}

VEffect.prototype.Update = function() {
	var d = Date.now();
	var deltaTime = (( d - this.startTime ) / 1000);
	this.startTime = Date.now();
	this.huidigeTijd += deltaTime;

	if(this.huidigeTijd > this.timerStart) {
		this.timer += deltaTime;
		if(this.timer < this.endTimer) {
			var totaleAfstand = (this.targetValue - this.startValue);
			var p = (this.timer / this.endTimer);
			var afstandAfgelegd = (totaleAfstand * p);
			
			this.object[this.propertyToChange] = (this.startValue + afstandAfgelegd);
		} else {
			this.finished = true;
			this.object[this.propertyToChange] = this.targetValue;
		}
	}
};

VEffect.prototype.Init = function() {
	this.startTime = Date.now();
	this.startValue = this.object[this.propertyToChange];
	this.timer = 0;
	this.huidigeTijd = 0;
	this.finished = false;
};

VEffect.prototype.getFinished = function() {
	return this.finished;
};
VEffect.prototype.getStartValue = function() {
	return this.startValue;
};
VEffect.prototype.setStartValue = function(value) {
	this.startValue = value;
};
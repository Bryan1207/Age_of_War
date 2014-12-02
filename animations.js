function Animations(name) {
	this.name = name;
	var seq = animationManager.getAnimation(this.name).sequence;
	this.seqArray = seq.split(",");
	this.sequence = new Array();
	for(var i=0; i<this.seqArray.length; i++) { 
		this.sequence[i] = parseInt(this.seqArray[i]);
	}
	this.frame = 0;
	this.lastUpdateTime = Date.now();
	this.delta = 0;
	this.frameIndex = 0;
	this.acDelta = 0;
	this.finished = false;
	this.xOffset = 0;
	this.yOffset = 0;
	this.type = animationManager.getAnimation(this.name).type;
}

Animations.prototype.Update = function() 
{
	this.delta = (Date.now() - this.lastUpdateTime);
	this.acDelta += this.delta;
	
	switch(this.type) {
		case 0: //Loop
			var time = this.acDelta % (this.sequence.length * this.getMsPerFrame());
			this.frameIndex = Math.floor(time / this.getMsPerFrame());
			this.finished = false;
			break;
		case 1: //PingPong
			var time = this.getPingPong(this.acDelta, (this.sequence.length * this.getMsPerFrame()));
			this.frameIndex = Math.floor(time / this.getMsPerFrame());
			break;
		case 2: //HoldLast
			this.acDelta %= (this.sequence.length * this.getMsPerFrame());
			if(this.frameIndex < (this.sequence.length-1) && !this.finished) {
				//this.frameIndex = Math.floor(this.acDelta / this.getMsPerFrame());
				this.frameIndex = Math.round(this.acDelta / this.getMsPerFrame());
			} else {
				this.finished = true;
				this.frameIndex = (this.sequence.length-1);
			}
			break;
		case 3: //HoldFirst
			this.acDelta %= (this.sequence.length * this.getMsPerFrame());
			if(this.frameIndex < (this.sequence.length-1) && !this.finished) {
				//this.frameIndex = Math.floor(this.acDelta / this.getMsPerFrame());
				this.frameIndex = Math.round(this.acDelta / this.getMsPerFrame());
			} else {
				this.frameIndex = 0;
				this.finished = true;
			}
			break;
		case 4: //Once
			this.acDelta %= (this.sequence.length * this.getMsPerFrame());
			if(this.frameIndex < (this.sequence.length-1) && !this.finished) {
				//this.frameIndex = Math.floor(this.acDelta / this.getMsPerFrame());
				this.frameIndex = Math.round(this.acDelta / this.getMsPerFrame());
			} else {
				this.finished = true;
				this.frameIndex = -1;
			}
			break;
	}

	this.frame = this.sequence[this.frameIndex];
	
	var numColumns = Math.floor(this.getSpriteWidth() / this.getWidth());
	
	var row = Math.floor(this.frame / numColumns);
	var column = (this.frame % numColumns);
	
	this.xOffset = (column * this.getWidth());
	this.yOffset = (row * this.getHeight());
	
	this.lastUpdateTime = Date.now();
};

Animations.prototype.getImage = function() {
	return animationManager.getImage(this.name);
};
Animations.prototype.getXOffset = function() {
	return this.xOffset;
};
Animations.prototype.getYOffset = function() {
	return this.yOffset;
};
Animations.prototype.getImageWidth = function() {
	//return (this.getWidth() * (current_res/2));
	return this.getWidth();
};
Animations.prototype.getImageHeight = function() {
	//return (this.getHeight() * (current_res/2));
	return this.getHeight();
};
Animations.prototype.getWidth = function() {
	return (animationManager.getAnimation(this.name).width / current_res);
};
Animations.prototype.getHeight = function() {
	return (animationManager.getAnimation(this.name).height / current_res);
};
Animations.prototype.getType = function() {
	return this.type;
	//return animationManager.getAnimation(this.name).type;
};
Animations.prototype.getFPS = function() {
	return animationManager.getAnimation(this.name).fps;
};
Animations.prototype.getSpriteHeight = function() {
	return animationManager.getImage(this.name).height;
};
Animations.prototype.getSpriteWidth = function() {
	return animationManager.getImage(this.name).width;
};
Animations.prototype.getSpritesheet = function() {
	return animationManager.getAnimation(this.name).spritesheet;
};
Animations.prototype.getImageXOffset = function() {
	return (animationManager.getAnimation(this.name).xOffset / current_res) * (current_res/2);
};
Animations.prototype.getImageYOffset = function() {
	return (animationManager.getAnimation(this.name).yOffset / current_res) * (current_res/2);
};
Animations.prototype.getSequence = function() {
	return this.sequence;
};
Animations.prototype.getFrameLength = function() {
	return (this.sequence.length-1);
};
Animations.prototype.getMsPerFrame = function() {
	return ((1.0 / animationManager.getAnimation(this.name).fps) * 1000);
};
Animations.prototype.getFinished = function() {
	return this.finished;
};
Animations.prototype.setFinished = function(value) {
	this.finished = value;
};
Animations.prototype.getPingPong = function(tijd, length) {
	var t = (tijd % (length * 2.0) );
	return (length - Math.abs(t - length));
};
Animations.prototype.ResetAnimation = function() {
	this.finished = false;
	this.acDelta = 0;
	this.frameIndex = 0;
	this.lastUpdateTime = Date.now();
};
Animations.prototype.ResetLastUpdateTime = function() {
	this.lastUpdateTime = Date.now();
};
Animations.prototype.getAnimationTimer = function() {
	return ((((this.sequence.length-1) * this.msPerFrame) * 2) / 1000);
};
Animations.prototype.setToLastFrame = function() {
	this.frameIndex = (this.sequence.length-1);
};
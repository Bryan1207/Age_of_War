function Particle(image, animationName, speed, pos, target, rotation) {
	if(image !== null) {
		this.image = image || imageManager.getImageReference("turretRock0_1");
		this.animation = null;
	} else if(animationName !== null) {
		this.image = null;
		this.animation = {};
		this.animationName = animationName || "special_attack_0";
		if(animationManager.checkNameExists(this.animationName)) {
			this.animation[this.animationName] = new Animations(this.animationName);
		}
	} else {
		this.animation = null;
		this.image = null;
	}
	
	this.pos = pos || {x:0, y:0};
	this.speed = speed || 1;
	this.startPos = this.pos;
	this.direction = target || {x:0, y:0};
	this.degrees = rotation || null;
	this.isFinished = false;
}
Particle.prototype.Update = function() {
	var deltaX = (this.direction.x - this.startPos.x);
	var deltaY = (this.direction.y - this.startPos.y);

	var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	deltaX /= distance;
	deltaY /= distance;

	this.pos.x += this.speed * deltaX;
	this.pos.y += this.speed * deltaY;
	if(this.pos.x >= (this.direction.x - this.speed) && this.pos.y >= (this.direction.y - this.speed)) {
		this.isFinished = true;
	}
	if(this.animation !== null) {
		if(typeof(this.animation[this.animationName]) !== "undefined") {
			this.animation[this.animationName].Update();
		}
	}
};
Particle.prototype.Draw = function() {
	if(this.image !== null) {
		drawImage(imageManager.getImage("spritesheet"),
				this.image.sourceX, this.image.sourceY,
				this.image.sourceWidth, this.image.sourceHeight,
				this.pos.x, this.pos.y, 
				this.image.width, this.image.height, 35, false, this.degrees);
	} else if(this.animation !== null) {
		drawImage(this.animation[this.animationName].getImage(), 
				this.animation[this.animationName].getXOffset(), this.animation[this.animationName].getYOffset(), 
				this.animation[this.animationName].getWidth(), this.animation[this.animationName].getHeight(),
				(this.pos.x + this.animation[this.animationName].getImageXOffset()), 
				((this.pos.y - this.animation[this.animationName].getHeight()) + this.animation[this.animationName].getImageYOffset()), 
				this.animation[this.animationName].getImageWidth(), this.animation[this.animationName].getImageHeight(), 35, false, this.degrees);
	}
};
Particle.prototype.IsFinished = function() {
	return this.isFinished;
};
Particle.prototype.GetPosition = function() {
	return {x: this.pos.x, y: this.pos.y };
};
Particle.prototype.GetWidth = function() {
	if(this.image !== null) {
		return this.image.width;
	} else if(this.animation !== null) {
		return this.animation[this.animationName].getWidth();
	}
};
Particle.prototype.GetHeight = function() {
	if(this.image !== null) {
		return this.image.height;
	} else if(this.animation !== null) {
		return this.animation[this.animationName].getHeight();
	}
};
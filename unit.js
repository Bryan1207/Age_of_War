function Unit(unitnr, player, faceDirection) {
	this.player = player;
	this.level = this.player.GetLevel();
	this.unit = UNITS[this.level][unitnr];
	this.canShoot = UNITS[this.level][unitnr].canShoot || false;
	this.unitnr = (unitnr+1);
	this.damage = this.unit.damage || 0;
	this.hp = this.unit.hp || 0;
	this.full_hp = this.hp;
	this.speed = faceDirection ? (this.unit.speed || 0) : (-this.unit.speed || 0);
	this.default_speed = faceDirection ? (this.unit.speed || 0) : (-this.unit.speed || 0);
	this.spawn = {x: this.player.GetBase().GetSpawnPos().x, y: this.player.GetBase().GetSpawnPos().y };
	this.position = this.spawn;
	this.faceDirections = ["left" , "right"];
	this.facing = faceDirection ? this.faceDirections[1] : this.faceDirections[0];
	this.actions = ["idle", "walk", "fight", "die", "shoot"];
	this.actie = this.actions[1];
	this.animation = {};
	for(var i=0; i<this.actions.length; i++) {
		if(animationManager.checkNameExists("ev"+this.level+"_unit"+this.unitnr+"_"+this.actions[i]+"_"+this.facing)) {
			this.animation["ev"+this.level+"_unit"+this.unitnr+"_"+this.actions[i]+"_"+this.facing] = new Animations("ev"+this.level+"_unit"+this.unitnr+"_"+this.actions[i]+"_"+this.facing);
		}
	}
	this.hpBarPos = this.animation[this.GetAnimationName()].getHeight();
	this.coinImg = imageManager.getImageReference("coin");
	this.unitHeight = this.animation["ev"+this.level+"_unit"+this.unitnr+"_"+this.actie+"_"+this.facing].getHeight();
}

Unit.prototype.Update = function() {
	this.position.x += this.speed;

	if(typeof(this.animation[this.GetAnimationName()]) !== "undefined") {
		this.animation[this.GetAnimationName()].Update();
	}
};

Unit.prototype.Draw = function() {
	drawImage(this.animation[this.GetAnimationName()].getImage(), 
				this.animation[this.GetAnimationName()].getXOffset(), this.animation[this.GetAnimationName()].getYOffset(), 
				this.animation[this.GetAnimationName()].getWidth(), this.animation[this.GetAnimationName()].getHeight(),
				(this.position.x + this.animation[this.GetAnimationName()].getImageXOffset()), 
				((this.position.y - this.animation[this.GetAnimationName()].getHeight()) + this.animation[this.GetAnimationName()].getImageYOffset()), 
				this.animation[this.GetAnimationName()].getImageWidth(), this.animation[this.GetAnimationName()].getImageHeight(), 30, false, null);

	if(this.hp > 0) {
		if(MoveOnItem(this.position.x - viewport.GetPosition().x, (this.position.y - this.animation[this.GetAnimationName()].getHeight()) - viewport.GetPosition().y, 
					this.GetWidth(), this.GetHeight())) {
			ctx.fillStyle = "#808080";
			ctx.fillRect((this.position.x + ((this.animation[this.GetAnimationName()].getWidth()/2) - 17.5)) - viewport.GetPosition().x, 
							(this.position.y - (this.hpBarPos + 15)) - viewport.GetPosition().y, 35, 7);
			ctx.fillStyle = "#FF0000";
			ctx.fillRect((this.position.x + ((this.animation[this.GetAnimationName()].getWidth()/2) - 17.5)) - viewport.GetPosition().x, 
							(this.position.y - (this.hpBarPos + 15)) - viewport.GetPosition().y, (this.hp / this.full_hp) * 35, 7);
		}
	} else if(this.player.GetName() === "enemy") {
		ctx.fillStyle = "#FFFF00";
		ctx.font = "22px Calibri";
		ctx.fillText("+ " + UNITS[this.level][this.unitnr-1].gold_back, (this.position.x + (this.GetHalfWidth()/2)) - viewport.GetPosition().x, (this.position.y - this.unitHeight) - viewport.GetPosition().y);
		drawImage(imageManager.getImage("spritesheet"), 
					this.coinImg.sourceX, this.coinImg.sourceY, 
					this.coinImg.sourceWidth, this.coinImg.sourceHeight,
					((this.position.x + (this.GetHalfWidth()/2)) - (this.coinImg.width+5)) - viewport.GetPosition().x, ((this.position.y - this.coinImg.height) - this.unitHeight) - viewport.GetPosition().y,
					this.coinImg.width, this.coinImg.height, 50, true, null);
	}
};
Unit.prototype.GetAnimationName = function() {
	return ("ev"+this.level+"_unit"+this.unitnr+"_"+this.actie+"_"+this.facing);
};
Unit.prototype.GetAnimation = function() {
	return this.animation[this.GetAnimationName()];
};
Unit.prototype.GetPosition = function() {
	return { x: this.position.x, y: this.position.y };
};
Unit.prototype.SetPositionX = function(value) {
	this.position.x = value;
};
Unit.prototype.SetPositionY = function(value) {
	this.position.y = value;
};
Unit.prototype.SetPosition = function(value) {
	this.position.x = value.x;
	this.position.y = value.y;
};
Unit.prototype.GetWidth = function() {
	return this.animation[this.GetAnimationName()].getWidth();
};
Unit.prototype.GetHalfWidth = function() {
	return (this.animation[this.GetAnimationName()].getWidth()/2);
};
Unit.prototype.GetHeight = function() {
	return this.animation[this.GetAnimationName()].getHeight();
};
Unit.prototype.GetHalfHeight = function() {
	return (this.animation[this.GetAnimationName()].getHeight()/2);
};
Unit.prototype.GetSpeed = function() {
	return this.speed;
};
Unit.prototype.SetSpeed = function(value) {
	if(this.speed !== value) {
		this.speed = value;
	}
};
Unit.prototype.GetDefaultSpeed = function() {
	return this.default_speed;
};
Unit.prototype.GetHP = function() {
	return this.hp;
};
Unit.prototype.RemoveHP = function(value) {
	if(this.hp > value) {
		this.hp -= value;
	} else {
		this.hp = 0;
	}
};
Unit.prototype.GetDamage = function() {
	return this.damage;
};
Unit.prototype.PlayAnimation = function(value) {
	for(var i in this.actions) {
		if(this.actions[i] == value) {
			if(this.actions[i] != this.actie) {
				this.actie = this.actions[i];
				this.animation[this.GetAnimationName()].ResetAnimation();
			}
		}
	}
};
Unit.prototype.GetPlayingAnimation = function(value) {
	for(var i in this.actions) {
		if(this.actions[i] == value) {
			return true;
		}
	}
	return false;
};
Unit.prototype.GetLevel = function() {
	return this.level;
};
Unit.prototype.GetCanShoot = function() {
	return this.canShoot;
};
Unit.prototype.GetUnitNr = function() {
	return (this.unitnr-1);
}; 
Unit.prototype.GetPlayer = function() {
	return this.player;
};
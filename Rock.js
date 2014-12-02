function Rock(level, turretnr, targetPos, unit, gamescreen) {
	this.level = level;
	this.turretnr = turretnr;
	this.turretPos = {x: targetPos.x, y: targetPos.y};
	this.unit = unit;
	this.gamescreen = gamescreen;
	this.pos = {x: this.turretPos.x, y: this.turretPos.y};
	this.image = imageManager.getImageReference("turretRock"+level+"_"+turretnr);
	this.degrees = 0;
	this.speed = TURRET_DATA[this.level][this.turretnr-1].speed || 5;
	this.isHit = false;
	
};
Rock.prototype.Update = function() {
	this.degrees += 10;
	var unitPosX = (this.unit.GetPosition().x + (this.unit.GetWidth()/2));
	var unitPosY = (this.unit.GetPosition().y - (this.unit.GetHeight()/2));

	var deltaX = (unitPosX - this.turretPos.x);
	var deltaY = (unitPosY - this.turretPos.y);

	var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	deltaX /= distance;
	deltaY /= distance;

	this.pos.x += this.speed * deltaX;
	this.pos.y += this.speed * deltaY;
	
	if(this.gamescreen.GetEnemiesOnField().length > 0) {
		for(var i=0; i<this.gamescreen.GetEnemiesOnField().length; i++) {
			if((this.pos.x + this.image.width) > this.gamescreen.GetEnemiesOnField()[i].GetPosition().x && this.gamescreen.GetEnemiesOnField()[i].GetHP() > 0) {
				this.gamescreen.GetEnemiesOnField()[i].RemoveHP(TURRET_DATA[this.level][this.turretnr-1].damage);
				this.isHit = true;
			}
		}
	}
	/*if((this.pos.x + this.image.width) > unitPosX && this.unit.GetHP() > 0) {
		this.unit.RemoveHP(TURRET_DATA[this.level][this.turretnr-1].damage);
		this.isHit = true;
	}*/
	if(this.pos.y >= (GAME_HEIGHT - 50)) {
		this.isHit = true;
	}
};
Rock.prototype.Draw = function() {
	drawImage(imageManager.getImage("spritesheet"),
				this.image.sourceX, this.image.sourceY,
				this.image.sourceWidth, this.image.sourceHeight,
				this.pos.x, this.pos.y, 
				this.image.width, this.image.height, 35, false, null);
};
Rock.prototype.IsHit = function() {
	return this.isHit;
};
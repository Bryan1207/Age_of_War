function Base(gamescreen, imageName, tower){
	this.gamescreen = gamescreen;
	this.towerlevel = tower || 1;
	this.position = { x: 0, y: 0 };
	this.spawnPos = { x: 0, y: 0 };
	this.base_image = imageManager.getImageReference(imageName);
	this.base_hp = LEVEL_DATA[levelManager.GetLevel()].BASE_HP;
	this.base_full_hp = this.base_hp;
	this.base_turret = [ {x: 68, y:GAME_HEIGHT - 240, w: 62, h: 62, available: true, turret: null, turretnr: 0, layer: 26 },
						 {x: 68, y:GAME_HEIGHT - 320, w: 62, h: 62, available: false, turret: null, turretnr: 0, layer: 27 }, /* x: 75, -275*/
						 {x: 68, y:GAME_HEIGHT - 400, w: 62, h: 62, available: false, turret: null, turretnr: 0, layer: 28 },
						 {x: 68, y:GAME_HEIGHT - 480, w: 62, h: 62, available: false, turret: null, turretnr: 0, layer: 29 }];
	this.turretsMaxed = false;
	this.turretPlaceholder = imageManager.getImageReference("turretPlaceholder");
	this.turretTowerImg = {};
	for(var i=1; i<this.base_turret.length; i++) {
		this.turretTowerImg[i] = imageManager.getImageReference("turretPlace_" + levelManager.GetLevel() + "_"+i);
	}
	this.showTurretLocation = false;
};

Base.prototype.Update = function() {
	for(var i=0; i<this.base_turret.length; i++) {
		if(this.base_turret[i].turret !== null) {
			if(this.gamescreen.GetEnemiesOnField().length > 0) {
				if((this.spawnPos.x + (TURRET_DATA[levelManager.GetLevel()][this.base_turret[i].turretnr].range || 400)) >= this.gamescreen.GetEnemiesOnField()[0].GetPosition().x) {
					var distanceX = LineDistanceX(this.base_turret[i].x, this.gamescreen.GetEnemiesOnField()[0].GetPosition().x);
					var distanceY = (this.gamescreen.GetEnemiesOnField()[0].GetPosition().y - (this.gamescreen.GetEnemiesOnField()[0].GetWidth()/2)) - this.base_turret[i].y;
					
					var rad2deg = 180/Math.PI;
					var degrees = (Math.atan(distanceY / distanceX) * rad2deg);
					if(TURRET_DATA[levelManager.GetLevel()][this.base_turret[i].turretnr].rotate) {
						this.base_turret[i].turret.SetDegrees(degrees);
					}
					this.base_turret[i].turret.Shoot(this.gamescreen.GetEnemiesOnField()[0]);
				} else {
					this.base_turret[i].turret.Shoot(null);
				}
			} else {
				this.base_turret[i].turret.Shoot(null);
			}
			this.base_turret[i].turret.Update();
		}
	}
};

Base.prototype.Draw = function() {
	drawImage(imageManager.getImage("bases"),
					this.base_image.sourceX, this.base_image.sourceY, 
					this.base_image.sourceWidth, this.base_image.sourceHeight, 
					this.position.x, this.position.y, this.base_image.width, this.base_image.height, 25, false, null);
	for(var i=0; i< this.base_turret.length; i++) {
		if(this.base_turret[i].turret != null) {
			this.base_turret[i].turret.Draw();
		}
		if(this.base_turret[i].available !== false && i !== 0) {
			drawImage(imageManager.getImage("spritesheet"), this.turretTowerImg[i].sourceX, this.turretTowerImg[i].sourceY,
							this.turretTowerImg[i].sourceWidth, this.turretTowerImg[i].sourceHeight,
							(this.base_turret[i].x - (this.turretTowerImg[i].width/2)) + (this.base_turret[i].w/2) , (this.base_turret[i].y - (this.turretTowerImg[i].height/2)) + (this.base_turret[i].h/2), 
							this.turretTowerImg[i].width, this.turretTowerImg[i].height, this.base_turret[i].layer, false, null);
		}
	}
	if(this.showTurretLocation === true) {
		for(var i=0; i<this.base_turret.length; i++) {
			if(this.GetTurretsAvailable(i)) {
				drawImage(imageManager.getImage("spritesheet"), this.turretPlaceholder.sourceX, this.turretPlaceholder.sourceY,
							this.turretPlaceholder.sourceWidth, this.turretPlaceholder.sourceHeight,
							this.base_turret[i].x, this.base_turret[i].y + (this.base_turret[i].h/4), 
							this.base_turret[i].w, this.base_turret[i].h, 30, false, null);
			}
		}
	}
};

Base.prototype.GetTurrets = function() {
	return this.base_turret;
};
Base.prototype.SetTurret = function(i, turretnr) {
	this.showTurretLocation = false;
	this.base_turret[i].turret = new Turret(this.gamescreen, turretnr);
	this.base_turret[i].turretnr = turretnr;
	this.base_turret[i].turret.SetPosition({x: this.base_turret[i].x, 
				y: this.base_turret[i].y + (this.base_turret[i].turret.GetHeight() + 30)});
	//this.gamescreen.GetPlayer().RemoveGold();
};
Base.prototype.GetTurretsAvailable = function(i) {
	if(this.base_turret[i].available === true && 
		this.base_turret[i].turret === null) {
		return true;
	}
	return false;
};

Base.prototype.AddTower = function(i) {
	this.base_turret[i].available = true;
	//this.base_image = imageManager.getImageReference(imageName);
	//this.turretTowerImg[i] = imageManager.getImageReference("turretPlace_" + levelManager.GetLevel() + "_1");
	var _m = true;
	for(var i=0; i<this.base_turret.length; i++) {
		if(this.base_turret[i].available === false) {
			_m = false;
			this.towerlevel = i;
			break;
		}
	}
	if(_m) { this.turretsMaxed = true; }
};
Base.prototype.SellTurret = function(i) {
	this.base_turret[i].turret = null;
	this.base_turret[i].turretnr = 0;
};
Base.prototype.GetTurretsMaxed = function() {
	return this.turretsMaxed;
};

Base.prototype.SetShowTurretLocation = function(b) {
	this.showTurretLocation = b;
};
Base.prototype.GetPosition = function() {
	return this.position;
};
Base.prototype.SetPosition = function(pos) {
	this.position = pos;
};
Base.prototype.GetSpawnPos = function() {
	return { x: this.spawnPos.x, y: this.spawnPos.y };
};
Base.prototype.SetSpawnPos = function(pos) {
	this.spawnPos = {x: pos.x, y: pos.y };
};
Base.prototype.GetHeight = function() {
	return this.base_image.height;
};
Base.prototype.GetWidth = function() {
	return this.base_image.width;
};
Base.prototype.GetBaseHP = function() {
	return this.base_hp;
};
Base.prototype.GetFullBaseHP = function() {
	return this.base_full_hp;
}
Base.prototype.RemoveHP = function(value) {
	if(this.base_hp > value) {
		this.base_hp -= value;
	} else {
		this.base_hp = 0;
	}
};
Base.prototype.Evolve = function(imageName, level) {
	this.base_image = imageManager.getImageReference(imageName);
	var hp = (LEVEL_DATA[level-1].BASE_HP - this.base_hp);
	this.base_full_hp = LEVEL_DATA[level].BASE_HP;
	this.base_hp = this.base_full_hp - hp;
	for(var i=1; i<this.base_turret.length; i++) {
		this.turretTowerImg[i] = imageManager.getImageReference("turretPlace_" + level + "_"+i);
	}
};
Base.prototype.GetTowerLevel = function() {
	return this.towerlevel;
};
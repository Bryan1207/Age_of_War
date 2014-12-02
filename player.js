function Player(gamescreen) {
	this.gamescreen = gamescreen;
	this.evolve = levelManager.GetLevel();
	this.base = new Base(this.gamescreen, "playerBase" + this.evolve, 1);
	this.base.SetPosition({x: 0, y: (GAME_HEIGHT - this.base.GetHeight()) });
	this.base.SetSpawnPos({x:(this.base.GetPosition().x + this.base.GetWidth()) - 60, 
						y: (this.base.GetPosition().y + this.base.GetHeight()) - 20});
	this.gold = GOLD_START;
	this.experience = EXP_START;
}

Player.prototype.Update = function() {
	this.base.Update();
};

Player.prototype.Draw = function() {
	this.base.Draw();
	this.drawHP();
};


Player.prototype.GetBase = function() {
	return this.base;
};
/*Player.prototype.SetBase = function(base) {
	this.base = base;
};*/

Player.prototype.Evolve = function() {
	if(levelManager.IncreaseLevel()) {
		this.evolve = levelManager.GetLevel();
		//this.experience -= LEVEL_DATA[this.evolve-1].EVOLVE;
		this.base.Evolve("playerBase" + this.evolve, this.evolve);
		this.base.SetPosition({	x: 0, y: (GAME_HEIGHT - this.base.GetHeight()) });
		/* This causes error, when evolving and enemy is attacking then the building!*/
		/*this.base.SetSpawnPos({	x:(this.base.GetPosition().x + this.base.GetWidth()) - 60, 
								y: (this.base.GetPosition().y + this.base.GetHeight()) - 20});*/
	}
};

Player.prototype.drawHP = function() {
	ctx.font = "16px Calibri";
	ctx.fillStyle = "#FF0000"
	ctx.fillText("" + this.base.GetBaseHP(), 
						(this.base.GetPosition().x + 45) - viewport.GetPosition().x, 
						(this.base.GetPosition().y - 235) - viewport.GetPosition().y );

	ctx.strokeStyle = "#000000";
	ctx.strokeRect( (this.base.GetPosition().x + 14) - viewport.GetPosition().x, (this.base.GetPosition().y - 251) - viewport.GetPosition().y, 
													26, 251);

	ctx.fillStyle = "#808080";
	ctx.fillRect( (this.base.GetPosition().x + 15) - viewport.GetPosition().x, this.base.GetPosition().y - viewport.GetPosition().y, 
													25, -250);
	ctx.fillStyle = "#FF0000";
	ctx.fillRect( (this.base.GetPosition().x + 15) - viewport.GetPosition().x, this.base.GetPosition().y - viewport.GetPosition().y, 
													25, -(250 * (this.base.GetBaseHP() / this.base.GetFullBaseHP())));
};

Player.prototype.GetGold = function() {
	return this.gold;
};
Player.prototype.AddGold = function(value) {
	this.gold += value;
};
Player.prototype.RemoveGold = function(value) {
	if(this.gold >= value) {
		this.gold -= value;
		return true;
	}
	return false;
};
Player.prototype.CanIAffortIt = function(value) {
	if(this.gold >= value) {
		return true;
	}
	return false;
};
Player.prototype.GetExperience = function() {
	return this.experience;
};
Player.prototype.AddExperience = function(value) {
	this.experience += value;
};
Player.prototype.GetLevel = function() {
	return this.evolve;
};
Player.prototype.GetName = function() {
	return "player";
};
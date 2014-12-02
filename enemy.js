function Enemy(gamescreen) {
	this.gamescreen = gamescreen;
	this.evolve = 0;
	this.base = new Base(this.gamescreen, "enemyBase" + this.evolve, 1);
	this.base.SetPosition({x: (GAME_WIDTH - this.base.GetWidth()), 
							y: (CANVAS_HEIGHT - this.base.GetHeight())});
	this.base.SetSpawnPos({x:this.base.GetPosition().x + 50, 
						y: (this.base.GetPosition().y + this.base.GetHeight()) - 20});
}

Enemy.prototype.Update = function() {
	this.base.Update();
};

Enemy.prototype.Draw = function() {
	this.base.Draw();
	this.drawHP();
};

Enemy.prototype.GetBase = function() {
	return this.base;
};
Enemy.prototype.SetBase = function(base) {
	this.base = base;
};

Enemy.prototype.Evolve = function(level) {
	this.evolve = level;
	this.base.Evolve("enemyBase" + this.evolve, this.evolve);
	this.base.SetPosition({x: (GAME_WIDTH - this.base.GetWidth()), 
							y: (CANVAS_HEIGHT - this.base.GetHeight())});
	/*this.base.SetSpawnPos({x:this.base.GetPosition().x + 50, 
						y: (this.base.GetPosition().y + this.base.GetHeight()) - 20});*/
};

Enemy.prototype.drawHP = function() {
	ctx.font = "16px Calibri";
	ctx.fillStyle = "#FF0000"
	ctx.fillText("" + this.base.GetBaseHP(), 
						((this.base.GetPosition().x + this.base.GetWidth()) - 85) - viewport.GetPosition().x, 
						(this.base.GetPosition().y - 215) - viewport.GetPosition().y );

	ctx.strokeStyle = "#000000";
	ctx.strokeRect( ((this.base.GetPosition().x + this.base.GetWidth()) - 51) - viewport.GetPosition().x, 
						(this.base.GetPosition().y - 231) - viewport.GetPosition().y, 26, 231);

	ctx.fillStyle = "#808080";
	ctx.fillRect( ((this.base.GetPosition().x + this.base.GetWidth()) - 50) - viewport.GetPosition().x, 
						this.base.GetPosition().y - viewport.GetPosition().y, 25, -230);
	ctx.fillStyle = "#FF0000";
	ctx.fillRect( ((this.base.GetPosition().x + this.base.GetWidth()) - 50) - viewport.GetPosition().x, 
						this.base.GetPosition().y - viewport.GetPosition().y, 25, -(230 * (this.base.GetBaseHP() / this.base.GetFullBaseHP())));
};
Enemy.prototype.GetLevel = function() {
	return this.evolve;
};
Enemy.prototype.GetName = function() {
	return "enemy";
};
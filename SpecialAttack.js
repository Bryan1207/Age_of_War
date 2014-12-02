function SpecialAttack(level, gamescreen) {
	this.level = level;
	this.aantal = LEVEL_DATA[this.level-1].SPECIAL_AANTAL || 15;
	this.damage = LEVEL_DATA[this.level-1].SPECIAL_DAMAGE || 50;
	this.gamescreen = gamescreen;
	this.particles = new Array();
	this.image = imageManager.getImageReference("special_attack_1");
	this.animationName = "special_attack_" + (this.level - 1);
	this.isFinished = false;
	this.speed = 5;
	this.timerIsUp = false;
	for(var i=0; i<=this.aantal; i++) {
		var posX = GetRandomInt(250, GAME_WIDTH-250);
		var posY = GetRandomInt(0, 1500);
		var desX = GetRandomInt(posX-150, posX+150);
		if(posX < desX) {
			var degrees = 355;
		} else {
			var degrees = 5;
		}
		if(this.level === 1) {
			this.particles.push(new Particle(null, this.animationName, this.speed, {x: posX, y: -(posY+50)}, {x: desX, y:(GAME_HEIGHT - 75)}, degrees));
		} else if(this.level === 2) {
			this.particles.push(new Particle(this.image, null, this.speed, {x: posX, y: -(posY+50)}, {x: desX, y:(GAME_HEIGHT - 75)}, degrees));
		} else {
			this.particles.push(new Particle(null, this.animationName, this.speed, {x: posX, y: -(posY+50)}, {x: desX, y:(GAME_HEIGHT - 75)}, degrees));
		}
	}
}
SpecialAttack.prototype.Update = function() {
	if(this.particles.length > 0) {
		for(var i=0; i<this.particles.length; i++) {
			this.particles[i].Update();
			if(this.particles[i].IsFinished()) {
				this.particles.splice(i, 1);
			} else if(this.gamescreen.GetEnemiesOnField().length > 0) {
				for(var j=0; j<this.gamescreen.GetEnemiesOnField().length; j++) {
					
					if((this.particles[i].GetPosition().x + (this.particles[i].GetWidth()/3)) >= this.gamescreen.GetEnemiesOnField()[j].GetPosition().x &&
						this.particles[i].GetPosition().x  + ((this.particles[i].GetWidth()/3)*2) <= (this.gamescreen.GetEnemiesOnField()[j].GetPosition().x + this.gamescreen.GetEnemiesOnField()[j].GetWidth()) &&

						this.particles[i].GetPosition().y  + (this.particles[i].GetHeight()/2) >= (this.gamescreen.GetEnemiesOnField()[j].GetPosition().y - this.gamescreen.GetEnemiesOnField()[j].GetHeight()) &&
						this.particles[i].GetPosition().y + (this.particles[i].GetHeight()/2)<= this.gamescreen.GetEnemiesOnField()[j].GetPosition().y) 
					{
						this.particles.splice(i, 1);
						this.gamescreen.GetEnemiesOnField()[j].RemoveHP(this.damage);
						if(this.gamescreen.GetEnemiesOnField()[j].GetHP() <= 0) {
							this.gamescreen.GetPlayer().AddGold(UNITS[this.gamescreen.GetEnemiesOnField()[j].GetLevel()][this.gamescreen.GetEnemiesOnField()[j].GetUnitNr()].gold_back);
							this.gamescreen.GetPlayer().AddExperience(UNITS[this.gamescreen.GetEnemiesOnField()[j].GetLevel()][this.gamescreen.GetEnemiesOnField()[j].GetUnitNr()].xp);
							this.gamescreen.RemoveUnitOnField(this.gamescreen.GetEnemiesOnField()[j]);
							this.gamescreen.GetEnemiesOnField().splice(j, 1);
							if(this.gamescreen.GetEnemiesOnField().length > 0 && j < this.gamescreen.GetEnemiesOnField().length) {
								this.gamescreen.GetEnemiesOnField()[j].SetSpeed(this.gamescreen.GetEnemiesOnField()[j].GetDefaultSpeed());
								this.gamescreen.GetEnemiesOnField()[j].PlayAnimation('walk');
							}
						}
						break;
					}

				}
			}
		}
	} else {
		this.isFinished = true;
	}
};
SpecialAttack.prototype.Draw = function() {
	if(this.particles.length > 0) {
		for(var i=0; i<this.particles.length; i++) {
			this.particles[i].Draw();
		}
	}
};
SpecialAttack.prototype.IsFinished = function() {
	return this.isFinished;
};

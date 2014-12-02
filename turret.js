function Turret(gamescreen, turretnr) {
	this.gamescreen = gamescreen;
	this.position = {x:0, y:0};
	this.degrees = 0;
	this.level = levelManager.GetLevel();
	this.canRotate = TURRET_DATA[this.level][turretnr].rotate || true;
	this.turretnr = turretnr + 1;
	this.turret_image = imageManager.getImageReference("turret" + this.turretnr + "_" + (this.level + 1));
	this.actions = ["idle", "shoot", "reload"];
	this.actie = this.actions[0];
	this.animation = {};
	this.reloading = false;

	for(var i=0; i<this.actions.length; i++) {
		if(animationManager.checkNameExists("ev"+this.level+"_turret" + this.turretnr + "_" + this.actions[i] + "_right")) {
			this.animation["ev"+this.level+"_turret" + this.turretnr + "_" + this.actions[i] + "_right"] = new Animations("ev"+this.level+"_turret" + this.turretnr + "_" + this.actions[i] + "_right");
		}
	}
	this.rock = new Array();
}

Turret.prototype.Update = function() {
	if(typeof(this.animation[this.GetAnimationName()]) != "undefined") {
		this.animation[this.GetAnimationName()].Update();
	}
	if(this.rock.length > 0) {
		for(var i=0; i<this.rock.length; i++) {
			if(this.rock[i].IsHit()) {
				if(this.rock.indexOf(i))
					this.rock.splice(i, 1);

				if(this.gamescreen.GetEnemiesOnField().length > 0) {
					if(this.gamescreen.GetEnemiesOnField()[0].GetHP() <= 0) {
						//Enemy Died!
						this.gamescreen.GetPlayer().AddGold(UNITS[this.gamescreen.GetEnemiesOnField()[0].GetLevel()][this.gamescreen.GetEnemiesOnField()[0].GetUnitNr()].gold_back);
						this.gamescreen.GetPlayer().AddExperience(UNITS[this.gamescreen.GetEnemiesOnField()[0].GetLevel()][this.gamescreen.GetEnemiesOnField()[0].GetUnitNr()].xp);
						this.gamescreen.RemoveUnitOnField(this.gamescreen.GetEnemiesOnField()[0]);
						this.gamescreen.RemoveEnemyFromList(0);
						if(this.gamescreen.GetEnemiesOnField().length > 0) {
							this.gamescreen.GetEnemiesOnField()[0].SetSpeed(this.gamescreen.GetEnemiesOnField()[0].GetDefaultSpeed());
							this.gamescreen.GetEnemiesOnField()[0].PlayAnimation('walk');
						}
					}
				}
			} else {
				this.rock[i].Update();
			}
		}
	}
};

Turret.prototype.Draw = function() {
	drawImage(this.animation[this.GetAnimationName()].getImage(), 
				this.animation[this.GetAnimationName()].getXOffset(), this.animation[this.GetAnimationName()].getYOffset(), 
				this.animation[this.GetAnimationName()].getWidth(), this.animation[this.GetAnimationName()].getHeight(),
				(this.position.x + this.animation[this.GetAnimationName()].getImageXOffset()), 
				((this.position.y - this.animation[this.GetAnimationName()].getHeight()) + this.animation[this.GetAnimationName()].getImageYOffset()), 
				this.animation[this.GetAnimationName()].getImageWidth(), this.animation[this.GetAnimationName()].getImageHeight(), 30, false, this.degrees);
	if(this.rock.length > 0) {
		for(var i=0; i<this.rock.length; i++) {
			this.rock[i].Draw();
		}
	}
};
Turret.prototype.GetTurretNr = function() {
	return this.turretnr;
};
Turret.prototype.GetAnimationName = function() {
	return ("ev"+this.level+"_turret" + this.turretnr + "_" + this.actie + "_right");
};
Turret.prototype.GetAnimation = function() {
	return this.animation[this.GetAnimationName()];
};
Turret.prototype.GetWidth = function() {
	return this.animation[this.GetAnimationName()].getWidth();
};
Turret.prototype.GetHalfWidth = function() {
	return (this.animation[this.GetAnimationName()].getWidth()/2);
};
Turret.prototype.GetHeight = function() {
	return this.animation[this.GetAnimationName()].getHeight();
};
Turret.prototype.PlayAnimation = function(value) {
	for(var i in this.actions) {
		if(this.actions[i] == value) {
			if(this.actions[i] != this.actie) {
				this.actie = this.actions[i];
				this.animation[this.GetAnimationName()].ResetAnimation();
			}
		}
	}
};
Turret.prototype.GetPlayingAnimation = function(value) {
	for(var i in this.actions) {
		if(this.actions[i] == value) {
			return true;
		}
	}
	return false;
};
Turret.prototype.SetPosition = function(pos) {
	this.position = {x: pos.x, y: pos.y };
};
Turret.prototype.SetDegrees = function(d) {
	this.degrees = d;
};
Turret.prototype.GetCanRotate = function() {
	return this.canRotate;
};
Turret.prototype.Shoot = function(enemy) {
	if(enemy !== null) {
		if(!this.reloading) {
			this.PlayAnimation("shoot");
			if(this.GetAnimation().getFinished()) {
				this.reloading = true;
				//Locate the turned turret where his rotation is.
				var rad2deg = 180/Math.PI;
				var xPos = Math.cos((this.degrees-45) / rad2deg) * this.GetHalfWidth();
				var yPos = Math.sin((this.degrees-45) / rad2deg) * this.GetHalfWidth();

				this.rock.push(new Rock(this.level, this.turretnr, {x: this.position.x + xPos, y: this.position.y + yPos}, enemy, this.gamescreen));
			}
		} else {
			this.PlayAnimation("reload");
			if(this.GetAnimation().getFinished()) {
				this.reloading = false;
			}
		}
		
	} else {
		this.PlayAnimation("idle");
		if(this.degrees > 0) {
			this.reloading = false;
			this.degrees--;
			if(this.GetAnimation().getFinished()) {
				this.GetAnimation().ResetAnimation();
			}
		}
	}
};
Turret.prototype.GetLevel = function() {
	return this.level;
};
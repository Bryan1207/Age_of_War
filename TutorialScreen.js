function TutorialScreen() {
	if(DEV_MODE) console.log("Welkom bij het Tutorial Level!");
	this.bg = imageManager.getImage("game_bg");
	this.pauseImg = imageManager.getImageReference("pauseImg");
	levelManager.ResetLevel();
	this.InitButtons();
	audioPlayer.PlayMusic("bg_game", { volume: 1, loop: true });
	this.player = new Player(this);
	this.player.AddGold(GOLD_START_TUTORIAL);
	this.player.AddExperience(EXP_START_TUTORIAL);
	this.enemy = new Enemy(this);
	viewport = new Viewport(CANVAS_WIDTH, CANVAS_HEIGHT, GAME_WIDTH, GAME_HEIGHT);
	layerManager = new LayerManager();
	this.menuChoise = 0;
	this.enemiesOnField = new Array();
	this.unitsOnField = new Array();
	this.loadingUnits = new Array();
	this.unitOnFieldDied = new Array();
	this.gameOver = false;
	this.specialAttackTimer = 0;
	this.specialAttack = null;
	this.chosenTurret = 0;
	this.stringTextDetails = { text: "", x: 250, y: 75};

	/* stappen */
	this.tutorialFinished = false;
	this.tussenStap = false;
	this.tutorialTimer = 0;
	this.stap = 0;
	this.stappen = new Array();
	this.stappen[0] = {x: (CANVAS_WIDTH/2)-200, y:(CANVAS_HEIGHT/2)-150, w: 400, h: 200, static: true, timer: false, lineTo: {x:0,y:0}, text: "Welkom bij Age of War! Het spel brengt je door alle evoluties heen! Maar pas op! Probeer je vijanden af te slaan en je te evolueren zodra je genoeg experience hebt!"};
	this.stappen[1] = {x: (CANVAS_WIDTH/2)-200, y:(CANVAS_HEIGHT/2)-150, w: 400, h: 200, static: false, timer: false, lineTo: {x:this.player.GetBase().GetPosition().x + (this.player.GetBase().GetWidth()/2),y:this.player.GetBase().GetPosition().y + 100}, text: "Dit ben jij. Nu in deze tijd heb je een grot als basis. Je moet deze verdedigen van vijanden die je proberen te vernietigen."};
	this.stappen[2] = {x: GAME_WIDTH - (CANVAS_WIDTH/2)-200, y:(CANVAS_HEIGHT/2)-150, w: 400, h: 200, static: false, timer: false, lineTo: {x:0,y:0}, text: "Dit is je aardsvijand. Deze moet jij vernietigen om het spel te winnen. Zet units in om je vijand aan te vallen."};
	this.stappen[3] = {x: (CANVAS_WIDTH/2)-200, y:(CANVAS_HEIGHT/2)-150, w: 400, h: 200, static: true, timer: true, lineTo: {x:(CANVAS_WIDTH - (403 - (75*0))) + 31.5,y:43 + 31.5}, text: "Je kan units aanmaken door op dit icoontje te klikken, en een unit te selecteren die je wilt inzetten. Probeer maar eens."};
	this.stappen[4] = {x: (CANVAS_WIDTH/2)-200, y:(CANVAS_HEIGHT/2)-150, w: 400, h: 200, static: true, timer: true, lineTo: {x:(CANVAS_WIDTH - (403 - (75*1))) + 31.5,y:43 + 31.5}, text: "Om je eigen basis te verdedigen kan je turrets inzetten. Deze kan je uitkiezen door op dit icoontje te klikken, een turret te selecteren en op je basis te zetten. Probeer maar eens."};
	this.stappen[5] = {x: (CANVAS_WIDTH/2)-200, y:(CANVAS_HEIGHT/2)-150, w: 400, h: 200, static: true, timer: true, lineTo: {x:(CANVAS_WIDTH - 99), y: 136 + 31.5}, text: "Als je in nood bent, kan je altijd een special attack aanroepen. Dit is een lucht aanval die kan worden ingezet om de vijand op het veld te doden. Probeer maar eens."};
	this.stappen[6] = {x: (CANVAS_WIDTH/2)-200, y:(CANVAS_HEIGHT/2)-150, w: 400, h: 200, static: true, timer: false, lineTo: {x:0,y:0}, text: "Je bent klaar met de tutorial! Je bent nu een echte master in age of war! Ben je klaar voor het echte gevecht?"};
	this.score = 0;
	this.dbCon = new Database(user_id);
}
TutorialScreen.prototype.Update = function() {
	if((!gamePaused && gameRunning && this.tutorialFinished) || this.tussenStap) {
		viewport.Update();
		if(this.menuChoise === 0) {
			if(MoveOnItem(this.menuButton0.x, this.menuButton0.y, this.menuButton0.img.width, this.menuButton0.img.height)) {
				this.SetInfoText("Train units menu", 0);
			} else if(MoveOnItem(this.menuButton1.x, this.menuButton1.y, this.menuButton1.img.width, this.menuButton1.img.height)) {
				this.SetInfoText("Build turrets menu", 0);
			} else if(MoveOnItem(this.menuButton2.x, this.menuButton2.y, this.menuButton2.img.width, this.menuButton2.img.height)) {
				this.SetInfoText("Sell a turret", 0);
			} else if(MoveOnItem(this.menuButton3.x, this.menuButton2.y, this.menuButton3.img.width, this.menuButton3.img.height)) {
				if(!this.player.GetBase().GetTurretsMaxed()) {
					this.SetInfoText(ADD_TURRET[this.player.GetBase().GetTowerLevel()].COSTS + " gold - Add a turret spot", 0);
				} else {
					this.SetInfoText("Can't build anymore!", 0);
				}
			} else if(MoveOnItem(this.menuButton4.x, this.menuButton4.y, this.menuButton4.img.width, this.menuButton4.img.height)) {
				if(levelManager.IsMaxedLevel()) {
					this.SetInfoText("You cannot evolve anymore!", 0);
				} else {
					this.SetInfoText(LEVEL_DATA[levelManager.GetLevel()].EVOLVE + "XP Evolve to a better age!", 0);
				}
			} else if(MoveOnItem(this.specialAttackDetails.x, this.specialAttackDetails.y, this.specialAttackDetails.img.width, this.specialAttackDetails.img.height)) {
				this.SetInfoText("Special Attack!", 0);
			}
			if(ClickOnItem(this.menuButton0.x, this.menuButton0.y, this.menuButton0.img.width, this.menuButton0.img.height)) {
				this.menuChoise = 1;
			} else if(ClickOnItem(this.menuButton1.x, this.menuButton1.y, this.menuButton1.img.width, this.menuButton1.img.height)) {
				this.menuChoise = 2;
			} else if(ClickOnItem(this.menuButton2.x, this.menuButton2.y, this.menuButton2.img.width, this.menuButton2.img.height)) {
				//console.log('sell Turret!');
				this.menuChoise = 4;
			} else if(ClickOnItem(this.menuButton3.x, this.menuButton3.y, this.menuButton3.img.width, this.menuButton3.img.height)) {
				//console.log('add Turretplace!');
				if(!this.player.GetBase().GetTurretsMaxed()) {
					if(this.player.RemoveGold(ADD_TURRET[this.player.GetBase().GetTowerLevel()].COSTS)) {
						this.player.GetBase().AddTower(this.player.GetBase().GetTowerLevel());
					}
				}
			} else if(ClickOnItem(this.menuButton4.x, this.menuButton4.y, this.menuButton4.img.width, this.menuButton4.img.height)) {
				/* Evolve */
				if(this.player.GetExperience() >= LEVEL_DATA[levelManager.GetLevel()].EVOLVE) {
					this.player.Evolve();
					this.InitButtons();
				}
			}
		} else if(this.menuChoise === 1) {
			/* Units */
			for(var i=0; i<this.unitCount; i++) {
				if(ClickOnItem(this["unit"+i+"_evolve"+this.level].x, this["unit"+i+"_evolve"+this.level].y, 
						this["unit"+i+"_evolve"+this.level].img.width, this["unit"+i+"_evolve"+this.level].img.height)) {
					if(this.loadingUnits.length < 5) {
						if(this.player.RemoveGold(UNITS[this.level-1][i].costs)) {
							this.addLoadingUnit(i);
						}
					}
				}
				if(MoveOnItem(this["unit"+i+"_evolve"+this.level].x, this["unit"+i+"_evolve"+this.level].y, 
						this["unit"+i+"_evolve"+this.level].img.width, this["unit"+i+"_evolve"+this.level].img.height)) {
					this.SetInfoText( UNITS[this.level-1][i].costs + " gold - " + UNITS[this.level-1][i].name , 0);
				}
			}
			if(ClickOnItem(this.menuBackButton.x, this.menuBackButton.y, this.menuBackButton.img.width, this.menuBackButton.img.height)) {
				/* Go Back */
				this.menuChoise = 0;
			}
			if(MoveOnItem(this.menuBackButton.x, this.menuBackButton.y, this.menuBackButton.img.width, this.menuBackButton.img.height)) {
				this.SetInfoText("Back to the menu" , 0);
			}
		} else if(this.menuChoise === 2) {
			/* Turrets */
			for(var i=0; i<this.turretCount; i++) {
				if(ClickOnItem(this["turret" + i + "_evolve"+this.level].x, this["turret" + i + "_evolve"+this.level].y, 
								this["turret" + i + "_evolve"+this.level].img.width, this["turret" + i + "_evolve"+this.level].img.height)) {		
					this.player.GetBase().SetShowTurretLocation(true);
					this.chosenTurret = i;
					this.menuChoise = 3;
				}
				if(MoveOnItem(this["turret" + i + "_evolve"+this.level].x, this["turret" + i + "_evolve"+this.level].y, 
								this["turret" + i + "_evolve"+this.level].img.width, this["turret" + i + "_evolve"+this.level].img.height)) {
					this.SetInfoText(TURRET_DATA[this.level-1][i].COSTS + " gold - " + TURRET_DATA[this.level-1][i].name , 0);
				}
			}
			if(ClickOnItem(this.menuBackButton.x, this.menuBackButton.y, this.menuBackButton.img.width, this.menuBackButton.img.height)) {
				this.menuChoise = 0;
			}
			if(MoveOnItem(this.menuBackButton.x, this.menuBackButton.y, this.menuBackButton.img.width, this.menuBackButton.img.height)) {
				this.SetInfoText("Back to the menu" , 0);
			}
		} else if(this.menuChoise === 3) {
			if(ClickOnItem(this.menuCancelButton.x, this.menuCancelButton.y, this.menuCancelButton.img.width, this.menuCancelButton.img.height)) {
				this.player.GetBase().SetShowTurretLocation(false);
				this.chosenTurret = 0;
				this.menuChoise = 0;
			}
		} else if(this.menuChoise === 4) {
			if(ClickOnItem(this.menuCancelButton.x, this.menuCancelButton.y, this.menuCancelButton.img.width, this.menuCancelButton.img.height)) {
				this.menuChoise = 0;
			}
		}


	
		this.player.Update();
		this.enemy.Update();
		this.loadAddedUnits();

		this.UpdateEnemies();
		this.UpdateUnits();
		//this.UpdateTurrets();
		this.UpdateSpecialAttack();
		if(this.unitOnFieldDied.length > 0) {
			for(var i=0; i<this.unitOnFieldDied.length; i++) {
				this.unitOnFieldDied[i].Update();
				if(this.unitOnFieldDied[i].GetAnimation().getFinished()) {
					this.unitOnFieldDied.shift(i);
				}
			}
		}
		if(ClickOnItem(this.specialAttackDetails.x, this.specialAttackDetails.y, this.specialAttackDetails.img.width, this.specialAttackDetails.img.height)) {
			if(this.specialAttackTimer <= 0) {
				this.specialAttack = new SpecialAttack(this.level, this);
				this.specialAttackTimer = LEVEL_DATA[levelManager.GetLevel()].SPECIAL_TIME;
				viewport.ShakeScreen();
			}
		}
		if(this.menuChoise === 3) {
			for(var i=0; i<this.player.GetBase().GetTurrets().length; i++) {
				if(ClickOnItem(this.player.GetBase().GetTurrets()[i].x, this.player.GetBase().GetTurrets()[i].y, 
						this.player.GetBase().GetTurrets()[i].w, this.player.GetBase().GetTurrets()[i].h)) {
					if(this.player.GetBase().GetTurretsAvailable(i)) {
						if(this.player.RemoveGold(TURRET_DATA[this.level-1][this.chosenTurret].COSTS)) {
							this.player.GetBase().SetTurret(i, this.chosenTurret);
							this.chosenTurret = 0;
							this.menuChoise = 0;
						}
					}
				}
			}
		} else if(this.menuChoise === 4) {
			for(var i=0; i<this.player.GetBase().GetTurrets().length; i++) {
				if(ClickOnItem(this.player.GetBase().GetTurrets()[i].x, this.player.GetBase().GetTurrets()[i].y, 
						this.player.GetBase().GetTurrets()[i].w, this.player.GetBase().GetTurrets()[i].h)) {
					if(this.player.GetBase().GetTurrets()[i].turret !== null) {
						this.player.AddGold(TURRET_DATA[this.player.GetBase().GetTurrets()[i].turret.GetLevel()][this.player.GetBase().GetTurrets()[i].turret.GetTurretNr()].GOLD_BACK);
						this.player.GetBase().SellTurret(i);
						this.menuChoise = 0;
					}
				}
			}
		}
	}
	if(!this.tutorialFinished && !this.tussenStap) {
		//viewport.Update();
		if(ClickOnItem(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)) {
			if(this.stap < this.stappen.length-1) {
				this.stap++;
				if(this.stap === 2) {
					viewport.SetPositionX(GAME_WIDTH-CANVAS_WIDTH);
				}
				if(this.stappen[this.stap-1].timer) {
					viewport.SetPositionX(0);
					if(this.stap === 3) {
						//Make units
						for(var i=0; i<5; i++) {
							this.addEnemiesOnField(0);
						}
					} else if(this.stap === 4) {
						//Make turrets
						for(var i=0; i<10; i++) {
							this.addEnemiesOnField(0);
						}
					} else if(this.stap === 5) {
						//Special attack
						for(var i=0; i<10; i++) {
							this.addEnemiesOnField(0);
						}
					}
					this.tutorialTimer = 60 * 60;
					this.tussenStap = true;
				}
			} else {
				this.tutorialFinished = true;
				this.dbCon.Insert(user_id, this.score);
				game.SetScreen(new MenuScreen());
			}
		}
	} else {
		if(!gamePaused && gameRunning && this.tutorialTimer > 0) {
			this.tutorialTimer--;
		} else if(this.tutorialTimer <= 0) {
			viewport.SetPositionX(0);
			this.tussenStap = false;
			this.menuChoise = 0;
			if(this.unitsOnField.length > 0) {
				this.unitsOnField = new Array();
			}
			if(this.enemiesOnField.length > 0) {
				this.enemiesOnField = new Array();
			}
			if(this.unitOnFieldDied.length > 0) {
				this.unitOnFieldDied = new Array();
			}
			if(this.loadingUnits.length > 0) {
				this.loadingUnits = new Array();
			}
		}
	}
};
TutorialScreen.prototype.Draw = function() {
	ctx.textAlign = 'left';
	ctx.save();
	ctx.fillStyle = '#49BFFF'
	ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.restore();
	drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, false, null);
	drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, CANVAS_WIDTH, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, false, null);
	/* Interface */
	drawImage(imageManager.getImage("spritesheet"), this.interfaceBG.img.sourceX, this.interfaceBG.img.sourceY, 
				this.interfaceBG.img.sourceWidth, this.interfaceBG.img.sourceHeight, 
				this.interfaceBG.x, this.interfaceBG.y, 
				CANVAS_WIDTH, this.interfaceBG.img.height, 98, true, null);
	if(this.menuChoise === 0) {
		this.DrawButtons();
	} else if(this.menuChoise === 1) {
		this.DrawUnitButtons();
	} else if(this.menuChoise === 2) {
		this.DrawTurretButtons();
	} else if(this.menuChoise === 3) {
		drawImage(imageManager.getImage("spritesheet"), this["turret"+this.chosenTurret+"_"+this.level].img.sourceX, this["turret"+this.chosenTurret+"_"+this.level].img.sourceY, 
						this["turret"+this.chosenTurret+"_"+this.level].img.sourceWidth, this["turret"+this.chosenTurret+"_"+this.level].img.sourceHeight, 
						mouseMovePos.x - (this["turret"+this.chosenTurret+"_"+this.level].img.width/2), mouseMovePos.y - (this["turret"+this.chosenTurret+"_"+this.level].img.height/2), 
						this["turret"+this.chosenTurret+"_"+this.level].img.width, this["turret"+this.chosenTurret+"_"+this.level].img.height, 100, true, null);
		drawImage(imageManager.getImage("spritesheet"), this.menuCancelButton.img.sourceX, this.menuCancelButton.img.sourceY, 
						this.menuCancelButton.img.sourceWidth, this.menuCancelButton.img.sourceHeight, 
						this.menuCancelButton.x, this.menuCancelButton.y, 
						this.menuCancelButton.img.width, this.menuCancelButton.img.height, 99, true, null);
	} else if(this.menuChoise === 4) {
		drawImage(imageManager.getImage("spritesheet"), this.sellTurret.img.sourceX, this.sellTurret.img.sourceY, 
						this.sellTurret.img.sourceWidth, this.sellTurret.img.sourceHeight, 
						mouseMovePos.x + (this.sellTurret.img.width), mouseMovePos.y - (this.sellTurret.img.height/3), 
						this.sellTurret.img.width, this.sellTurret.img.height, 100, true, null);
		drawImage(imageManager.getImage("spritesheet"), this.menuCancelButton.img.sourceX, this.menuCancelButton.img.sourceY, 
						this.menuCancelButton.img.sourceWidth, this.menuCancelButton.img.sourceHeight, 
						this.menuCancelButton.x, this.menuCancelButton.y, 
						this.menuCancelButton.img.width, this.menuCancelButton.img.height, 99, true, null);
	}
	
	this.player.Draw();
	this.enemy.Draw();
	layerManager.Render(ctx);
	this.DrawSpecialAttack();

	if(this.unitsOnField.length > 0) {
		for(var i=0; i<this.unitsOnField.length; i++) {
			this.unitsOnField[i].Draw();
		}
	}
	if(this.enemiesOnField.length > 0) {
		for(var i=0; i<this.enemiesOnField.length; i++) {
			this.enemiesOnField[i].Draw();
		}
	}
	if(this.unitOnFieldDied.length > 0) {
		for(var i=0; i<this.unitOnFieldDied.length; i++) {
			this.unitOnFieldDied[i].Draw();
		}
	}
	if(this.loadingUnits.length > 0) {
		this.DrawProgressbarUnit();
	}
	if(gamePaused) {
		drawImage(imageManager.getImage("spritesheet"), this.pauseImg.sourceX, this.pauseImg.sourceY,
						this.pauseImg.sourceWidth, this.pauseImg.sourceHeight,
						((CANVAS_WIDTH/2) - (this.pauseImg.width/2)), (CANVAS_HEIGHT/2) - (this.pauseImg.height/2), this.pauseImg.width, this.pauseImg.height, 100, true, null);
	}
	

	ctx.font = "24px Calibri";
	ctx.fillStyle = "#ffff00";
	ctx.fillText("" + this.stringTextDetails.text, this.stringTextDetails.x, this.stringTextDetails.y);
	ctx.fillText("" + this.player.GetGold(), 40, 33);
	//ctx.font = "24px Calibri";
	ctx.fillStyle = "#FF0000";
	ctx.fillText("" + this.player.GetExperience(), 55, 72 );

	if(!this.tutorialFinished && !this.tussenStap) {
		if(this.stappen.length > 0) {
			for(var i=0; i<this.stappen.length; i++) {
				if(this.stap === i) {
					if(this.stappen[i].static) {
						if(this.stappen[i].lineTo.x !== 0 && this.stappen[i].lineTo.y !== 0) {
							ctx.beginPath();
							ctx.lineWidth = 7;
							ctx.moveTo(CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
							ctx.lineTo(this.stappen[i].lineTo.x, this.stappen[i].lineTo.y);
							ctx.strokeStyle = "#FF0000";
							ctx.stroke();
						}
						drawBubbleCenter(ctx, this.stappen[i].x, this.stappen[i].y, this.stappen[i].w, this.stappen[i].h, 5, "rgba(255,255,255,1)", 1, 1);	
						ctx.fillStyle = "#000000";
						wrapText(ctx, this.stappen[i].text, this.stappen[i].x+25, this.stappen[i].y+50, this.stappen[i].w-25, 20);
					} else {
						if(this.stappen[i].lineTo.x !== 0 && this.stappen[i].lineTo.y !== 0) {
							ctx.beginPath();
							ctx.lineWidth = 7;
							ctx.moveTo((CANVAS_WIDTH/2)  - viewport.GetPosition().x, (CANVAS_HEIGHT/2) - viewport.GetPosition().y);
							ctx.lineTo(this.stappen[i].lineTo.x  - viewport.GetPosition().x, this.stappen[i].lineTo.y - viewport.GetPosition().y);
							ctx.strokeStyle = "#FF0000";
							ctx.stroke();
						}
						drawBubbleCenter(ctx, this.stappen[i].x-viewport.GetPosition().x, this.stappen[i].y-viewport.GetPosition().y, this.stappen[i].w, this.stappen[i].h, 5, "rgba(255,255,255,1)", 1, 1);
						ctx.fillStyle = "#000000";
						wrapText(ctx, this.stappen[i].text, (this.stappen[i].x+25)-viewport.GetPosition().x, (this.stappen[i].y+50)-viewport.GetPosition().y, this.stappen[i].w-25, 20);
					}
				}
			}
		}
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Klik om verder te gaan.", (CANVAS_WIDTH/2)-100, CANVAS_HEIGHT-50);
		ctx.lineWidth = 1;
	} else {
		ctx.fillText( parseInt(this.tutorialTimer/60), (CANVAS_WIDTH-50), (this.interfaceBG.img.height + 20) );
	}
};

TutorialScreen.prototype.UpdateEnemies = function() {
	if(this.enemiesOnField.length > 0) {
		for(var i=0; i<this.enemiesOnField.length; i++) {
			if(this.unitsOnField.length > 0) {
				if(this.enemiesOnField[0].GetPosition().x <= this.unitsOnField[0].GetPosition().x + this.unitsOnField[0].GetWidth()) {
					this.enemiesOnField[0].SetSpeed(0);
					this.enemiesOnField[0].PlayAnimation("fight");
					//if animation if finished. SetDamage(current unit).
					if(this.enemiesOnField[0].GetAnimation().getFinished()) {
						this.unitsOnField[0].RemoveHP(this.enemiesOnField[0].GetDamage());
						this.enemiesOnField[0].GetAnimation().ResetAnimation();
						if(this.unitsOnField[0].GetHP() <= 0) {
							this.RemoveUnitOnField(this.unitsOnField[0]);
							this.unitsOnField.shift(0);
							if(this.unitsOnField.length > 0) {
								this.unitsOnField[0].SetSpeed(this.unitsOnField[0].GetDefaultSpeed());
								this.unitsOnField[0].PlayAnimation("walk");
							}
							this.enemiesOnField[0].SetSpeed(this.enemiesOnField[0].GetDefaultSpeed());
							this.enemiesOnField[0].PlayAnimation("walk");
						}
					}
				}
			} else if(this.enemiesOnField[0].GetPosition().x <= this.player.GetBase().GetSpawnPos().x) {
				this.enemiesOnField[0].SetSpeed(0);
				this.enemiesOnField[0].PlayAnimation("fight");
				if(this.enemiesOnField[0].GetAnimation().getFinished()) {
					this.player.GetBase().RemoveHP(this.enemiesOnField[0].GetDamage());
					this.enemiesOnField[0].GetAnimation().ResetAnimation();
					/*if(this.player.GetBase().GetBaseHP() <= 0) {
						//GAME OVER!
						this.enemiesOnField[0].PlayAnimation("idle");
						this.winner = false;
						this.gameOver = true;
						gameRunning = false;
						console.log("Game Over!");
					}*/
				}
			}
			if(this.enemiesOnField.length > 1) {
				if(i !== 0) {
					if(this.enemiesOnField[i].GetPosition().x <= this.enemiesOnField[i-1].GetPosition().x + this.enemiesOnField[i-1].GetWidth()) {
						this.enemiesOnField[i].SetSpeed(0);
						this.enemiesOnField[i].PlayAnimation("idle");
					} else {
						this.enemiesOnField[i].SetSpeed(this.enemiesOnField[i].GetDefaultSpeed());
						this.enemiesOnField[i].PlayAnimation("walk");
					}
				}
			}
			this.enemiesOnField[i].Update();
		}
	}
};
TutorialScreen.prototype.UpdateUnits = function() {
	if(this.unitsOnField.length > 0) {
		for(var i=0; i<this.unitsOnField.length; i++) {
			if(this.enemiesOnField.length > 0) {
				if(this.unitsOnField[0].GetPosition().x + this.unitsOnField[0].GetWidth() >= this.enemiesOnField[0].GetPosition().x) {
					this.unitsOnField[0].SetSpeed(0);
					this.unitsOnField[0].PlayAnimation("fight");
					//if animation if finished. SetDamage(current enemy).
					if(this.unitsOnField[0].GetAnimation().getFinished()) {
						this.enemiesOnField[0].RemoveHP(this.unitsOnField[0].GetDamage());
						this.unitsOnField[0].GetAnimation().ResetAnimation();
						if(this.enemiesOnField[0].GetHP() <= 0) {
							//Enemy Died!
							this.RemoveUnitOnField(this.enemiesOnField[0]);
							this.enemiesOnField.shift(0);
							if(this.enemiesOnField.length > 0) {
								this.enemiesOnField[0].SetSpeed(this.enemiesOnField[0].GetDefaultSpeed());
								this.enemiesOnField[0].PlayAnimation("walk");
							}
							this.unitsOnField[0].SetSpeed(this.unitsOnField[0].GetDefaultSpeed());
							this.unitsOnField[0].PlayAnimation("walk");
						}
					}
				}
			} else if(this.unitsOnField[0].GetPosition().x + this.unitsOnField[0].GetWidth() >= this.enemy.GetBase().GetSpawnPos().x) {
				this.unitsOnField[0].SetSpeed(0);
				this.unitsOnField[0].PlayAnimation("fight");
				if(this.unitsOnField[0].GetAnimation().getFinished()) {
					this.enemy.GetBase().RemoveHP(this.unitsOnField[0].GetDamage());
					this.unitsOnField[0].GetAnimation().ResetAnimation();
					if(this.enemy.GetBase().GetBaseHP() <= 0) {
						//Winner!
						this.unitsOnField[0].PlayAnimation("idle");
						this.gameOver = false;
						this.winner = true;
						gameRunning = false;
						console.log("Winner!");
					}
				}
			}

			if(this.unitsOnField.length > 1) {
				if(i !== 0) {
					if(this.unitsOnField[i-1].GetPosition().x <= (this.unitsOnField[i].GetPosition().x + this.unitsOnField[i].GetWidth())) {
						this.unitsOnField[i].SetSpeed(0);
						this.unitsOnField[i].PlayAnimation("idle");
						//console.log('walk, idle');
					} else if(this.unitsOnField[i-1].GetPosition().x - 20 >= (this.unitsOnField[i].GetPosition().x + this.unitsOnField[i].GetWidth())) {
						this.unitsOnField[i].SetSpeed(this.unitsOnField[i].GetDefaultSpeed());
						this.unitsOnField[i].PlayAnimation("walk");
						//console.log('walk, walk');
					}
				}
			}
			this.unitsOnField[i].Update();
		}
	}
};
TutorialScreen.prototype.UpdateSpecialAttack = function() {
	if(this.specialAttack !== null) {
		this.specialAttack.Update();
		if(this.specialAttack.IsFinished()) {
			this.specialAttack = null;
		}	
	}
	if(this.specialAttackTimer >= 0) {
		this.specialAttackTimer -= 1/60;
	}
};
TutorialScreen.prototype.DrawProgressbarUnit = function() {
	ctx.fillStyle = "#FF0000";
	ctx.fillRect( 237, 13,
				(400 * (this.loadingUnitsTimer / UNITS[this.level-1][this.loadingUnits[0]].loadingTime)), 10);
	ctx.fillStyle = "#AAAAAA";
	for(var i=0; i<this.loadingUnits.length; i++) {
		ctx.fillRect( 645 + (22 *i), 9, 18, 17);
	}
};
/* Buttons */
TutorialScreen.prototype.DrawButtons = function() {
	for(var i=0; i<5; i++) {
		drawImage(imageManager.getImage("spritesheet"), this["menuButton" + i].img.sourceX, this["menuButton" + i].img.sourceY, 
						this["menuButton" + i].img.sourceWidth, this["menuButton" + i].img.sourceHeight, 
						this["menuButton" + i].x, this["menuButton" + i].y, 
						this["menuButton" + i].img.width, this["menuButton" + i].img.height, 99, true, null);
	}	
};
TutorialScreen.prototype.DrawSpecialAttack = function() {
	drawImage(imageManager.getImage("spritesheet"), this.specialAttackDetails.img.sourceX, this.specialAttackDetails.img.sourceY, 
						this.specialAttackDetails.img.sourceWidth, this.specialAttackDetails.img.sourceHeight, 
						this.specialAttackDetails.x, this.specialAttackDetails.y, 
						this.specialAttackDetails.img.width, this.specialAttackDetails.img.height, 99, true, null);
	if(this.specialAttack !== null) {
		this.specialAttack.Draw();
	}
	if(this.specialAttackTimer > 0) {
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		ctx.fillRect(this.specialAttackDetails.x, this.specialAttackDetails.y, 
			(this.specialAttackTimer / LEVEL_DATA[levelManager.GetLevel()].SPECIAL_TIME) * this.specialAttackDetails.img.width, this.specialAttackDetails.img.height);
	}
};
TutorialScreen.prototype.DrawUnitButtons = function() {
	for(var i=0; i<this.unitCount; i++) {
		drawImage(imageManager.getImage("spritesheet"), this["unit"+i+"_evolve"+this.level].img.sourceX, this["unit"+i+"_evolve"+this.level].img.sourceY, 
						this["unit"+i+"_evolve"+this.level].img.sourceWidth, this["unit"+i+"_evolve"+this.level].img.sourceHeight, 
						this["unit"+i+"_evolve"+this.level].x, this["unit"+i+"_evolve"+this.level].y, 
						this["unit"+i+"_evolve"+this.level].img.width, this["unit"+i+"_evolve"+this.level].img.height, 99, true, null);
	}
	drawImage(imageManager.getImage("spritesheet"), this["menuBackButton"].img.sourceX, this["menuBackButton"].img.sourceY, 
						this["menuBackButton"].img.sourceWidth, this["menuBackButton"].img.sourceHeight, 
						this["menuBackButton"].x, this["menuBackButton"].y, 
						this["menuBackButton"].img.width, this["menuBackButton"].img.height, 99, true, null);
};
TutorialScreen.prototype.DrawTurretButtons = function() {
	for(var i=0; i<this.turretCount; i++) {
		drawImage(imageManager.getImage("spritesheet"), this["turret"+i+"_evolve"+this.level].img.sourceX, this["turret"+ i + "_evolve"+this.level].img.sourceY, 
						this["turret" + i + "_evolve"+this.level].img.sourceWidth, this["turret"+ i + "_evolve"+this.level].img.sourceHeight, 
						this["turret" + i + "_evolve"+this.level].x, this["turret"+ i + "_evolve"+this.level].y, 
						this["turret" + i + "_evolve"+this.level].img.width, this["turret"+ i + "_evolve"+this.level].img.height, 99, true, null);
	}
	drawImage(imageManager.getImage("spritesheet"), this["menuBackButton"].img.sourceX, this["menuBackButton"].img.sourceY, 
						this["menuBackButton"].img.sourceWidth, this["menuBackButton"].img.sourceHeight, 
						this["menuBackButton"].x, this["menuBackButton"].y, 
						this["menuBackButton"].img.width, this["menuBackButton"].img.height, 99, true, null);
};
TutorialScreen.prototype.InitButtons = function() {
	this.level = levelManager.GetCurrentLevel();
	this.unitCount = UNITS[this.level-1].length;
	this.turretCount = TURRET_DATA[this.level-1].length;
	this.interfaceBG = { img: imageManager.getImageReference("interface0"), x: 0, y: 0 };
	for(var i=0; i<=4; i++) {
		this["menuButton"+i] = { img: imageManager.getImageReference("menuButton"+i), x: (CANVAS_WIDTH - (403 - (75*i))), y: 43 };
	}
	this.menuBackButton = { img: imageManager.getImageReference("menuBackButton"), x: (CANVAS_WIDTH - 103), y: 43 };
	this.specialAttackDetails = { img: imageManager.getImageReference("specialButton"+this.level), x: (CANVAS_WIDTH - 119), y: 136 };
	this.menuCancelButton = { img: imageManager.getImageReference("menuCancelButton"), x: (CANVAS_WIDTH - 353), y: 43 };
	this.sellTurret = { img: imageManager.getImageReference("menuSellTurret"), x: 0, y: 0};
	
	for(var i=0; i<this.unitCount; i++) {
		this["unit" + i + "_evolve"+this.level] = { img: imageManager.getImageReference("unit" + i + "_evolve"+this.level), x:(CANVAS_WIDTH - (478 - (75*(i+1)))), y: 43 };
	}
	for(var i=0; i<this.turretCount; i++) {
		this["turret" + i + "_evolve"+this.level] = { img: imageManager.getImageReference("turret" + i + "_evolve"+this.level), x:(CANVAS_WIDTH - (478 - (75*(i+1)))), y: 43 };
	}
	for(var i=0; i<this.turretCount; i++) {
		this["turret"+i+"_"+this.level] = { img: imageManager.getImageReference("turret"+i+"_"+this.level), x: 0, y:0 };
	}
};
TutorialScreen.prototype.addLoadingUnit = function(unitnr) {
	if(this.loadingUnits.length <= 0) {
		this.loadingUnitsTimer = 0;
	}
	this.loadingUnits.push(unitnr);
};
TutorialScreen.prototype.loadAddedUnits = function() {
	if(this.loadingUnits.length > 0) {
		this.loadingUnitsTimer++;
		if(this.loadingUnitsTimer >= UNITS[this.level-1][this.loadingUnits[0]].loadingTime) {
			this.addUnitOnField(this.loadingUnits[0]);
			this.loadingUnits.shift((this.loadingUnits.length-1));
			if(this.loadingUnits.length > 0) {
				this.loadingUnitsTimer = 0;
			}
		}
	}
};

TutorialScreen.prototype.addUnitOnField = function(unitnr) {
	this.unitsOnField.push(unitnr);
	this.unitsOnField[this.unitsOnField.length-1] = new Unit(unitnr, this.player, true);
	this.unitsOnField[this.unitsOnField.length-1].PlayAnimation("walk");
};
TutorialScreen.prototype.addEnemiesOnField = function(unitnr) {
	this.enemiesOnField.push(unitnr);
	this.enemiesOnField[this.enemiesOnField.length-1] = new Unit(unitnr, this.enemy, false);
	this.enemiesOnField[this.enemiesOnField.length-1].PlayAnimation("walk");
};
TutorialScreen.prototype.RemoveUnitOnField = function(unit) {
	if(unit.GetPlayer().GetName() === "player") {
		this.score += 10;
	}
	this.unitOnFieldDied.push(unit);
	this.unitOnFieldDied[this.unitOnFieldDied.length-1].SetSpeed(0);
	this.unitOnFieldDied[this.unitOnFieldDied.length-1].PlayAnimation("die");
};
var timeOut = null;
TutorialScreen.prototype.SetInfoText = function(text, timer) {
	var stringtext = this.stringTextDetails;
	
	if(timeOut === null) {
		stringtext.text = text;
		timeOut = setTimeout(function(){ stringtext.text = ""; timeOut = null; }, timer*1000);
	}
};
TutorialScreen.prototype.GetPlayer = function() {
	return this.player;
};
TutorialScreen.prototype.GetUnitsOnField = function() {
	return this.unitsOnField;
};
TutorialScreen.prototype.GetEnemiesOnField = function() {
	return this.enemiesOnField;
};
TutorialScreen.prototype.RemoveEnemyFromList = function(i) {
	this.enemiesOnField.shift(i);
};
TutorialScreen.prototype.RemoveUnitFromList = function(i) {
	this.unitsOnField.shift(i);
};
function drawBubbleCenter(ctx, x, y, w, h, radius, color, scaleX, scaleY) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.moveTo((x+radius)*scaleX, y*scaleY);
	ctx.lineTo(((x + w) - radius)*scaleX, y*scaleY);
	ctx.quadraticCurveTo((x + w)*scaleX, y*scaleY, (x + w)*scaleX, (y+radius)*scaleY);
	ctx.lineTo((x + w)*scaleX, ((y+h)-radius)*scaleY);
	ctx.quadraticCurveTo((x + w)*scaleX, (y + h)*scaleY, ((x + w) - radius)*scaleX, (y + h)*scaleY);
	ctx.lineTo((x+radius)*scaleX, (y + h)*scaleY);
	ctx.quadraticCurveTo(x*scaleX, (y + h)*scaleY, x*scaleX, ((y + h) - radius)*scaleY);
	ctx.lineTo(x*scaleX, (y+radius)*scaleY);
	ctx.quadraticCurveTo(x*scaleX, y*scaleY, (x+radius)*scaleX, y*scaleY);
	ctx.fill();
}

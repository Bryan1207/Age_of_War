function MenuScreen() {
	if(DEV_MODE) console.log("Welkom bij het MenuScreen");
	this.bg = imageManager.getImage("game_bg");
	this.title = imageManager.getImageReference("menuTitle");
	this.mouseHoverImg = imageManager.getImageReference("mouseHover");
	this.button = [ {x: (CANVAS_WIDTH/2) - 50, y: (CANVAS_HEIGHT/2) + 40, w: 100, h: 45, buttonText: "Play"},
					{x: (CANVAS_WIDTH/2) - 95, y:(CANVAS_HEIGHT/2) + 115, w: 200, h: 45, buttonText: "Tutorial"},
					{x: (CANVAS_WIDTH/2) - 150, y:(CANVAS_HEIGHT/2) + 190, w: 300, h: 45, buttonText: "Instructions"},
					{x: (CANVAS_WIDTH/2) - 100, y:(CANVAS_HEIGHT/2) + 265, w: 140, h: 45, buttonText: "Sandbox"}];
	this.dbCon = new Database();
	//this.result = this.dbCon.Insert(0, 2000);
	this.score = this.dbCon.Select(user_id) || 0;
	//console.log(this.dbCon.Select());
}
MenuScreen.prototype.Update = function() {
	if(ClickOnItem(this.button[0].x, (this.button[0].y - this.button[0].h), this.button[0].w, this.button[0].h)) {
		//game.SetScreen(new GameScreen());
		audioPlayer.StopMusic("bg_menu");
		game.SetScreen(new DiffecultyScreen());
	} else if(ClickOnItem(this.button[1].x, (this.button[1].y - this.button[1].h), this.button[1].w, this.button[1].h)) {
		audioPlayer.StopMusic("bg_menu");
		game.SetScreen(new TutorialScreen());
	} else if(ClickOnItem(this.button[2].x, (this.button[2].y - this.button[2].h), this.button[2].w, this.button[2].h)) {
		audioPlayer.StopMusic("bg_menu");
		game.SetScreen(new InstructionScreen());
	} else if(ClickOnItem(this.button[3].x, (this.button[3].y - this.button[3].h), this.button[3].w, this.button[3].h)) {
		audioPlayer.StopMusic("bg_menu");
		game.SetScreen(new Sandbox());
	}
}

MenuScreen.prototype.Draw = function() {
	ctx.fillStyle = '#49BFFF'
	ctx.textAlign = 'left';
	ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

	ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	ctx.drawImage(imageManager.getImage("menuSpritesheet"), this.title.sourceX, this.title.sourceY, 
						this.title.sourceWidth, this.title.sourceHeight, 
						(CANVAS_WIDTH/2) - (this.title.width/2), 50, this.title.width, this.title.height);

	
	drawBubble(ctx, (CANVAS_WIDTH/2) - 200, (CANVAS_HEIGHT - 400), 400, 350, 50, "rgba(255, 255, 255, 0.3)", 1, 1);

	for(var i=0; i<this.button.length; i++) {
		if(MoveOnItem(this.button[i].x, (this.button[i].y - this.button[i].h), this.button[i].w, this.button[i].h)) {
			ctx.drawImage(imageManager.getImage("menuSpritesheet"), 
							this.mouseHoverImg.sourceX, this.mouseHoverImg.sourceY, 
							this.mouseHoverImg.sourceWidth, this.mouseHoverImg.sourceHeight,
							(this.button[i].x - this.mouseHoverImg.width), (this.button[i].y - ((this.button[i].h/2) + (this.mouseHoverImg.height/2))), 
							this.mouseHoverImg.width, this.mouseHoverImg.height);
		}
	}


	ctx.fillStyle = "#000000";
	ctx.font = "bold 50px cursive";
	ctx.textAlign = 'center';
	for(var i=0; i<this.button.length; i++) {
		ctx.fillText(this.button[i].buttonText, (CANVAS_WIDTH/2) - 1, this.button[i].y + 3);
	}
	
	//var metrics = ctx.measureText(this.button[i].buttonText);
	//ctx.fillText(this.button[i].buttonText, (CANVAS_WIDTH/2) - (metrics.width/2), this.button[i].y);
	ctx.fillStyle = "#FFFFFF";
	for(var i=0; i<this.button.length; i++) {
		ctx.fillText(this.button[i].buttonText, (CANVAS_WIDTH/2), this.button[i].y);
	}

	ctx.fillStyle = "#FFFFFF";
	ctx.font = "20px cursive";
	ctx.fillText("Score last time: " + this.score, CANVAS_WIDTH/2, CANVAS_HEIGHT-20);
	//ctx.fillText(this.score, CANVAS_WIDTH/2, CANVAS_HEIGHT-20);
}
function drawBubble(ctx, x, y, w, h, radius, color, scaleX, scaleY) {
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
/*function drawTalkBubble(ctx, x, y, w, h, radius, color, scaleX, scaleY) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.moveTo(((x+15)+radius)*scaleX, y*scaleY);
	ctx.quadraticCurveTo((x+55)*scaleX, (y-30)*scaleY, (x - 10)*scaleX, (y-60)*scaleY);
	ctx.quadraticCurveTo((x+40)*scaleX, (y-62)*scaleY, (x+145)*scaleX, y*scaleY);
	ctx.lineTo(((x + w) - radius)*scaleX, y*scaleY);
	ctx.quadraticCurveTo((x + w)*scaleX, y*scaleY, (x + w)*scaleX, (y+radius)*scaleY);
	ctx.lineTo((x + w)*scaleX, ((y+h)-radius)*scaleY);
	ctx.quadraticCurveTo((x + w)*scaleX, (y + h)*scaleY, ((x + w) - radius)*scaleX, (y + h)*scaleY);
	ctx.lineTo((x+radius)*scaleX, (y + h)*scaleY);
	ctx.quadraticCurveTo(x*scaleX, (y + h)*scaleY, x*scaleX, ((y + h) - radius)*scaleY);
	ctx.lineTo(x*scaleX, (y+radius)*scaleY);
	ctx.quadraticCurveTo(x*scaleX, y*scaleY, (x+radius)*scaleX, y*scaleY);
	ctx.fill();
}*/
function InstructionScreen() {
	this.bg = imageManager.getImage("game_bg");
	this.backToMenuButton = { x: (CANVAS_WIDTH/2) - 95, y:(CANVAS_HEIGHT - 50), w: 250, h: 45, buttonText: "Click here to go back!"};
}
InstructionScreen.prototype.Update = function() {
	if(ClickOnItem(this.backToMenuButton.x, (this.backToMenuButton.y - this.backToMenuButton.h), this.backToMenuButton.w, this.backToMenuButton.h)) {
		game.SetScreen(new MenuScreen());
	}
};
InstructionScreen.prototype.Draw = function() {
	ctx.fillStyle = '#49BFFF'
	ctx.textAlign = 'left';
	ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

	ctx.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	
	drawBubble(ctx, 150, 100, CANVAS_WIDTH-300, CANVAS_HEIGHT-200, 50, "rgba(255, 255, 255, 0.3)", 1, 1);


	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = 'center';
	ctx.font = "bold 100px cursive";
	ctx.fillText("Instructions", 600, 200);
	ctx.fillStyle = "#000000";
	ctx.font = "bold 23px cursive";
	
	ctx.fillText(this.backToMenuButton.buttonText, (CANVAS_WIDTH/2) - 1, this.backToMenuButton.y + 3);
	
	//var metrics = ctx.measureText(this.button[i].buttonText);
	//ctx.fillText(this.button[i].buttonText, (CANVAS_WIDTH/2) - (metrics.width/2), this.button[i].y);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(this.backToMenuButton.buttonText, (CANVAS_WIDTH/2), this.backToMenuButton.y);
	ctx.textAlign = 'left';
	ctx.font = "18px cursive";
	wrapText(ctx,
		"The goal of the game is to survive and destroy the enemy base.\n\nThe game is devided in 5 ages. To move to the next age, you need \nXP points. To gain these points, you have to kill enemy units.\nYou also gain XP points when one of your units is killed. You can \nalso build defences. Finding the balance between defence and offence is the key.\n\nYou will also be able to use a special attack. This attack will need\ntime to be available again after you use it. Each age have it's own special attack.\n\nYou cannot repair you base, but it will gain health points everytime you evolve to the next age. Protect your base at all costs!"
	, 200, 300, CANVAS_WIDTH-400, 23);
};
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
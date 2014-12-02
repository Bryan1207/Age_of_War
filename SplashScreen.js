function SplashScreen() {
	if(DEV_MODE) { console.log("Dit is de SplashScreen!"); }
	//audioPlayer.PlayMusic("bg_menu", { volume: 1, loop: true });
}

SplashScreen.prototype.Update = function() {
	if(ClickOnItem(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)) {
		game.SetScreen(new MenuScreen());
	}
}

SplashScreen.prototype.Draw = function() {
	ctx.font = "30px Calibri";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Made by Rick Smeets", (CANVAS_WIDTH/2) - 150, (CANVAS_HEIGHT/2) - 20);
}
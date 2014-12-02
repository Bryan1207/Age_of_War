function LoadingScreen() {
	if(DEV_MODE) console.log("Welcome in the LoadingScreen!");
	this.startLoading = false;
	if(window.navigator.msPointerEnabled) { /* click by IE touch */
		canvas.addEventListener('MSPointerDown', this.LoadingScreenSetup, false);
		window.addEventListener('MSPointerDown', addAudioPlayer, false);
	} else {
		canvas.addEventListener('touchstart', this.LoadingScreenSetup, false);
		canvas.addEventListener('click', this.LoadingScreenSetup, false);
		window.addEventListener('click', addAudioPlayer, false);
		window.addEventListener('touchstart', addAudioPlayer, false);
	}
	this.items = 0;
	this.progress = new Array();
	this.percentage = 0;
}

LoadingScreen.prototype.Update = function() {
	this.percentage = 100 / this.items;
}

LoadingScreen.prototype.Draw = function() {
	if(this.startLoading) {
		ctx.font = "30px Calibri";
		ctx.fillStyle = "#FFFFFF"
		ctx.fillText("Loading...", ((CANVAS_WIDTH/2) - 225), (CANVAS_HEIGHT/2) );

		ctx.strokeStyle = "#FFFFFF";
		ctx.strokeRect( ((CANVAS_WIDTH/2) - 225), ((CANVAS_HEIGHT/2)+15) , 400, 30);

		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(((CANVAS_WIDTH/2) - 225), ((CANVAS_HEIGHT/2)+15) , (400*(this.percentage/100)), 30);

	} else {
		ctx.font = "30px Calibri";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText("Click/Touch to start the game!", (CANVAS_WIDTH/2) - 200, (CANVAS_HEIGHT/2) - 20);
	}
}
LoadingScreen.prototype.AddProgress = function(item) {
	this.items += 1;
	this.progress.push(item);
}
LoadingScreen.prototype.SetItemDone = function(item) {
	this.items -= 1;
	if(this.progress.indexOf(item)) {
		this.progress.splice( item, 1 );
	}
	if(this.items <= 0) {
		this.SetupDone();
	}
}

LoadingScreen.prototype.LoadingScreenSetup = function() {
	if(DEV_MODE) console.log("Starting Loading All Assets...");

	loadingScreen.startLoading = true;
	if(window.navigator.msPointerEnabled) {
		canvas.removeEventListener('MSPointerDown', loadingScreen.LoadingScreenSetup, false);
	} else {
		canvas.removeEventListener('touchstart', loadingScreen.LoadingScreenSetup, false);
		canvas.removeEventListener('click', loadingScreen.LoadingScreenSetup, false);
	}
	imageManager = new ImageManager();
	xmlReader = new XmlReader("./xml/animations.xml");
	animationManager = new AnimationManager(xmlReader.getResults());
	animationManager.loadImages(1);
	imageManager.loadImages(IMAGES);
}
LoadingScreen.prototype.SetupDone = function() {
	if(DEV_MODE) { console.log('All done!'); }
	game.SetScreen(new SplashScreen());
}
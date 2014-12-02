function Viewport(screenWidth, screenHeight, gameWidth, gameHeight) {
	this.position = { x: 0, y: 0 };
	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.gameWidth = (gameWidth - this.screenWidth);
	this.gameHeight = gameHeight;
	//this.shakeEffectX = null;
	this.shakeEffectY = null;
	this.aantalEffects = 50;
}

Viewport.prototype.Update = function() {
	/* 
	time = 1;
	distance = LineDistanceX(point1, point2);
	speed = distance / time
	acceleration = speed / time 
	posX += speed * acceleration;
	*/
	if(mouseMovePos.y >= 200) {
		if(mouseMovePos.x >= 0 && mouseMovePos.x <= 100) {
			//var distanceX = this.LineDistanceX(100, mouseMovePos.x);
			if(this.position.x > 0) { /*(distanceX / 10)*/
				this.position.x -= 7.5;
				//this.position.x -= distanceX / 10;
			}
		} else if(mouseMovePos.x >= (this.screenWidth - 100) && mouseMovePos.x <= this.screenWidth) {
			//var distanceX = (CANVAS_WIDTH - mouseMovePos.x);
			if(this.position.x < this.gameWidth) {
				this.position.x += 7.5;
				//this.position.x += distanceX / 10;
			}
		}
	}
	if(this.shakeEffectY !== null) { 
		//this.shakeEffectX.Update();
		this.shakeEffectY.Update();
		if(this.shakeEffectY.getFinished()) { /*this.shakeEffectX.getFinished() ||*/  
			//this.shakeEffectX = null; 
			this.shakeEffectY = null;
		}
	}
};

Viewport.prototype.GetPosition = function() {
	return { x: this.position.x, y: this.position.y };
};
Viewport.prototype.SetPosition = function(pos) {
	this.position = pos;
};
Viewport.prototype.SetPositionX = function(posX) {
	this.position.x = posX;
};
Viewport.prototype.ShakeScreen = function() {
	//this.shakeX = new Array();
	this.shakeY = new Array();

	this.shakeArray = [ { x: this.position.x + 10,  y: this.position.y - 10 },
						{ x: this.position.x + 0, 	y: this.position.y + 0 }];

	for(var j=0; j<this.aantalEffects; j++) {
		for(var i=0; i<this.shakeArray.length; i++) {
			//this.shakeX.push(new VEffect(this.position, "x", viewport.GetPosition().x + this.shakeArray[i].x, 0.06, 0));
			this.shakeY.push(new VEffect(this.position, "y", viewport.GetPosition().y + this.shakeArray[i].y, 0.05, 0));
		}
	}
	//this.shakeEffectX = new VEffectArray(this.shakeX);
	this.shakeEffectY = new VEffectArray(this.shakeY);
	//this.shakeEffectX.Init();
	this.shakeEffectY.Init();
};

Viewport.prototype.LineDistanceX = function(point1X, point2X) {
	var xs = 0;
	xs = point2X - point1X;
	xs = xs * xs;
	return Math.sqrt(xs);
}
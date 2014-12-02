function AnimationManager(reader) {	
	if(DEV_MODE) console.log("Loading Animations...");
    loadingScreen.AddProgress("animationManager");
	this.xmlReader = reader;
	this.animations = {};
	this.url = "./images/Spritesheets/";
	this.numRecords = 0;
	this.all_loadedAnimations = 0;
	//this.res = resolutions["med"];
	this.loadAnimations();
}

AnimationManager.prototype.loadAnimations = function() {
	for(var i in this.xmlReader) {
		this.animations[i] = {
			name: this.xmlReader[i].getNamedItem("name").value,
			type: parseFloat(this.xmlReader[i].getNamedItem("type").value),
			xOffset: parseFloat(this.xmlReader[i].getNamedItem("xOffset").value),
			yOffset: parseFloat(this.xmlReader[i].getNamedItem("yOffset").value),
			fps: parseFloat(this.xmlReader[i].getNamedItem("fps").value),
			sequence: this.xmlReader[i].getNamedItem("sequence").value,
			spritesheet: this.xmlReader[i].getNamedItem("spritesheet").value,
			width: parseFloat(this.xmlReader[i].getNamedItem("width").value),
			height: parseFloat(this.xmlReader[i].getNamedItem("height").value)
		};
		this.numRecords++;
	}
};

AnimationManager.prototype.getAnimation = function(name) {
	return this.animations[name];
};
AnimationManager.prototype.getAllAnimations = function() {
	return this.animations;
};
AnimationManager.prototype.getNumRecords = function() {
	return this.numRecords;
};
AnimationManager.prototype.checkNameExists = function(name) {
	for(var i in this.animations) {
		if(name === this.animations[i].name) {
			return true;
		}
	}
	return false;
};
AnimationManager.prototype.getImage = function(name) {
	for(var src in this.all_loadedAnimations) {
		if(this.all_loadedAnimations[src].name === name) {
			return this.all_loadedAnimations[src];
		}
	}
};

AnimationManager.prototype.loadImages = function(resolution, callback) {
	//if(resolution === resolutions["low"]) {
		this.res = resolution;
		this.url = "./images/Spritesheets/";
	/*} else if(resolution === resolutions["med"]) {
		this.res = resolution;
		this.url = "./images/Spritesheets/Med_resolution/";
	} else if(resolution === resolutions["high"]) {
		this.res = resolution;
		this.url = "./images/Spritesheets/High_resolution/";
	}*/
	this.sources = this.animations;
	var all_images;
	var images = {};
    var numImages = 0;
    var loadedImages = 0;
    
    for (var src in this.sources) {
		numImages++;
    }
    for (var src in this.sources) {
        images[src] = new Image();
        images[src].animationManager = this;
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
            	current_res = animationManager.res;
            	animationManager.all_loadedAnimations = images;
            	if(DEV_MODE) console.log("Animations all loaded!");
            	if(loadingScreen) {
                    loadingScreen.SetItemDone("animationManager");
                }
               	all_images = images;
               	if(typeof(callback) !== null && typeof(callback) !== 'undefined') {
					callback();
				}
            }
           
        };
        images[src].src = (this.url + this.sources[src].spritesheet);
        images[src].name = this.sources[src].name;
    }
};
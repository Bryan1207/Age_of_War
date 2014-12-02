function ImageClass(imageName) {
	this.imageName = imageName;
}

ImageClass.prototype.loadImageVariables = function(image_scale) {
	var imageInfo = image_details_loaded[this.imageName];
	this.width = (imageInfo.sourceWidth/image_scale);
	this.height = (imageInfo.sourceHeight/image_scale);
	this.sourceX = (imageInfo.sourceX/image_scale);
	this.sourceY = (imageInfo.sourceY/image_scale);
	this.sourceWidth = (imageInfo.sourceWidth/image_scale);
	this.sourceHeight = (imageInfo.sourceHeight/image_scale);
};
ImageClass.prototype.loadAnimationVariables = function(animations, image_scale) {
	var imageInfo = animations[this.imageName];
	this.width = (imageInfo.width/image_scale);
	this.height = (imageInfo.height/image_scale);
	this.sourceWidth = (imageInfo.width/image_scale)*(image_scale/2);
	this.sourceHeight = (imageInfo.height/image_scale)*(image_scale/2);
	this.xOffset = (imageInfo.xOffset / image_scale)*(image_scale/2);
	this.yOffset = (imageInfo.yOffset / image_scale)*(image_scale/2);
	this.spritesheet = imageInfo.spritesheet;
	this.fps = imageInfo.fps;
	this.type = imageInfo.type;
	var seq = imageInfo.sequence;
	var seqArray = seq.split(",");
	this.sequence = new Array();
	for(var i=0; i < seqArray.length; i++) {
		this.sequence[i] = parseInt(seqArray[i]);
	}
	//console.log(this.imageName + ": " + this.width);
};
ImageClass.prototype.GetImageName = function() {
	return this.imageName;
};
ImageClass.prototype.GetWidth = function() {
	return this.width;
};
ImageClass.prototype.GetHeight = function() {
	return this.height;
};
ImageClass.prototype.GetSourceX = function() {
	return this.sourceX;
};
ImageClass.prototype.GetSourceY = function() {
	return this.sourceY;
};
ImageClass.prototype.GetSourceWidth = function() {
	return this.sourceWidth;
};
ImageClass.prototype.GetSourceHeight = function() {
	return this.sourceHeight;
};
ImageClass.prototype.GetXOffset = function() {
	return this.xOffset;
};
ImageClass.prototype.GetYOffset = function() {
	return this.yOffset;
};
ImageClass.prototype.GetType = function() {
	return this.type;
};
ImageClass.prototype.GetSequence = function() {
	return this.sequence;
};
ImageClass.prototype.GetFPS = function() {
	return this.fps;
};
ImageClass.prototype.GetSpritesheet = function() {
	return this.spritesheet;
};
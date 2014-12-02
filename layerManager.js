function LayerManager() {
	this.layers = new Array();
}

LayerManager.prototype.addImage = function(imageData) {
	this.layers.push(imageData);
};

LayerManager.prototype.Sort = function() {
	this.layers.sort(function(a, b) { return a.layer - b.layer; });
};
LayerManager.prototype.Render = function(ctx)
{
	this.Sort();
	if(this.layers != null || typeof(this.layers) !== 'undefined') {
		for(var i=0; i<this.layers.length; i++) {
			if(this.layers[i].isStatic) {
				if(this.layers[i].rotation !== null) {
					ctx.save();
					ctx.translate(this.layers[i].posX + (this.layers[i].width /2), 
									this.layers[i].posY + (this.layers[i].height /2));
					ctx.rotate(this.layers[i].rotation * TO_RADIANS);
					ctx.drawImage(this.layers[i].image,
							this.layers[i].sourceX, this.layers[i].sourceY, 
							this.layers[i].sourceWidth, this.layers[i].sourceHeight, 
							-(this.layers[i].width/2), -(this.layers[i].height/2), 
							this.layers[i].width, this.layers[i].height);
					ctx.restore();
				} else {
					ctx.drawImage(this.layers[i].image,
							this.layers[i].sourceX, this.layers[i].sourceY, 
							this.layers[i].sourceWidth, this.layers[i].sourceHeight, 
							this.layers[i].posX, this.layers[i].posY, 
							this.layers[i].width, this.layers[i].height);
				}
			} else {
				if(this.layers[i].rotation !== null) {
					ctx.save();
					ctx.translate((this.layers[i].posX - viewport.GetPosition().x) + (this.layers[i].width /2) , 
									(this.layers[i].posY - viewport.GetPosition().y) + (this.layers[i].height /2));
					ctx.rotate(this.layers[i].rotation * TO_RADIANS);
					ctx.drawImage(this.layers[i].image,
						this.layers[i].sourceX, this.layers[i].sourceY, 
						this.layers[i].sourceWidth, this.layers[i].sourceHeight, 
						-(this.layers[i].width /2), -(this.layers[i].height /2), 
						this.layers[i].width, this.layers[i].height);
					ctx.restore();
				} else {
					ctx.drawImage(this.layers[i].image,
						this.layers[i].sourceX, this.layers[i].sourceY, 
						this.layers[i].sourceWidth, this.layers[i].sourceHeight, 
						this.layers[i].posX - viewport.GetPosition().x, this.layers[i].posY - viewport.GetPosition().y, 
						this.layers[i].width, this.layers[i].height);
				}
			}
			
		}
	}
	this.layers = [];
};

function drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, posX, posY, width, height, layer, isStatic, rotation) {
	if(typeof(layer) == undefined) layer = 0;
	 
	var image = {	"image": 		image,
					"sourceX": 		sourceX,
					"sourceY": 		sourceY,
					"sourceWidth": 	sourceWidth,
					"sourceHeight": sourceHeight,
					"posX": 		posX, 
					"posY": 		posY,
					"width": 		width,
					"height": 		height,
					"layer": 		layer,
					"isStatic": 	isStatic,
					"rotation": 	rotation };
	layerManager.addImage(image);
	image = null;
};
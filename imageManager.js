function ImageManager() {
    if(DEV_MODE) console.log("Loading Images...");
    loadingScreen.AddProgress("imageManager");
    this.imageScale = 1;
    this.images = new Array();
    for(var name in IMAGES_DETAILS) {
        this.images.push(new ImageClass(name));
    }
}

ImageManager.prototype.loadImages = function(sources, callback) {
	this.sources = sources;
	var all_images;
	var images = {};
    var numImages = 0;
    var loadedImages = 0;
    
    for (var src in this.sources) {
    	numImages++;
    }
    for (var src in this.sources) {
    	images[src] = new Image();
    	images[src].imageManager = this;
    	images[src].onload = function() {
        	if (++loadedImages >= numImages) {
                /*if(imageManager.sources === LOW_RES_IMAGES) {
                    image_res_loaded = imageManager.sources;
                    image_details_loaded = LOW_RES_DETAILS;
                    imageManager.imageScale = IMAGE_LOW_RES_SCALE;
                } else if(imageManager.sources === MED_RES_IMAGES) {
                    image_res_loaded = imageManager.sources;
                    image_details_loaded = MED_RES_DETAILS;
                    imageManager.imageScale = IMAGE_MED_RES_SCALE;
                } else if(imageManager.sources === HIGH_RES_IMAGES) {
                    image_res_loaded = imageManager.sources;
                    image_details_loaded = HIGH_RES_DETAILS;
                    imageManager.imageScale = IMAGE_HIGH_RES_SCALE;
                }*/
                image_details_loaded = IMAGES_DETAILS;
                imageManager.all_loadedImages = images;
                for(var name in imageManager.images) {
                    imageManager.images[name].loadImageVariables(imageManager.imageScale);
                }
                if(DEV_MODE) console.log("Images all loaded!");
                if(loadingScreen) { 
                    loadingScreen.SetItemDone("imageManager");
                }
                all_images = images;
                if(typeof(callback) !== null && typeof(callback) !== 'undefined') {
				    callback();
                }
            }
    	};
        images[src].onerror = function() {
            if(DEV_MODE) { 
                console.log("Failed To Load Image: " + src);
            }
        };
    	images[src].src = this.sources[src];
        images[src].name = src;
    }
};
ImageManager.prototype.getImageReference = function(imageName) {
     for(var i in this.images) {
        if(this.images[i].GetImageName() === imageName ) {
            return this.images[i];
        }
    }
}
ImageManager.prototype.getImage = function(name) {
	return this.all_loadedImages[name];
};
ImageManager.prototype.getHeight = function(imageName) {
    return imageName.GetHeight();
};
ImageManager.prototype.getWidth = function(imageName) {
    return imageName.GetWidth();
};
ImageManager.prototype.getSourceX = function(imageName) {
    return imageName.GetSourceX();
};
ImageManager.prototype.getSourceY = function(imageName) {
    return imageName.GetSourceY();
};
ImageManager.prototype.getSourceHeight = function(imageName) {
    return imageName.GetSourceHeight();
};
ImageManager.prototype.getSourceWidth = function(imageName) {
    return imageName.GetSourceWidth();
};
ImageManager.prototype.getImageScale = function() {
    return this.imageScale;
};

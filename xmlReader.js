function XmlReader(url) {
	if(DEV_MODE) console.log('Starting Loading XML...');
	this.xmlHttp = null;
	this.xmlDoc = null;
	this.results = {};
	this.finished = false;

	if(window.XMLHttpRequest) {
		//for IE7+, Firefox, Chrome, Safari, Opera
		this.xmlHttp = new XMLHttpRequest();
	} else {
		// IE5, IE6
		this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	loadingScreen.AddProgress("xmlReader");
	this.loadXML(url);
}


XmlReader.prototype.loadXML = function(url) {
	this.xmlHttp.open("GET", url, false);
	this.xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	this.xmlHttp.send(null);
	this.xmlDoc = this.xmlHttp.responseXML;
	if(this.xmlHttp.readyState === 4 && this.xmlHttp.status === 200) {
		this.finished = true;
		if(loadingScreen) { loadingScreen.SetItemDone("xmlReader"); }
		if(DEV_MODE) console.log('XML All Loaded!');
		var elementTag = this.xmlDoc.getElementsByTagName("animation");
		for(var i=0; i<elementTag.length; i++) {
			this.results[elementTag.item(i).attributes["name"].value] = elementTag.item(i).attributes;
			for(var j=0; j< elementTag.item(i).attributes.length; j++) {
				this.results[elementTag.item(i).attributes["name"].value][j] = elementTag.item(i).attributes[j].value;
			}
		}
	} else {
		this.finished = false;
		console.log("Something went wrong!, xml cannot load... Please try again.");
	}
};
XmlReader.prototype.getResults = function() {
	return this.results;
};
XmlReader.prototype.getFinishedLoading = function() {
	return this.finished;
};
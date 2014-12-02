function Database(id) {
	if(window.XMLHttpRequest) {
		//for IE7+, Firefox, Chrome, Safari, Opera
		this.connection = new XMLHttpRequest();
	} else {
		// IE5, IE6
		this.connection = new ActiveXObject("Microsoft.XMLHTTP");
	}
	this.user_id = id;
}

Database.prototype.Select = function(id) {
	this.connection.open('GET', "./selectFromDB.php?id=" + id, false);
	this.connection.send(null);
	this.xmlDoc = this.connection.responseText || this.connection.response;
	if(this.connection.readyState === 4 && this.connection.status === 200) {
		this.result = this.xmlDoc;
	} else {
		//Something went wrong!
		this.result = "Something Went Wrong!";
	}
	this.connection.close;
	return this.result;
};
Database.prototype.Insert = function(id, score) {
	var check = this.Select(id);
	if(check === null) {
		this.connection.open('GET', "./insertToDB.php?id=" + id + "?score="+score, false);
	} else {
		this.connection.open('GET', "./updateToDB.php?id=" + id + "?score="+score, false);
	}
	this.connection.send(null);
	this.xmlDoc = this.connection.responseText || this.connection.response;
	if(this.connection.readyState === 4 && this.connection.status === 200) {
		this.result = this.xmlDoc;
	} else {
		//Something went wrong!
		this.result = "Something Went Wrong!";
	}
	this.connection.close;
	return this.result;
};
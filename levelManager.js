function LevelManager() {
	this.level = 0;
	this.maxLevel = 1;
}

LevelManager.prototype.IncreaseLevel = function() {
	if(this.level < this.maxLevel) {
		this.level += 1;
		return true;
	}
	return false;
};
LevelManager.prototype.IsMaxedLevel = function() {
	if(this.level >= this.maxLevel) {
		return true;
	}
	return false;
};
LevelManager.prototype.GetLevel = function() {
	return this.level;
};
LevelManager.prototype.GetCurrentLevel = function() {
	return this.level + 1;
};
LevelManager.prototype.SetLevel = function(val) {
	this.level = val;
}
LevelManager.prototype.ResetLevel = function() {
	this.level = 0;
};
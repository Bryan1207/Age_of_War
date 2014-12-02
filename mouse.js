var mouseClickPos = { x: 0, y:0 };
var mouseMovePos = { x: 0, y:0 };
var isClicked = false;

function Mouse() { }

Mouse.prototype.Init = function() {
	if(window.navigator.msPointerEnabled) { /* click by IE touch */
		canvas.addEventListener('MSPointerDown', MSClick, true);
		canvas.addEventListener('mousemove', MSMove, true);
	} else {
		canvas.addEventListener('touchstart', TouchStart, true);
		canvas.addEventListener('touchmove', TouchMove, true);
		canvas.addEventListener('mousemove', Move, true);
		canvas.addEventListener('click', Click, true);
	}
};

Mouse.prototype.Remove = function() {
	if(window.navigator.msPointerEnabled) { /* click by IE touch */
		canvas.removeEventListener('MSPointerDown', MSClick, true);
		canvas.removeEventListener('mousemove', MSMove, true);
	} else {
		canvas.removeEventListener('touchstart', TouchStart, true);
		canvas.removeEventListener('touchmove', TouchMove, true);
		canvas.removeEventListener('mousemove', Move, true);
		canvas.removeEventListener('click', Click, true);
	}
}

function Move(e) {
	var rect = canvas.getBoundingClientRect();
	mouseMovePos.x = (e.pageX - rect.left);
	mouseMovePos.y = (e.pageY - rect.top);
}

function Click(e) {
	e.preventDefault();
	var rect = canvas.getBoundingClientRect();
	mouseClickPos.x = (e.pageX - rect.left);
	mouseClickPos.y = (e.pageY - rect.top);
	isClicked = true;
}

function MSClick(e) {
	e.preventDefault();
	var rect = canvas.getBoundingClientRect();
	mouseClickPos.x = (e.clientX - rect.left);
	mouseClickPos.y = (e.clientY - rect.top);
	isClicked = true;
}
function MSMove(e) {
	var rect = canvas.getBoundingClientRect();
	mouseMovePos.x = (e.clientX - rect.left);
	mouseMovePos.y = (e.clientY - rect.top);
}


function TouchStart(e) {
	e.preventDefault();
	var t = e.touches[0] || e.changedTouches[0];
	var rect = canvas.getBoundingClientRect();
	if(t) {
		mouseClickPos.x = (t.pageX - rect.left);
		mouseClickPos.y = (t.pageY - rect.top);
		isClicked = true;
	}
}
function TouchMove(e) {
	var t = e.touches[0] || e.changedTouches[0];
	var rect = canvas.getBoundingClientRect();
	if(t) {
		mouseMovePos.x = (t.pageX - rect.left);
		mouseMovePos.y = (t.pageY - rect.top);
	}
}

function ClickOnItem(posX, posY, width, height) {
	if(isClicked) {
		if (mouseClickPos.x >= posX && mouseClickPos.x <= (posX + width) &&
			mouseClickPos.y >= posY && mouseClickPos.y <= (posY + height)) {
			return true;
		}
	}
	return false;
}
function MoveOnItem(posX, posY, width, height) {
	if(!isClicked) {
		if (mouseMovePos.x >= posX && mouseMovePos.x <= (posX + width) &&
			mouseMovePos.y >= posY && mouseMovePos.y <= (posY + height)) {
			return true;
		}
	}
	return false;
}
var canvas, ctx;
var mouse;
var gameRunning = true;
var gamePaused = false;

var CANVAS_WIDTH = 0; // 1200
var CANVAS_HEIGHT = 0; // 720

var GAME_WIDTH = 2400;
var GAME_HEIGHT = 720;

var screenWidth = 0;
var screenHeight = 0;
var className = null;
var levelManager = null;
var layerManager = null;
var viewport = null;

var DEV_MODE = false;
var SCORE = 0;
var audioPlayer = null;
var loadingScreen;
var current_res, 
image_res_loaded, 
image_details_loaded;

var user_id = 999;

var deltaTime = 0;

var TO_RADIANS = (Math.PI/180);

var ua = navigator.userAgent.toLowerCase();
var iPod = /ipod/.test(ua);
var windows = /windows/.test(ua);
var wp = /windows phone/.test(ua);
var ios = /(iphone|ipod|ipad)/.test(ua);
var android = /android/.test(ua);
var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
if ((is_chrome)&&(is_safari)) { is_safari=false; }


var requestAnimFrame = (
	function(){
		return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback, element){
			window.setTimeout(callback, 1000 / 60);
		};
	}
)();

var fps = {
	startTime : 0,
	frameNumber : 0,
	getFPS : function(){
		this.frameNumber++;
		var d = new Date().getTime(),
		currentTime = (( d - this.startTime ) / 1000),
		result = Math.floor( ( this.frameNumber / currentTime ) );

		if( currentTime > 1 ){
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
		}
		return result;
	}
};

window.onload = function() {
	if(DEV_MODE) console.log("Loading Canvas..."); 
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	CANVAS_WIDTH = canvas.width;
	CANVAS_HEIGHT = canvas.height;
	mouse = new Mouse();
	mouse.Init();
	Init();
}
var lastUpdate = Date.now();
function GameLoop() {
	var now = Date.now();
	deltaTime = now - lastUpdate;
	lastUpdate = now;

	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	game.Update();
	game.Draw();

	requestAnimFrame(GameLoop);
}

function Init() {
	var parts = window.location.search.substr(1).split("?");
	var $_GET = {};
	for (var i = 0; i < parts.length; i++) {
	    var temp = parts[i].split("=");
	    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
	}
	user_id = $_GET['id'];
	console.log("Logged in as user: " + user_id);
	game = new Game();
	loadingScreen = new LoadingScreen();
	game.SetScreen(loadingScreen);
	GameLoop();
}

function Game() {
	if(DEV_MODE) {
		document.addEventListener('keydown', CheckKeyDown, false);
	}
	levelManager = new LevelManager();
}

Game.prototype.Update = function() {
	if(typeof(className) !== 'undefinded') {
		className.Update();
	}
	isClicked = false;
}

Game.prototype.Draw = function() {
	if(typeof(className) !== 'undefinded') {
		className.Draw();
	}
	if(DEV_MODE) { 
		ctx.font = "20px Calibri";
		ctx.fillStyle = "#FF0000"; //Red
		ctx.fillText(fps.getFPS(), 20, (CANVAS_HEIGHT-30));
	}
}


Game.prototype.SetScreen = function(value) {
	/*if(typeof(audioPlayer) !== "undefinded" && audioPlayer !== null)  {
		audioPlayer.StopAllMusic();
	}*/
	className = null;
	className = value;
}

function addAudioPlayer(event) {
	if(window.navigator.msPointerEnabled) {
		window.removeEventListener('MSPointerDown', addAudioPlayer, false);
	} else {
		window.removeEventListener('touchstart', addAudioPlayer, false);
		window.removeEventListener('click', addAudioPlayer, false);
	}
	if(!audioPlayer) {
		audioPlayer = new AudioPlayer();
	}
}

window.addEventListener('resize', Resize, false);
window.addEventListener('orientationchange', Resize, false);

function Resize() {
	window.scrollTo(0,1);
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for(var i=0; i<words.length; i++) {
		var testLine = line + words[i] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if(testWidth > maxWidth && i > 0) {
			context.fillText(line, x, y);
			line=words[i] + ' ';
			y += lineHeight;
		} else {
			line = testLine;
		}
	}
	//context.font = font;
	context.fillText(line, x, y);
};

function CheckKeyDown(e, key) {
	var keyID = (e.keyCode) ? e.keyCode : e.which;
	if(keyID === 80 || keyID === 32) {
		e.preventDefault();
		if(gamePaused && gameRunning) {
			gamePaused = false;
		} else if(gameRunning){ 
			gamePaused = true;
			//if(audioPlayer) audioPlayer.StopAllMusic();
		}
	}
};

function supportedAudioFormat(audio) {
	var returnExtension = "";
	if (audio.canPlayType("audio/ogg") == "probably" || audio.canPlayType("audio/ogg") == "maybe") {
	     returnExtension = "ogg";
	} else if(audio.canPlayType("audio/m4a") == "probably" || audio.canPlayType("audio/m4a") == "maybe") {
	     returnExtension = "m4a";
	} else if(audio.canPlayType("audio/wav") == "probably" || audio.canPlayType("audio/wav") == "maybe") {
	     returnExtension = "wav";
	} else if(audio.canPlayType("audio/mp3") == "probably" || audio.canPlayType("audio/mp3") == "maybe") {
	     returnExtension = "mp3";
	}
	return returnExtension;
};

function fullScreen() {
	window.removeEventListener('touchstart', fullScreen, false);
	var ua = navigator.userAgent.toLowerCase();
	var ios = /(iphone|ipod|ipad)/.test(ua);
	if(ios) {
		if(canvas.requestFullScreen)
	        canvas.requestFullScreen();
	    else if(canvas.webkitRequestFullScreen)
	        canvas.webkitRequestFullScreen();
	    else if(canvas.mozRequestFullScreen)
	        canvas.mozRequestFullScreen();
	    else if(canvas.msRequestFullScreen)
	        canvas.msRequestFullScreen();
	}
};
function LineDistance(point1, point2) {
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;
	return Math.sqrt( xs + ys );
}
function LineDistanceX(point1X, point2X) {
	var xs = 0;
	xs = point2X - point1X;
	xs = xs * xs;
	return Math.sqrt(xs);
}
function LineDistanceY(point1Y, point2Y) {
	var ys = 0;
	ys = point2Y - point1Y;
	ys = ys * ys;
	return Math.sqrt(ys);
}
function GetRandomInt(min, max) {
	return Math.floor(Math.random() * (max-min+1)) + min;
};

/*var TO_RADIANS = (Math.PI/180);
function DrawRotatedImage(image, x, y, angle) {
	context.save();
	context.translate(x, y);
	context.rotate(angle * TO_RADIANS);
	context.drawImage(image, -(image.width/2), -(image.height/2));
	context.restore();
}*/